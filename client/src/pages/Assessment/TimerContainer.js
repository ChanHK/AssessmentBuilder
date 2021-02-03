import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import Radio from "../../components/Radio";
import CustomDropdown from "../../components/CustomDropdown";
import Wrapper from "../../components/Wrapper";
import CustomDatePicker from "../../components/CustomDatePicker";
import Button from "../../components/Button";
import LoaderSpinner from "../../components/LoaderSpinner";

import Hour from "./Data/Hour";
import MinuteSeconds from "./Data/MinuteSeconds";

import { compose } from "redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateAssessmentTimer,
  fetchAssessmentTimer,
} from "../../actions/assessment.actions";

const seconds10 = ["10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];

class TimerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessmentTimeSelected: false,
      questionTimeSelected: false,
      hour: "",
      minute: "",
      second: "",
      noLimitSelected: false,
      startDate: "",
      endDate: "",
      assessmentID: props.assessmentID,
      type: props.type,
      msg: null, //stores error messages
      subject: props.subject,
    };
  }

  componentDidMount() {
    const data = {
      assessmentID: this.state.assessmentID,
    };

    this.props.fetchAssessmentTimer(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const { assessmentReducer } = this.props;

    if (
      prevProps.assessmentReducer !== assessmentReducer &&
      assessmentReducer.assessmentLoad !== null &&
      assessmentReducer.message === undefined
    ) {
      const {
        assessmentTimeSelected,
        questionTimeSelected,
        time,
        noLimitSelected,
        startDate,
        endDate,
      } = assessmentReducer.assessmentLoad;

      this.setState({
        assessmentTimeSelected: assessmentTimeSelected,
        questionTimeSelected: questionTimeSelected,
        hour: assessmentTimeSelected ? time.substring(0, 2) : "",
        minute: time.substring(3, 5),
        second: questionTimeSelected ? time.substring(6, 9) : "",
        noLimitSelected: noLimitSelected,
        startDate: startDate === null ? "" : moment(startDate).toDate(),
        endDate: endDate === null ? "" : moment(endDate).toDate(),
      });
    }
  }

  componentWillUnmount() {
    this.props.assessmentReducer.assessmentLoad = null;
  }

  assessmentTimeOnClick = (e) => {
    if (this.state.type !== "view") {
      this.setState({
        assessmentTimeSelected: e.target.checked,
        questionTimeSelected: false,
        noLimitSelected: false,
        hour: "",
        minute: "",
        second: "",
        msg: null,
      });
    }
  };

  questionTimeOnClick = (e) => {
    if (this.state.type !== "view") {
      this.setState({
        questionTimeSelected: e.target.checked,
        assessmentTimeSelected: false,
        noLimitSelected: false,
        hour: "",
        minute: "",
        second: "",
        msg: null,
      });
    }
  };

  noLimitOnClicked = (e) => {
    if (this.state.type !== "view") {
      this.setState({
        noLimitSelected: e.target.checked,
        assessmentTimeSelected: false,
        questionTimeSelected: false,
        hour: "",
        minute: "",
        second: "",
        msg: null,
      });
    }
  };

  validateForm = (data) => {
    const {
      assessmentTimeSelected,
      questionTimeSelected,
      startDate,
      endDate,
    } = data;
    const { hour, minute, second } = this.state;
    let tempMsg = {};

    if (assessmentTimeSelected) {
      if (hour === "") {
        tempMsg.H = "Please select hour";
      }
      if (minute === "") {
        tempMsg.M = "Please select minute";
      }
    }

    if (questionTimeSelected) {
      if (second === "") {
        tempMsg.S = "Please select second";
      }
      if (minute === "") {
        tempMsg.M = "Please select minute";
      }
    }

    if (startDate === "") {
      tempMsg.SD = "Please select start date";
    }

    if (endDate === "") {
      tempMsg.ED = "Please select end date";
    }

    this.setState({ msg: tempMsg });

    if (Object.keys(tempMsg).length === 0) return true;
    else return false;
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      assessmentTimeSelected,
      questionTimeSelected,
      hour,
      minute,
      second,
      noLimitSelected,
      startDate,
      endDate,
      assessmentID,
    } = this.state;

    let time = "";
    if (assessmentTimeSelected && hour !== "" && minute !== "") {
      time = hour + ":" + minute + ":00";
    } else if (questionTimeSelected && second !== "" && minute !== "") {
      time = "00:" + minute + ":" + second;
    }

    let data = {
      assessmentTimeSelected: assessmentTimeSelected,
      questionTimeSelected: questionTimeSelected,
      time: time,
      noLimitSelected: noLimitSelected,
      startDate: startDate,
      endDate: endDate,
      assessmentID: assessmentID,
    };

    if (this.validateForm(data)) {
      this.props.updateAssessmentTimer(data);
    }
  };

  render() {
    const {
      assessmentTimeSelected,
      questionTimeSelected,
      hour,
      minute,
      second,
      noLimitSelected,
      startDate,
      endDate,
      type,
      msg,
      subject,
    } = this.state;

    if (this.props.assessmentReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    return (
      <form onSubmit={this.onSubmit} style={{ marginBottom: "300px" }}>
        <SecondLabel>Duration</SecondLabel>
        <div className={css(styles.bar)}>
          <CustomColumn>
            <CustomRow>
              <div className={css(styles.radionCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Radio
                    checked={assessmentTimeSelected}
                    onChange={this.assessmentTimeOnClick}
                  />
                </div>
                <ThirdLabel>
                  Time to complete the assessment (hours : minutes)
                </ThirdLabel>
              </div>
            </CustomRow>
            {assessmentTimeSelected && (
              <div style={{ marginLeft: "45px", marginBottom: "25px" }}>
                <Wrapper
                  firstHeight={"60px"}
                  secHeight={"120px"}
                  widthChange={1425}
                >
                  <div className={css(styles.block)}>
                    <CustomColumn>
                      <CustomDropdown
                        options={Hour}
                        placeholder={"Select hour"}
                        value={hour}
                        onChange={(e) => this.setState({ hour: e.value })}
                        disabled={type === "view" ? true : false}
                      />
                      <span className={css(styles.redText)}>
                        {msg === null
                          ? null
                          : msg.hasOwnProperty("H")
                          ? "*" + msg.H
                          : null}
                      </span>
                    </CustomColumn>
                  </div>
                  <div className={css(styles.block)}>
                    <CustomColumn>
                      <CustomDropdown
                        options={MinuteSeconds}
                        placeholder={"Select minute"}
                        value={minute}
                        onChange={(e) => this.setState({ minute: e.value })}
                        disabled={type === "view" ? true : false}
                      />
                      <span className={css(styles.redText)}>
                        {msg === null
                          ? null
                          : msg.hasOwnProperty("M")
                          ? "*" + msg.M
                          : null}
                      </span>
                    </CustomColumn>
                  </div>
                </Wrapper>
              </div>
            )}
            <CustomRow>
              <div className={css(styles.radionCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Radio
                    checked={questionTimeSelected}
                    onChange={this.questionTimeOnClick}
                  />
                </div>
                <ThirdLabel>
                  Time to complete each question (minutes : seconds)
                </ThirdLabel>
              </div>
            </CustomRow>
            {questionTimeSelected && (
              <div style={{ marginLeft: "45px", marginBottom: "25px" }}>
                <Wrapper
                  firstHeight={"60px"}
                  secHeight={"120px"}
                  widthChange={1425}
                >
                  <div className={css(styles.block)}>
                    <CustomColumn>
                      <CustomDropdown
                        options={MinuteSeconds}
                        placeholder={"Select minutes"}
                        value={minute}
                        onChange={(e) => this.setState({ minute: e.value })}
                        disabled={type === "view" ? true : false}
                      />
                      <span className={css(styles.redText)}>
                        {msg === null
                          ? null
                          : msg.hasOwnProperty("M")
                          ? "*" + msg.M
                          : null}
                      </span>
                    </CustomColumn>
                  </div>
                  <div className={css(styles.block)}>
                    <CustomColumn>
                      <CustomDropdown
                        options={seconds10}
                        placeholder={"Select seconds"}
                        value={second}
                        onChange={(e) => this.setState({ second: e.value })}
                        disabled={type === "view" ? true : false}
                      />
                      <span className={css(styles.redText)}>
                        {msg === null
                          ? null
                          : msg.hasOwnProperty("S")
                          ? "*" + msg.S
                          : null}
                      </span>
                    </CustomColumn>
                  </div>
                </Wrapper>
              </div>
            )}
            <CustomRow>
              <div className={css(styles.radionCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Radio
                    checked={noLimitSelected}
                    onChange={this.noLimitOnClicked}
                  />
                </div>
                <ThirdLabel>No time limit</ThirdLabel>
              </div>
            </CustomRow>
          </CustomColumn>
        </div>

        <SecondLabel>Availability</SecondLabel>
        <div className={css(styles.bar)}>
          <Wrapper firstHeight={"100px"} secHeight={"200px"} widthChange={1175}>
            <div className={css(styles.timeBlock)}>
              <div>
                <CustomColumn>
                  <ThirdLabel>Start Date and Time</ThirdLabel>
                  <CustomDatePicker
                    selected={startDate}
                    onChange={(e) => this.setState({ startDate: e })}
                    placeholderText={"Select start date"}
                    startDate={startDate}
                    endDate={endDate}
                    selectsStart={true}
                    selectsEnd={false}
                    readOnly={type === "view" ? true : false}
                  />
                  <span className={css(styles.redText)}>
                    {msg === null
                      ? null
                      : msg.hasOwnProperty("SD")
                      ? "*" + msg.SD
                      : null}
                  </span>
                </CustomColumn>
              </div>
            </div>

            <div className={css(styles.timeBlock)}>
              <div>
                <CustomColumn>
                  <ThirdLabel>End Date and Time</ThirdLabel>
                  <CustomDatePicker
                    selected={endDate}
                    onChange={(e) => this.setState({ endDate: e })}
                    placeholderText={"Select end date"}
                    startDate={startDate}
                    endDate={endDate}
                    selectsStart={false}
                    selectsEnd={true}
                    readOnly={type === "view" ? true : false}
                  />
                  <span className={css(styles.redText)}>
                    {msg === null
                      ? null
                      : msg.hasOwnProperty("ED")
                      ? "*" + msg.ED
                      : null}
                  </span>
                </CustomColumn>
              </div>
            </div>
          </Wrapper>
        </div>

        <div className={css(styles.buttonCon)}>
          {type !== "view" && (
            <div style={{ marginRight: "15px" }}>
              <Button
                backgroundColor={configStyles.colors.darkBlue}
                color={configStyles.colors.white}
                padding={"8px"}
                width={"100px"}
                type={"submit"}
              >
                Save
              </Button>
            </div>
          )}
          <div>
            <Button
              backgroundColor={configStyles.colors.white}
              color={configStyles.colors.darkBlue}
              padding={"8px"}
              width={"100px"}
              type={"button"}
              onClick={() => {
                this.props.history.push(`/assessment/${subject}`);
              }}
            >
              Back
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    width: "100%",
    padding: "20px 20px",
    border: "2px solid",
    borderRadius: "5px",
    borderColor: configStyles.colors.black,
    marginBottom: "50px",
  },
  radionCon: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    marginBottom: "20px",
  },
  block: {
    flexWrap: "nowrap",
    width: "400px",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  timeBlock: {
    flexWrap: "nowrap",
    width: "350px",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  redText: {
    color: configStyles.colors.inputErrorRed,
    fontFamily: "Ubuntu-Regular",
    fontSize: "15px",
  },
  buttonCon: {
    width: "100%",
    height: "auto",
    justifyContent: "flex-end",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
});

TimerContainer.propTypes = {
  updateAssessmentTimer: PropTypes.func.isRequired,
  fetchAssessmentTimer: PropTypes.func.isRequired,
  assessmentReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  assessmentReducer: state.assessmentReducer,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { updateAssessmentTimer, fetchAssessmentTimer })
)(TimerContainer);
