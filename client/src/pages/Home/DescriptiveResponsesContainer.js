import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite";
import "../../css/general.css";

import Header from "../../components/Header";
import Table from "../../components/Table";
import CustomInput from "../../components/CustomInput";
import TableButton from "../../components/TableButton";
import LoaderSpinner from "../../components/LoaderSpinner";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
// import SecondLabel from "../../components/LabelComponent/SecondLabel";

import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchDesQuestions } from "../../actions/home.actions";
import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

class DescriptiveResponsesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      assessmentID: this.props.match.params.assessmentID,
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

    const data = {
      assessmentID: this.state.assessmentID,
    };

    this.props.fetchDesQuestions(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const { homeReducer } = this.props;

    if (
      prevProps.homeReducer !== homeReducer &&
      homeReducer.desQuestions !== null
    ) {
      const { desQuestions } = homeReducer;

      this.setState({
        questions: desQuestions,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { searchText, questions } = this.state;

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
                    width: "100%",
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
        width: "80%",
      },
      {
        name: "Options",
        selector: "_id",
        cell: (row) => (
          <CustomRow>
            <TableButton
              onClick={() => {
                this.props.history.push(
                  `/assessment/grade/responses/${row._id}`
                );
              }}
            >
              Mark
            </TableButton>
          </CustomRow>
        ),
        width: "100px",
      },
    ];

    if (this.props.homeReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    const lowerCasedSearchText = searchText.toLowerCase();

    let filteredData = questions;

    if (searchText !== "") {
      filteredData = filteredData.filter((item) => {
        return (
          item.questionDescription
            .toLowerCase()
            .indexOf(lowerCasedSearchText) >= 0
        );
      });
    }

    filteredData.forEach((data, index) => {
      data.serial = index + 1;
    });

    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Descriptive Questions</FirstLabel>
              </div>
              <div style={{ marginBottom: "50px" }}>
                <CustomInput
                  name={"searchText"}
                  type={"text"}
                  placeholder={"Enter question description here to search"}
                  onChangeValue={this.onChange}
                  value={searchText}
                />
              </div>
              <Table data={filteredData} columns={column} />
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
  tableRow: {
    fontSize: "15px",
    fontFamily: "Ubuntu-Regular",
  },
});

DescriptiveResponsesContainer.propTypes = {
  logout: PropTypes.func.isRequired,
  fetchDesQuestions: PropTypes.func.isRequired,
  homeReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  homeReducer: state.homeReducer,
});

export default connect(mapStateToProps, {
  logout,
  fetchDesQuestions,
})(DescriptiveResponsesContainer);
