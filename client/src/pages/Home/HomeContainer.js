import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import Header from "../../components/Header";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import StatusBox from "../../components/StatusBarComponents/StatusBox";
import StatusBarWrapper from "../../components/StatusBarComponents/StatusBarWrapper";
import StatusBarImage from "../../components/StatusBarComponents/StatusBarImage";
import StatusBarMessage from "../../components/StatusBarComponents/StatusBarMessage";
import profile from "../../image/profile/dummyUser.png";
import "../../css/general.css";

export default class HomeContainer extends Component {
  render() {
    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <FirstLabel>Profile</FirstLabel>

              <StatusBarWrapper>
                <StatusBarImage image={profile} style={[styles.imgPos]} />
                <StatusBarMessage>Sparrowwwwwwwwwwwwwww</StatusBarMessage>
                <StatusBox number={"67"} text={"Assessments Created"} />
                <StatusBox number={"2"} text={"Setup In Progress"} />
                <StatusBox number={"200"} text={"Assessments Activated"} />
              </StatusBarWrapper>
              <FirstLabel>Profile</FirstLabel>
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
  imgPos: {
    float: "left",
  },
});
