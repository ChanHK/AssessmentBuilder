import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";
import "../../css/general.css";

import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";
import CustomDropdown from "../../components/CustomDropdown";
import Button from "../../components/Button";
import Table from "../../components/Table";
import LoaderSpinner from "../../components/LoaderSpinner";
import CustomInput from "../../components/CustomInput";
import ScrollArrow from "../../components/ScrollArrow";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";

import QuestionType from "./Data/QuestionType";

import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchAllQuestionData,
  fetchQuestionBankData,
} from "../../actions/question.actions";
import {
  addAssQuesFromQB,
  fetchAllAssessmentQuestion,
} from "../../actions/assessmentQuestion.actions";

class RetrieveQuestionBankContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      questionType: "",
      selectedSub: "",
      questions: [],
      assessmentID: this.props.match.params.assessmentID,
      section: this.props.match.params.section,
      type: this.props.match.params.type,
      totalSubjects: [],
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

    this.props.fetchAllAssessmentQuestion(data);
    this.props.fetchAllQuestionData();
    this.props.fetchQuestionBankData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { questionReducer, assessmentQuestionReducer } = this.props;
    const { questions } = this.state;
    if (
      prevProps.questionReducer !== questionReducer &&
      questionReducer.questionData !== null &&
      questionReducer.questionBankData !== null
    ) {
      const { totalSubjects } = questionReducer.questionBankData;
      let temp = [];
      questionReducer.questionData.forEach((item, index) => {
        temp.push({
          questionDescription: item.questionDescription,
          subject: item.subject,
          questionType: item.questionType,
          checked: false,
          id: item._id,
          questionAnswers: item.questionAnswers,
          questionChoices: item.questionChoices,
          selected: false,
        });
      });

      this.setState({
        questions: temp,
        totalSubjects: totalSubjects,
      });
    }

    if (
      prevProps.assessmentQuestionReducer !== assessmentQuestionReducer &&
      assessmentQuestionReducer.assessmentQuestionLoad !== null &&
      questions.length !== 0
    ) {
      const { assessmentQuestionLoad } = assessmentQuestionReducer;
      let temp = questions;
      assessmentQuestionLoad.forEach((item, index) => {
        temp.forEach((item2, index2) => {
          if (item2.id === item.retrievedID) {
            temp[index2].selected = true;
          }
        });
      });
      this.setState({ questions: temp });
    }
  }

  componentWillUnmount() {
    this.props.assessmentQuestionReducer.assessmentQuestionLoad = null;
    this.props.assessmentQuestionReducer.direct = false;
    this.props.questionReducer.questionBankData = null;
    this.props.questionReducer.questionData = null;
  }

  clearSearch = () => {
    this.setState({ searchText: "", questionType: "", selectedSub: "" });
  };

  handleClick = () => {
    const { type, assessmentID } = this.state;
    this.props.history.push(`/assessment/${type}/questions/${assessmentID}`);
  };

  _add_selected = () => {
    const { questions, assessmentID, section } = this.state;
    let temp = [];
    questions.forEach((item, index) => {
      if (item.checked) {
        temp.push({
          section: section,
          questionAnswers: item.questionAnswers,
          questionChoices: item.questionChoices,
          questionDescription: item.questionDescription,
          questionType: item.questionType,
          score: 1,
          retrievedID: item.id,
        });
      }
    });

    if (temp.length !== 0) {
      let data = {
        assessmentID: assessmentID,
        array: temp,
      };
      this.props.addAssQuesFromQB(data);

      let temp2 = questions;
      temp2.forEach((item, index) => {
        if (item.checked) temp2[index].checked = false;
      });

      this.setState({ questions: temp2 });

      setTimeout(() => {
        const data2 = {
          assessmentID: assessmentID,
        };

        this.props.fetchAllAssessmentQuestion(data2);
      }, 500);
    }
  };

  render() {
    const {
      searchText,
      questionType,
      selectedSub,
      questions,
      totalSubjects,
    } = this.state;

    if (
      this.props.questionReducer.isLoading ||
      this.props.assessmentQuestionReducer.isLoading
    ) {
      return <LoaderSpinner />;
    } else document.body.style.overflow = "unset";

    if (questions === undefined) return <LoaderSpinner />;
    const lowerCasedSearchText = searchText.toLowerCase();
    const lowerCaseQuestionType = questionType.toLowerCase();
    const lowerCaseSelectedSub = selectedSub.toLowerCase();
    let filteredData = questions;

    if (searchText !== "" || questionType !== "" || selectedSub !== "") {
      if (searchText !== "" && questionType === "" && selectedSub === "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.questionDescription
              .toLowerCase()
              .indexOf(lowerCasedSearchText) >= 0
          );
        });
      }
      if (searchText === "" && questionType !== "" && selectedSub === "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.questionType.toLowerCase().indexOf(lowerCaseQuestionType) >= 0
          );
        });
      }
      if (searchText === "" && questionType === "" && selectedSub !== "") {
        filteredData = filteredData.filter((item) => {
          return item.subject.toLowerCase().indexOf(lowerCaseSelectedSub) >= 0;
        });
      }

      if (searchText !== "" && questionType !== "" && selectedSub === "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.questionDescription
              .toLowerCase()
              .indexOf(lowerCasedSearchText) >= 0 &&
            item.questionType.toLowerCase().indexOf(lowerCaseQuestionType) >= 0
          );
        });
      }
      if (searchText !== "" && questionType === "" && selectedSub !== "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.questionDescription
              .toLowerCase()
              .indexOf(lowerCasedSearchText) >= 0 &&
            item.subject.toLowerCase().indexOf(lowerCaseSelectedSub) >= 0
          );
        });
      }
      if (searchText === "" && questionType !== "" && selectedSub !== "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.subject.toLowerCase().indexOf(lowerCaseSelectedSub) >= 0 &&
            item.questionType.toLowerCase().indexOf(lowerCaseQuestionType) >= 0
          );
        });
      }

      if (searchText !== "" && questionType !== "" && selectedSub !== "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.questionType.toLowerCase().includes(lowerCaseQuestionType) &&
            item.questionDescription
              .toLowerCase()
              .includes(lowerCasedSearchText) &&
            item.subject.toLowerCase().includes(lowerCaseSelectedSub)
          );
        });
      }
    }

    const column = [
      {
        name: "#",
        selector: "serial",
        cell: (row) => (
          <div>
            <div className={css(styles.tableRow)}>{row.serial}</div>
          </div>
        ),
        width: "50px",
      },
      {
        name: "Question Description",
        selector: "questionDescription",
        cell: (row) => {
          const contentBlock = htmlToDraft(row.questionDescription);
          let editorState = "";
          if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(
              contentBlock.contentBlocks
            );
            editorState = EditorState.createWithContent(contentState);
          }
          return (
            <div>
              <div className={css(styles.tableRow)}>
                <Editor
                  editorState={editorState}
                  toolbarHidden={true}
                  readOnly
                  editorStyle={{
                    width: "450px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: "50px",
                    alignItems: "center",
                  }}
                />
              </div>
            </div>
          );
        },
        width: "40%",
      },
      {
        name: "Subject",
        selector: "subject",
        cell: (row) => (
          <div>
            <div className={css(styles.tableRow)}>{row.subject}</div>
          </div>
        ),
        width: "15%",
      },
      {
        name: "Question Type",
        selector: "questionType",
        cell: (row) => (
          <div>
            <div className={css(styles.tableRow)}>{row.questionType}</div>
          </div>
        ),
        width: "20%",
      },
      {
        name: "Options",
        selector: "checked, id",
        cell: (row) => (
          <CustomRow>
            <input
              type="checkbox"
              checked={row.checked}
              className={css(styles.checkbox)}
              onChange={(e) => {
                let i = 0;
                questions.forEach((item, index) => {
                  if (item.id === row.id) {
                    i = index;
                  }
                });
                this.setState({
                  questions: [
                    ...questions.slice(0, i),
                    {
                      ...questions[i],
                      checked: e.target.checked,
                    },
                    ...questions.slice(i + 1),
                  ],
                });
              }}
            />
          </CustomRow>
        ),
        width: "10%",
      },
    ];

    const conditionalRowStyles = [
      {
        when: (row) => row.selected,
        style: {
          backgroundColor: configStyles.colors.noticeYellow,
        },
      },
    ];

    filteredData.forEach((x, index) => {
      x.serial = index + 1;
    });

    return (
      <>
        <Header />
        <ScrollArrow />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Question Bank</FirstLabel>
              </div>
              <div>
                <SecondLabel>Add question to your assessment</SecondLabel>
              </div>
              <div style={{ paddingBottom: "25px" }}>
                <Wrapper
                  firstHeight={"90px"}
                  secHeight={"180px"}
                  widthChange={1700}
                >
                  <div className={css(styles.block)}>
                    <CustomInput
                      name={"searchText"}
                      type={"text"}
                      placeholder={"Enter question description here to search"}
                      onChangeValue={(e) => {
                        this.setState({ searchText: e.target.value });
                      }}
                      value={searchText}
                    />
                  </div>
                  <div className={css(styles.block)}>
                    <CustomDropdown
                      options={QuestionType}
                      onChange={(e) => {
                        this.setState({ questionType: e.value });
                      }}
                      value={questionType}
                      placeholder="Select question type"
                    />
                  </div>
                  <div className={css(styles.block)}>
                    <CustomDropdown
                      options={totalSubjects}
                      onChange={(e) => {
                        this.setState({ selectedSub: e.value });
                      }}
                      value={selectedSub}
                      placeholder="Select subject"
                    />
                  </div>
                </Wrapper>
              </div>
              <div style={{ marginBottom: "25px" }}>
                <Button
                  backgroundColor={configStyles.colors.darkBlue}
                  color={configStyles.colors.white}
                  padding={"8px"}
                  width={"100px"}
                  onClick={this.clearSearch}
                >
                  Clear
                </Button>
              </div>
              <Table
                data={filteredData}
                columns={column}
                key={filteredData._id}
                conditionalRowStyles={conditionalRowStyles}
              />
              <div className={css(styles.buttonRowCon)}>
                <CustomRow>
                  <Button
                    backgroundColor={configStyles.colors.darkBlue}
                    color={configStyles.colors.white}
                    padding={"8px"}
                    onClick={this._add_selected}
                  >
                    Add Selected
                  </Button>
                  <div style={{ marginRight: "15px" }}></div>
                  <Button
                    backgroundColor={configStyles.colors.darkBlue}
                    color={configStyles.colors.white}
                    padding={"8px"}
                    onClick={this.handleClick}
                    width={"100px"}
                  >
                    Back
                  </Button>
                </CustomRow>
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
  block: {
    flexWrap: "nowrap",
    width: "400px",
    height: "auto",
  },
  tableRow: {
    fontSize: "15px",
    fontFamily: "Ubuntu-Regular",
  },
  checkbox: {
    width: "20px",
    height: "20px",
  },
  buttonRowCon: {
    marginBottom: "100px",
    display: "flex",
  },
});

RetrieveQuestionBankContainer.propTypes = {
  fetchAllQuestionData: PropTypes.func.isRequired,
  addAssQuesFromQB: PropTypes.func.isRequired,
  questionReducer: PropTypes.object.isRequired,
  assessmentQuestionReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  fetchQuestionBankData: PropTypes.func.isRequired,
  fetchAllAssessmentQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questionReducer: state.questionReducer,
  assessmentQuestionReducer: state.assessmentQuestionReducer,
});

export default connect(mapStateToProps, {
  fetchAllQuestionData,
  addAssQuesFromQB,
  logout,
  fetchQuestionBankData,
  fetchAllAssessmentQuestion,
})(RetrieveQuestionBankContainer);
