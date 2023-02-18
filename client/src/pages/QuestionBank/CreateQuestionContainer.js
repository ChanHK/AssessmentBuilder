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
import Order from "../../components/Order";

import { EditorState, convertToRaw, ContentState, Modifier } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateQuestion,
  fetchAQuestion,
  updateAQuestion,
} from "../../actions/question.actions";
import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

class CreateQuestionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionType: "",
      questionDescription: EditorState.createEmpty(),
      questionAns: [],
      questionChoices: [],
      choiceArrObj: [], //stores temporary choices and answer(isChecked)
      msg: null,
      subject: this.props.match.params.subject,
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
    const { questionReducer } = this.props;

    if (
      prevProps.questionReducer !== questionReducer &&
      questionReducer.questionLoad !== null &&
      questionReducer.message === undefined
    ) {
      const {
        questionType,
        questionAnswers,
        questionChoices,
        questionDescription,
      } = questionReducer.questionLoad[0].questions[0];

      const description = this.convertQuestionDes(questionDescription);

      let choices = null;
      let ans = null;
      let arrObj = [];

      if (questionType === "Order") {
        choices = this.convertQuestion(questionChoices);
        ans = this.convertQuestion(questionAnswers);
      } else if (
        questionType === "True or False" ||
        questionType === "Short Answer"
      ) {
        choices = questionChoices;
        ans = questionAnswers;
      } else if (
        questionType === "Single Choice" ||
        questionType === "Multiple Choice"
      ) {
        choices = this.convertQuestion(questionChoices);
        ans = this.convertQuestion(questionAnswers);

        choices.forEach((item, index) => {
          let temp = draftToHtml(convertToRaw(item.getCurrentContent()));
          let inserted = false;
          ans.forEach((item2, index2) => {
            let temp2 = draftToHtml(convertToRaw(item2.getCurrentContent()));
            if (temp === temp2) {
              arrObj.push({ editorValue: item, isChecked: true });
              inserted = true;
            }
          });
          if (!inserted) arrObj.push({ editorValue: item, isChecked: false });
        });
      }

      this.setState({
        questionType: questionType,
        questionDescription: description,
        questionChoices: choices,
        questionAns: ans,
        choiceArrObj: arrObj,
      });
    }
  }

  componentWillUnmount() {
    this.props.questionReducer.questionLoad = null;
    this.props.questionReducer.direct = false;
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
      choiceArrObj: [],
      msg: null,
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
      choiceArrObj: [
        ...this.state.choiceArrObj.slice(0, index),
        { ...this.state.choiceArrObj[index], editorValue: value },
        ...this.state.choiceArrObj.slice(index + 1),
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
    let temp = this.state.choiceArrObj;

    temp.forEach((item, i) => {
      if (i === index) item.isChecked = true;
      else item.isChecked = false;
    });

    this.setState({ choiceArrObj: temp });
  };

  setChoiceMultiAns = (e, index, item) => {
    let temp = this.state.choiceArrObj;

    temp.forEach((item, i) => {
      if (i === index) item.isChecked = e.target.checked;
    });

    this.setState({ choiceArrObj: temp });
  };

  deleteRow = (index, type, item = null) => {
    if (type === "Choice") {
      this.state.choiceArrObj.splice(index, 1);
      this.setState({
        choiceArrObj: this.state.choiceArrObj,
      });
    }
    if (type === "Ans") {
      this.state.questionAns.splice(index, 1);
      this.setState({
        questionAns: this.state.questionAns,
      });
    }
  };

  addRow = (type) => {
    //for single and multi choice
    if (type === "Choice") {
      if (this.state.choiceArrObj.length < 8) {
        this.setState({
          choiceArrObj: this.state.choiceArrObj.concat({
            editorValue: EditorState.createEmpty(),
            isChecked: false,
          }),
        });
      }
    }

    //for short ans and order
    if (type === "Ans") {
      if (this.state.questionAns.length < 8) {
        this.setState({
          questionAns: this.state.questionAns.concat(""),
        });
      }
    } else {
      if (this.state.questionAns.length < 8) {
        this.setState({
          questionAns: this.state.questionAns.concat(EditorState.createEmpty()),
        });
      }
    }
  };

  _handleBeforeInput = (input, length, editorObj) => {
    const inputLength = editorObj.getCurrentContent().getPlainText().length;
    if (input && inputLength >= length) {
      return "handled";
    }
  };

  _handlePastedText = (input, length, editorObj) => {
    const inputLength = editorObj.getCurrentContent().getPlainText().length;
    let remainingLength = length - inputLength;
    if (input.length + inputLength >= length) {
      const newContent = Modifier.insertText(
        editorObj.getCurrentContent(),
        editorObj.getSelection(),
        input.slice(0, remainingLength)
      );

      EditorState.push(editorObj, newContent, "insert-characters");

      return true;
    } else {
      return false;
    }
  };

  validateForm = (data) => {
    const { questionType, questionChoices, questionAnswers } = data;
    const { questionDescription } = this.state;
    let tempMsg = {};

    if (questionType === "") {
      tempMsg.qType = "Question type field is required";
    }

    if (!questionDescription.getCurrentContent().hasText()) {
      tempMsg.des = "Question description field is required";
    }

    if (questionType === "Single Choice") {
      if (questionChoices.length < 2) {
        tempMsg.ans = "Please enter at least two choices";
      } else if (questionAnswers.length === 0) {
        tempMsg.ans = "Please select one answer";
      }

      if (questionChoices.length > 0) {
        let tempArray = this.convertQuestion(questionChoices);

        tempArray.forEach((item, index) => {
          if (!item.getCurrentContent().hasText()) {
            tempMsg.cho = `Please fill up choice ${index + 1}`;
          }
        });
      }
    }

    if (questionType === "Multiple Choice") {
      if (questionChoices.length < 2) {
        tempMsg.ans = "Please enter at least two choices";
      } else if (questionAnswers.length === 0) {
        tempMsg.ans = "Please select at least one answer";
      }

      if (questionChoices.length > 0) {
        let tempArray = this.convertQuestion(questionChoices);

        tempArray.forEach((item, index) => {
          if (!item.getCurrentContent().hasText()) {
            tempMsg.cho = `Please fill up choice ${index + 1}`;
          }
        });
      }
    }

    if (questionType === "True or False") {
      if (questionAnswers.length === 0) {
        tempMsg.ans = "Please select one answer";
      }
    }

    if (questionType === "Short Answer") {
      let tempArray = [];
      if (questionAnswers.length === 0) {
        tempMsg.ans = "Please create at least one answer";
      } else if (questionAnswers.length > 0) {
        questionAnswers.forEach((item, index) => {
          if (item === "") {
            tempMsg.ans = "Please fill up all the choices";
          }
          tempArray.push(item);
        });

        if (tempArray.length > 1) {
          tempArray.forEach((item2, index2) => {
            tempArray.forEach((item3, index3) => {
              if (item2 === item3 && index2 !== index3) {
                tempMsg.ans = "Please remove similar answers";
              }
            });
          });
        }
      }
    }

    if (questionType === "Order") {
      if (questionAnswers.length < 3) {
        tempMsg.ans = "Please create at least 3 answers";
      }

      if (questionChoices.length > 0) {
        let tempArray = this.convertQuestion(questionChoices);

        tempArray.forEach((item, index) => {
          if (!item.getCurrentContent().hasText()) {
            tempMsg.cho = `Please fill up order number ${index + 1}`;
          }
        });
      }
    }

    this.setState({ msg: tempMsg });

    if (Object.keys(tempMsg).length === 0) return true;
    else return false;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      questionType,
      questionDescription,
      questionAns,
      questionChoices,
      choiceArrObj,
      subject,
    } = this.state;

    let ans = [];
    let choice = [];

    if (
      questionType === "Single Choice" ||
      questionType === "Multiple Choice"
    ) {
      choiceArrObj.forEach((item, index) => {
        choice.push(
          draftToHtml(convertToRaw(item.editorValue.getCurrentContent()))
        );

        if (item.isChecked) {
          ans.push(
            draftToHtml(convertToRaw(item.editorValue.getCurrentContent()))
          );
        }
      });
    } else if (questionType === "Order") {
      for (let j = 0; j < questionAns.length; j++)
        ans.push(draftToHtml(convertToRaw(questionAns[j].getCurrentContent())));
    } else if (questionType === "Short Answer") {
      for (let j = 0; j < questionAns.length; j++) ans.push(questionAns[j]);
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
      questionID: "",
      subject: subject,
    };

    if (questionType === "Order") data.questionChoices = ans;
    else if (questionType === "Short Answer") data.questionChoices = ans;
    else if (questionType === "Descriptive") {
      data.questionChoices = null;
      data.questionAnswers = null;
    }

    if (this.validateForm(data)) {
      if (this.props.match.params.type === "edit") {
        data.questionID = this.props.match.params.questionID;
        this.props.updateAQuestion(data);
      } else this.props.updateQuestion(data);
    }
  };

  render() {
    const {
      questionType,
      questionDescription,
      questionAns,
      choiceArrObj,
      msg,
      subject,
    } = this.state;

    if (this.props.questionReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    if (this.props.questionReducer.direct) {
      this.props.history.push(`/questionBank/${subject}`);
    }

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
                        <CustomColumn>
                          <CustomDropdown
                            options={QuestionType}
                            placeholder={"Select question type"}
                            value={questionType}
                            onChange={this.onChangeType}
                          />
                          <span className={css(styles.redText)}>
                            {msg === null
                              ? null
                              : msg.hasOwnProperty("qType")
                              ? "*" + msg.qType
                              : null}
                          </span>
                        </CustomColumn>
                      </div>
                    </>
                  )}

                  <SecondLabel>Question Description</SecondLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <CustomColumn>
                      <CustomEditor
                        onEditorStateChange={(e) =>
                          this.setState({ questionDescription: e })
                        }
                        editorState={questionDescription}
                        handleBeforeInput={(input) =>
                          this._handleBeforeInput(
                            input,
                            500,
                            questionDescription
                          )
                        }
                        handlePastedText={(input) =>
                          this._handlePastedText(
                            input,
                            500,
                            questionDescription
                          )
                        }
                      />
                      <span className={css(styles.redText)}>
                        {msg === null
                          ? null
                          : msg.hasOwnProperty("des")
                          ? "*" + msg.des
                          : null}
                      </span>
                    </CustomColumn>
                  </div>

                  {questionType === "Single Choice" && (
                    <>
                      <div style={{ paddingBottom: "25px" }}>
                        <CustomColumn>
                          <Button
                            backgroundColor={configStyles.colors.darkBlue}
                            color={configStyles.colors.white}
                            padding={"8px"}
                            onClick={() => this.addRow("Choice")}
                            type={"button"}
                          >
                            Add Choice
                          </Button>
                          <span className={css(styles.redText)}>
                            {msg === null
                              ? null
                              : msg.hasOwnProperty("ans")
                              ? "*" + msg.ans
                              : null}
                          </span>
                        </CustomColumn>
                      </div>
                      <div style={{ paddingBottom: "25px" }}>
                        {choiceArrObj.map((item, index) => (
                          <div key={index}>
                            <ChoiceRow
                              count={index + 1}
                              onClick={() => this.deleteRow(index, "Choice")}
                              editorState={item.editorValue}
                              onChange={(e) => this.onChangeChoice(e, index)}
                              onChangeValue={() =>
                                this.setChoiceSingleAns(index)
                              }
                              checked={item.isChecked}
                              handleBeforeInput={(input) =>
                                this._handleBeforeInput(
                                  input,
                                  150,
                                  item.editorValue
                                )
                              }
                              handlePastedText={(input) =>
                                this._handlePastedText(
                                  input,
                                  150,
                                  item.editorValue
                                )
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {questionType === "Multiple Choice" && (
                    <>
                      <div style={{ paddingBottom: "25px" }}>
                        <CustomColumn>
                          <Button
                            backgroundColor={configStyles.colors.darkBlue}
                            color={configStyles.colors.white}
                            padding={"8px"}
                            onClick={() => this.addRow("Choice")}
                            type={"button"}
                          >
                            Add Choice
                          </Button>
                          <span className={css(styles.redText)}>
                            {msg === null
                              ? null
                              : msg.hasOwnProperty("ans")
                              ? "*" + msg.ans
                              : null}
                          </span>
                        </CustomColumn>
                      </div>
                      <div style={{ paddingBottom: "25px" }}>
                        {choiceArrObj.map((item, index) => (
                          <div key={index}>
                            <ChoiceRow
                              count={index + 1}
                              onClick={() =>
                                this.deleteRow(index, "Choice", item)
                              }
                              editorState={item.editorValue}
                              onChange={(e) => this.onChangeChoice(e, index)}
                              onChangeValue={(e) =>
                                this.setChoiceMultiAns(e, index, item)
                              }
                              checked={item.isChecked}
                              handleBeforeInput={(input) =>
                                this._handleBeforeInput(
                                  input,
                                  150,
                                  item.editorValue
                                )
                              }
                              handlePastedText={(input) =>
                                this._handlePastedText(
                                  input,
                                  150,
                                  item.editorValue
                                )
                              }
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
                        <CustomColumn>
                          <TrueFalse
                            onClick={this.setTFChoiceAns}
                            isTrue={questionAns[0]}
                          />
                          <span className={css(styles.redText)}>
                            {msg === null
                              ? null
                              : msg.hasOwnProperty("ans")
                              ? "*" + msg.ans
                              : null}
                          </span>
                        </CustomColumn>
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
                        <CustomColumn>
                          {questionAns.map((item, index) => (
                            <div key={index}>
                              <ShortAns
                                onClick={() => this.deleteRow(index, "Ans")}
                                onChange={(e) =>
                                  this.onChangeAnswer(e.target.value, index)
                                }
                                height={"50px"}
                                value={item}
                                rowNum={index}
                                maxLength={25}
                              />
                            </div>
                          ))}
                          <span className={css(styles.redText)}>
                            {msg === null
                              ? null
                              : msg.hasOwnProperty("ans")
                              ? "*" + msg.ans
                              : null}
                          </span>
                        </CustomColumn>
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
                        <CustomColumn>
                          {questionAns.map((item, index) => (
                            <div key={index}>
                              <Order
                                onClick={() => this.deleteRow(index, "Ans")}
                                onChange={(e) => this.onChangeAnswer(e, index)}
                                height={"50px"}
                                value={item}
                                rowNum={index}
                                handleBeforeInput={(input) =>
                                  this._handleBeforeInput(input, 150, item)
                                }
                                handlePastedText={(input) =>
                                  this._handlePastedText(input, 150, item)
                                }
                              />
                            </div>
                          ))}
                          <span className={css(styles.redText)}>
                            {msg === null
                              ? null
                              : msg.hasOwnProperty("ans")
                              ? "*" + msg.ans
                              : null}
                          </span>
                        </CustomColumn>
                      </div>
                      <div style={{ paddingBottom: "25px" }}>
                        <Button
                          backgroundColor={configStyles.colors.darkBlue}
                          color={configStyles.colors.white}
                          padding={"8px"}
                          onClick={() => this.addRow("Ans2")}
                          type={"button"}
                        >
                          Add Answers
                        </Button>
                      </div>
                    </>
                  )}

                  <span className={css(styles.redText)}>
                    {msg === null
                      ? null
                      : msg.hasOwnProperty("cho")
                      ? "*" + msg.cho
                      : null}
                  </span>
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
                          this.props.history.push(`/questionbank/${subject}`);
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
  redText: {
    color: configStyles.colors.inputErrorRed,
    fontFamily: "Ubuntu-Regular",
    fontSize: "15px",
  },
});

CreateQuestionContainer.propTypes = {
  updateQuestion: PropTypes.func.isRequired,
  fetchAQuestion: PropTypes.func.isRequired,
  updateAQuestion: PropTypes.func.isRequired,
  questionReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questionReducer: state.questionReducer,
});

export default connect(mapStateToProps, {
  updateQuestion,
  fetchAQuestion,
  updateAQuestion,
  logout,
})(CreateQuestionContainer);
