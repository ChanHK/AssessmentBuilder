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
      randomQuestionNum: "", // question number in a set
      totalQuestionNumber: 0, // total questions in Question section
      definedTakeFromSectionSelected: false, //take questions from diff sections
      manualRandomSelected: false, // does the set questions choices need to randomize?
      sectionFilterNum: [], //stores the number of questions that will be filter out from each sections (array)
      assessmentID: props.assessmentID,
      type: props.type,
      questions: [], //separated based on sections (array of array of obj)
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
        randomQuestionNum: randomQuestionNum.toString(),
        sectionFilterNum: sectionFilterNum,
      });
    }

    if (
      prevProps.assessmentQuestionReducer !== assessmentQuestionReducer &&
      assessmentQuestionReducer.assessmentQuestionLoad !== null
    ) {
      // find biggest section number
      let biggest = 0;
      assessmentQuestionReducer.assessmentQuestionLoad.forEach(
        (item, index) => {
          if (item.section > biggest) biggest = item.section;
        }
      );

      //create 2d array container
      let tempQuestions = [];
      for (let i = 0; i < biggest; i++) tempQuestions.push([]);

      assessmentQuestionReducer.assessmentQuestionLoad.forEach((x, index) => {
        tempQuestions[x.section - 1].push(x);
      });

      let tempArray = [];
      for (let i = 0; i < tempQuestions.length; i++) tempArray.push("");

      const { sectionFilterNum } = this.state;
      if (tempQuestions.length !== sectionFilterNum.length) {
        this.setState({ sectionFilterNum: tempArray });
      } else {
        this.setState({
          sectionFilterNum:
            sectionFilterNum.length === 0 ? tempArray : sectionFilterNum,
        });
      }

      this.setState({
        questions: tempQuestions,
        totalQuestionNumber:
          assessmentQuestionReducer.assessmentQuestionLoad.length,
      });
    }
  }

  componentWillUnmount() {
    this.props.assessmentReducer.assessmentLoad = null;
    this.props.assessmentQuestionReducer.assessmentQuestionLoad = null;
  }

  validateForm = () => {
    const {
      totalQuestionNumber,
      randomQuestionNum,
      randomTakeFromTotalSelected,
      definedTakeFromSectionSelected,
      questions,
      sectionFilterNum,
    } = this.state;
    let tempMsg = {};

    if (randomTakeFromTotalSelected) {
      if (randomQuestionNum === "") {
        tempMsg.QN = "Please enter number of questions";
      } else if (!/^\d+$/.test(randomQuestionNum)) {
        tempMsg.QN = "Please enter digits only";
      } else if (
        !(
          parseInt(randomQuestionNum) > 0 &&
          parseInt(randomQuestionNum) <= totalQuestionNumber
        )
      ) {
        if (totalQuestionNumber === 0) {
          tempMsg.QN = "Please create questions first in the question section";
        } else {
          tempMsg.QN = `Please enter digits between 1 and ${totalQuestionNumber}`;
        }
      }
    }

    if (definedTakeFromSectionSelected) {
      let error = [];
      if (questions.length === 0) {
        tempMsg.M = "Please create questions in question section";
      }
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
      if (tempMsg.section !== undefined) {
        tempMsg.section.forEach((item, index) => {
          if (item === "") {
            count++; //check is there any error
          }
        });
        if (count === tempMsg.section.length) {
          tempMsg = {};
        }
      }
    }

    this.setState({ msg: tempMsg });
    if (Object.keys(tempMsg).length === 0) return true;
    else return false;
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

    if (this.validateForm()) {
      const set = {
        fixedSelected: fixedSelected,
        randomSelected: randomSelected,
        manualSelected: manualSelected,
        manualRandomSelected: manualRandomSelected,
        assessmentID: assessmentID,
        randomTakeFromTotalSelected: randomTakeFromTotalSelected,
        definedTakeFromSectionSelected: definedTakeFromSectionSelected,
        randomQuestionNum:
          randomQuestionNum !== "" ? parseInt(randomQuestionNum) : 0,
        sectionFilterNum: sectionFilterNum,
      };
      this.props.updateAssessmentSet(set);
    }
  };

  render() {
    const {
      fixedSelected,
      randomSelected,
      manualSelected,
      randomTakeFromTotalSelected,
      randomQuestionNum,
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
                          randomTakeFromTotalSelected: false,
                          randomQuestionNum: 0,
                          definedTakeFromSectionSelected: false,
                          sectionFilterNum: [],
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
                          randomTakeFromTotalSelected: false,
                          randomQuestionNum: 0,
                          definedTakeFromSectionSelected: false,
                          sectionFilterNum: [],
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
                              randomQuestionNum: "",
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
                          this.setState({ randomQuestionNum: e.target.value })
                        }
                        value={randomQuestionNum}
                        placeholder={"Enter number of questions"}
                        readOnly={type === "view" ? true : false}
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
                    {questions.length === 0 ? (
                      <span className={css(styles.redText)}>
                        Please create questions in the question section
                      </span>
                    ) : (
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
                                    readOnly={type === "view" ? true : false}
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
                    )}
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
          <>
            <span className={css(styles.redText)}>
              {msg === null
                ? null
                : msg.hasOwnProperty("M")
                ? "*" + msg.M
                : null}
            </span>
            <div>
              <Button
                backgroundColor={configStyles.colors.darkBlue}
                color={configStyles.colors.white}
                padding={"8px"}
                width={"100px"}
                type={"submit"}
              >
                Save
              </Button>
            </div>
          </>
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
    maxWidth: "400px",
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
