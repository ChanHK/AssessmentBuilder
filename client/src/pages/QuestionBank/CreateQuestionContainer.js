import React, { Component } from "react";
import { StyleSheet } from "aphrodite";
import * as configStyles from "../../config/styles";
import "../../css/general.css";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import QuestionType from "./Data/QuestionType";

import Header from "../../components/Header";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import ChoiceRow from "../../components/ChoiceRow";
import ShortAns from "../../components/ShortAns";
import TrueFalse from "../../components/TrueFalse";
import CustomEditor from "../../components/CustomEditor";
import ScrollArrow from "../../components/ScrollArrow";

import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";

class CreateQuestionContainer extends Component {
  constructor() {
    super();
    this.state = {
      questionType: null,
      questionDescriptive: EditorState.createEmpty(),
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
      questionChoice: [true, false],
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
      this.setState((prevState) => ({
        questionAns: [
          ...prevState.questionAns,
          this.state.questionChoice[value],
        ],
      }));
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
    e.preventDefault();
    const {
      // questionType,
      questionDescriptive,
      // questionAns,
      // questionChoice,
    } = this.state;

    console.log(
      draftToHtml(convertToRaw(questionDescriptive.getCurrentContent()))
    );
  };

  render() {
    const {
      questionType,
      questionDescriptive,
      questionAns,
      questionChoice,
      checkboxNum,
    } = this.state;
    return (
      <>
        <Header />
        <ScrollArrow />
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

                  {questionType === "Single Choice" && (
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
                  )}

                  {questionType === "Multiple Choice" && (
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
                  )}

                  {questionType === "Descriptive" && (
                    <>
                      <div style={{ paddingBottom: "25px" }}>
                        <ThirdLabel>
                          The answer will be retrieved from the candidates after
                          they have attempted your assessment
                        </ThirdLabel>
                      </div>
                    </>
                  )}

                  {questionType === "True or False" && (
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
                  )}

                  {questionType === "Short Answer" && (
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
                  )}

                  {questionType === "Order" && (
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
                  )}

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
