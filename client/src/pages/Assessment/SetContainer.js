import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite";
import "../../css/general.css";
import * as configStyles from "../../config/styles";

import Radio from "../../components/Radio";
import Wrapper from "../../components/Wrapper";
import CustomInput from "../../components/CustomInput";
import CustomDropdown from "../../components/CustomDropdown";
import CustomSwitch from "../../components/CustomSwitch";
import Table from "../../components/Table";
import TableButton from "../../components/TableButton";
import Button from "../../components/Button";
import LoaderSpinner from "../../components/LoaderSpinner";

import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateAssessmentSet,
  fetchAssessmentSet,
} from "../../actions/assessment.actions";
import { fetchAllAssessmentQuestion } from "../../actions/assessmentQuestion.actions";
import {
  updateAssessmentSetQuestionID,
  fetchAssessmentSetQuestionID,
} from "../../actions/assessmentSet.actions";

const dropdownData = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

class SetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedSelected: false,
      randomSelected: false,
      manualSelected: true,
      randomTakeFromTotalSelected: false,
      questionNum: "", // question number in a set
      setNum: "", // number of set that will be generated
      totalQuestionNumber: 0, // total questions in Question section
      definedTakeFromSectionSelected: false, //take questions from diff sections
      manualRandomSelected: false, // does the set questions choices need to randomize?
      sectionFilterNum: [], //stores the number of questions that will be filter out from each sections (array)
      assessmentID: props.assessmentID,
      type: props.type,

      questions: [], //separated based on sections (array of array of obj)
      questionsAllID: [], //questions ID of all questions (array)
      questionsAllIDSection: [], //questions ID of all questions but with section (array of array)
      generatedSets: [], //(array)

      msg: null, //stores error messages
    };
  }

  componentDidMount() {
    const data = {
      assessmentID: this.state.assessmentID,
    };

    this.props.fetchAssessmentSet(data);
    this.props.fetchAllAssessmentQuestion(data);
    this.props.fetchAssessmentSetQuestionID(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      assessmentReducer,
      assessmentQuestionReducer,
      assessmentSetReducer,
    } = this.props;

    if (
      prevProps.assessmentReducer !== assessmentReducer &&
      assessmentReducer.assessmentLoad !== null &&
      assessmentReducer.message === undefined
    ) {
      const {
        fixedSelected,
        randomSelected,
        manualSelected,
        manualRandomSelected,
      } = assessmentReducer.assessmentLoad;

      this.setState({
        fixedSelected: fixedSelected,
        randomSelected: randomSelected,
        manualSelected: manualSelected,
        manualRandomSelected: manualRandomSelected,
      });
    }

    if (
      prevProps.assessmentSetReducer !== assessmentSetReducer &&
      assessmentSetReducer.assessmentSetLoad !== null &&
      assessmentSetReducer.message === undefined
    ) {
      const { assessmentSetLoad } = assessmentSetReducer;
      this.setState({ generatedSets: assessmentSetLoad });
    }

    if (
      prevProps.assessmentQuestionReducer !== assessmentQuestionReducer &&
      assessmentQuestionReducer.assessmentQuestionLoad !== null &&
      assessmentQuestionReducer.message === undefined
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

      this.setState({
        questions: tempQuestions,
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
    this.props.assessmentSetReducer.assessmentSetLoad = null;
  }

  validateGenerationInput = () => {
    const { totalQuestionNumber, setNum, questionNum } = this.state;
    let tempMsg = {};

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

    if (setNum === "") {
      tempMsg.QS = "Please select number of sets";
    }

    this.setState({ msg: tempMsg });
    // if (Object.keys(tempMsg).length === 0) this.generateSetButtonClick();
  };

  generateSetButtonClick = () => {
    const {
      totalQuestionNumber,
      sectionFilterNum,
      definedTakeFromSectionSelected,
      randomTakeFromTotalSelected,
      setNum,
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

        this.setState({ generatedSets: temp2 });
      }

      if (randomTakeFromTotalSelected) {
        let array2D = [];
        for (let i = 0; i < setNum; i++) {
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

  onChangeSectionFilterNum = (e, index) => {
    this.setState({
      sectionFilterNum: [
        ...this.state.sectionFilterNum.slice(0, index),
        e.target.value,
        ...this.state.sectionFilterNum.slice(index + 1),
      ],
    });
  };

  generateSetData = () => {
    const { generatedSets } = this.state;
    const { assessmentQuestionLoad } = this.props.assessmentQuestionReducer;

    let temp = [];
    if (generatedSets.length > 0) {
      generatedSets.forEach((item, index) => {
        let score = 0;
        let count = 0;
        item.forEach((item12, index12) => {
          assessmentQuestionLoad.forEach((item2, index2) => {
            if (item12 === item2._id) {
              score = score + item2.score;
              count++;
            }
          });
        });
        temp.push({
          totalQuestions: count,
          maxScore: score,
          id: uuidv4(),
        });
      });
      temp.forEach((x, index) => {
        x.serial = index + 1;
      });
      return temp;
    } else return [];
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      fixedSelected,
      randomSelected,
      manualSelected,
      manualRandomSelected,
      assessmentID,
      generatedSets,
    } = this.state;

    const set = {
      fixedSelected: fixedSelected,
      randomSelected: randomSelected,
      manualSelected: manualSelected,
      manualRandomSelected: manualRandomSelected,
      assessmentID: assessmentID,
      totalSetNum: generatedSets.length,
    };

    const setQuestionID = {
      assessmentID: assessmentID,
      generatedSets: generatedSets,
    };

    this.props.updateAssessmentSet(set);
    this.props.updateAssessmentSetQuestionID(setQuestionID);
  };

  render() {
    const {
      fixedSelected,
      randomSelected,
      manualSelected,
      randomTakeFromTotalSelected,
      questionNum,
      totalQuestionNumber,
      setNum,
      definedTakeFromSectionSelected,
      manualRandomSelected,
      questions,
      sectionFilterNum,
      type,
      msg,
    } = this.state;

    const column = [
      {
        name: "Set",
        selector: "serial",
        cell: (row) => (
          <div>
            <div style={{ fontSize: "15px", fontFamily: "Ubuntu-Regular" }}>
              {row.serial}
            </div>
          </div>
        ),
        width: "50px",
      },
      {
        name: "Total questions",
        selector: "totalQuestions",
        cell: (row) => (
          <div>
            <div style={{ fontSize: "15px", fontFamily: "Ubuntu-Regular" }}>
              {row.totalQuestions}
            </div>
          </div>
        ),
      },
      {
        name: "Max Score",
        selector: "maxScore",
        cell: (row) => (
          <div>
            <div style={{ fontSize: "15px", fontFamily: "Ubuntu-Regular" }}>
              {row.maxScore}
            </div>
          </div>
        ),
      },
      {
        name: "Action",
        selector: "serial",
        cell: (row) => (
          <CustomRow>
            {type !== "view" && (
              <TableButton
                onClick={() => {
                  let temp = [...this.state.generatedSets];
                  temp.splice(row.serial - 1, 1);
                  this.setState({ generatedSets: temp });
                }}
              >
                Delete
              </TableButton>
            )}
          </CustomRow>
        ),
      },
    ];

    const {
      assessmentReducer,
      assessmentQuestionReducer,
      assessmentSetReducer,
    } = this.props;

    if (
      assessmentReducer.isLoading ||
      assessmentQuestionReducer.isLoading ||
      assessmentSetReducer.isLoading
    )
      return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    const setData = this.generateSetData();

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
                  <div style={{ marginLeft: "45px", marginBottom: "25px" }}>
                    <Wrapper
                      firstHeight={"100px"}
                      secHeight={"200px"}
                      widthChange={1400}
                    >
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
                      <div className={css(styles.block)}>
                        <CustomColumn>
                          <ThirdLabel>Number of sets</ThirdLabel>
                          <CustomDropdown
                            options={dropdownData}
                            placeholder={"Select number of sets"}
                            value={setNum}
                            onChange={(e) => this.setState({ setNum: e.value })}
                            disabled={type === "view" ? true : false}
                          />
                          <span className={css(styles.redText)}>
                            {msg === null
                              ? null
                              : msg.hasOwnProperty("QS")
                              ? "*" + msg.QS
                              : null}
                          </span>
                        </CustomColumn>
                      </div>
                    </Wrapper>
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
                          <CustomRow>
                            <div className={css(styles.text)}>
                              <ThirdLabel>Select</ThirdLabel>
                            </div>
                            <div style={{ width: "100px" }}>
                              <CustomInput
                                type={"text"}
                                onChangeValue={(e) =>
                                  this.onChangeSectionFilterNum(e, index)
                                }
                                value={sectionFilterNum[index]}
                              />
                            </div>
                            <div className={css(styles.text)}>
                              <ThirdLabel>
                                out of {value.length} questions
                              </ThirdLabel>
                            </div>
                          </CustomRow>
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
              {type !== "view" && (
                <Button
                  backgroundColor={configStyles.colors.darkBlue}
                  color={configStyles.colors.white}
                  padding={"8px"}
                  type={"button"}
                  onClick={this.validateGenerationInput}
                >
                  Generate
                </Button>
              )}
            </div>

            <div style={{ marginTop: 20 }}>
              <SecondLabel>Sets</SecondLabel>
              <Table data={setData} columns={column} />
            </div>
          </>
        )}
        {type !== "view" && (
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
  updateAssessmentSetQuestionID: PropTypes.func.isRequired,
  fetchAllAssessmentQuestion: PropTypes.func.isRequired,
  fetchAssessmentSetQuestionID: PropTypes.func.isRequired,
  assessmentReducer: PropTypes.object.isRequired,
  assessmentQuestionReducer: PropTypes.object.isRequired,
  assessmentSetReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  assessmentReducer: state.assessmentReducer,
  assessmentQuestionReducer: state.assessmentQuestionReducer,
  assessmentSetReducer: state.assessmentSetReducer,
});

export default connect(mapStateToProps, {
  updateAssessmentSet,
  fetchAssessmentSet,
  fetchAllAssessmentQuestion,
  fetchAssessmentSetQuestionID,
  updateAssessmentSetQuestionID,
})(SetContainer);
