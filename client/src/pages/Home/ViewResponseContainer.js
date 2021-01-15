import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import "../../css/general.css";
import * as configStyles from "../../config/styles";

import Header from "../../components/Header";
import ScrollArrow from "../../components/ScrollArrow";
import LoaderSpinner from "../../components/LoaderSpinner";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAResult } from "../../actions/home.actions";
import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

class ViewResponseContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candID: this.props.match.params.candID,
      assessmentID: this.props.match.params.assessmentID,
      name: "",
      email: "",
      grade: "",
      submissionDate: "",
      totalScore: "",
      response: [],
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
      candID: this.state.candID,
    };

    this.props.fetchAResult(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const { homeReducer } = this.props;

    if (
      prevProps.homeReducer !== homeReducer &&
      homeReducer.aCandResult !== null
    ) {
      const { aCandResult } = this.props.homeReducer;
      const {
        email,
        grade,
        name,
        response,
        submissionDate,
        totalScore,
      } = aCandResult;

      this.setState({
        name: name,
        email: email,
        grade: grade,
        submissionDate: submissionDate,
        totalScore: totalScore,
        response: response,
      });
    }
  }

  componentWillUnmount() {
    this.props.homeReducer.aCandResult = null;
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

  render() {
    const {
      email,
      grade,
      name,
      submissionDate,
      totalScore,
      response,
      assessmentID,
    } = this.state;

    if (this.props.homeReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    return (
      <>
        <Header />
        <ScrollArrow />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>View Response</FirstLabel>
              </div>

              <CustomRow>
                <div className={css(styles.infoCon)}>
                  <SecondLabel marginRight={"10px"}>
                    Candidate Name :{" "}
                  </SecondLabel>
                  <ThirdLabel>{name}</ThirdLabel>
                </div>
              </CustomRow>
              <CustomRow>
                <div className={css(styles.infoCon)}>
                  <SecondLabel marginRight={"10px"}>
                    Candidate Email :{" "}
                  </SecondLabel>
                  <ThirdLabel>{email}</ThirdLabel>
                </div>
              </CustomRow>
              <CustomRow>
                <div className={css(styles.infoCon)}>
                  <SecondLabel marginRight={"10px"}>
                    Submission Date :{" "}
                  </SecondLabel>
                  <ThirdLabel>{submissionDate}</ThirdLabel>
                </div>
              </CustomRow>
              <CustomRow>
                <div className={css(styles.infoCon)}>
                  <SecondLabel marginRight={"10px"}>Score : </SecondLabel>
                  <ThirdLabel>{totalScore}</ThirdLabel>
                </div>
              </CustomRow>
              <CustomRow>
                <div className={css(styles.infoCon)}>
                  <SecondLabel marginRight={"10px"}>Grade : </SecondLabel>
                  <ThirdLabel>{grade}</ThirdLabel>
                </div>
              </CustomRow>
              <hr className={css(styles.hr)} />

              {response.map((item, index) => {
                if (
                  item.questionType === "True or False" ||
                  item.questionType === "Single Choice"
                ) {
                  let tempDes = this.convertHtml(item.questionDescription);
                  let tempRes = "";

                  if (item.questionType === "Single Choice") {
                    tempRes = this.convertHtml(item.response[0]);
                  }

                  return (
                    <>
                      <SecondLabel>Question {index + 1}</SecondLabel>
                      <div style={{ marginBottom: "25px" }}>
                        <CustomColumn>
                          <div style={{ marginBottom: "15px" }}>
                            <Editor
                              editorState={tempDes}
                              toolbarHidden={true}
                              readOnly
                              editorClassName={css(styles.editorClassName)}
                            />
                          </div>

                          <div
                            className={css(styles.choiceRow)}
                            style={{
                              backgroundColor:
                                item.response[0] === item.questionAnswers[0] // true or false have only one ans
                                  ? configStyles.colors.correctGreen
                                  : configStyles.colors.falseRed,
                            }}
                          >
                            {item.questionType === "Single Choice" ? (
                              <Editor
                                editorState={tempRes}
                                toolbarHidden={true}
                                readOnly
                                editorClassName={css(styles.ansRow)}
                              />
                            ) : (
                              item.response[0]
                            )}
                          </div>
                        </CustomColumn>
                      </div>
                    </>
                  );
                }

                if (
                  item.questionType === "Multiple Choice" ||
                  item.questionType === "Short Answer"
                ) {
                  let tempDes = this.convertHtml(item.questionDescription);

                  return (
                    <>
                      <SecondLabel>Question {index + 1}</SecondLabel>
                      <div style={{ marginBottom: "25px" }}>
                        <CustomColumn>
                          <div style={{ marginBottom: "15px" }}>
                            <Editor
                              editorState={tempDes}
                              toolbarHidden={true}
                              readOnly
                              editorClassName={css(styles.editorClassName)}
                            />
                          </div>

                          {item.response.map((item2, index2) => {
                            let tempRes = this.convertHtml(
                              item.response[index2]
                            );
                            return (
                              <div
                                key={index}
                                className={css(styles.choiceRow)}
                                style={{
                                  backgroundColor:
                                    item2 === item.questionAnswers[0] ||
                                    item2 === item.questionAnswers[1] ||
                                    item2 === item.questionAnswers[2] ||
                                    item2 === item.questionAnswers[3] ||
                                    item2 === item.questionAnswers[4] ||
                                    item2 === item.questionAnswers[5] ||
                                    item2 === item.questionAnswers[6] ||
                                    item2 === item.questionAnswers[7]
                                      ? configStyles.colors.correctGreen
                                      : configStyles.colors.falseRed,
                                }}
                              >
                                <Editor
                                  editorState={tempRes}
                                  toolbarHidden={true}
                                  readOnly
                                  editorClassName={css(styles.ansRow)}
                                />
                              </div>
                            );
                          })}
                        </CustomColumn>
                      </div>
                    </>
                  );
                }

                if (item.questionType === "Order") {
                  let tempDes = this.convertHtml(item.questionDescription);

                  return (
                    <>
                      <SecondLabel>Question {index + 1}</SecondLabel>
                      <div style={{ marginBottom: "25px" }}>
                        <CustomColumn>
                          <div style={{ marginBottom: "15px" }}>
                            <Editor
                              editorState={tempDes}
                              toolbarHidden={true}
                              readOnly
                              editorClassName={css(styles.editorClassName)}
                            />
                          </div>

                          {item.response.map((item2, index2) => {
                            let tempChoice = this.convertHtml(
                              item.questionChoices[index2]
                            );
                            return (
                              <div className={css(styles.orderRow)} key={index}>
                                <CustomRow>
                                  <div className={css(styles.orderCount)}>
                                    {parseInt(item2) + 1}
                                  </div>

                                  <div
                                    className={css(styles.choiceRow)}
                                    style={{
                                      backgroundColor:
                                        item.questionChoices[index2] ===
                                        item.questionAnswers[parseInt(item2)]
                                          ? configStyles.colors.correctGreen
                                          : configStyles.colors.falseRed,
                                      width: "100%",
                                    }}
                                  >
                                    <Editor
                                      editorState={tempChoice}
                                      toolbarHidden={true}
                                      readOnly
                                      editorClassName={css(styles.ansRow)}
                                    />
                                  </div>
                                </CustomRow>
                              </div>
                            );
                          })}
                        </CustomColumn>
                      </div>
                    </>
                  );
                }

                if (item.questionType === "Descriptive") {
                  let tempDes = this.convertHtml(item.questionDescription);

                  return (
                    <>
                      <SecondLabel>Question {index + 1}</SecondLabel>
                      <div style={{ marginBottom: "25px" }}>
                        <CustomColumn>
                          <div style={{ marginBottom: "15px" }}>
                            <Editor
                              editorState={tempDes}
                              toolbarHidden={true}
                              readOnly
                              editorClassName={css(styles.editorClassName)}
                            />
                          </div>
                          <div style={{ marginBottom: "15px" }}>
                            <TextArea
                              type={"text"}
                              value={item.response[0]}
                              height={"auto"}
                              readOnly={true}
                              backgroundColor={configStyles.colors.lightOrange}
                            />
                          </div>
                          <ThirdLabel>Feedback</ThirdLabel>
                          <div style={{ marginBottom: "25px" }}>
                            <TextArea
                              type={"text"}
                              value={item.response[0]}
                              height={"auto"}
                              readOnly={true}
                            />
                          </div>
                        </CustomColumn>
                      </div>
                    </>
                  );
                }

                return null;
              })}

              <div style={{ marginBottom: "150px" }}>
                <Button
                  backgroundColor={configStyles.colors.darkBlue}
                  color={configStyles.colors.white}
                  padding={"8px"}
                  width={"100px"}
                  onClick={() => {
                    this.props.history.push(
                      `/assessment/results/${assessmentID}`
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
  infoCon: {
    width: "100%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  hr: {
    backgroundColor: configStyles.colors.black,
    height: "1px",
  },
  choiceRow: {
    padding: "5px",
    fontFamily: "Ubuntu-Bold",
    fontSize: "15px",
    marginBottom: "5px",
    borderRadius: "5px",
    border: "2px solid black",
  },
  editorClassName: {
    borderRadius: "5px",
    borderColor: configStyles.colors.black,
    border: "2px solid",
    width: "100%",
    height: "auto",
    padding: "10px 20px",
  },
  ansRow: {
    width: "100%",
    height: "auto",
  },
  orderCount: {
    height: "auto",
    width: "50px",
    borderColor: configStyles.colors.black,
    border: "2px solid",
    borderRadius: "5px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginRight: "10px",
    backgroundColor: configStyles.colors.lightGrey,
    fontFamily: "Ubuntu-Bold",
  },
  orderRow: {
    marginBottom: "10px",
    width: "100%",
  },
});

ViewResponseContainer.propTypes = {
  fetchAResult: PropTypes.func.isRequired,
  homeReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  homeReducer: state.homeReducer,
});

export default connect(mapStateToProps, {
  fetchAResult,
  logout,
})(ViewResponseContainer);
