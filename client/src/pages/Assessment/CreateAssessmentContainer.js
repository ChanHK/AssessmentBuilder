import React, { Component } from "react";
import { StyleSheet } from "aphrodite";
import "../../css/general.css";
import * as configStyles from "../../config/styles";

import Header from "../../components/Header";
import AssessmentButtonGroup from "../../components/AssessmentButtonGroup";
import ScrollArrow from "../../components/ScrollArrow";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";

import SettingsContainer from "./SettingsContainer";
import TimerContainer from "./TimerContainer";
import AccessContainer from "./AccessContainer";
import QuestionsContainer from "./QuestionsContainer";
import SetContainer from "./SetContainer";

import { generatePath } from "react-router";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

class CreateAssessmentContainer extends Component {
  componentDidMount() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);

      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        this.props.logout();
        this.props.history.push("/login");
      }
    }
  }

  handlePath = (e) => {
    const { match } = this.props;
    const path = generatePath(match.path, {
      type: match.params.type,
      selected: e.target.value,
      assessmentID: match.params.assessmentID,
      subject: match.params.subject,
    });
    this.props.history.replace(path);
  };

  render() {
    const { selected, assessmentID, type, subject } = this.props.match.params;

    return (
      <>
        <Header />
        <ScrollArrow />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                {type === "create" ? (
                  <FirstLabel>Create Assessment</FirstLabel>
                ) : type === "edit" ? (
                  <FirstLabel>Edit Assessment</FirstLabel>
                ) : (
                  <FirstLabel>View Assessment</FirstLabel>
                )}
              </div>
              <div style={{ paddingBottom: "50px" }}>
                <AssessmentButtonGroup
                  onClick={this.handlePath}
                  type={selected}
                />
              </div>

              {selected === "settings" && (
                <SettingsContainer
                  assessmentID={assessmentID}
                  type={type}
                  subject={subject}
                />
              )}
              {selected === "questions" && (
                <QuestionsContainer
                  assessmentID={assessmentID}
                  type={type}
                  subject={subject}
                />
              )}
              {selected === "set" && (
                <SetContainer
                  assessmentID={assessmentID}
                  type={type}
                  subject={subject}
                />
              )}
              {selected === "access" && (
                <AccessContainer
                  assessmentID={assessmentID}
                  type={type}
                  subject={subject}
                />
              )}
              {selected === "timer" && (
                <TimerContainer
                  assessmentID={assessmentID}
                  type={type}
                  subject={subject}
                />
              )}
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

CreateAssessmentContainer.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(CreateAssessmentContainer);
