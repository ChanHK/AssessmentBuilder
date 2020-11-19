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
import TextArea from "../../components/TextArea";
import ImageUpload from "../../components/ImageUpload";
import Button from "../../components/Button";
import ChoiceRow from "../../components/ChoiceRow";
import * as configStyles from "../../config/styles";
import ShortAns from "../../components/ShortAns";
import TrueFalse from "../../components/TrueFalse";

class CreateQuestionContainer extends Component {
  constructor() {
    super();
    this.state = {
      questionType: null,
      questionDescriptive: "",
      pictures: [],
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
    this.setState({ questionType: e.target.value, questionAns: [] });
  };

  onDrop = (e) => {
    this.setState({
      pictures: this.state.pictures.concat(e),
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
    // console.log(this.state.questionDescriptive);
    // console.log(this.state.pictures);
    // console.log(this.state.explanation);
    console.log("ans", this.state.questionAns);
    console.log(this.state.questionChoice);

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
                    <TextArea
                      name={"questionDescriptive"}
                      type={"text"}
                      placeholder={"Enter the description here"}
                      onChange={this.onChange}
                      value={questionDescriptive}
                    />
                  </div>
                  <div style={{ paddingBottom: "25px" }}>
                    <ImageUpload
                      onChange={this.onDrop}
                      singleImage={false}
                      icon={true}
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
                            choiceValue={item}
                            onChange={(e) =>
                              this.onChangeChoice(e.target.value, index)
                            }
                            name={"answer"}
                            choiceName={"choice"}
                            placeholder={"Enter your choice here"}
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
                            onChange={(e) =>
                              this.onChangeAnswer(e.target.value, index)
                            }
                            name={"answer"}
                            placeholder={"Enter the answer here"}
                            height={"50px"}
                            value={item}
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
                    <TextArea
                      name={"explanation"}
                      type={"text"}
                      placeholder={"Enter the explanation here"}
                      onChange={this.onChange}
                      value={explanation}
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
