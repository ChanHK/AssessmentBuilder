import React, { Component } from "react";
import { StyleSheet } from "aphrodite";
import Header from "../../components/Header";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import "../../css/general.css";
import QuestionType from "./Data/QuestionType";
import Dropdown from "../../components/Dropdown";
import TextArea from "../../components/TextArea";
import ImageUpload from "../../components/ImageUpload";
import Button from "../../components/Button";
import ChoiceRow from "../../components/ChoiceRow";
import * as configStyles from "../../config/styles";

class CreateQuestionContainer extends Component {
  constructor() {
    super();
    this.state = {
      questionType: null,
      questionDescriptive: null,
      pictures: [],
      choiceCount: 0,
      explanation: null,
    };
  }

  onChangeType = (e) => {
    this.setState({ questionType: e.target.value });
  };

  onChangeDescription = (e) => {
    this.setState({ questionDescriptive: e.target.value });
  };

  onDrop = (e) => {
    this.setState({
      pictures: this.state.pictures.concat(e),
    });
  };

  addRow = () => {
    const count = this.state.choiceCount + 1;
    this.setState({ choiceCount: count });
    console.log(this.state.choiceCount);
  };

  onChangeExplanation = (e) => {
    this.setState({ explanation: e.target.value });
  };

  onSubmit = (e) => {
    console.log(this.state.questionType);
    console.log(this.state.questionDescriptive);
    console.log(this.state.pictures);
    console.log(this.state.choiceCount);
    e.preventDefault();
  };

  render() {
    const {
      questionType,
      questionDescriptive,
      choiceCount,
      explanation,
    } = this.state;
    console.log("rendered");
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
                      name={"description"}
                      type={"text"}
                      placeholder={"Enter the description here"}
                      onChange={this.onChangeDescription}
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
                  <div style={{ paddingBottom: "25px" }}>
                    <Button
                      backgroundColor={configStyles.colors.darkBlue}
                      color={configStyles.colors.white}
                      padding={"8px"}
                      onClick={this.addRow}
                    >
                      Add Choice
                    </Button>
                  </div>
                  <div style={{ paddingBottom: "25px" }}>
                    {[...Array(choiceCount)].map((k, i) => (
                      <ChoiceRow count={i + 1} />
                    ))}
                  </div>
                  <SecondLabel>Explanation (Optional)</SecondLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <TextArea
                      name={"explanation"}
                      type={"text"}
                      placeholder={"Enter the explanation here"}
                      onChange={this.onChangeExplanation}
                      value={explanation}
                    />
                  </div>

                  <CustomRow>
                    <div style={{ justifyContent: "flex-start" }}>
                      <Button
                        backgroundColor={configStyles.colors.darkBlue}
                        color={configStyles.colors.white}
                        padding={"8px"}
                        width={"100px"}
                        // onClick={}
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
                        // onClick={}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CustomRow>

                  {/* <input type="submit" value="Submit" /> */}
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
