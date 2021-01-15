import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import "../../css/general.css";
import * as configStyles from "../../config/styles";

import Header from "../../components/Header";
import ScrollArrow from "../../components/ScrollArrow";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

class ViewResponseContainer extends Component {
  render() {
    return (
      <>
        <Header />
        <ScrollArrow />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>View Response</FirstLabel>
              </div>

              <CustomRow>
                <div className={css(styles.infoCon)}>
                  <SecondLabel marginRight={"10px"}>
                    Candidate Name :{" "}
                  </SecondLabel>
                  <ThirdLabel>Captain Jack Sparrow</ThirdLabel>
                </div>
              </CustomRow>
              <CustomRow>
                <div className={css(styles.infoCon)}>
                  <SecondLabel marginRight={"10px"}>
                    Candidate Email :{" "}
                  </SecondLabel>
                  <ThirdLabel>CaptainJack2020@gmail.com</ThirdLabel>
                </div>
              </CustomRow>
              <CustomRow>
                <div className={css(styles.infoCon)}>
                  <SecondLabel marginRight={"10px"}>
                    Submission Date :{" "}
                  </SecondLabel>
                  <ThirdLabel>2020-09-13 23:07</ThirdLabel>
                </div>
              </CustomRow>
              <CustomRow>
                <div className={css(styles.infoCon)}>
                  <SecondLabel marginRight={"10px"}>Score : </SecondLabel>
                  <ThirdLabel>100</ThirdLabel>
                </div>
              </CustomRow>
              <CustomRow>
                <div className={css(styles.infoCon)}>
                  <SecondLabel marginRight={"10px"}>Grade : </SecondLabel>
                  <ThirdLabel>A</ThirdLabel>
                </div>
              </CustomRow>
              <hr className={css(styles.hr)} />
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
  infoCon: {
    width: "100%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  hr: {
    backgroundColor: configStyles.colors.black,
    height: "1px",
  },
});

export default ViewResponseContainer;
