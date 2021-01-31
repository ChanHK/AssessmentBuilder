import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite";
import "../../css/general.css";
import * as configStyles from "../../config/styles";

import Radio from "../../components/Radio";
import CustomInput from "../../components/CustomInput";
import CustomSwitch from "../../components/CustomSwitch";
import Button from "../../components/Button";
import LoaderSpinner from "../../components/LoaderSpinner";

import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateAssessmentSet,
  fetchAssessmentSet,
} from "../../actions/assessment.actions";
import { fetchAllAssessmentQuestion } from "../../actions/assessmentQuestion.actions";

class SetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedSelected: false,
      randomSelected: false,
      manualSelected: true,
      randomTakeFromTotalSelected: false,
      questionNum: "", // question number in a set
      totalQuestionNumber: 0, // total questions in Question section
      definedTakeFromSectionSelected: false, //take questions from diff sections
      manualRandomSelected: false, // does the set questions choices need to randomize?
      sectionFilterNum: [], //stores the number of questions that will be filter out from each sections (array)
      assessmentID: props.assessmentID,
      type: props.type,

      questions: [], //separated based on sections (array of array of obj)
      questionsAllID: [], //questions ID of all questions (array)
      questionsAllIDSection: [], //questions ID of all questions but with section (array of array)

      msg: null, //stores error messages
    };
  }

  componentDidMount() {
    const data = {
      assessmentID: this.state.assessmentID,
    };

    this.props.fetchAssessmentSet(data);
    this.props.fetchAllAssessmentQuestion(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const { assessmentReducer, assessmentQuestionReducer } = this.props;

    if (
      prevProps.assessmentReducer !== assessmentReducer &&
      assessmentReducer.assessmentLoad !== null
    ) {
      const {
        fixedSelected,
        randomSelected,
        manualSelected,
        manualRandomSelected,
        randomTakeFromTotalSelected,
        definedTakeFromSectionSelected,
        randomQuestionNum,
        sectionFilterNum,
      } = assessmentReducer.assessmentLoad;

      this.setState({
        fixedSelected: fixedSelected,
        randomSelected: randomSelected,
        manualSelected: manualSelected,
        manualRandomSelected: manualRandomSelected,
        randomTakeFromTotalSelected: randomTakeFromTotalSelected,
        definedTakeFromSectionSelected: definedTakeFromSectionSelected,
        randomQuestionNum: randomQuestionNum,
        sectionFilterNum: sectionFilterNum,
      });
    }

    if (
      prevProps.assessmentQuestionReducer !== assessmentQuestionReducer &&
      assessmentQuestionReducer.assessmentQuestionLoad !== null
    ) {
      let biggest = 0;

      assessmentQuestionReducer.assessmentQuestionLoad.forEach(
        (item, index) => {
          if (item.section > biggest) biggest = item.section;
        }
      );

      let tempQuestions = [];
      let questionsAllIDSection = [];
      for (let i = 0; i < biggest; i++) {
        tempQuestions.push([]);
        questionsAllIDSection.push([]);
      }

      let questionsAllID = [];
      assessmentQuestionReducer.assessmentQuestionLoad.forEach((x, index) => {
        tempQuestions[x.section - 1].push(x);
        questionsAllIDSection[x.section - 1].push(x._id);
        questionsAllID.push(x._id);
      });

      let tempArray = [];

      for (let i = 0; i < tempQuestions.length; i++) {
        tempArray.push("");
      }

      this.setState({
        questions: tempQuestions,
        sectionFilterNum: tempArray,
        totalQuestionNumber:
          assessmentQuestionReducer.assessmentQuestionLoad.length,
        questionsAllID: questionsAllID,
        questionsAllIDSection: questionsAllIDSection,
      });
    }
  }

  componentWillUnmount() {
    this.props.assessmentReducer.assessmentLoad = null;
    this.props.assessmentQuestionReducer.assessmentQuestionLoad = null;
  }

  validateGenerationInput = () => {
    const {
      totalQuestionNumber,
      questionNum,
      randomTakeFromTotalSelected,
      definedTakeFromSectionSelected,
      questions,
      sectionFilterNum,
    } = this.state;
    let tempMsg = {};

    if (randomTakeFromTotalSelected) {
      if (questionNum === "") {
        tempMsg.QN = "Please enter number of questions";
      } else if (!/^\d+$/.test(questionNum)) {
        tempMsg.QN = "Please enter digits only";
      } else if (
        !(
          parseInt(questionNum) > 0 &&
          parseInt(questionNum) <= totalQuestionNumber
        )
      ) {
        tempMsg.QN = `Please enter digits between 1 and ${totalQuestionNumber}`;
      }
    }

    if (definedTakeFromSectionSelected) {
      let error = [];
      sectionFilterNum.forEach((item, index) => {
        if (item === "") {
          error.push("Please fill up");
          tempMsg.section = error;
        } else if (!/^\d+$/.test(item)) {
          error.push("Please enter digits only");
          tempMsg.section = error;
        } else if (
          !(parseInt(item) >= 0 && parseInt(item) <= questions[index].length)
        ) {
          error.push(
            `Please enter digits between 0 and ${questions[index].length}`
          );
          tempMsg.section = error;
        } else {
          error.push("");
          tempMsg.section = error;
        }
      });

      let count = 0;
      tempMsg.section.forEach((item, index) => {
        if (item === "") {
          count++; //check is there any error
        }
      });
      if (count === tempMsg.section.length) {
        tempMsg = {};
      }
    }

    this.setState({ msg: tempMsg });
    if (Object.keys(tempMsg).length === 0) this.generateSetButtonClick();
  };

  generateSetButtonClick = () => {
    const {
      totalQuestionNumber,
      sectionFilterNum,
      definedTakeFromSectionSelected,
      randomTakeFromTotalSelected,
      questionNum,
      questionsAllID,
      questionsAllIDSection,
    } = this.state;

    if (totalQuestionNumber > 0) {
      if (definedTakeFromSectionSelected) {
        let generated = [];

        questionsAllIDSection.forEach((item, index) => {
          generated.push(
            this.getRandom(item, parseInt(sectionFilterNum[index]))
          );
        });

        let temp = [];
        generated.forEach((item, index) => {
          temp = temp.concat(item);
        });

        let temp2 = [...this.state.generatedSets];
        temp2.push(temp);

        while (temp2.length > 10) {
          temp2.pop();
        }

        this.setState({ generatedSets: temp2 });
      }

      if (randomTakeFromTotalSelected) {
        let array2D = [];
        for (let i = 0; i < 100000; i++) {
          let generated = [];
          generated.push(this.getRandom(questionsAllID, questionNum));

          let temp3 = [];
          generated.forEach((item, index) => {
            temp3 = temp3.concat(item);
          });
          array2D.push(temp3);
        }

        let temp4 = [...this.state.generatedSets];
        array2D.forEach((item, index) => {
          temp4.push(item);
        });

        while (temp4.length > 10) {
          temp4.pop();
        }

        this.setState({ generatedSets: temp4 });
      }
    }
  };

  getRandom = (arr, n) => {
    let result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      fixedSelected,
      randomSelected,
      manualSelected,
      manualRandomSelected,
      assessmentID,
      randomTakeFromTotalSelected,
      definedTakeFromSectionSelected,
      randomQuestionNum,
      sectionFilterNum,
    } = this.state;

    const set = {
      fixedSelected: fixedSelected,
      randomSelected: randomSelected,
      manualSelected: manualSelected,
      manualRandomSelected: manualRandomSelected,
      assessmentID: assessmentID,
      randomTakeFromTotalSelected: randomTakeFromTotalSelected,
      definedTakeFromSectionSelected: definedTakeFromSectionSelected,
      randomQuestionNum: randomQuestionNum,
      sectionFilterNum: sectionFilterNum,
    };

    this.props.updateAssessmentSet(set);
  };

  render() {
    const {
      fixedSelected,
      randomSelected,
      manualSelected,
      randomTakeFromTotalSelected,
      questionNum,
      totalQuestionNumber,
      definedTakeFromSectionSelected,
      manualRandomSelected,
      questions,
      sectionFilterNum,
      type,
      msg,
    } = this.state;

    const { assessmentReducer, assessmentQuestionReducer } = this.props;

    if (assessmentReducer.isLoading || assessmentQuestionReducer.isLoading) {
      return <LoaderSpinner />;
    } else document.body.style.overflow = "unset";

    return (
      <form onSubmit={this.onSubmit} style={{ marginBottom: "100px" }}>
        <SecondLabel>Question Order and Assessment Set Generation</SecondLabel>
        <div className={css(styles.bar)}>
          <CustomColumn>
            <CustomRow>
              <div className={css(styles.radionCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Radio
                    checked={fixedSelected}
                    onChange={(e) => {
                      if (type !== "view") {
                        this.setState({
                          fixedSelected: e.target.checked,
                          randomSelected: false,
                          manualSelected: false,
                          manualRandomSelected: false,
                        });
                      }
                    }}
                  />
                </div>
                <ThirdLabel>Fixed order of questions and choices</ThirdLabel>
              </div>
            </CustomRow>
            <CustomRow>
              <div className={css(styles.radionCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Radio
                    checked={randomSelected}
                    onChange={(e) => {
                      if (type !== "view") {
                        this.setState({
                          randomSelected: e.target.checked,
                          fixedSelected: false,
                          manualSelected: false,
                          manualRandomSelected: false,
                        });
                      }
                    }}
                  />
                </div>
                <ThirdLabel>Random order of questions and choices</ThirdLabel>
              </div>
            </CustomRow>
            <CustomRow>
              <div className={css(styles.radionCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Radio
                    checked={manualSelected}
                    onChange={(e) => {
                      if (type !== "view") {
                        this.setState({
                          manualSelected: e.target.checked,
                          fixedSelected: false,
                          randomSelected: false,
                          manualRandomSelected: true,
                        });
                      }
                    }}
                  />
                </div>
                <ThirdLabel>Define sets manually</ThirdLabel>
              </div>
            </CustomRow>
          </CustomColumn>
        </div>
        {manualSelected && (
          <>
            <SecondLabel>Create Assessment Sets</SecondLabel>
            <div className={css(styles.bar)}>
              <CustomColumn>
                <CustomRow>
                  <div className={css(styles.radionCon)}>
                    <div style={{ paddingRight: "20px" }}>
                      <Radio
                        checked={randomTakeFromTotalSelected}
                        onChange={(e) => {
                          if (type !== "view") {
                            this.setState({
                              randomTakeFromTotalSelected: e.target.checked,
                              definedTakeFromSectionSelected: false,
                              manualRandomSelected: e.target.checked,
                            });
                          }
                        }}
                      />
                    </div>
                    <ThirdLabel>
                      Filter out questions randomly based on total questions
                    </ThirdLabel>
                  </div>
                </CustomRow>
                {randomTakeFromTotalSelected && (
                  <div className={css(styles.block)}>
                    <CustomColumn>
                      <ThirdLabel>
                        Number of questions (total {totalQuestionNumber})
                      </ThirdLabel>
                      <CustomInput
                        type={"text"}
                        onChangeValue={(e) =>
                          this.setState({ questionNum: e.target.value })
                        }
                        value={questionNum}
                        placeholder={"Enter number of questions"}
                      />
                      <span className={css(styles.redText)}>
                        {msg === null
                          ? null
                          : msg.hasOwnProperty("QN")
                          ? "*" + msg.QN
                          : null}
                      </span>
                    </CustomColumn>
                  </div>
                )}
                <CustomRow>
                  <div className={css(styles.radionCon)}>
                    <div style={{ paddingRight: "20px" }}>
                      <Radio
                        checked={definedTakeFromSectionSelected}
                        onChange={(e) => {
                          if (type !== "view") {
                            this.setState({
                              definedTakeFromSectionSelected: e.target.checked,
                              randomTakeFromTotalSelected: false,
                              manualRandomSelected: e.target.checked,
                            });
                          }
                        }}
                      />
                    </div>
                    <ThirdLabel>Filter questions based on sections</ThirdLabel>
                  </div>
                </CustomRow>
                {definedTakeFromSectionSelected && (
                  <div className={css(styles.sectionCon)}>
                    <CustomColumn>
                      {questions.map((value, index) => (
                        <div style={{ marginBottom: "15px" }} key={index}>
                          <ThirdLabel textDecoration={"underline"}>
                            Section {index + 1}
                          </ThirdLabel>
                          <CustomColumn>
                            <CustomRow>
                              <div className={css(styles.text)}>
                                <ThirdLabel>Select</ThirdLabel>
                              </div>
                              <div style={{ width: "100px" }}>
                                <CustomInput
                                  type={"text"}
                                  onChangeValue={(e) => {
                                    this.setState({
                                      sectionFilterNum: [
                                        ...sectionFilterNum.slice(0, index),
                                        e.target.value,
                                        ...sectionFilterNum.slice(index + 1),
                                      ],
                                    });
                                  }}
                                  value={sectionFilterNum[index]}
                                />
                              </div>
                              <div className={css(styles.text)}>
                                <ThirdLabel>
                                  out of {value.length} questions
                                </ThirdLabel>
                              </div>
                            </CustomRow>
                            <span className={css(styles.redText)}>
                              {msg === null
                                ? null
                                : msg.hasOwnProperty("section")
                                ? msg.section[index] !== ""
                                  ? "*" + msg.section[index]
                                  : null
                                : null}
                            </span>
                          </CustomColumn>
                        </div>
                      ))}
                    </CustomColumn>
                  </div>
                )}
              </CustomColumn>
              <CustomRow>
                <CustomSwitch
                  onChange={(e) => {
                    if (type !== "view") {
                      this.setState({ manualRandomSelected: e });
                    }
                  }}
                  checked={manualRandomSelected}
                />
                <div style={{ marginLeft: "15px" }}>
                  <ThirdLabel>
                    Randomize the choices for each questions during test
                  </ThirdLabel>
                </div>
              </CustomRow>
            </div>
          </>
        )}
        {type !== "view" && (
          <div>
            <CustomColumn>
              <Button
                backgroundColor={configStyles.colors.darkBlue}
                color={configStyles.colors.white}
                padding={"8px"}
                width={"100px"}
                type={"submit"}
              >
                Save
              </Button>
              <span className={css(styles.redText)}>
                {msg === null
                  ? null
                  : msg.hasOwnProperty("setLength")
                  ? "*" + msg.setLength
                  : null}
              </span>
            </CustomColumn>
          </div>
        )}
      </form>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    width: "100%",
    padding: "20px 20px",
    border: "2px solid",
    borderRadius: "5px",
    borderColor: configStyles.colors.black,
    marginBottom: "50px",
  },
  radionCon: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    marginBottom: "20px",
  },
  block: {
    flexWrap: "nowrap",
    width: "400px",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "45px",
    marginBottom: "25px",
  },
  text: {
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
    padding: 9,
  },
  sectionCon: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  redText: {
    color: configStyles.colors.inputErrorRed,
    fontFamily: "Ubuntu-Regular",
    fontSize: "15px",
  },
});

SetContainer.propTypes = {
  updateAssessmentSet: PropTypes.func.isRequired,
  fetchAssessmentSet: PropTypes.func.isRequired,
  fetchAllAssessmentQuestion: PropTypes.func.isRequired,
  assessmentReducer: PropTypes.object.isRequired,
  assessmentQuestionReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  assessmentReducer: state.assessmentReducer,
  assessmentQuestionReducer: state.assessmentQuestionReducer,
});

export default connect(mapStateToProps, {
  updateAssessmentSet,
  fetchAssessmentSet,
  fetchAllAssessmentQuestion,
})(SetContainer);
