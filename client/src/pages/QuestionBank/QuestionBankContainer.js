import React, { Component } from "react";
import "../../css/general.css";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";
import Dropdown from "../../components/Dropdown";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import Table from "../../components/Table";
import TableButton from "../../components/TableButton";
import LoaderSpinner from "../../components/LoaderSpinner";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import QuestionType from "./Data/QuestionType";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAllQuestionData } from "../../actions/question.actions";

import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

class QuestionBankContainer extends Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      questionType: "",
      questions: [],
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
      this.setState(() => ({
        questions: JSON.parse(
          JSON.stringify(questionReducer.questionLoad.questions)
        ),
      }));
    }
  }

  componentWillUnmount() {
    this.props.questionReducer.questionLoad = null;
  }

  onChangeSearchText = (e) => {
    this.setState({ searchText: e.target.value });
  };

  onChangeQuestionType = (e) => {
    this.setState({ questionType: e.target.value });
  };

  handleClick = () => {
    this.props.history.push(`questionbank/question/create`);
  };

  clearSearch = () => {
    this.setState({ searchText: "", questionType: "" });
  };

  render() {
    const { searchText, questionType, questions } = this.state;

    const lowerCasedSearchText = searchText.toLowerCase();
    const lowerCaseQuestionType = questionType.toLowerCase();
    let filteredData = JSON.parse(JSON.stringify(questions));

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
                  style={{ height: "20px" }}
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
        selector: "opt",
        // right: "true",
        cell: (row) => (
          <CustomRow>
            <TableButton
              onClick={() => {
                this.props.history.push(`questionbank/editQuestion`);
              }}
            >
              <MdIcons.MdModeEdit />
            </TableButton>
            <TableButton>
              <MdIcons.MdDelete />
            </TableButton>
            <TableButton
              onClick={() => {
                this.props.history.push(`questionbank/viewQuestion`);
              }}
            >
              <BsIcons.BsFillEyeFill />
            </TableButton>
          </CustomRow>
        ),
        width: "180px",
      },
    ];

    if (this.props.questionReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    if (this.props.questionReducer.questionLoad === null) return false;

    filteredData.forEach((x, index) => {
      x.serial = index + 1;
    });

    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Question Bank</FirstLabel>
              </div>
              <div style={{ paddingBottom: "25px" }}>
                <Wrapper
                  firstHeight={"60px"}
                  secHeight={"120px"}
                  widthChange={1250}
                >
                  <div className={css(styles.block)}>
                    <SearchBar
                      name={"search"}
                      type={"text"}
                      placeholder={"Enter question description here to search"}
                      onChangeValue={this.onChangeSearchText}
                      value={searchText}
                    />
                  </div>
                  <div className={css(styles.block)}>
                    <Dropdown
                      options={QuestionType}
                      placeholder={"Select question type"}
                      value={questionType}
                      onChangeValue={this.onChangeQuestionType}
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
              />
              <div style={{ marginBottom: "100px" }}>
                <Button
                  backgroundColor={configStyles.colors.darkBlue}
                  color={configStyles.colors.white}
                  padding={"8px"}
                  onClick={this.handleClick}
                >
                  Create Question
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

QuestionBankContainer.propTypes = {
  fetchAllQuestionData: PropTypes.func.isRequired,
  questionReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questionReducer: state.questionReducer,
});

export default connect(mapStateToProps, { fetchAllQuestionData, logout })(
  QuestionBankContainer
);
