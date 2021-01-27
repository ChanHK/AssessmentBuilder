import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import CustomSubLabel from "../../components/FormComponents/CustomSubLabel";

import ScrollArrow from "../../components/ScrollArrow";
import CustomEditor from "../../components/CustomEditor";
import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";
import LoaderSpinner from "../../components/LoaderSpinner";

import { EditorState, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import moment from "moment";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchAssessmentInfo,
  candidateRegister,
  candidateRegister2,
} from "../../actions/candidate.actions";

// import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";
import { clearErrors } from "../../actions/error.actions";

class StartingPageContainer extends Component {
  constructor() {
    super();
    this.state = {
      assessmentTitle: "",
      instruction: EditorState.createEmpty(),
      name: "",
      email: "",
      accessCode: "",
      msg: null, // receives error messages from API
      withAuthenticationSelected: false, //does the user needs authentication ?
      setLength: 0, // size of the set
      type: "", // random? fixed? or manual
      time: "",
      timeSettings: "",
      attemptNum: 0, // number of attempts that a candidate can do
      status: "", // status of the assessment (setup, activated or ended)
      startDate: "",
      endDate: "",
    };
  }

  componentDidMount() {
    // if (localStorage.getItem("token")) {
    //   const token = localStorage.getItem("token");
    //   const decoded = jwt_decode(token);
    //   const currentTime = Date.now() / 1000;
    //   if (decoded.exp < currentTime) {
    //     this.props.logout();
    //     // this.props.history.push("/login"); ###push to error page
    //   }
    // }
    const data = {
      assessmentID: this.props.match.params.assessmentID,
    };

    this.props.fetchAssessmentInfo(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const { candidateReducer } = this.props;

    if (
      prevProps.candidateReducer !== candidateReducer &&
      candidateReducer.assessmentStartInfo !== null
    ) {
      const {
        testName,
        testInstruction,
      } = candidateReducer.assessmentStartInfo.settings;

      const {
        withAuthenticationSelected,
        attemptNum,
      } = candidateReducer.assessmentStartInfo.access;

      const {
        totalSetNum,
        fixedSelected,
        randomSelected,
        manualSelected,
        manualRandomSelected,
      } = candidateReducer.assessmentStartInfo.sets;

      const {
        assessmentTimeSelected,
        questionTimeSelected,
        noLimitSelected,
        time,
        startDate,
        endDate,
      } = candidateReducer.assessmentStartInfo.timer;

      const { status } = candidateReducer.assessmentStartInfo;

      if (fixedSelected) this.setState({ type: 1 });
      if (randomSelected) this.setState({ type: 2 });
      if (manualSelected) this.setState({ type: 3 });
      if (manualRandomSelected) this.setState({ type: 4 });

      if (assessmentTimeSelected) this.setState({ timeSettings: 1 });
      if (questionTimeSelected) this.setState({ timeSettings: 2 });
      if (noLimitSelected) this.setState({ timeSettings: 3 });

      let temp = this.convert(testInstruction);

      let hour = time.substring(0, 2);
      let minute = time.substring(3, 5);
      let second = time.substring(6, 9);

      let totalSec =
        parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(second);

      this.setState({
        assessmentTitle: testName,
        instruction: temp,
        withAuthenticationSelected: withAuthenticationSelected,
        setLength: totalSetNum,
        time: totalSec.toString(),
        attemptNum: parseInt(attemptNum),
        status: status,
        startDate: startDate,
        endDate: endDate,
      });
    }

    const { errors } = this.props;
    if (prevProps.errors !== errors && errors.message !== undefined) {
      this.setState({ msg: errors.message });
    }
  }

  componentWillUnmount() {
    this.props.candidateReducer.assessmentStartInfo = null;
    this.props.candidateReducer.direct = false;
    this.props.clearErrors();
  }

  convert = (data) => {
    const contentBlock = htmlToDraft(data);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return EditorState.createWithContent(contentState);
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      email,
      accessCode,
      withAuthenticationSelected,
      attemptNum,
    } = this.state;

    const data = {
      assessmentID: this.props.match.params.assessmentID,
      name: name,
      email: email,
      accessCode: accessCode,
      attemptNum: attemptNum,
    };

    if (withAuthenticationSelected) this.props.candidateRegister(data);
    else this.props.candidateRegister2(data);
  };

