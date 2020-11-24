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
import CustomSwitch from "../../components/CustomSwitch";
import * as configStyles from "../../config/styles";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";
import CustomRow from "../../components/GridComponents/CustomRow";
import Radio from "../../components/Radio";
import AssessmentButtonGroup from "../../components/AssessmentButtonGroup";

export default class CreateAssessmentContainer extends Component {
  constructor() {
    super();
    this.state = {
      testName: "",
      testDescription: "",
      testRules: "",
      type: "settings",
      sizeCheck: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      testName,
      testDescription,
      testRules,
      type,
      sizeCheck,
    } = this.state;
    console.log(testRules);
    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Create Assessment</FirstLabel>
              </div>
              <div style={{ paddingBottom: "50px" }}>
                <AssessmentButtonGroup
                  onClick={(e) => this.setState({ type: e.target.value })}
                  type={type}
                />
              </div>

              {type === "settings" ? (
                <>
                  <SecondLabel>Title</SecondLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <CustomInput
                      name={"testName"}
                      type={"text"}
                      placeholder={"Enter the title here"}
                      onChangeValue={this.onChange}
                      value={testName}
                    />
                  </div>
                  <SecondLabel>Description</SecondLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <TextArea
                      name={"testDescription"}
                      type={"text"}
                      placeholder={"Enter the description here"}
                      onChange={this.onChange}
                      value={testDescription}
                    />
                  </div>
                  <SecondLabel>Rules</SecondLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <TextArea
                      name={"testRules"}
                      type={"text"}
                      placeholder={"Enter the rules here"}
                      onChange={this.onChange}
                      value={testRules}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}

              {/* 
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

              <SecondLabel>Question Order</SecondLabel>
              <div className={css(styles.bar)}>
                <CustomColumn>
                  <CustomRow>
                    <Radio />
                    <ThirdLabel></ThirdLabel>
                  </CustomRow>
                </CustomColumn>
              </div>

              <div className={css(styles.bar)}>
                <CustomRow>
                  <div style={{ paddingRight: "20px" }}>
                    <ThirdLabel>Honestly Check</ThirdLabel>
                  </div>
                  <CustomSwitch
                    onChange={(e) => this.setState({ sizeCheck: e })}
                    checked={sizeCheck}
                  />
                </CustomRow>
              </div> */}
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
    padding: "10px 20px",
    backgroundColor: configStyles.colors.lightGrey,
    marginBottom: "50px",
    border: "2px solid",
    borderRadius: "5px",
    borderColor: configStyles.colors.black,
  },
});
