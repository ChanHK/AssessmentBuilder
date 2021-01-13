import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import "../../css/general.css";
import * as configStyles from "../../config/styles";

import Header from "../../components/Header";
import TextArea from "../../components/TextArea";
import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

class GradeContainer extends Component {
  constructor() {
    super();
    this.state = {
      questionDescriptive: EditorState.createEmpty(),
      feedback: null,
    };
  }

  onChangeFeedback = (e) => {
    this.setState({ feedback: e.target.value });
  };

  render() {
    const { questionDescriptive, feedback } = this.state;
    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Grade Responses</FirstLabel>
              </div>
              <SecondLabel>Question Description</SecondLabel>
              <div style={{ paddingBottom: "50px" }}>
                <Editor
                  editorState={questionDescriptive}
                  toolbarHidden={true}
                  readOnly
                  editorClassName={css(styles.editorClassName)}
                />
              </div>
              <SecondLabel>Responses</SecondLabel>
              <div className={css(styles.bar)}>
                <CustomColumn>
                  <ThirdLabel>Name: Name</ThirdLabel>
                  <ThirdLabel>Email: Email</ThirdLabel>
                  <ThirdLabel>Answer:</ThirdLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <TextArea
                      type={"text"}
                      // value={answer}
                      minHeight={"100px"}
                      readOnly={true}
                      backgroundColor={configStyles.colors.lightOrange}
                    />
                  </div>

                  <ThirdLabel>Score Assigned (Max 5 marks): </ThirdLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <CustomInput
                      name={"username"}
                      type={"text"}
                      placeholder={"Enter score"}
                      //   onChangeValue={}
                      //   value={}
                    />
                  </div>

                  <ThirdLabel>Feedback (Optional):</ThirdLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <TextArea
                      name={"feedback"}
                      type={"text"}
                      value={feedback}
                      onChangeValue={this.onChangeFeedback}
                      placeholder={"Enter your feedback here"}
                      height={"100px"}
                    />
                  </div>
                  <Button
                    backgroundColor={configStyles.colors.darkBlue}
                    color={configStyles.colors.white}
                    padding={"8px"}
                    width={"100px"}
                    onClick={this.handleClick}
                  >
                    Confirm
                  </Button>
                </CustomColumn>
              </div>
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
  },
  bar: {
    border: "2px solid black",
    display: "flex",
    width: "100%",
    height: "auto",
    marginBottom: "50px",
    borderRadius: "5px",
    padding: "20px 30px 20px 30px",
  },
  editorClassName: {
    borderRadius: "5px",
    borderColor: configStyles.colors.black,
    border: "2px solid",
    width: "100%",
    height: "auto",
  },
});

export default GradeContainer;