  render() {
    const {
      assessmentTitle,
      instruction,
      name,
      email,
      accessCode,
      msg,
      withAuthenticationSelected,
      setLength,
      type,
      timeSettings,
      time,
      status,
      startDate,
      endDate,
    } = this.state;

    const {
      direct,
      assessmentStartInfo,
      isLoading,
    } = this.props.candidateReducer;

    if (direct) {
      let temp = [];

      for (let i = 0; i < setLength; i++) {
        temp.push(i);
      }

      let set = temp[Math.floor(Math.random() * temp.length)];

      localStorage.setItem("time", time);
      this.props.history.push(
        `/assessment/attempt/${set}/${type}/${timeSettings}/${time}/${this.props.match.params.assessmentID}`
      );
    }

    if (isLoading || assessmentStartInfo === null) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    const today = new Date();
    let SD = moment(startDate).toDate();
    let ED = moment(endDate).toDate();

    if (status !== "Activated") {
      return (
        <>
          <CustomFullContainer>
            <CustomMidContainer>
              <div className={css(styles.whiteCon)}>
                <FirstLabel>Assessment not available</FirstLabel>
              </div>
            </CustomMidContainer>
          </CustomFullContainer>
        </>
      );
    } else if (!(today >= SD && today <= ED)) {
      return (
        <>
          <CustomFullContainer>
            <CustomMidContainer>
              <div className={css(styles.whiteCon)}>
                <FirstLabel>Assessment not available</FirstLabel>
              </div>
            </CustomMidContainer>
          </CustomFullContainer>
        </>
      );
    }

    return (
      <>
        <ScrollArrow />
        <CustomFullContainer>
          <CustomMidContainer>
            <form className={css(styles.whiteCon)} onSubmit={this.onSubmit}>
              <CustomColumn>
                <div style={{ flexDirection: "row", marginBottom: "25px" }}>
                  <h4 className={css(styles.text)}>{assessmentTitle}</h4>
                </div>
                <CustomSubLabel>Instructions</CustomSubLabel>
                <div style={{ marginBottom: "25px" }}>
                  <CustomEditor
                    toolbarHidden={true}
                    readOnly={true}
                    heightAuto={true}
                    editorState={instruction}
                  />
                </div>

                <CustomSubLabel>Candidate Name</CustomSubLabel>
                <div style={{ marginBottom: "25px" }}>
                  <CustomColumn>
                    <CustomInput
                      name={"name"}
                      type={"text"}
                      onChangeValue={this.onChange}
                      placeholder={"Enter your name"}
                      value={name}
                    />
                    <span className={css(styles.redText)}>
                      {msg === null
                        ? null
                        : msg.hasOwnProperty("name")
                        ? "*" + msg.name
                        : null}
                    </span>
                  </CustomColumn>
                </div>
                <CustomSubLabel>Candidate Email</CustomSubLabel>
                <div style={{ marginBottom: "25px" }}>
                  <CustomColumn>
                    <CustomInput
                      name={"email"}
                      type={"text"}
                      onChangeValue={this.onChange}
                      placeholder={"Enter your email"}
                      value={email}
                    />
                    <span className={css(styles.redText)}>
                      {msg === null
                        ? null
                        : msg.hasOwnProperty("email")
                        ? "*" + msg.email
                        : null}
                    </span>
                  </CustomColumn>
                </div>

                {withAuthenticationSelected && (
                  <>
                    <CustomSubLabel>Candidate Access Code</CustomSubLabel>

                    <div style={{ marginBottom: "25px" }}>
                      <CustomInput
                        name={"accessCode"}
                        type={"text"}
                        onChangeValue={this.onChange}
                        placeholder={"Enter your access code"}
                        value={accessCode}
                        maxLength={10}
                      />
                    </div>
                  </>
                )}

                <div className={css(styles.redText)}>
                  {msg === null
                    ? null
                    : msg.hasOwnProperty("message")
                    ? "*" + msg.message
                    : null}
                </div>

                <div style={{ marginBottom: "250px" }}>
                  <Button
                    backgroundColor={configStyles.colors.darkBlue}
                    color={configStyles.colors.white}
                    padding={"8px"}
                    width={"100px"}
                    type={"submit"}
                  >
                    Start Test
                  </Button>
                </div>
              </CustomColumn>
            </form>
          </CustomMidContainer>
        </CustomFullContainer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  whiteCon: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100px",
    padding: "0px 20px",
    height: "auto",
  },
  text: {
    flexShrink: 1,
    color: configStyles.colors.black,
    fontSize: "20px",
    fontFamily: "Ubuntu-Bold",
    width: "100%",
    display: "flex",
    height: "auto",
    backgroundColor: "inherit",
  },
  redText: {
    color: configStyles.colors.inputErrorRed,
    fontFamily: "Ubuntu-Regular",
    fontSize: "15px",
  },
});

StartingPageContainer.propTypes = {
  fetchAssessmentInfo: PropTypes.func.isRequired,
  candidateReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  candidateRegister: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  candidateRegister2: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  candidateReducer: state.candidateReducer,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  fetchAssessmentInfo,
  logout,
  candidateRegister,
  clearErrors,
  candidateRegister2,
})(StartingPageContainer);
