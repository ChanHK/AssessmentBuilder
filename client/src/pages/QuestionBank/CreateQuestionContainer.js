import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";
import "../../css/general.css";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import QuestionType from "./Data/QuestionType";

import Header from "../../components/Header";
import CustomDropdown from "../../components/CustomDropdown";
import Button from "../../components/Button";
import ChoiceRow from "../../components/ChoiceRow";
import ShortAns from "../../components/ShortAns";
import TrueFalse from "../../components/TrueFalse";
import CustomEditor from "../../components/CustomEditor";
import ScrollArrow from "../../components/ScrollArrow";
import LoaderSpinner from "../../components/LoaderSpinner";

import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateQuestion, fetchAQuestion } from "../../actions/question.actions";
import { clearSucMsg } from "../../actions/sucMsg.actions";
import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

class CreateQuestionContainer extends Component {
  constructor() {
    super();
    this.state = {
      questionType: "",
      questionDescription: EditorState.createEmpty(),
      questionAns: [],
      questionChoices: [],
      checkboxNum: null,
      temporaryArray: [],
      successMsg: null,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        this.props.logout();
        this.props.history.push("/login");
      }
    }

    if (this.props.match.params.type === "edit") {
      const data = {
        questionID: this.props.match.params.questionID,
      };

      this.props.fetchAQuestion(data);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.successMsg !== null && this.state.successMsg !== undefined) {
      this.props.history.push("/questionBank");
    }
    if (prevProps.sucMsg !== this.props.sucMsg) {
      this.setState({
        successMsg: this.props.sucMsg.message.message,
      });
    }

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
      let ans = null;

      if (
        questionReducer.questionLoad[0].questions[0].questionType !==
        "Descriptive"
      ) {
        choices = this.convertQuestion(
          questionReducer.questionLoad[0].questions[0].questionChoices
        );
        ans = this.convertQuestion(
          questionReducer.questionLoad[0].questions[0].questionAnswers
        );
      }

