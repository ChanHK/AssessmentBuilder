import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import CustomSubLabel from "../../components/FormComponents/CustomSubLabel";

import ScrollArrow from "../../components/ScrollArrow";
import CustomEditor from "../../components/CustomEditor";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";

import Countdown from "react-countdown";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

class AttemptContainer extends Component {
  constructor() {
    super();
    this.state = {
      index: 0, //array index
      question: [],
    };
  }

  componentDidMount() {
    this.setState({
      question: [
        {
          questionType: "Single Choice",
          questionChoices: ["a", "b", "c"],
          questionDescription: "firstttttttttt",
          response: "",
          checked: [false, false, false],
        },
        {
          questionType: "Multiple Choice",
          questionChoices: ["a", "b", "c"],
          questionDescription: "secondddddddddd",
          response: "",
          checked: [false, false, false],
        },
        {
          questionType: "Descriptive",
          questionChoices: ["a", "b", "c"],
          questionDescription: "thirddddddd",
          response: "",
          checked: null,
        },
        {
          questionType: "True or False",
          questionChoices: ["true", "false"],
          questionDescription: "fourthhhhhhhh",
          response: "",
          checked: null,
        },
        {
          questionType: "Short Answer",
          questionChoices: ["a", "b", "c"],
          questionDescription: "fifthhhhhhhhhhhh",
          response: "",
          checked: null,
        },
        {
          questionType: "Order",
          questionChoices: ["a", "b", "c"],
          questionDescription: "sixthhhhhhhhhhhhh",
          response: [],
          checked: null,
        },
      ],
    });
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

  back = () => {
    const { index } = this.state;
    if (index > 0) {
      this.setState({ index: index - 1 });
    }
  };

  next = () => {
    const { index, question } = this.state;
    if (index < question.length - 1) {
      this.setState({ index: index + 1 });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { question, index } = this.state;
    if (question.length === 0) return false;
    // console.log(question[0]);
    return (
      <>
        <ScrollArrow />
        <CustomFullContainer>
          <CustomMidContainer>
            <form onSubmit={this.onSubmit} className={css(styles.con)}>
              <CustomColumn>
                <div
                  style={{ marginTop: "25px" }}
                  className={css(styles.countdownCon)}
                >
                  <Countdown
                    date={Date.now() + 10000}
                    className={css(styles.countdown)}
                  />
                </div>
                <div style={{ marginTop: "25px" }}>
                  <h4 className={css(styles.questionText)}>
                    Question {index + 1}
                  </h4>
                </div>
                <div>
                  <div style={{ marginBottom: "25px", marginTop: "15px" }}>
                    <CustomEditor
                      toolbarHidden={true}
                      readOnly={true}
                      heightAuto={true}
                      editorState={this.convertHtml(
                        question[index].questionDescription
                      )}
                    />
                  </div>

                  {question[index].questionType === "Single Choice" && (
                    <div style={{ marginBottom: "25px" }}>
                      {question[index].questionChoices.map((item, x) => {
                        return (
                          <div className={css(styles.choiceRow)}>
                            <CustomRow>
                              <div style={{ marginRight: "10px" }}>
                                <input
                                  type="checkbox"
                                  checked={question[index].checked[x]}
                                  className={css(styles.checkBox)}
                                />
                              </div>
                              <div style={{ width: "100%" }}>
                                <CustomEditor
                                  toolbarHidden={true}
                                  readOnly={true}
                                  heightAuto={true}
                                  editorState={this.convertHtml(item)}
                                />
                              </div>
                            </CustomRow>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {question[index].questionType === "Multiple Choice" && (
                    <div style={{ marginBottom: "25px" }}>
                      {question[index].questionChoices.map((item, x) => {
                        return (
                          <div className={css(styles.choiceRow)}>
                            <CustomRow>
                              <div style={{ marginRight: "10px" }}>
                                <input
                                  type="checkbox"
                                  checked={question[index].checked[x]}
                                  className={css(styles.checkBox)}
                                />
                              </div>
                              <div style={{ width: "100%" }}>
                                <CustomEditor
                                  toolbarHidden={true}
                                  readOnly={true}
                                  heightAuto={true}
                                  editorState={this.convertHtml(item)}
                                />
                              </div>
                            </CustomRow>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {(question[index].questionType === "Descriptive" ||
                    question[index].questionType === "Short Answer") && (
                    <div style={{ marginBottom: "25px" }}>
                      <TextArea
                        type={"text"}
                        placeholder={"Enter your answer here"}
                        onChange={(e) => {
                          this.setState({
                            question: [
                              ...question.slice(0, index),
                              {
                                ...question[index],
                                response: e.target.value,
                              },
                              ...question.slice(index + 1),
                            ],
                          });
                        }}
                        value={question[index].response}
                      />
                    </div>
                  )}

                  {question[index].questionType === "True or False" && (
                    <div style={{ marginBottom: "25px" }}>
                      {question[index].questionChoices.map((item, x) => {
                        return (
                          <div
                            className={css(styles.tfRow, styles.noSelect)}
                            onClick={() => {
                              this.setState({
                                question: [
                                  ...question.slice(0, index),
                                  {
                                    ...question[index],
                                    response: item,
                                  },
                                  ...question.slice(index + 1),
                                ],
                              });
                            }}
                            style={{
                              backgroundColor:
                                question[index].response === item
                                  ? configStyles.colors.correctGreen
                                  : "inherit",
                            }}
                          >
                            {item}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {question[index].questionType === "Order" && (
                    <div style={{ marginBottom: "25px" }}>
                      {question[index].questionChoices.map((item, x) => {
                        return (
                          <div className={css(styles.choiceRow)}>
                            <CustomRow>
                              <div
                                className={css(styles.countBox)}
                                onClick={() => {
                                  this.setState({
                                    question: [
                                      ...question.slice(0, index),
                                      {
                                        ...question[index],
                                        response: [
                                          //slice here
                                        ],
                                      },
                                      ...question.slice(index + 1),
                                    ],
                                  });
                                }}
                              >
                                {question[index].response[x]}
                              </div>
                              <div style={{ width: "100%" }}>
                                <CustomEditor
                                  toolbarHidden={true}
                                  readOnly={true}
                                  heightAuto={true}
                                  editorState={this.convertHtml(item)}
                                />
                              </div>
                            </CustomRow>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className={css(styles.buttonRowCon)}>
                  <CustomRow>
                    <div style={{ marginRight: "15px" }}>
                      <Button
                        backgroundColor={configStyles.colors.darkBlue}
                        color={configStyles.colors.white}
                        padding={"8px"}
                        width={"75px"}
                        type={"button"}
                        onClick={this.back}
                      >
                        Back
                      </Button>
                    </div>
                    <div style={{ marginRight: "15px" }}>
                      <Button
                        backgroundColor={configStyles.colors.darkBlue}
                        color={configStyles.colors.white}
                        padding={"8px"}
                        width={"75px"}
                        type={"button"}
                        onClick={this.next}
                      >
                        Next
                      </Button>
                    </div>
                    <div>
                      {question.length - 1 === index && (
                        <Button
                          backgroundColor={configStyles.colors.darkBlue}
                          color={configStyles.colors.white}
                          padding={"8px"}
                          width={"75px"}
                          type={"submit"}
                        >
                          Submit
                        </Button>
                      )}
                    </div>
                  </CustomRow>
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
  con: {
    width: "100%",
  },
  questionText: {
    fontFamily: "Ubuntu-bold",
    fontColor: configStyles.colors.black,
  },
  buttonRowCon: {
    width: "100%",
    display: "flex",
    marginBottom: "100px",
  },
  tfRow: {
    width: "100%",
    border: "2px solid",
    borderColor: configStyles.colors.black,
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "25px",
  },
  noSelect: {
    userSelect:
      "none" /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */,
    webkitTouchCallout: "none" /* iOS Safari */,
    webkitUserSelect: "none" /* Safari */,
    khtmlUserSelect: "none" /* Konqueror HTML */,
    mozUserSelect: "none" /* Old versions of Firefox */,
    msUserSelect: "none" /* Internet Explorer/Edge */,
  },
  choiceRow: {
    width: "100%",
    display: "flex",
    marginBottom: "25px",
  },
  checkBox: {
    width: "20px",
    height: "26px",
  },
  countBox: {
    backgroundColor: configStyles.colors.lightGrey,
    border: "2px solid",
    borderRadius: "5px",
    borderColor: configStyles.colors.black,
    marginRight: "15px",
    width: "100px",
    height: "70px",
    cursor: "pointer",
  },
  countdownCon: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    height: "auto",
  },
  countdown: {
    border: "2px solid",
    borderColor: configStyles.colors.darkBlue,
    padding: "10px",
    borderRadius: "5px",
  },
});

export default AttemptContainer;