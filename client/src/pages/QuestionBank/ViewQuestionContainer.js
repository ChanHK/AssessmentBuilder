import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import "../../css/general.css";
import { StyleSheet, css } from "aphrodite";

import Header from "../../components/Header";
import CustomEditor from "../../components/CustomEditor";
import LoaderSpinner from "../../components/LoaderSpinner";
import * as configStyles from "../../config/styles";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";
import Button from "../../components/Button";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import { fetchAQuestion } from "../../actions/question.actions";
import { logout } from "../../actions/auth.actions";

class ViewQuestionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionType: "",
      questionDescription: "",
      questionChoices: [],
      questionAnswers: [],
      unConvertedChoices: [],
      unConvertedAns: [],
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
      questionID: this.props.match.params.questionID,
    };

    this.props.fetchAQuestion(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const { questionReducer } = this.props;

    if (
      prevProps.questionReducer !== questionReducer &&
      questionReducer.questionLoad !== null &&
      questionReducer.message === undefined
    ) {
      const { questionType } = questionReducer.questionLoad[0].questions[0];
      const { questionAnswers } = questionReducer.questionLoad[0].questions[0];
      const { questionChoices } = questionReducer.questionLoad[0].questions[0];
      const {
        questionDescription,
      } = questionReducer.questionLoad[0].questions[0];

      const description = this.convertQuestionDes(questionDescription);

      let choices = null;
      let ans = null;

      if (questionType !== "Descriptive") {
        choices = this.convertQuestion(questionChoices);
        ans = this.convertQuestion(questionAnswers);
      }

      this.setState({
        questionType: questionType,
        questionDescription: description,
        questionChoices: choices,
        questionAnswers: ans,
        unConvertedAns: questionAnswers,
        unConvertedChoices: questionChoices,
      });
    }
  }

  componentWillUnmount() {
    this.props.questionReducer.questionLoad = null;
  }

  convertQuestionDes = (data) => {
    const contentBlock = htmlToDraft(data);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return EditorState.createWithContent(contentState);
    }
  };

  convertQuestion = (data) => {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      const a = htmlToDraft(data[i]);
      let c = "";
      if (a) {
        const b = ContentState.createFromBlockArray(a.contentBlocks);
        c = EditorState.createWithContent(b);
      }
      result[i] = c;
    }
    return result;
  };

  render() {
    const {
      questionType,
      questionDescription,
      questionChoices,
      questionAnswers,
      unConvertedChoices,
      unConvertedAns,
      subject,
    } = this.state;

    if (this.props.questionReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    if (this.props.questionReducer.questionLoad === null) return false;

    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>View Question</FirstLabel>
              </div>
              <form onSubmit={this.onSubmit}>
                <CustomColumn>
                  <CustomRow>
                    <div className={css(styles.typeCon)}>
                      <SecondLabel marginRight={"10px"}>
                        Question Type :{" "}
                      </SecondLabel>
                      <ThirdLabel>{questionType}</ThirdLabel>
                    </div>
                  </CustomRow>

                  <SecondLabel>Question Description</SecondLabel>
                  <div style={{ paddingBottom: "50px" }}>
                    <CustomEditor
                      editorState={questionDescription}
                      readOnly={true}
                      toolbarHidden={true}
                      minHeight={true}
                    />
                  </div>

                  {questionType !== "Descriptive" && questionType !== "Order" && (
                    <>
                      <SecondLabel>Question Choices</SecondLabel>
                      {questionChoices.map((choice, index) => {
                        let color =
                          unConvertedChoices[index] === unConvertedAns[0] ||
                          unConvertedChoices[index] === unConvertedAns[1] ||
                          unConvertedChoices[index] === unConvertedAns[2] ||
                          unConvertedChoices[index] === unConvertedAns[3] ||
                          unConvertedChoices[index] === unConvertedAns[4] ||
                          unConvertedChoices[index] === unConvertedAns[5] ||
                          unConvertedChoices[index] === unConvertedAns[6] ||
                          unConvertedChoices[index] === unConvertedAns[7]
                            ? true
                            : false;
                        return (
                          <div className={css(styles.row)} key={index}>
                            <CustomEditor
                              editorState={choice}
                              readOnly={true}
                              toolbarHidden={true}
                              minHeight={true}
                              heightAuto={true}
                              isAnswer={color}
                            />
                          </div>
                        );
                      })}
                    </>
                  )}
                  {questionType === "Order" && (
                    <>
                      <SecondLabel>
                        Question Answers (Ascending Order)
                      </SecondLabel>
                      {questionAnswers.map((ans, index) => {
                        let color =
                          unConvertedChoices[index] === unConvertedAns[0] ||
                          unConvertedChoices[index] === unConvertedAns[1] ||
                          unConvertedChoices[index] === unConvertedAns[2] ||
                          unConvertedChoices[index] === unConvertedAns[3] ||
                          unConvertedChoices[index] === unConvertedAns[4] ||
                          unConvertedChoices[index] === unConvertedAns[5] ||
                          unConvertedChoices[index] === unConvertedAns[6] ||
                          unConvertedChoices[index] === unConvertedAns[7]
                            ? true
                            : false;
                        return (
                          <div className={css(styles.row)} key={index}>
                            <CustomEditor
                              editorState={ans}
                              readOnly={true}
                              toolbarHidden={true}
                              minHeight={true}
                              heightAuto={true}
                              isAnswer={color}
                            />
                          </div>
                        );
                      })}
                    </>
                  )}
                  <div style={{ marginBottom: "25px" }}>
                    <Button
                      backgroundColor={configStyles.colors.darkBlue}
                      color={configStyles.colors.white}
                      padding={"8px"}
                      width={"100px"}
                      onClick={() => {
                        this.props.history.push(`/questionbank/${subject}`);
                      }}
                    >
                      Back
                    </Button>
                  </div>
                </CustomColumn>
              </form>
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
    paddingBottom: "75px",
  },
  typeCon: {
    width: "100%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    marginBottom: "25px",
  },
  row: {
    width: "100%",
    height: "auto",
    marginBottom: "25px",
  },
});

ViewQuestionContainer.propTypes = {
  fetchAQuestion: PropTypes.func.isRequired,
  questionReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questionReducer: state.questionReducer,
});

export default connect(mapStateToProps, { fetchAQuestion, logout })(
  ViewQuestionContainer
);
