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

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateAssessmentSet,
  fetchAssessmentSet,
} from "../../actions/assessment.actions";
import { fetchAllAssessmentQuestion } from "../../actions/assessmentQuestion.actions";

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
      sectionFilterNum: [], //stores the number of questions that will be filter out from each sections
      assessmentID: props.assessmentID,
      type: props.type,

      questions: [], //separated based on sections
      questionsAllID: [], //questions ID of all questions
      questionsAllIDSection: [], //questions ID of all questions but with section
      generatedSets: [],

      //stores all the sets or questions
      sets: [],
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
  }

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
      generatedSets,
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

        let temp2 = generatedSets;
        temp2.push(temp);
        this.setState({ generatedSets: temp2 });
      }

      if (randomTakeFromTotalSelected) {
        for (let i = 0; i < parseInt(setNum); i++) {
          let generated = [];
          generated.push(this.getRandom(questionsAllID, questionNum));
          let temp3 = generatedSets;
          temp3.push(generated);
          this.setState({ generatedSets: temp3 });
        }
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

  onChangeQuestionNum = (e) => {
    const val = e.target.value;
    const max = 100;
    const maxLength = max.toString().length - 1;
    const newVal =
      val < max ? val : parseInt(val.toString().substring(0, maxLength));
    this.setState({ questionNum: newVal });
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

  onSubmit = (e) => {
    e.preventDefault();
    const {
      fixedSelected,
      randomSelected,
      manualSelected,
      manualRandomSelected,
      assessmentID,
    } = this.state;

    const set = {
      fixedSelected: fixedSelected,
      randomSelected: randomSelected,
      manualSelected: manualSelected,
      manualRandomSelected: manualRandomSelected,
      assessmentID: assessmentID,
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
      setNum,
      definedTakeFromSectionSelected,
      manualRandomSelected,
      sets,
      questions,
    } = this.state;

    const column = [
      {
        name: "Set",
        selector: "setNo",
        cell: (row) => (
          <div>
            <div style={{ fontSize: "15px", fontFamily: "Ubuntu-Regular" }}>
              {row.setNo}
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
        selector: "action",
        cell: (row) => (
          <CustomRow>
            <TableButton>Delete</TableButton>
          </CustomRow>
        ),
      },
    ];

    const { assessmentReducer, assessmentQuestionReducer } = this.props;
    if (assessmentReducer.isLoading || assessmentQuestionReducer.isLoading)
      return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    return (
      <form onSubmit={this.onSubmit}>
        <SecondLabel>Question Order and Assessment Set Generation</SecondLabel>
        <div className={css(styles.bar)}>
          <CustomColumn>
            <CustomRow>
              <div className={css(styles.radionCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Radio
                    checked={fixedSelected}
                    onChange={(e) => {
                      this.setState({
                        fixedSelected: e.target.checked,
                        randomSelected: false,
                        manualSelected: false,
                        manualRandomSelected: false,
                      });
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
                    onChange={(e) =>
                      this.setState({
                        randomSelected: e.target.checked,
                        fixedSelected: false,
                        manualSelected: false,
                        manualRandomSelected: false,
                      })
                    }
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
                    onChange={(e) =>
                      this.setState({
                        manualSelected: e.target.checked,
                        fixedSelected: false,
                        randomSelected: false,
                        manualRandomSelected: true,
                      })
                    }
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
                        onChange={(e) =>
                          this.setState({
                            randomTakeFromTotalSelected: e.target.checked,
                            definedTakeFromSectionSelected: false,
                            manualRandomSelected: e.target.checked,
                          })
                        }
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
                            type={"number"}
                            onChangeValue={(e) =>
                              this.onChangeQuestionNum(e, totalQuestionNumber)
                            }
                            value={questionNum}
                            min={"1"}
                            max={totalQuestionNumber}
                            placeholder={"Enter number of questions"}
                          />
                        </CustomColumn>
                      </div>
                      <div className={css(styles.block)}>
                        <CustomColumn>
                          <ThirdLabel>Number of sets</ThirdLabel>
                          <CustomDropdown
                            options={dropdownData}
                            placeholder={"Select number of sets"}
                            value={setNum}
                            onChange={(e) =>
                              this.setState({
                                setNum: e.value,
                              })
                            }
                          />
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
                          this.setState({
                            definedTakeFromSectionSelected: e.target.checked,
                            randomTakeFromTotalSelected: false,
                            manualRandomSelected: e.target.checked,
                          });
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
                                value={sets[index]}
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
                  onChange={(e) => this.setState({ manualRandomSelected: e })}
                  checked={manualRandomSelected}
                />
                <div style={{ marginLeft: "15px" }}>
                  <ThirdLabel>
                    Randomize the choices for each questions during test
                  </ThirdLabel>
                </div>
              </CustomRow>
              <Button
                backgroundColor={configStyles.colors.darkBlue}
                color={configStyles.colors.white}
                padding={"8px"}
                type={"button"}
                onClick={this.generateSetButtonClick}
              >
                Generate
              </Button>
            </div>

            <div style={{ marginTop: 20 }}>
              <SecondLabel>Sets</SecondLabel>
              <Table data={sets} columns={column} />
            </div>
          </>
        )}
        <div style={{ marginBottom: "100px" }}>
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
});

SetContainer.propTypes = {
  updateAssessmentSet: PropTypes.func.isRequired,
  fetchAssessmentSet: PropTypes.func.isRequired,
  fetchAllAssessmentQuestion: PropTypes.func.isRequired,
  assessmentReducer: PropTypes.object.isRequired,
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
