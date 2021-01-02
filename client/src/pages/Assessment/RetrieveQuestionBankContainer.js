import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";
import "../../css/general.css";

import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";
import CustomDropdown from "../../components/CustomDropdown";
import Button from "../../components/Button";
import Table from "../../components/Table";
import TableButton from "../../components/TableButton";
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
import * as MdIcons from "react-icons/md";

import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAllQuestionData } from "../../actions/question.actions";
import { addAssessmentQuestion } from "../../actions/assessmentQuestion.actions";

class RetrieveQuestionBankContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      questionType: "",
      questions: [],
      assessmentID: this.props.match.params.assessmentID,
      section: this.props.match.params.section,
      type: this.props.match.params.type,
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
    this.props.fetchAllQuestionData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { questionReducer } = this.props;

    if (
      prevProps.questionReducer !== questionReducer &&
      questionReducer.questionLoad !== null &&
      questionReducer.message === undefined
    ) {
      this.setState({ questions: questionReducer.questionLoad });
    }
  }

  componentWillUnmount() {
    this.props.questionReducer.questionLoad = null;
    this.props.assessmentQuestionReducer.assessmentQuestionLoad = null;
  }

  onChangeSearchText = (e) => {
    this.setState({ searchText: e.target.value });
  };

  onChangeQuestionType = (e) => {
    this.setState({ questionType: e.value });
  };

  clearSearch = () => {
    this.setState({ searchText: "", questionType: "" });
  };

  handleClick = () => {
    const { type, assessmentID } = this.state;
    this.props.history.push(`/assessment/${type}/questions/${assessmentID}`);
  };

  render() {
    const {
      searchText,
      questionType,
      questions,
      assessmentID,
      section,
    } = this.state;

    if (
      this.props.questionReducer.isLoading ||
      this.props.assessmentQuestionReducer.isLoading
    )
      return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    if (this.props.questionReducer.questionLoad === null) return false;
    if (questions === undefined) return <LoaderSpinner />;
    const lowerCasedSearchText = searchText.toLowerCase();
    const lowerCaseQuestionType = questionType.toLowerCase();
    let filteredData = questions;

    if (searchText !== "" || questionType !== "") {
      if (searchText !== "" && questionType === "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.questionDescription
              .toLowerCase()
              .indexOf(lowerCasedSearchText) >= 0
          );
        });
      }
      if (searchText === "" && questionType !== "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.questionType.toLowerCase().indexOf(lowerCaseQuestionType) >= 0
          );
        });
      }
      if (searchText !== "" && questionType !== "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.questionType.toLowerCase().includes(lowerCaseQuestionType) &&
            item.questionDescription
              .toLowerCase()
              .includes(lowerCasedSearchText)
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
            <div style={{ fontSize: "15px", fontFamily: "Ubuntu-Regular" }}>
              {row.serial}
            </div>
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
              <div
                style={{
                  fontSize: "15px",
                  fontFamily: "Ubuntu-Regular",
                }}
              >
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
        width: "500px",
      },
      {
        name: "Question Type",
        selector: "questionType",
        cell: (row) => (
          <div>
            <div style={{ fontSize: "15px", fontFamily: "Ubuntu-Regular" }}>
              {row.questionType}
            </div>
          </div>
        ),
        width: "200px",
      },
      {
        name: "Options",
        selector: "_id",
        cell: (row) => (
          <CustomRow>
            <TableButton
              onClick={() => {
                let data = {
                  assessmentID: assessmentID,
                  section: section,
                };

                this.props.questionReducer.questionLoad.forEach(
                  (item, index) => {
                    if (item._id === row._id) {
                      data.questionType = item.questionType;
                      data.questionDescription = item.questionDescription;
                      data.score = 0;
                      data.questionChoices = item.questionChoices;
                      data.questionAnswers = item.questionAnswers;
                    }
                  }
                );

                this.props.addAssessmentQuestion(data);
              }}
            >
              <MdIcons.MdAdd strokeWidth={"3"} />
            </TableButton>
          </CustomRow>
        ),
        width: "180px",
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
                  firstHeight={"60px"}
                  secHeight={"120px"}
                  widthChange={1250}
                >
                  <div className={css(styles.block)}>
                    <CustomInput
                      name={"search"}
                      type={"text"}
                      placeholder={"Enter question description here to search"}
                      onChangeValue={this.onChangeSearchText}
                      value={searchText}
                    />
                  </div>
                  <div className={css(styles.block)}>
                    <CustomDropdown
                      options={QuestionType}
                      onChange={this.onChangeQuestionType}
                      value={questionType}
                      placeholder="Select question type"
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
                paginationRowsPerPageOptions={[20, 25, 30, 35, 40]}
              />
              <div style={{ marginBottom: "100px" }}>
                <Button
                  backgroundColor={configStyles.colors.darkBlue}
                  color={configStyles.colors.white}
                  padding={"8px"}
                  onClick={this.handleClick}
                  width={"100px"}
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
  block: {
    flexWrap: "nowrap",
    width: "400px",
    height: "auto",
  },
});

RetrieveQuestionBankContainer.propTypes = {
  fetchAllQuestionData: PropTypes.func.isRequired,
  addAssessmentQuestion: PropTypes.func.isRequired,
  questionReducer: PropTypes.object.isRequired,
  assessmentQuestionReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questionReducer: state.questionReducer,
  assessmentQuestionReducer: state.assessmentQuestionReducer,
});

export default connect(mapStateToProps, {
  fetchAllQuestionData,
  addAssessmentQuestion,
  logout,
})(RetrieveQuestionBankContainer);
