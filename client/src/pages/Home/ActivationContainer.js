import React, { Component } from "react";
import "../../css/general.css";
import * as configStyles from "../../config/styles";
import { StyleSheet, css } from "aphrodite";

import Header from "../../components/Header";
import ScrollArrow from "../../components/ScrollArrow";
import Button from "../../components/Button";
import LoaderSpinner from "../../components/LoaderSpinner";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAllInfo, uploadStatus } from "../../actions/home.actions";
import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

class ActivationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsCB: false,
      questionsCB: false,
      setsCB: false,
      accessCB: false,
      timerCB: false,
      status: "",
      assessmentID: this.props.match.params.assessmentID,
      data: {},
      subject: this.props.match.params.subject,
    };
  }

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

    const data = {
      assessmentID: this.state.assessmentID,
    };

    this.props.fetchAllInfo(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const { homeReducer } = this.props;

    if (
      prevProps.homeReducer !== homeReducer &&
      homeReducer.fullInfoData !== null
    ) {
      const { fullInfoData } = homeReducer;
      const {
        settings,
        access,
        sets,
        timer,
        totalQuestionNum,
      } = fullInfoData[0];

      let settingsCB = false;
      let questionsCB = false;
      let setsCB = false;
      let accessCB = false;
      let timerCB = false;

      //check settings
      if (settings.testName !== "" && settings.testInstruction !== "") {
        if (settings.passOrFailSelected) {
          if (settings.score !== "" && settings.unit !== "") settingsCB = true;
        }
        if (settings.addGradingSelected) {
          if (
            settings.gradeRange.length > 0 &&
            settings.gradeValue.length > 0 &&
            settings.gradeUnit !== ""
          ) {
            settingsCB = true;
          }
        }
      }

      //check questions
      if (totalQuestionNum > 0) questionsCB = true;

      //check sets
      if (sets.fixedSelected || sets.randomSelected) setsCB = true;
      else if (
        sets.manualSelected &&
        sets.randomTakeFromTotalSelected &&
        sets.randomQuestionNum > 0
      ) {
        setsCB = true;
      } else if (
        sets.manualSelected &&
        sets.definedTakeFromSectionSelected &&
        sets.sectionFilterNum.length > 0
      ) {
        setsCB = true;
      } else setsCB = false;

      //check access
      if (access.link !== "") {
        if (
          access.withAuthenticationSelected &&
          access.accessEmail.length > 0
        ) {
          accessCB = true;
        } else if (access.noAuthenticationSelected) accessCB = true;
        else accessCB = false;
      }

      //check timer
      if (timer.questionTimeSelected || timer.assessmentTimeSelected) {
        if (
          timer.time !== "" &&
          timer.startDate !== null &&
          timer.endDate !== null
        ) {
          timerCB = true;
        }
      } else if (
        timer.noLimitSelected &&
        timer.startDate !== null &&
        timer.endDate !== null
      ) {
        timerCB = true;
      }

      this.setState({
        data: fullInfoData[0],
        settingsCB: settingsCB,
        questionsCB: questionsCB,
        setsCB: setsCB,
        accessCB: accessCB,
        timerCB: timerCB,
      });
    }
  }

  componentWillUnmount() {
    this.props.homeReducer.fullInfoData = null;
    this.props.homeReducer.direct = false;
  }

  onSubmit = (e, text) => {
    e.preventDefault();
    const { settingsCB, questionsCB, setsCB, accessCB, timerCB } = this.state;

    if (!(settingsCB && questionsCB && setsCB && accessCB && timerCB)) {
      return false;
    }
    if (settingsCB && questionsCB && setsCB && accessCB && timerCB) {
      let data = {
        assessmentID: this.state.assessmentID,
        status: text,
      };
      this.props.uploadStatus(data);
    }
  };

  render() {
    const {
      settingsCB,
      questionsCB,
      setsCB,
      accessCB,
      timerCB,
      data,
      subject,
    } = this.state;

    if (this.props.homeReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    if (this.props.homeReducer.direct) {
      this.props.history.push(`/assessment/${subject}`);
    }

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
                      readOnly
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
                      readOnly
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
                      readOnly
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
                      readOnly
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
                      readOnly
                    />
                  </div>
                  <div className={css(styles.textCon)}>
                    <SecondLabel>Timer</SecondLabel>
                  </div>
                </CustomRow>
              </div>
              {data.status === "Setup in progress" && (
                <form
                  className={css(styles.buttonCon)}
                  onSubmit={(e) => this.onSubmit(e, "Activated")}
                >
                  <Button
                    backgroundColor={configStyles.colors.darkBlue}
                    color={configStyles.colors.white}
                    padding={"8px"}
                    type={"submit"}
                    width={"100%"}
                    XWidth={"100%"}
                  >
                    Activate
                  </Button>
                </form>
              )}

              {data.status === "Activated" && (
                <form
                  className={css(styles.buttonCon)}
                  onSubmit={(e) => this.onSubmit(e, "Ended")}
                >
                  <Button
                    backgroundColor={configStyles.colors.red}
                    color={configStyles.colors.white}
                    padding={"8px"}
                    // onClick={}
                    type={"submit"}
                    width={"100%"}
                    XWidth={"100%"}
                  >
                    Deactivate
                  </Button>
                </form>
              )}

              {data.status === "Ended" && (
                <div className={css(styles.buttonCon)}>
                  <SecondLabel>Assessment Ended</SecondLabel>
                </div>
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
  rowCon: {
    width: "100%",
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

ActivationContainer.propTypes = {
  homeReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  fetchAllInfo: PropTypes.func.isRequired,
  uploadStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  homeReducer: state.homeReducer,
});

export default connect(mapStateToProps, {
  fetchAllInfo,
  logout,
  uploadStatus,
})(ActivationContainer);
