import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import Header from "../../components/Header";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import Title from "../../components/Title";
import Wrapper from "../../components/Wrapper";
import Dropdown from "../../components/Dropdown";
import QuestionType from "./Data/QuestionType";
import SearchBar from "../../components/SearchBar";
import DataTable from "react-data-table-component";
import "../../css/general.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const customStyles = {
  headCells: {
    style: {
      fontSize: "20px",
      fontFamily: "Ubuntu-Bold",
    },
  },
};

const data = [
  { id: 1, qd: "aaaaaaaaaaaaaaaaaaaa", qt: "Single Choice" },
  {
    id: 2,
    qd:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    qt: "Single Choice",
  },
  { id: 3, qd: "aaaaaaaaaaaaaaaaaaaa", qt: "Single Choice" },
  { id: 4, qd: "aaaaaaaaaaaaaaaaaaaa", qt: "Single Choice" },
  { id: 5, qd: "aaaaaaaaaaaaaaaaaaaa", qt: "Single Choice" },
  { id: 6, qd: "aaaaaaaaaaaaaaaaaaaa", qt: "Single Choice" },
];

const columns = [
  {
    name: "#",
    selector: "id",
    cell: (row) => (
      <div>
        <div style={{ fontSize: "15px", fontFamily: "Ubuntu-Regular" }}>
          {row.id}
        </div>
      </div>
    ),
    width: "20px",
  },
  {
    name: "Question Description",
    selector: "qd",
    cell: (row) => (
      <div>
        <div
          style={{
            fontSize: "15px",
            fontFamily: "Ubuntu-Regular",
          }}
        >
          {row.qd}
        </div>
      </div>
    ),
    sortable: true,
    width: "500px",
  },
  {
    name: "Question Type",
    selector: "qt",
    cell: (row) => (
      <div>
        <div style={{ fontSize: "15px", fontFamily: "Ubuntu-Regular" }}>
          {row.qt}
        </div>
      </div>
    ),
    sortable: true,
    width: "200px",
  },
  {
    name: "Options",
    selector: "opt",
    right: "true",
  },
];

export default class ProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      questionType: "",
    };
  }

  onChangeSearchText = (e) => {
    this.setState({ searchText: e.target.value });
  };

  onChangeQuestionType = (e) => {
    this.setState({ questionType: e.target.value });
  };

  render() {
    const { searchText, questionType } = this.state;
    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <Title>Question Bank</Title>
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
              <DataTable
                columns={columns}
                data={data}
                className={css(styles.tableCon)}
                highlightOnHover
                persistTableHead
                noHeader
                striped
                responsive
                customStyles={customStyles}
              />
              <div className={css(styles.buttonCon)}>
                <Button
                  className={css(styles.button)}
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
  tableCon: {
    width: "100%",
    height: "auto",
    display: "flex",
    borderRadius: "5px",
    marginBottom: "20px",
    border: "2px solid black",
    headCells: {
      fontSize: "20px",
      fontFamily: "Ubuntu-Regular",
    },
  },
  button: {
    border: "none",
    outline: "none",
    fontFamily: "Ubuntu-Bold",
    backgroundColor: "#060b26",
    color: "white",
    borderRadius: "5px",
    fontSize: "15px",
    // textTransform: "uppercase",
    lineHeight: "1.2",
    width: "100px",
  },
  buttonCon: {
    justifyContent: "flex-end",
    display: "flex",
  },
});
