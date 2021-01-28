import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import ScrollArrow from "../../components/ScrollArrow";
import CustomEditor from "../../components/CustomEditor";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import LoaderSpinner from "../../components/LoaderSpinner";

import { EditorState, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchAssessmentSetForCandidate,
  fetchAllQuestionForCandidate,
  uploadCandidateResponses,
  fetchGrades,
} from "../../actions/candidate.actions";

class AttemptContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0, //array index
      question: [],
      orderCount: 0,
      type: localStorage.getItem("type"), //random, fixed or manual | manual with random ?
      assessmentID: this.props.match.params.assessmentID,
      set: localStorage.getItem("set"),
      timeSettings: localStorage.getItem("timeSettings"),
      start_time: parseInt(this.props.match.params.totalSec), // time used when reset
      time: parseInt(localStorage.getItem("time")) + 2, //current time + 2 seconds (loading time)
      gradeData: {},
      submitted: false, //check if it is auto submitted
    };

    this.interval_id = 0;
  }

  componentDidMount() {
    const data = {
      set: this.state.set,
      assessmentID: this.state.assessmentID,
    };

    if (this.state.type === "1" || this.state.type === "2") {
      this.props.fetchAllQuestionForCandidate(data);
    } else this.props.fetchAssessmentSetForCandidate(data);

    this.props.fetchGrades(data);

    if (this.state.timeSettings !== "3") {
      this.interval_id = setInterval(() => {
        localStorage["time"] = this.state.time - 1;
        this.setState({ time: this.state.time - 1 });
      }, 1000);
    }

    // document.addEventListener("visibilitychange", () => {
    //   if (document.visibilityState !== "visible") {
    //     console.log("tab is inactive");
    //   }
    // });
  }

  componentDidUpdate(prevProps, prevState) {
    const { candidateReducer } = this.props;
    const { type } = this.state;
    if (
      prevProps.candidateReducer !== candidateReducer &&
      candidateReducer.questionSet !== null &&
      candidateReducer.grade !== null
    ) {
      const { questionSet } = this.props.candidateReducer;
      let temp = questionSet;

      temp.forEach((item, index) => {
        if (
          item.questionType === "Single Choice" ||
          item.questionType === "Multiple Choice"
        ) {
          let checked = [];
          for (let i = 0; i < item.questionChoices.length; i++) {
            checked.push(false);
          }
          temp[index].checked = checked;
        }
        temp[index].response = "";
        temp[index].question_id = temp[index]._id;
      });

      if (type === "2") {
        //randomize questions
        temp = this.shuffleArray(temp);
      }

      if (type === "4" || type === "2") {
        //randomize choices
        temp.forEach((item, index) => {
          if (
            item.questionType !== "Descriptive" &&
            item.questionType !== "Short Answer"
          ) {
            temp[index].questionChoices = this.shuffleArray(
              item.questionChoices
            );
          }
        });
      }

      this.setState({
        question: questionSet,
        gradeData: candidateReducer.grade[0],
      });
    }
  }

  componentWillUnmount() {
    this.props.candidateReducer.questionSet = null;
    this.props.candidateReducer.directStart = false;
    this.props.candidateReducer.grade = null;
    localStorage.clear();
  }

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  convertHtml = (data) => {
    const contentBlock = htmlToDraft(data);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return EditorState.createWithContent(contentState);
    }
  };

  back = () => {
    const { index } = this.state;
    if (index > 0) {
      this.setState({ index: index - 1 });
    }
  };

  next = () => {
    const { index, question, timeSettings, start_time } = this.state;
    if (index < question.length - 1) {
      this.setState({ index: index + 1 });
    }

    if (timeSettings === "2") {
      this.setState({ time: start_time });
      localStorage["time"] = start_time;
    }
  };

  submit = () => {
    const { question, assessmentID, gradeData } = this.state;

    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    let totalScore = 0; //total cand score
    let gradedNum = 0; //number of question marked
    let grade = "not graded";
    let tempUnit = "";
    let maxScore = 0; //total score

    //cal score
    question.forEach((item, index) => {
      maxScore = maxScore + item.score;
      if (
        item.questionType === "True or False" ||
        item.questionType === "Single Choice"
      ) {
        if (item.response === item.questionAnswers[0]) {
          totalScore = totalScore + item.score;
        }
        item.graded = true;
        gradedNum++;
      } else if (item.questionType === "Multiple Choice") {
        let numOfAns = item.questionAnswers.length;
        let currentLength = 0;

        if (item.response.length !== 0) {
          item.questionAnswers.forEach((ans, x) => {
            item.response.forEach((res, y) => {
              if (ans === res) currentLength++;
            });
          });
        }

        if (currentLength === numOfAns) {
          totalScore = totalScore + item.score;
        }
        item.graded = true;
        gradedNum++;
      } else if (item.questionType === "Order") {
        let numOfAns = item.questionAnswers.length;
        let correctNum = 0;

        if (item.response.length !== 0) {
          item.response.forEach((ele, x) => {
            let resIndex = parseInt(ele);
            if (item.questionChoices[x] === item.questionAnswers[resIndex]) {
              correctNum++;
            }
          });
        }

        if (correctNum === numOfAns) {
          totalScore = totalScore + item.score;
        }
        item.graded = true;
        gradedNum++;
      } else if (item.questionType === "Short Answer") {
        item.questionAnswers.forEach((ans, x) => {
          if (item.response === ans) {
            totalScore = totalScore + item.score;
          }
        });
        item.graded = true;
        gradedNum++;
      }
    });

    if (gradedNum === question.length) {
      if (gradeData.passOrFailSelected) {
        if (gradeData.unit === "points p.") tempUnit = "p";
        else tempUnit = "%";

        if (tempUnit === "%") {
          if (totalScore !== 0) totalScore = (totalScore / maxScore) * 100;
        }

        if (totalScore >= parseInt(gradeData.score)) grade = "PASS";
        else grade = "FAIL";

        totalScore = totalScore.toString() + " " + tempUnit;
      } else if (gradeData.addGradingSelected) {
        if (gradeData.gradeUnit === "points p.") tempUnit = "p";
        else tempUnit = "%";
        if (tempUnit === "%") {
          if (totalScore !== 0) totalScore = (totalScore / maxScore) * 100;
        }

        let tempRange = gradeData.gradeRange;
        if (tempRange[0] !== "0") tempRange.unshift("0");

        for (let i = 0; i < tempRange.length - 1; i++) {
          if (tempRange[i] === "0") {
            if (
              totalScore >= parseInt(tempRange[i]) &&
              totalScore <= parseInt(tempRange[i + 1])
            ) {
              grade = gradeData.gradeValue[i];
            }
          } else {
            if (
              totalScore >= parseInt(tempRange[i]) + 1 &&
              totalScore <= parseInt(tempRange[i + 1])
            ) {
              grade = gradeData.gradeValue[i];
            }
          }
        }

        totalScore = totalScore.toString() + " " + tempUnit;
      }
    }
    const data = {
      assessmentID: assessmentID,
      response: question,
      submissionDate: date + " " + time,
      totalScore: totalScore.toString(),
      grade: grade,
      maxScore: maxScore,
    };

    this.props.uploadCandidateResponses(data);
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.submit();
  };

  render() {
    const {
      question,
      index,
      orderCount,
      timeSettings,
      assessmentID,
      time,
      submitted,
      start_time,
    } = this.state;

    if (timeSettings === "1" && time === 0 && !submitted) {
      clearInterval(this.interval_id);
      this.setState({ submitted: true });
      this.submit();
    }

    if (timeSettings === "2" && time === 0) {
      if (index === question.length - 1 && !submitted) {
        clearInterval(this.interval_id);
        this.setState({ submitted: true });
        this.submit();
      }

      if (index < question.length - 1) {
        this.setState({ time: start_time, index: index + 1 });
        localStorage["time"] = start_time;
      }
    }

    let hours = Math.floor(time / (60 * 60));
    let minutes = Math.floor((time % (60 * 60)) / 60);
    let seconds = Math.ceil((time % (60 * 60)) % 60);

    if (this.props.candidateReducer.directStart) {
      this.props.history.push(`/assessment/start/${assessmentID}`);
    }

    if (this.props.candidateReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    if (question.length === 0) return false;

    return (
      <>
        <ScrollArrow />
        <CustomFullContainer>
          <CustomMidContainer>
            <form onSubmit={this.onSubmit} className={css(styles.con)}>
              <CustomColumn>
                <div
                  style={{ marginTop: "25px" }}
                  className={css(styles.countdownCon)}
                >
                  {timeSettings !== "3" && (
                    <div className={css(styles.countdown)}>
                      {hours}:{minutes}:{seconds}
                    </div>
                  )}
                </div>
                <div style={{ marginTop: "25px" }}>
                  <h4 className={css(styles.questionText)}>
                    Question {index + 1}
                  </h4>
                </div>
                <div>
                  <div style={{ marginBottom: "25px", marginTop: "15px" }}>
                    <CustomEditor
                      toolbarHidden={true}
                      readOnly={true}
                      heightAuto={true}
                      editorState={this.convertHtml(
                        question[index].questionDescription
                      )}
                    />
                  </div>

                  {question[index].questionType === "Single Choice" && (
                    <div style={{ marginBottom: "25px" }}>
                      {question[index].questionChoices.map((item, x) => {
                        return (
                          <div className={css(styles.choiceRow)}>
                            <CustomRow>
                              <div style={{ marginRight: "10px" }}>
                                <input
                                  type="checkbox"
                                  checked={question[index].checked[x]}
                                  className={css(styles.checkBox)}
                                  onChange={() => {
                                    let temp = question[index].checked;
                                    for (let i = 0; i < temp.length; i++) {
                                      temp[i] = false;
                                    }
                                    temp[x] = true;
                                    this.setState({
                                      question: [
                                        ...question.slice(0, index),
                                        {
                                          ...question[index],
                                          response:
                                            question[index].questionChoices[x],
                                          checked: temp,
                                        },
                                        ...question.slice(index + 1),
                                      ],
                                    });
                                  }}
                                />
                              </div>
                              <div style={{ width: "100%" }}>
                                <CustomEditor
                                  toolbarHidden={true}
                                  readOnly={true}
                                  heightAuto={true}
                                  editorState={this.convertHtml(item)}
                                />
                              </div>
                            </CustomRow>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {question[index].questionType === "Multiple Choice" && (
                    <div style={{ marginBottom: "25px" }}>
                      {question[index].questionChoices.map((item, x) => {
                        return (
                          <div className={css(styles.choiceRow)}>
                            <CustomRow>
                              <div style={{ marginRight: "10px" }}>
                                <input
                                  type="checkbox"
                                  checked={question[index].checked[x]}
                                  className={css(styles.checkBox)}
                                  onChange={(e) => {
                                    let temp = question[index].checked;
                                    temp[x] = e.target.checked;

                                    let array = [];
                                    temp.forEach((ele, y) => {
                                      if (ele)
                                        array.push(
                                          question[index].questionChoices[y]
                                        );
                                    });

                                    this.setState({
                                      question: [
                                        ...question.slice(0, index),
                                        {
                                          ...question[index],
                                          response: array,
                                          checked: temp,
                                        },
                                        ...question.slice(index + 1),
                                      ],
                                    });
                                  }}
                                />
                              </div>
                              <div style={{ width: "100%" }}>
                                <CustomEditor
                                  toolbarHidden={true}
                                  readOnly={true}
                                  heightAuto={true}
                                  editorState={this.convertHtml(item)}
                                />
                              </div>
                            </CustomRow>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {(question[index].questionType === "Descriptive" ||
                    question[index].questionType === "Short Answer") && (
                    <div style={{ marginBottom: "25px" }}>
                      <TextArea
                        type={"text"}
                        placeholder={"Enter your answer here"}
                        onChange={(e) => {
                          this.setState({
                            question: [
                              ...question.slice(0, index),
                              {
                                ...question[index],
                                response: e.target.value,
                              },
                              ...question.slice(index + 1),
                            ],
                          });
                        }}
                        value={question[index].response}
                        maxLength={
                          question[index].questionType === "Short Answer"
                            ? 25
                            : 255
                        }
                      />
                    </div>
                  )}

                  {question[index].questionType === "True or False" && (
                    <div style={{ marginBottom: "25px" }}>
                      {question[index].questionChoices.map((item, x) => {
                        return (
                          <div
                            className={css(styles.tfRow, styles.noSelect)}
                            onClick={() => {
                              this.setState({
                                question: [
                                  ...question.slice(0, index),
                                  {
                                    ...question[index],
                                    response: item,
                                  },
                                  ...question.slice(index + 1),
                                ],
                              });
                            }}
                            style={{
                              backgroundColor:
                                question[index].response === item
                                  ? configStyles.colors.correctGreen
                                  : "inherit",
                            }}
                          >
                            {item}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {question[index].questionType === "Order" && (
                    <div style={{ marginBottom: "25px" }}>
                      {question[index].questionChoices.map((item, x) => {
                        return (
                          <div className={css(styles.choiceRow)}>
                            <CustomRow>
                              <div
                                className={css(
                                  styles.countBox,
                                  styles.noSelect
                                )}
                                onClick={() => {
                                  let temp =
                                    question[index].response === ""
                                      ? []
                                      : question[index].response;

                                  temp[x] = orderCount.toString();

                                  if (
                                    orderCount <
                                    question[index].questionChoices.length - 1
                                  ) {
                                    this.setState({
                                      orderCount: orderCount + 1,
                                    });
                                  } else this.setState({ orderCount: 0 });

                                  this.setState({
                                    question: [
                                      ...question.slice(0, index),
                                      {
                                        ...question[index],
                                        response: temp,
                                      },
                                      ...question.slice(index + 1),
                                    ],
                                  });
                                }}
                              >
                                {question[index].response[x] !== undefined
                                  ? parseInt(question[index].response[x]) + 1
                                  : question[index].response[x]}
                              </div>
                              <div style={{ width: "100%" }}>
                                <CustomEditor
                                  toolbarHidden={true}
                                  readOnly={true}
                                  heightAuto={true}
                                  editorState={this.convertHtml(item)}
                                />
                              </div>
                            </CustomRow>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className={css(styles.buttonRowCon)}>
                  <CustomRow>
                    {timeSettings !== "2" && (
                      <div style={{ marginRight: "15px" }}>
                        <Button
                          backgroundColor={configStyles.colors.darkBlue}
                          color={configStyles.colors.white}
                          padding={"8px"}
                          width={"75px"}
                          type={"button"}
                          onClick={this.back}
                        >
                          Back
                        </Button>
                      </div>
                    )}
                    <div style={{ marginRight: "15px" }}>
                      <Button
                        backgroundColor={configStyles.colors.darkBlue}
                        color={configStyles.colors.white}
                        padding={"8px"}
                        width={"75px"}
                        type={"button"}
                        onClick={this.next}
                      >
                        Next
                      </Button>
                    </div>
                    <div>
                      {question.length - 1 === index && (
                        <Button
                          backgroundColor={configStyles.colors.darkBlue}
                          color={configStyles.colors.white}
                          padding={"8px"}
                          width={"75px"}
                          type={"submit"}
                        >
                          Submit
                        </Button>
                      )}
                    </div>
                  </CustomRow>
                </div>
              </CustomColumn>
            </form>
          </CustomMidContainer>
        </CustomFullContainer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  con: {
    width: "100%",
  },
  questionText: {
    fontFamily: "Ubuntu-bold",
    fontColor: configStyles.colors.black,
  },
  buttonRowCon: {
    width: "100%",
    display: "flex",
    marginBottom: "100px",
  },
  tfRow: {
    width: "100%",
    border: "2px solid",
    borderColor: configStyles.colors.black,
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "25px",
  },
  noSelect: {
    userSelect:
      "none" /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */,
    webkitTouchCallout: "none" /* iOS Safari */,
    webkitUserSelect: "none" /* Safari */,
    khtmlUserSelect: "none" /* Konqueror HTML */,
    mozUserSelect: "none" /* Old versions of Firefox */,
    msUserSelect: "none" /* Internet Explorer/Edge */,
  },
  choiceRow: {
    width: "100%",
    display: "flex",
    marginBottom: "25px",
  },
  checkBox: {
    width: "20px",
    height: "26px",
  },
  countBox: {
    backgroundColor: configStyles.colors.lightGrey,
    border: "2px solid",
    borderRadius: "5px",
    borderColor: configStyles.colors.black,
    marginRight: "15px",
    width: "100px",
    height: "70px",
    cursor: "pointer",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Ubuntu-bold",
    display: "flex",
  },
  countdownCon: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    height: "auto",
  },
  countdown: {
    border: "2px solid",
    borderColor: configStyles.colors.darkBlue,
    padding: "10px",
    borderRadius: "5px",
  },
});

AttemptContainer.propTypes = {
  candidateReducer: PropTypes.object.isRequired,
  fetchAssessmentSetForCandidate: PropTypes.func.isRequired,
  fetchAllQuestionForCandidate: PropTypes.func.isRequired,
  uploadCandidateResponses: PropTypes.func.isRequired,
  fetchGrades: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  candidateReducer: state.candidateReducer,
});

export default connect(mapStateToProps, {
  fetchAssessmentSetForCandidate,
  fetchAllQuestionForCandidate,
  uploadCandidateResponses,
  fetchGrades,
})(AttemptContainer);
