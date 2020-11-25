import React, { Component } from "react";
import { StyleSheet } from "aphrodite";
import Header from "../../components/Header";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";
import "../../css/general.css";
import QuestionType from "./Data/QuestionType";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import ChoiceRow from "../../components/ChoiceRow";
import * as configStyles from "../../config/styles";
import ShortAns from "../../components/ShortAns";
import TrueFalse from "../../components/TrueFalse";
import CustomEditor from "../../components/CustomEditor";

class CreateQuestionContainer extends Component {
  constructor() {
    super();
    this.state = {
      questionType: null,
      questionDescriptive: "",
      explanation: "",
      questionAns: [],
      questionChoice: [],
      checkboxNum: null,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeType = (e) => {
    this.setState({
      questionType: e.target.value,
      questionAns: [],
      questionChoice: [],
      checkboxNum: null,
    });
  };

  onGetTF = (e) => {
    this.setState({
      questionAns: e.target.value,
    });
  };

  onChangeAnswer = (value, index) => {
    this.setState((state) => {
      const questionAns = state.questionAns.map((item, j) => {
        if (j === index) {
          return value;
        } else {
          return item;
        }
      });

      return {
        questionAns,
      };
    });
  };

  onChangeChoice = (value, index) => {
    this.setState((state) => {
      const questionChoice = state.questionChoice.map((item, j) => {
        if (j === index) {
          return value;
        } else {
          return item;
        }
      });

      return {
        questionChoice,
      };
    });
  };

  setChoiceAns = (index) => {
    this.setState({
      questionAns: this.state.questionChoice[index],
      checkboxNum: index,
    });
    console.log(this.state.checkboxNum);
  };

  setChoiceMultiAns = (event) => {
    const target = event.target;
    var value = target.value;

    if (target.checked) {
      // let questionAns = [...this.state.questionAns];
      // questionAns[value] = {
      //   ...questionAns[value],
      //   value: this.state.questionChoice[value],
      // };
      // this.setState({ questionAns });

      this.setState((prevState) => ({
        questionAns: [
          ...prevState.questionAns,
          this.state.questionChoice[value],
        ],
      }));

      // this.state.questionAns[value] = this.state.questionChoice[value];
    } else {
      this.state.questionAns.splice(value, 1);
    }
  };

  deleteAnsRow = (index) => {
    this.setState((state) => {
      const questionAns = state.questionAns.filter((item, j) => index !== j);

      return {
        questionAns,
      };
    });
  };

  deleteChoiceRow = (index) => {
    this.setState((state) => {
      const questionChoice = state.questionChoice.filter(
        (item, j) => index !== j
      );

      return {
        questionChoice,
      };
    });
  };

  onAddAnsRow = () => {
    this.setState({
      questionAns: this.state.questionAns.concat(""),
    });
  };

  onAddChoiceRow = () => {
    this.setState({
      questionChoice: this.state.questionChoice.concat(""),
    });
  };

  onSubmit = (e) => {
    // console.log(this.state.questionType);
    // console.log(this.state.questionDescriptive.getCurrentContent().getPlainText());
    // console.log(this.state.explanation);
    // console.log("ans", this.state.questionAns);
    // console.log(this.state.checkboxNum);
    // console.log(this.state.questionChoice[0].getCurrentContent().getPlainText());

    e.preventDefault();
  };

  render() {
    const {
      questionType,
      questionDescriptive,
      explanation,
      questionAns,
      questionChoice,
      checkboxNum,
    } = this.state;
    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Create Question</FirstLabel>
              </div>
              <form onSubmit={this.onSubmit}>
                <CustomColumn>
                  <SecondLabel>Question Type</SecondLabel>
                  <div style={{ paddingBottom: "50px" }}>
                    <Dropdown
                      options={QuestionType}
                      placeholder={"Select question type"}
                      value={questionType}
                      onChangeValue={this.onChangeType}
                    />
                  </div>

                  <SecondLabel>Question Description</SecondLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <CustomEditor
                      onEditorStateChange={(e) =>
                        this.setState({ questionDescriptive: e })
                      }
                      editorState={questionDescriptive}
                    />
                  </div>

                  {questionType === "Single Choice" ? (
                    <>
                      <div style={{ paddingBottom: "25px" }}>
                        <Button
                          backgroundColor={configStyles.colors.darkBlue}
                          color={configStyles.colors.white}
                          padding={"8px"}
                          onClick={this.onAddChoiceRow}
                          type={"button"}
                        >
                          Add Choice
                        </Button>
                      </div>
                      <div style={{ paddingBottom: "25px" }}>
                        {questionChoice.map((item, index) => (
                          <ChoiceRow
                            count={index + 1}
                            onClick={() => this.deleteChoiceRow(index)}
                            editorState={item}
                            onChange={(e) => this.onChangeChoice(e, index)}
                            choiceName={"choice"}
                            checkedValue={index}
                            onChangeValue={() => this.setChoiceAns(index)}
                            checked={checkboxNum}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  {questionType === "Multiple Choice" ? (
                    <>
                      <div style={{ paddingBottom: "25px" }}>
                        <Button
                          backgroundColor={configStyles.colors.darkBlue}
                          color={configStyles.colors.white}
                          padding={"8px"}
                          onClick={this.onAddChoiceRow}
                          type={"button"}
                        >
                          Add Choice
                        </Button>
                      </div>
                      <div style={{ paddingBottom: "25px" }}>
                        {questionChoice.map((item, index) => (
                          <ChoiceRow
                            count={index + 1}
                            onClick={() => this.deleteChoiceRow(index)}
                            editorState={item}
                            onChange={(e) => this.onChangeChoice(e, index)}
                            choiceName={"choice"}
                            checkedValue={index}
                            // onChangeValue={() => this.setChoiceMultiAns(index)}
                            onChangeValue={this.setChoiceMultiAns}
                            checked={checkboxNum}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  {questionType === "Descriptive" ? (
                    <>
                      <div style={{ paddingBottom: "25px" }}>
                        <ThirdLabel>
                          The answer will be retrieved from the candidates after
                          they have attempted your assessment
                        </ThirdLabel>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  {questionType === "True or False" ? (
                    <>
                      <SecondLabel>Answer</SecondLabel>
                      <ThirdLabel>Select the correct answer</ThirdLabel>
                      <div style={{ paddingBottom: "25px" }}>
                        <TrueFalse
                          onClick={this.onGetTF}
                          isTrue={questionAns}
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  {questionType === "Short Answer" ? (
                    <>
                      <SecondLabel>Answers</SecondLabel>
                      <ThirdLabel>
                        Candidates will score if their answer is exactly the
                        same with yours
                      </ThirdLabel>
                      <div style={{ paddingBottom: "25px" }}>
                        {questionAns.map((item, index) => (
                          <ShortAns
                            onClick={() => this.deleteAnsRow(index)}
                            onChange={(e) => this.onChangeAnswer(e, index)}
                            height={"50px"}
                            value={item}
                            rowNum={index}
                          />
                        ))}
                      </div>
                      <div style={{ paddingBottom: "25px" }}>
                        <Button
                          backgroundColor={configStyles.colors.darkBlue}
                          color={configStyles.colors.white}
                          padding={"8px"}
                          onClick={this.onAddAnsRow}
                          type={"button"}
                        >
                          Add Answers
                        </Button>
                      </div>
                    </>
                  ) : (
                    <> </>
                  )}

                  {questionType === "Order" ? (
                    <>
                      <SecondLabel>Answers</SecondLabel>
                      <ThirdLabel>Write down the answer in order</ThirdLabel>
                      <div style={{ paddingBottom: "25px" }}>
                        {questionAns.map((item, index) => (
                          <ShortAns
                            onClick={() => this.deleteAnsRow(index)}
                            onChange={(e) => this.onChangeAnswer(e, index)}
                            height={"50px"}
                            value={item}
                            rowNum={index}
                          />
                        ))}
                      </div>
                      <div style={{ paddingBottom: "25px" }}>
                        <Button
                          backgroundColor={configStyles.colors.darkBlue}
                          color={configStyles.colors.white}
                          padding={"8px"}
                          onClick={this.onAddAnsRow}
                          type={"button"}
                        >
                          Add Answers
                        </Button>
                      </div>
                    </>
                  ) : (
                    <> </>
                  )}

                  <SecondLabel>Explanation (Optional)</SecondLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <CustomEditor
                      onEditorStateChange={(e) =>
                        this.setState({ explanation: e })
                      }
                      editorState={explanation}
                    />
                  </div>

                  <CustomRow>
                    <div
                      style={{
                        justifyContent: "flex-start",
                        marginRight: "10px",
                      }}
                    >
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
                    <div style={{ justifyContent: "flex-start" }}>
                      <Button
                        backgroundColor={configStyles.colors.white}
                        color={configStyles.colors.darkBlue}
                        padding={"8px"}
                        width={"100px"}
                        type={"button"}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CustomRow>
                </CustomColumn>
              </form>
            </CustomColumn>
          </CustomMidContainer>
        </CustomFullContainer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  customMidContainer: {
    paddingLeft: "10px",
    paddingBottom: "75px",
  },
});

export default CreateQuestionContainer;
