import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import Header from "../../components/Header";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import "../../css/general.css";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";
import TextArea from "../../components/TextArea";
import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";
import * as configStyles from "../../config/styles";

export default class GradeContainer extends Component {
  constructor() {
    super();
    this.state = {
      questionDescriptive: null,
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
                <TextArea
                  name={"description"}
                  type={"text"}
                  value={questionDescriptive}
                  readOnly={true}
                  height={"auto"}
                />
              </div>
              <SecondLabel>Responses</SecondLabel>
              <div className={css(styles.bar)}>
                <CustomColumn>
                  <ThirdLabel>Respondent: Name</ThirdLabel>
                  <ThirdLabel>Answer: xxxx</ThirdLabel>
                  <ThirdLabel>Graded: false</ThirdLabel>
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
});