      this.setState({
        questionType: questionReducer.questionLoad[0].questions[0].questionType,
        questionDescription: description,
        questionChoices: choices,
        questionAnswers: ans,
      });
    }
  }

  componentWillUnmount() {
    this.props.clearSucMsg();
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

  onChangeType = (e) => {
    this.setState({
      questionType: e.value,
      questionAns: [],
      questionChoices: [],
      checkboxNum: null,
      temporaryArray: [],
    });
  };

  onChangeAnswer = (value, index) => {
    this.setState({
      questionAns: [
        ...this.state.questionAns.slice(0, index),
        value,
        ...this.state.questionAns.slice(index + 1),
      ],
    });
  };

  onChangeChoice = (value, index) => {
    this.setState({
      questionChoices: [
        ...this.state.questionChoices.slice(0, index),
        value,
        ...this.state.questionChoices.slice(index + 1),
      ],
    });
  };

  setTFChoiceAns = (e) => {
    this.setState({
      questionAns: [e.target.value],
      questionChoices: ["true", "false"],
    });
  };

  setChoiceSingleAns = (index) => {
    this.setState({
      questionAns: [this.state.questionChoices[index]],
      checkboxNum: index,
    });
  };

  setChoiceMultiAns = (e, index, item) => {
    if (e.target.checked) {
      this.setState({
        temporaryArray: this.state.temporaryArray.concat(
          draftToHtml(convertToRaw(item.getCurrentContent()))
        ),
        questionAns: this.state.questionAns.concat(item),
      });
    } else {
      const temp = draftToHtml(convertToRaw(item.getCurrentContent()));
      if (this.state.temporaryArray.includes(temp)) {
        const i = this.state.temporaryArray.indexOf(temp);
        this.state.questionAns.splice(i, 1);
        this.state.temporaryArray.splice(i, 1);

        this.setState({
          questionAns: this.state.questionAns,
          temporaryArray: this.state.temporaryArray,
        });
      }
    }
  };

  deleteRow = (index, type, item = null) => {
    if (type === "Choice") {
      this.state.questionChoices.splice(index, 1);
      this.setState({
        questionChoices: this.state.questionChoices,
      });
    }
    if (type === "Ans") {
      this.state.questionAns.splice(index, 1);
      this.setState({
        questionAns: this.state.questionAns,
      });
    }
    // when delete a row, the answer that might be checked need to be remove
    if (item !== null) {
      const temp = draftToHtml(convertToRaw(item.getCurrentContent()));
      let tempArray = [];
      for (let x = 0; x < this.state.questionAns.length; x++) {
        tempArray = tempArray.concat(
          draftToHtml(
            convertToRaw(this.state.questionAns[x].getCurrentContent())
          )
        );
      }
      if (tempArray.includes(temp)) {
        const i = tempArray.indexOf(temp);
        this.state.questionAns.splice(i, 1);
        this.setState({ questionAns: this.state.questionAns });
      }
    }
  };

  addRow = (type) => {
    if (type === "Choice") {
      if (this.state.questionChoices.length < 8) {
        this.setState({
          questionChoices: this.state.questionChoices.concat(""),
        });
      }
    }
    if (type === "Ans") {
      if (this.state.questionAns.length < 8) {
        this.setState({
          questionAns: this.state.questionAns.concat(""),
        });
      }
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      questionType,
      questionDescription,
      questionAns,
      questionChoices,
    } = this.state;

    let ans = [];
    let choice = [];

    if (
      questionType === "Single Choice" ||
      questionType === "Multiple Choice"
    ) {
      for (let i = 0; i < questionChoices.length; i++) {
        choice.push(
          draftToHtml(convertToRaw(questionChoices[i].getCurrentContent()))
        );
      }

      for (let j = 0; j < questionAns.length; j++)
        ans.push(draftToHtml(convertToRaw(questionAns[j].getCurrentContent())));
    } else if (questionType === "Order" || questionType === "Short Answer") {
      for (let j = 0; j < questionAns.length; j++)
        ans.push(draftToHtml(convertToRaw(questionAns[j].getCurrentContent())));
    } else {
      ans = questionAns;
      choice = questionChoices;
    }

    const data = {
      questionType: questionType,
      questionDescription: draftToHtml(
        convertToRaw(questionDescription.getCurrentContent())
      ),
      questionChoices: choice,
      questionAnswers: ans,
    };

    if (questionType === "Order") data.questionChoices = ans;
    else if (questionType === "Short Answer") data.questionChoices = ans;
    else if (questionType === "Descriptive") {
      data.questionChoices = null;
      data.questionAnswers = null;
    }

    if (this.props.match.params.type === "edit") {
    } else this.props.updateQuestion(data);
  };

  render() {
    const {
      questionType,
      questionDescription,
      questionAns,
      questionChoices,
      checkboxNum,
    } = this.state;

    if (this.props.questionReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    if (this.props.match.params.type === "edit") {
      if (this.props.questionReducer.questionLoad === null) return false;
    }

    return (
      <>
        <Header />
        <ScrollArrow />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                {this.props.match.params.type === "edit" ? (
                  <FirstLabel>Edit Question</FirstLabel>
                ) : (
                  <FirstLabel>Create Question</FirstLabel>
                )}
              </div>
              <form onSubmit={this.onSubmit}>
                <CustomColumn>
                  {this.props.match.params.type === "edit" ? (
                    <CustomRow>
                      <div className={css(styles.typeCon)}>
                        <SecondLabel marginRight={"10px"}>
                          Question Type :{" "}
                        </SecondLabel>
                        <ThirdLabel>{questionType}</ThirdLabel>
                      </div>
                    </CustomRow>
                  ) : (
                    <>
                      <SecondLabel>Question Type</SecondLabel>
                      <div style={{ paddingBottom: "50px" }}>
                        <CustomDropdown
                          options={QuestionType}
                          placeholder={"Select question type"}
                          value={questionType}
                          onChange={this.onChangeType}
                        />
                      </div>
                    </>
                  )}

                  <SecondLabel>Question Description</SecondLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <CustomEditor
                      onEditorStateChange={(e) =>
                        this.setState({ questionDescription: e })
                      }
                      editorState={questionDescription}
                    />
                  </div>

                  {questionType === "Single Choice" && (
                    <>
                      <div style={{ paddingBottom: "25px" }}>
                        <Button
                          backgroundColor={configStyles.colors.darkBlue}
                          color={configStyles.colors.white}
                          padding={"8px"}
                          onClick={() => this.addRow("Choice")}
                          type={"button"}
                        >
                          Add Choice
                        </Button>
                      </div>
                      <div style={{ paddingBottom: "25px" }}>
                        {questionChoices.map((item, index) => (
                          <div key={index}>
                            <ChoiceRow
                              count={index + 1}
                              onClick={() => this.deleteRow(index, "Choice")}
                              editorState={item}
                              onChange={(e) => this.onChangeChoice(e, index)}
                              choiceName={"choice"}
                              checkedValue={index}
                              onChangeValue={() =>
                                this.setChoiceSingleAns(index)
                              }
                              checked={checkboxNum}
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {questionType === "Multiple Choice" && (
                    <>
                      <div style={{ paddingBottom: "25px" }}>
                        <Button
                          backgroundColor={configStyles.colors.darkBlue}
                          color={configStyles.colors.white}
                          padding={"8px"}
                          onClick={() => this.addRow("Choice")}
                          type={"button"}
                        >
                          Add Choice
                        </Button>
                      </div>
                      <div style={{ paddingBottom: "25px" }}>
                        {questionChoices.map((item, index) => (
                          <div key={index}>
                            <ChoiceRow
                              count={index + 1}
                              onClick={() =>
                                this.deleteRow(index, "Choice", item)
                              }
                              editorState={item}
                              onChange={(e) => this.onChangeChoice(e, index)}
                              choiceName={"choice"}
                              checkedValue={index}
                              onChangeValue={(e) =>
                                this.setChoiceMultiAns(e, index, item)
                              }
                              checked={checkboxNum}
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {questionType === "Descriptive" && (
                    <>
                      <div style={{ paddingBottom: "25px" }}>
                        <ThirdLabel>
                          The answer will be retrieved from the candidates after
                          they have attempted your assessment
                        </ThirdLabel>
                      </div>
                    </>
                  )}

                  {questionType === "True or False" && (
                    <>
                      <SecondLabel>Answer</SecondLabel>
                      <ThirdLabel>Select the correct answer</ThirdLabel>
                      <div style={{ paddingBottom: "25px" }}>
                        <TrueFalse
                          onClick={this.setTFChoiceAns}
                          isTrue={questionAns[0]}
                        />
                      </div>
                    </>
                  )}

                  {questionType === "Short Answer" && (
                    <>
                      <SecondLabel>Answers</SecondLabel>
                      <ThirdLabel>
                        Candidates will score if their answer is exactly the
                        same with yours
                      </ThirdLabel>
                      <div style={{ paddingBottom: "25px" }}>
                        {questionAns.map((item, index) => (
                          <div key={index}>
                            <ShortAns
                              onClick={() => this.deleteRow(index, "Ans")}
                              onChange={(e) => this.onChangeAnswer(e, index)}
                              height={"50px"}
                              value={item}
                              rowNum={index}
                            />
                          </div>
                        ))}
                      </div>
                      <div style={{ paddingBottom: "25px" }}>
                        <Button
                          backgroundColor={configStyles.colors.darkBlue}
                          color={configStyles.colors.white}
                          padding={"8px"}
                          onClick={() => this.addRow("Ans")}
                          type={"button"}
                        >
                          Add Answers
                        </Button>
                      </div>
                    </>
                  )}

                  {questionType === "Order" && (
                    <>
                      <SecondLabel>Answers</SecondLabel>
                      <ThirdLabel>Write down the answer in order</ThirdLabel>
                      <div style={{ paddingBottom: "25px" }}>
                        {questionAns.map((item, index) => (
                          <div key={index}>
                            <ShortAns
                              onClick={() => this.deleteRow(index, "Ans")}
                              onChange={(e) => this.onChangeAnswer(e, index)}
                              height={"50px"}
                              value={item}
                              rowNum={index}
                            />
                          </div>
                        ))}
                      </div>
                      <div style={{ paddingBottom: "25px" }}>
                        <Button
                          backgroundColor={configStyles.colors.darkBlue}
                          color={configStyles.colors.white}
                          padding={"8px"}
                          onClick={() => this.addRow("Ans")}
                          type={"button"}
                        >
                          Add Answers
                        </Button>
                      </div>
                    </>
                  )}

                  <CustomRow>
                    <div
                      style={{
                        justifyContent: "flex-start",
                        marginRight: "10px",
                      }}
                    >
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
                    <div style={{ justifyContent: "flex-start" }}>
                      <Button
                        backgroundColor={configStyles.colors.white}
                        color={configStyles.colors.darkBlue}
                        padding={"8px"}
                        width={"100px"}
                        onClick={() => {
                          this.props.history.push(`/questionbank`);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CustomRow>
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
});

CreateQuestionContainer.propTypes = {
  updateQuestion: PropTypes.func.isRequired,
  fetchAQuestion: PropTypes.func.isRequired,
  questionReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  sucMsg: PropTypes.object.isRequired,
  clearSucMsg: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questionReducer: state.questionReducer,
  sucMsg: state.sucMsg,
});

export default connect(mapStateToProps, {
  updateQuestion,
  fetchAQuestion,
  logout,
  clearSucMsg,
})(CreateQuestionContainer);
