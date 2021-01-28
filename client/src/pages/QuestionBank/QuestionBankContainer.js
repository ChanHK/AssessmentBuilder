import React, { Component } from "react";
import "../../css/general.css";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";
import CustomDropdown from "../../components/CustomDropdown";
import Button from "../../components/Button";
import Table from "../../components/Table";
import TableButton from "../../components/TableButton";
import LoaderSpinner from "../../components/LoaderSpinner";
import CustomInput from "../../components/CustomInput";
import ScrollArrow from "../../components/ScrollArrow";
import Modal from "../../components/Modal";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";

import QuestionType from "./Data/QuestionType";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchAllQuestionData,
  deleteQuestionData,
  fetchQuestionDataOnSub,
  moveQuestion,
  fetchQuestionBankData,
} from "../../actions/question.actions";

import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

class QuestionBankContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      questionType: "",
      questions: [],
      subject: this.props.match.params.subject,
      deleteQuestionID: "", //stores the ID of the question that will be deleted
      showModal: false,
      all_subjects: [],
      move_subject: "", // subject which the question move to
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
      subject: this.state.subject,
    };
    this.props.fetchQuestionDataOnSub(data);
    this.props.fetchQuestionBankData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { questionReducer } = this.props;

    if (
      prevProps.questionReducer !== questionReducer &&
      questionReducer.questionData !== null &&
      questionReducer.questionBankData !== null
    ) {
      const { totalSubjects } = questionReducer.questionBankData;
      this.setState({
        questions: questionReducer.questionData,
        all_subjects: totalSubjects,
      });
    }
  }

  componentWillUnmount() {
    this.props.questionReducer.questionData = null;
    this.props.questionReducer.questionBankData = null;
  }

  onChangeSearchText = (e) => {
    this.setState({ searchText: e.target.value });
  };

  onChangeQuestionType = (e) => {
    this.setState({ questionType: e.value });
  };

  handleClick = () => {
    const { subject } = this.state;
    this.props.history.push(`/questionbank/question/create/null/${subject}`);
  };

  clearSearch = () => {
    this.setState({ searchText: "", questionType: "" });
  };

  render() {
    const {
      searchText,
      questionType,
      questions,
      subject,
      deleteQuestionID,
      showModal,
      all_subjects,
      move_subject,
    } = this.state;

    if (this.props.questionReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    if (this.props.questionReducer.questionData === null) return false;
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
        minWidth: "500px",
        width: "60%",
      },
      {
        name: "Question Type",
        selector: "questionType",
        cell: (row) => (
          <div>
            <div className={css(styles.tableRow)}>{row.questionType}</div>
          </div>
        ),
        width: "15%",
        minWidth: "200px",
      },
      {
        name: "Options",
        selector: "_id",
        cell: (row) => (
          <CustomRow>
            <TableButton
              onClick={() => {
                this.props.history.push(
                  `/questionbank/question/edit/${row._id}/${subject}`
                );
              }}
            >
              <MdIcons.MdModeEdit />
            </TableButton>
            <TableButton
              onClick={() => {
                const data = {
                  questionID: row._id,
                };
                this.props.deleteQuestionData(data);
              }}
            >
              <MdIcons.MdDelete />
            </TableButton>
            <TableButton
              onClick={() => {
                this.props.history.push(
                  `/questionbank/question_view/${row._id}/${subject}`
                );
              }}
            >
              <BsIcons.BsFillEyeFill />
            </TableButton>
            <TableButton
              onClick={() => {
                this.setState({
                  deleteQuestionID: row._id,
                  showModal: true,
                });
              }}
            >
              <GiIcons.GiJumpAcross />
            </TableButton>
          </CustomRow>
        ),
        width: "15%",
        minWidth: "200px",
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
                <FirstLabel>Question Bank - {subject}</FirstLabel>
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

            <Modal show={showModal}>
              <div className={css(styles.modal)}>
                <CustomColumn>
                  <SecondLabel>Select subject</SecondLabel>
                  <CustomDropdown
                    options={all_subjects}
                    onChange={(e) => {
                      this.setState({ move_subject: e.value });
                    }}
                    value={move_subject}
                    placeholder="Select question type"
                  />
                  <div style={{ marginTop: "25px" }}>
                    <CustomRow>
                      <Button
                        backgroundColor={configStyles.colors.darkBlue}
                        color={configStyles.colors.white}
                        padding={"8px"}
                        width={"100px"}
                        type={"button"}
                        marginLeft={"20px"}
                        onClick={() => {
                          const data = {
                            questionID: deleteQuestionID,
                            subject: move_subject,
                            main_sub: subject,
                          };
                          this.props.moveQuestion(data);
                          this.setState({
                            showModal: false,
                            deleteQuestionID: "",
                          });
                        }}
                      >
                        Confirm
                      </Button>
                      <Button
                        backgroundColor={configStyles.colors.white}
                        color={configStyles.colors.darkBlue}
                        padding={"8px"}
                        width={"100px"}
                        type={"button"}
                        marginLeft={"20px"}
                        onClick={() => {
                          this.setState({
                            showModal: false,
                            deleteQuestionID: "",
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    </CustomRow>
                  </div>
                </CustomColumn>
              </div>
            </Modal>
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
  modal: {
    width: "100%",
    height: "auto",
    border: "none",
    borderRadius: "5px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    backgroundColor: configStyles.colors.white,
    padding: "20px",
  },
});

QuestionBankContainer.propTypes = {
  fetchAllQuestionData: PropTypes.func.isRequired,
  questionReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  deleteQuestionData: PropTypes.func.isRequired,
  fetchQuestionDataOnSub: PropTypes.func.isRequired,
  moveQuestion: PropTypes.func.isRequired,
  fetchQuestionBankData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questionReducer: state.questionReducer,
});

export default connect(mapStateToProps, {
  fetchAllQuestionData,
  logout,
  deleteQuestionData,
  fetchQuestionDataOnSub,
  moveQuestion,
  fetchQuestionBankData,
})(QuestionBankContainer);
