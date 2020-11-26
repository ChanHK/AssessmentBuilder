import React, { Component } from "react";
import { StyleSheet } from "aphrodite";
import Header from "../../components/Header";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import "../../css/general.css";
import * as configStyles from "../../config/styles";
import AssessmentButtonGroup from "../../components/AssessmentButtonGroup";
import SettingsContainer from "./SettingsContainer";
import TimerContainer from "./TimerContainer";

export default class CreateAssessmentContainer extends Component {
  constructor() {
    super();
    this.state = {
      type: "settings",
    };
  }

  render() {
    const { type } = this.state;

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

              {type === "settings" ? <SettingsContainer /> : <></>}

              {type === "timer" ? <TimerContainer /> : <></>}
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
