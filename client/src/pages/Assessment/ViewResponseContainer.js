import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import Header from "../../components/Header";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import "../../css/general.css";
import CustomRow from "../../components/GridComponents/CustomRow";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

// import * as configStyles from "../../config/styles";

// this is for viewing candidates responses

export default class ViewResponseContainer extends Component {
  render() {
    return (
      <>
        <Header />
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
});
