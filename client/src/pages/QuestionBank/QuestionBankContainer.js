import React, { Component } from "react";

import { StyleSheet, css } from "aphrodite";

import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";
import Dropdown from "../../components/Dropdown";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import Table from "../../components/Table";
import TableButton from "../../components/TableButton";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import FirstLabel from "../../components/LabelComponent/FirstLabel";

import QuestionType from "./Data/QuestionType";

import "../../css/general.css";

import * as configStyles from "../../config/styles";

import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";

const data = [
  { qd: "aaaaaaaaaaaaaaaaaaaa", qt: "Single Choice" },
  {
    qd:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    qt: "Single Choice",
  },
  { qd: "aaaaaaaaaaaaaaaaaaaa", qt: "Multiple Choice" },
  { qd: "aaaaaaaaaaaaaaaaaaaa", qt: "Order" },
  { qd: "aaaaaaaaaaaaaaaaaaaa", qt: "Single Choice" },
  { qd: "aaaaaaaaaaaaaaaaaaaa", qt: "Single Choice" },
];

class QuestionBankContainer extends Component {
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

  handleClick = () => {
    this.props.history.push(`questionbank/question/create`);
  };

  render() {
    const { searchText, questionType } = this.state;
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

    data.forEach((data, index) => {
      data.serial = index + 1;
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
              <Table
                data={data}
                columns={column}
                path={`questionbank/viewQuestion`}
              />
              <Button
                backgroundColor={configStyles.colors.darkBlue}
                color={configStyles.colors.white}
                padding={"8px"}
                onClick={this.handleClick}
              >
                Create Question
              </Button>
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

export default QuestionBankContainer;
