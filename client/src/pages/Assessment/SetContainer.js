import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite";
import "../../css/general.css";
import * as configStyles from "../../config/styles";

import Radio from "../../components/Radio";
import Wrapper from "../../components/Wrapper";
import CustomInput from "../../components/CustomInput";
import Dropdown from "../../components/Dropdown";
import CustomSwitch from "../../components/CustomSwitch";

import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

class SetContainer extends Component {
  constructor() {
    super();
    this.state = {
      fixedSelected: false,
      randomSelected: false,
      manualSelected: true,
      randomTakeFromTotalSelected: false,
      questionNum: "", // question number in a set
      setNum: null, // number of set that will be generated
      totalQuestionNumber: "", // total questions in Question section
      definedTakeFromSectionSelected: false,
      manualRandomSelected: false,
      questions: [
        [
          {
            questionType: "Single Choice",
            questionDescriptive:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            questionAns: "A",
            questionChoice: ["B", "C", "A", "D"],
            score: 2,
          },

          {
            questionType: "Single Choice",
            questionDescriptive:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            questionAns: "A",
            questionChoice: ["B", "C", "A", "D"],
            score: 2,
          },
          {
            questionType: "Single Choice",
            questionDescriptive: "Choose A ! Free marks",
            questionAns: "A",
            questionChoice: ["B", "C", "A", "D"],
            score: 2,
          },
        ],
        [
          {
            questionType: "Multiple Choice",
            questionDescriptive: "Is it true ?",
            questionAns: ["it is true", "it is not false"],
            questionChoice: [
              "it is not true",
              "it is not false",
              "it is false",
              "it is true",
            ],
            score: 2,
          },
          {
            questionType: "Multiple Choice",
            questionDescriptive: "adadsadsadsadsaaaaaaaaaaaaa",
            questionAns: ["A", "B"],
            questionChoice: ["B", "C", "A", "D"],
            score: 2,
          },
          {
            questionType: "Multiple Choice",
            questionDescriptive:
              "Choose one yes and one no, 1) are you gay? 2) are you lying ?",
            questionAns: ["yes, no", "no, yes"],
            questionChoice: ["yes, no", "no, yes"],
            score: 2,
          },
        ],
        [
          {
            questionType: "True or False",
            questionDescriptive: "is A a capital letter ?",
            questionAns: true,
            questionChoice: [true, false],
            score: 2,
          },

          {
            questionType: "True or False",
            questionDescriptive: "1+1=2",
            questionAns: true,
            questionChoice: [true, false],
            score: 2,
          },
        ],
        [
          {
            questionType: "Descriptive",
            questionDescriptive: "Proof me that you are not gay",
            score: 10,
          },
          {
            questionType: "Descriptive",
            questionDescriptive:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id tortor porta, faucibus ante a, lacinia leo. Nullam ullamcorper metus id dapibus euismod. Vivamus fermentum pulvinar metus eu ornare. Sed congue ultricies felis in porta. Nullam gravida malesuada neque sit amet euismod. Nulla vehicula dui massa, eu rutrum tortor porta ut. Nulla eu ex ultrices, interdum ex a, consectetur quam. Etiam velit ipsum, eleifend eget mattis vitae, ullamcorper eget dui. Nam id placerat augue, in egestas mi. Praesent mattis tempus interdum. Quisque in lacus dictum, consectetur quam eu, dapibus justo. Phasellus vitae nulla a orci vestibulum lacinia. Vestibulum placerat ut augue a lobortis. Suspendisse elementum porta quam, ac vehicula augue sodales consectetur. In sit amet tortor ac tortor feugiat tincidunt. Proin sit amet vehicula elit. Quisque aliquet orci a accumsan suscipit. Nulla ipsum mauris, volutpat quis ultrices iaculis, sollicitudin sit amet turpis. Nulla malesuada erat nisi, sed ultricies lorem vehicula accumsan.",
            score: 10,
          },
        ],
      ],
    };
  }

  componentDidMount() {
    let count = 0;
    const { questions } = this.state;
    questions.forEach(
      (item, index) => (count = questions[index].length + count)
    );
    this.setState({ totalQuestionNumber: count });
  }

  fixedOnClick = (e) => {
    this.setState({
      fixedSelected: e.target.checked,
      randomSelected: false,
      manualSelected: false,
    });
  };

  randomOnClick = (e) => {
    this.setState({
      randomSelected: e.target.checked,
      fixedSelected: false,
      manualSelected: false,
    });
  };

  manualOnClick = (e) => {
    this.setState({
      manualSelected: e.target.checked,
      fixedSelected: false,
      randomSelected: false,
    });
  };

  randomTakeFromTotalOnClick = (e) => {
    this.setState({
      randomTakeFromTotalSelected: e.target.checked,
      definedTakeFromSectionSelected: false,
      manualRandomSelected: e.target.checked,
    });
  };

  definedTakeFromSectionOnClick = (e) => {
    this.setState({
      definedTakeFromSectionSelected: e.target.checked,
      randomTakeFromTotalSelected: false,
    });
  };

  onChangeQuestionNum = (e) => {
    const val = e.target.value;
    const max = 100;
    const maxLength = max.toString().length - 1;
    const newVal =
      val < max ? val : parseInt(val.toString().substring(0, maxLength));
    this.setState({ questionNum: newVal });
  };

  randomChoiceSelected = (e) => {
    this.setState({ manualRandomSelected: e });
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
    } = this.state;
    // console.log(questions.length);

    let setNumOptions = [];

    for (let i = 0; i < 10; i++) {
      setNumOptions.push({
        value: i + 1,
      });
    }

    if (totalQuestionNumber === "") {
      return false;
    }

    return (
      <form>
        <SecondLabel>Question Order and Assessment Set Generation</SecondLabel>
        <div className={css(styles.bar)}>
          <CustomColumn>
            <CustomRow>
              <div className={css(styles.radionCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Radio checked={fixedSelected} onChange={this.fixedOnClick} />
                </div>
                <ThirdLabel>Fixed order of questions and choices</ThirdLabel>
              </div>
            </CustomRow>
            <CustomRow>
              <div className={css(styles.radionCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Radio
                    checked={randomSelected}
                    onChange={this.randomOnClick}
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
                    onChange={this.manualOnClick}
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
                        onChange={this.randomTakeFromTotalOnClick}
                      />
                    </div>
                    <ThirdLabel>
                      Filter out questions from of all the questions randomly
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
                          <Dropdown
                            options={setNumOptions}
                            placeholder={"Select number of sets"}
                            value={setNum}
                            onChangeValue={(e) =>
                              this.setState({
                                setNum: e.target.value,
                              })
                            }
                            padding={"12px"}
                          />
                        </CustomColumn>
                      </div>
                    </Wrapper>
                    <CustomRow>
                      <CustomSwitch
                        onChange={this.randomChoiceSelected}
                        checked={manualRandomSelected}
                      />
                      <div style={{ marginLeft: "15px" }}>
                        <ThirdLabel>
                          Randomize the choices for each questions
                        </ThirdLabel>
                      </div>
                    </CustomRow>
                  </div>
                )}
                <CustomRow>
                  <div className={css(styles.radionCon)}>
                    <div style={{ paddingRight: "20px" }}>
                      <Radio
                        checked={definedTakeFromSectionSelected}
                        onChange={this.definedTakeFromSectionOnClick}
                      />
                    </div>
                    <ThirdLabel>Filter questions from the sections</ThirdLabel>
                  </div>
                </CustomRow>
              </CustomColumn>
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
    flexWrap: "nowrap",
    width: "400px",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SetContainer;
