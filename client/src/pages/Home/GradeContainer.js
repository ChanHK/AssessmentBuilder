import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import "../../css/general.css";
import * as configStyles from "../../config/styles";

import Header from "../../components/Header";
import TextArea from "../../components/TextArea";
import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";
import LoaderSpinner from "../../components/LoaderSpinner";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import validator from "validator";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchDesResponses,
  uploadFeedback,
  fetchAGrade,
} from "../../actions/home.actions";
import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

class GradeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionID: this.props.match.params.questionID,
      assessmentID: this.props.match.params.assessmentID,
      payload: [],
      score: {},
      isEmpty: false,
      gradeData: {},
      msg: null, //store error messages
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
      questionID: this.state.questionID,
      assessmentID: this.state.assessmentID,
    };

    this.props.fetchDesResponses(data);
    this.props.fetchAGrade(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const { homeReducer } = this.props;

    if (
      prevProps.homeReducer !== homeReducer &&
      homeReducer.desResponses !== null &&
      homeReducer.grade !== null
    ) {
      const { desResponses, grade } = homeReducer;

      if (desResponses.length > 0) {
        let temp = desResponses;

        if (typeof temp[0].response.questionDescription !== "object") {
          temp[0].response.questionDescription = this.convertHtml(
            temp[0].response.questionDescription
          );
        }

        let score = {
          assessments_id: temp[0].assessments_id,
          cand_id: temp[0]._id,
          question_id: temp[0].response.question_id,
          feedback: "",
          score: "",
        };

        this.setState({ payload: temp, score: score, gradeData: grade });
      } else this.setState({ isEmpty: true });
    }
  }

  componentWillUnmount() {
    this.props.homeReducer.desResponses = null;
    this.props.homeReducer.grade = null;
  }

  convertHtml = (data) => {
    const contentBlock = htmlToDraft(data);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return EditorState.createWithContent(contentState);
    }
  };

  validateForm = (data) => {
    const { payload } = this.state;
    const { score } = data;
    let tempMsg = {};

    const con_data_sco = parseFloat(score);
    const payload_sco = payload[0].response.score;

    if (score === "") tempMsg.sco = "Please enter score field";
    else if (validator.isAlpha(score)) {
      tempMsg.sco = `Please enter numbers only`;
    } else {
      if (
        validator.isDecimal(score, { decimal_digits: "1,2" }) ||
        validator.isInt(score)
      ) {
        if (!(con_data_sco >= 0 && con_data_sco <= payload_sco)) {
          tempMsg.sco = `Please enter number between 0 and ${payload_sco}`;
        }
      } else {
        tempMsg.sco = `Please enter valid score, eg: 1, 1.5, 2.00`;
      }
    }
    this.setState({ msg: tempMsg });

    if (Object.keys(tempMsg).length === 0) return true;
    else return false;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { score, gradeData } = this.state;

    const data = {
      assessments_id: score.assessments_id,
      cand_id: score.cand_id,
      question_id: score.question_id,
      feedback: score.feedback,
      score: score.score,
      gradeData: gradeData,
    };

    if (this.validateForm(data)) this.props.uploadFeedback(data);
  };

  render() {
    const { payload, score, isEmpty, assessmentID, msg, subject } = this.state;

    if (this.props.homeReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    if (isEmpty) {
      this.props.history.push(
        `/assessment/descriptive/responses/${assessmentID}/${subject}`
      );
    }

    if (payload.length === 0) return false;

    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Grade Responses</FirstLabel>
              </div>
              <SecondLabel>Question Description</SecondLabel>
              <div style={{ paddingBottom: "50px" }}>
                <Editor
                  editorState={payload[0].response.questionDescription}
                  toolbarHidden={true}
                  readOnly
                  editorClassName={css(styles.editorClassName)}
                />
              </div>
              <SecondLabel>Responses</SecondLabel>
              <form className={css(styles.bar)} onSubmit={this.onSubmit}>
                <CustomColumn>
                  <ThirdLabel>{`Name: ${payload[0].name}`}</ThirdLabel>
                  <ThirdLabel>{`Email: ${payload[0].email}`}</ThirdLabel>
                  <ThirdLabel>Answer:</ThirdLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <TextArea
                      type={"text"}
                      value={payload[0].response.response}
                      minHeight={"100px"}
                      readOnly={true}
                      backgroundColor={configStyles.colors.lightOrange}
                    />
                  </div>

                  <ThirdLabel>{`Score Assigned (Max ${payload[0].response.score} marks): `}</ThirdLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <CustomColumn>
                      <CustomInput
                        type={"text"}
                        placeholder={"Enter score"}
                        onChangeValue={(e) => {
                          this.setState({
                            score: { ...score, score: e.target.value },
                          });
                        }}
                        value={score.score}
                      />
                      <span className={css(styles.redText)}>
                        {msg === null
                          ? null
                          : msg.hasOwnProperty("sco")
                          ? "*" + msg.sco
                          : null}
                      </span>
                    </CustomColumn>
                  </div>

                  <ThirdLabel>Feedback (Optional):</ThirdLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <TextArea
                      type={"text"}
                      value={score.feedback}
                      onChange={(e) => {
                        this.setState({
                          score: { ...score, feedback: e.target.value },
                        });
                      }}
                      placeholder={"Enter your feedback here"}
                      height={"100px"}
                      maxLenth={100}
                    />
                  </div>
                  <Button
                    backgroundColor={configStyles.colors.darkBlue}
                    color={configStyles.colors.white}
                    padding={"8px"}
                    width={"100px"}
                    type={"submit"}
                  >
                    Confirm
                  </Button>
                </CustomColumn>
              </form>

              <div style={{ marginBottom: "100px" }}>
                <Button
                  backgroundColor={configStyles.colors.darkBlue}
                  color={configStyles.colors.white}
                  padding={"8px"}
                  width={"100px"}
                  onClick={() => {
                    this.props.history.push(
                      `/assessment/descriptive/responses/${assessmentID}`
                    );
                  }}
                >
                  Back
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
  bar: {
    border: "2px solid black",
    display: "flex",
    width: "100%",
    height: "auto",
    marginBottom: "50px",
    borderRadius: "5px",
    padding: "20px 30px 20px 30px",
  },
  editorClassName: {
    borderRadius: "5px",
    borderColor: configStyles.colors.black,
    border: "2px solid",
    width: "100%",
    height: "auto",
    padding: "10px 20px",
  },
  redText: {
    color: configStyles.colors.inputErrorRed,
    fontFamily: "Ubuntu-Regular",
    fontSize: "15px",
  },
});

GradeContainer.propTypes = {
  logout: PropTypes.func.isRequired,
  fetchDesResponses: PropTypes.func.isRequired,
  homeReducer: PropTypes.object.isRequired,
  uploadFeedback: PropTypes.func.isRequired,
  fetchAGrade: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ homeReducer: state.homeReducer });

export default connect(mapStateToProps, {
  logout,
  fetchDesResponses,
  uploadFeedback,
  fetchAGrade,
})(GradeContainer);
