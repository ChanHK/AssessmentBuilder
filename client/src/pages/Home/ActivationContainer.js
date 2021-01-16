import React, { Component } from "react";
import "../../css/general.css";
import * as configStyles from "../../config/styles";
import { StyleSheet, css } from "aphrodite";

import Header from "../../components/Header";
import ScrollArrow from "../../components/ScrollArrow";
import Button from "../../components/Button";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";

class ActivationContainer extends Component {
  constructor() {
    super();
    this.state = {
      settingsCB: false,
      questionsCB: false,
      setsCB: false,
      accessCB: false,
      timerCB: false,
      status: "",
    };
  }

  render() {
    const { settingsCB, questionsCB, setsCB, accessCB, timerCB } = this.state;
    return (
      <>
        <Header />
        <ScrollArrow />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Activation</FirstLabel>
              </div>

              <div className={css(styles.rowCon)}>
                <CustomRow>
                  <div className={css(styles.checkboxCon)}>
                    <input
                      type="checkbox"
                      checked={settingsCB}
                      className={css(styles.checkbox)}
                    />
                  </div>
                  <div className={css(styles.textCon)}>
                    <SecondLabel>Settings</SecondLabel>
                  </div>
                </CustomRow>
              </div>

              <div className={css(styles.rowCon)}>
                <CustomRow>
                  <div className={css(styles.checkboxCon)}>
                    <input
                      type="checkbox"
                      checked={questionsCB}
                      className={css(styles.checkbox)}
                    />
                  </div>
                  <div className={css(styles.textCon)}>
                    <SecondLabel>Questions</SecondLabel>
                  </div>
                </CustomRow>
              </div>

              <div className={css(styles.rowCon)}>
                <CustomRow>
                  <div className={css(styles.checkboxCon)}>
                    <input
                      type="checkbox"
                      checked={setsCB}
                      className={css(styles.checkbox)}
                    />
                  </div>
                  <div className={css(styles.textCon)}>
                    <SecondLabel>Sets</SecondLabel>
                  </div>
                </CustomRow>
              </div>

              <div className={css(styles.rowCon)}>
                <CustomRow>
                  <div className={css(styles.checkboxCon)}>
                    <input
                      type="checkbox"
                      checked={accessCB}
                      className={css(styles.checkbox)}
                    />
                  </div>
                  <div className={css(styles.textCon)}>
                    <SecondLabel>Access</SecondLabel>
                  </div>
                </CustomRow>
              </div>

              <div className={css(styles.rowCon)}>
                <CustomRow>
                  <div className={css(styles.checkboxCon)}>
                    <input
                      type="checkbox"
                      checked={timerCB}
                      className={css(styles.checkbox)}
                    />
                  </div>
                  <div className={css(styles.textCon)}>
                    <SecondLabel>Timer</SecondLabel>
                  </div>
                </CustomRow>
              </div>

              <div className={css(styles.buttonCon)}>
                <Button
                  backgroundColor={configStyles.colors.darkBlue}
                  color={configStyles.colors.white}
                  padding={"8px"}
                  // onClick={}
                  type={"button"}
                  width={"100%"}
                  XWidth={"100%"}
                >
                  Activate
                </Button>
              </div>

              <div className={css(styles.buttonCon)}>
                <Button
                  backgroundColor={configStyles.colors.red}
                  color={configStyles.colors.white}
                  padding={"8px"}
                  // onClick={}
                  type={"button"}
                  width={"100%"}
                  XWidth={"100%"}
                >
                  Deactivate
                </Button>
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
  rowCon: {
    width: "100%",
    // backgroundColor: "plum",
    height: "60px",
  },
  checkboxCon: {
    width: "100px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    width: "30px",
    height: "30px",
  },
  textCon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2px",
  },
  buttonCon: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
  },
});

export default ActivationContainer;
