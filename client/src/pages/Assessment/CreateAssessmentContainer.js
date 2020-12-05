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
import AccessContainer from "./AccessContainer";
import QuestionsContainer from "./QuestionsContainer";
import ScrollArrow from "../../components/ScrollArrow";

export default class CreateAssessmentContainer extends Component {
  constructor() {
    super();
    this.state = {
      selected: "questions",
    };
  }

  render() {
    const { selected } = this.state;

    return (
      <>
        <Header />
        <ScrollArrow />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Create Assessment</FirstLabel>
              </div>
              <div style={{ paddingBottom: "50px" }}>
                <AssessmentButtonGroup
                  onClick={(e) => this.setState({ selected: e.target.value })}
                  type={selected}
                />
              </div>

              {selected === "settings" && <SettingsContainer />}
              {selected === "questions" && <QuestionsContainer />}
              {selected === "set"}
              {selected === "access" && <AccessContainer />}
              {selected === "timer" && <TimerContainer />}
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
