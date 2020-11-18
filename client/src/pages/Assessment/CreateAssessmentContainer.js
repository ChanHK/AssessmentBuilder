import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import Header from "../../components/Header";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import "../../css/general.css";
import CustomInput from "../../components/CustomInput";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import TextArea from "../../components/TextArea";
import Section from "../../components/Section";
import Button from "../../components/Button";

import * as configStyles from "../../config/styles";

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
              <Section />
              <div style={{ padding: "25px 0" }}>
                <Button
                  backgroundColor={configStyles.colors.darkBlue}
                  color={configStyles.colors.white}
                  padding={"8px"}
                  // width={"100px"}
                  onClick={this.handleClick}
                >
                  Add Section
                </Button>
              </div>
              <div className={css(styles.bar)}>a</div>
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
    width: "100%",
    padding: 10,
    backgroundColor: configStyles.colors.lightGrey,
    marginBottom: "25px",
    border: "2px solid",
    borderRadius: "5px",
    borderColor: configStyles.colors.black,
  },
});
