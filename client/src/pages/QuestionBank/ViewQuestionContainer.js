import React, { Component } from "react";
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

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAQuestion } from "../../actions/question.actions";

import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";

class ViewQuestionContainer extends Component {
  constructor() {
    super();
    this.state = {
      questionType: "",
      questionDescription: "",
      questionChoices: [],
      questionAnswers: [],
      unConvertedChoices: [],
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
      const description = this.convertQuestionDes(
        questionReducer.questionLoad[0].questions[0].questionDescription
      );

      let choices = null;

      if (
        questionReducer.questionLoad[0].questions[0].questionType !==
        "Descriptive"
      ) {
        choices = this.convertQuestion(
          questionReducer.questionLoad[0].questions[0].questionChoices
        );
      }

      this.setState({
        questionType: questionReducer.questionLoad[0].questions[0].questionType,
        questionDescription: description,
        questionChoices: choices,
        questionAnswers:
          questionReducer.questionLoad[0].questions[0].questionAnswers,
        unConvertedChoices:
          questionReducer.questionLoad[0].questions[0].questionChoices,
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

                  {questionType !== "Descriptive" && (
                    <>
                      <SecondLabel>Question Choices</SecondLabel>
                      {questionChoices.map((choice, index) => {
                        let color =
                          unConvertedChoices[index] === questionAnswers[0] ||
                          unConvertedChoices[index] === questionAnswers[1] ||
                          unConvertedChoices[index] === questionAnswers[2] ||
                          unConvertedChoices[index] === questionAnswers[3] ||
                          unConvertedChoices[index] === questionAnswers[4] ||
                          unConvertedChoices[index] === questionAnswers[5] ||
                          unConvertedChoices[index] === questionAnswers[6] ||
                          unConvertedChoices[index] === questionAnswers[7]
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
                  <div style={{ marginBottom: "25px" }}>
                    <Button
                      backgroundColor={configStyles.colors.darkBlue}
                      color={configStyles.colors.white}
                      padding={"8px"}
                      width={"100px"}
                      onClick={() => {
                        this.props.history.push(`/questionbank`);
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
