import React, { Component } from "react";
import { StyleSheet } from "aphrodite";
import Header from "../../components/Header";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import "../../css/general.css";
import CustomInput from "../../components/CustomInput";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import TextArea from "../../components/TextArea";

// import * as configStyles from "../../config/styles";

export default class CreateAssessmentContainer extends Component {
  constructor() {
    super();
    this.state = {
      testName: "",
      testDescription: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { testName, testDescription } = this.state;
    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Create Assessment</FirstLabel>
              </div>
              <SecondLabel>Assessment Name</SecondLabel>
              <div style={{ paddingBottom: "25px" }}>
                <CustomInput
                  name={"testName"}
                  type={"text"}
                  placeholder={" Enter your assessment name"}
                  onChangeValue={this.onChange}
                  value={testName}
                />
              </div>
              <SecondLabel>Assessment Description</SecondLabel>
              <div style={{ paddingBottom: "25px" }}>
                <TextArea
                  name={"testDescription"}
                  type={"text"}
                  placeholder={"Enter the description here"}
                  onChange={this.onChange}
                  value={testDescription}
                />
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
});
