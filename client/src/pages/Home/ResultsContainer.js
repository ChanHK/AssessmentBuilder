import React, { Component } from "react";
import * as configStyles from "../../config/styles";
import { StyleSheet, css } from "aphrodite";
import "../../css/general.css";

import Header from "../../components/Header";
import TableButton from "../../components/TableButton";
import Table from "../../components/Table";
import Button from "../../components/Button";
import CustomInput from "../../components/CustomInput";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";
import FirstLabel from "../../components/LabelComponent/FirstLabel";

import * as MdIcons from "react-icons/md";

const data = [
  {
    email: "abc@gmail.com",
    name: "abc",
    score: "not graded",
    grade: "not graded",
    submitDate: "2020-09-13 23:07",
  },
  {
    email: "abc@gmail.com",
    name: "abc",
    score: "not graded",
    grade: "not graded",
    submitDate: "2020-09-13 23:07",
  },
  {
    email: "abc@gmail.com",
    name: "abc",
    score: "not graded",
    grade: "not graded",
    submitDate: "2020-09-13 23:07",
  },
  {
    email: "abc@gmail.com",
    name: "abc",
    score: "not graded",
    grade: "not graded",
    submitDate: "2020-09-13 23:07",
  },
  {
    email: "abc@gmail.com",
    name: "abc",
    score: "not graded",
    grade: "not graded",
    submitDate: "2020-09-13 23:07",
  },
  {
    email: "abc@gmail.com",
    name: "abc",
    score: "not graded",
    grade: "not graded",
    submitDate: "2020-09-13 23:07",
  },
];

class ResultsContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      email: "",
      name: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onReset = () => {
    this.setState({ email: "", name: "" });
  };

  render() {
    const tableHeader = [
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
        name: "Email",
        selector: "email",
        cell: (row) => (
          <div>
            <div style={{ fontSize: "15px", fontFamily: "Ubuntu-Regular" }}>
              {row.email}
            </div>
          </div>
        ),
      },
      {
        name: "Name",
        selector: "name",
        cell: (row) => (
          <div>
            <div style={{ fontSize: "15px", fontFamily: "Ubuntu-Regular" }}>
              {row.name}
            </div>
          </div>
        ),
      },
      {
        name: "Score",
        selector: "score",
        sortable: true,
        cell: (row) => (
          <div>
            <div style={{ fontSize: "15px", fontFamily: "Ubuntu-Regular" }}>
              {row.score}
            </div>
          </div>
        ),
      },
      {
        name: "Grade",
        selector: "grade",
        sortable: true,
        cell: (row) => (
          <div>
            <div style={{ fontSize: "15px", fontFamily: "Ubuntu-Regular" }}>
              {row.grade}
            </div>
          </div>
        ),
      },
      {
        name: "Submission Date",
        selector: "submitDate",
        cell: (row) => (
          <div>
            <div style={{ fontSize: "15px", fontFamily: "Ubuntu-Regular" }}>
              {row.submitDate}
            </div>
          </div>
        ),
      },
      {
        name: "Option",
        cell: (row) => (
          <CustomRow>
            <TableButton
              onClick={() => {
                this.props.history.push(`/assessment/response`);
              }}
            >
              <MdIcons.MdOpenInNew />
            </TableButton>
          </CustomRow>
        ),
      },
    ];

    data.forEach((data, index) => {
      data.serial = index + 1;
    });

    const { email, name } = this.state;

    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Results</FirstLabel>
              </div>
              <div className={css(styles.con)}>
                <CustomInput
                  name={"email"}
                  type={"text"}
                  placeholder={"Enter candidate email here"}
                  onChangeValue={this.onChange}
                  value={email}
                />
              </div>
              <div className={css(styles.con)}>
                <CustomInput
                  name={"name"}
                  type={"text"}
                  placeholder={"Enter candidate name here"}
                  onChangeValue={this.onChange}
                  value={name}
                />
              </div>

              <div className={css(styles.buttonCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Button
                    backgroundColor={configStyles.colors.white}
                    color={configStyles.colors.darkBlue}
                    padding={"8px"}
                    width={"100px"}
                    onClick={this.onReset}
                  >
                    Reset
                  </Button>
                </div>
              </div>

              <div style={{ margin: "25px 0px" }}>
                <Table data={data} columns={tableHeader} />
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
  con: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    paddingBottom: "20px",
  },
  buttonCon: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default ResultsContainer;
