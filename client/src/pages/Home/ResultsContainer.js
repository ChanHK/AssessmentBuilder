import React, { Component } from "react";
import * as configStyles from "../../config/styles";
import { StyleSheet, css } from "aphrodite";
import "../../css/general.css";

import Header from "../../components/Header";
import TableButton from "../../components/TableButton";
import Table from "../../components/Table";
import Button from "../../components/Button";
import CustomInput from "../../components/CustomInput";
import LoaderSpinner from "../../components/LoaderSpinner";
import Wrapper from "../../components/Wrapper";
import ScrollArrow from "../../components/ScrollArrow";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";
import FirstLabel from "../../components/LabelComponent/FirstLabel";

import * as MdIcons from "react-icons/md";

const data = [
  {
    email: "xxx@gmail.com",
    name: "abc",
    score: "not graded",
    grade: "not graded",
    submitDate: "2020-09-13 23:07",
  },
  {
    email: "abc@gmail.com",
    name: "xxx",
    score: "not graded",
    grade: "not graded",
    submitDate: "2020-09-13 23:07",
  },
  {
    email: "abc@gmail.com",
    name: "abc",
    score: "100%",
    grade: "not graded",
    submitDate: "2020-09-13 23:07",
  },
  {
    email: "abc@gmail.com",
    name: "abc",
    score: "not graded",
    grade: "B",
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
      email: "",
      name: "",
      score: "",
      grade: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onReset = () => {
    this.setState({ email: "", name: "", score: "", grade: "" });
  };

  render() {
    const { email, name, score, grade } = this.state;

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

    // if (this.props.homeReducer.isLoading) return <LoaderSpinner />;
    // else document.body.style.overflow = "unset";

    const lowerCaseEmail = email.toLowerCase();
    const lowerCaseName = name.toLowerCase();
    const lowerCaseScore = score.toLowerCase();
    const lowerCaseGrade = grade.toLowerCase();

    let filteredData = data;

    if (email !== "" || name !== "" || score !== "" || grade !== "") {
      if (email !== "" && name === "" && score === "" && grade === "") {
        filteredData = filteredData.filter((item) => {
          return item.email.toLowerCase().indexOf(lowerCaseEmail) >= 0;
        });
      } else if (email === "" && name !== "" && score === "" && grade === "") {
        filteredData = filteredData.filter((item) => {
          return item.name.toLowerCase().indexOf(lowerCaseName) >= 0;
        });
      } else if (email === "" && name === "" && score !== "" && grade === "") {
        filteredData = filteredData.filter((item) => {
          return item.score.toLowerCase().indexOf(lowerCaseScore) >= 0;
        });
      } else if (email === "" && name === "" && score === "" && grade !== "") {
        filteredData = filteredData.filter((item) => {
          return item.grade.toLowerCase().indexOf(lowerCaseGrade) >= 0;
        });
      } else if (email !== "" && name !== "" && score === "" && grade === "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.email.toLowerCase().includes(lowerCaseEmail) &&
            item.name.toLowerCase().includes(lowerCaseName)
          );
        });
      } else if (email !== "" && name === "" && score !== "" && grade === "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.email.toLowerCase().includes(lowerCaseEmail) &&
            item.score.toLowerCase().includes(lowerCaseScore)
          );
        });
      } else if (email !== "" && name === "" && score === "" && grade !== "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.email.toLowerCase().includes(lowerCaseEmail) &&
            item.grade.toLowerCase().includes(lowerCaseGrade)
          );
        });
      } else if (email === "" && name !== "" && score !== "" && grade === "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.name.toLowerCase().includes(lowerCaseName) &&
            item.score.toLowerCase().includes(lowerCaseScore)
          );
        });
      } else if (email === "" && name !== "" && score === "" && grade !== "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.name.toLowerCase().includes(lowerCaseName) &&
            item.grade.toLowerCase().includes(lowerCaseGrade)
          );
        });
      } else if (email === "" && name === "" && score !== "" && grade !== "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.score.toLowerCase().includes(lowerCaseScore) &&
            item.grade.toLowerCase().includes(lowerCaseGrade)
          );
        });
      } else if (email !== "" && name !== "" && score !== "" && grade === "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.email.toLowerCase().includes(lowerCaseEmail) &&
            item.name.toLowerCase().includes(lowerCaseName) &&
            item.score.toLowerCase().includes(lowerCaseScore)
          );
        });
      } else if (email !== "" && name !== "" && score === "" && grade !== "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.email.toLowerCase().includes(lowerCaseEmail) &&
            item.name.toLowerCase().includes(lowerCaseName) &&
            item.grade.toLowerCase().includes(lowerCaseGrade)
          );
        });
      } else if (email !== "" && name === "" && score !== "" && grade !== "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.email.toLowerCase().includes(lowerCaseEmail) &&
            item.score.toLowerCase().includes(lowerCaseScore) &&
            item.grade.toLowerCase().includes(lowerCaseGrade)
          );
        });
      } else if (email === "" && name !== "" && score !== "" && grade !== "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.name.toLowerCase().includes(lowerCaseName) &&
            item.score.toLowerCase().includes(lowerCaseScore) &&
            item.grade.toLowerCase().includes(lowerCaseGrade)
          );
        });
      } else if (email !== "" && name !== "" && score !== "" && grade !== "") {
        filteredData = filteredData.filter((item) => {
          return (
            item.email.toLowerCase().includes(lowerCaseEmail) &&
            item.name.toLowerCase().includes(lowerCaseName) &&
            item.score.toLowerCase().includes(lowerCaseScore) &&
            item.grade.toLowerCase().includes(lowerCaseGrade)
          );
        });
      }
    }

    filteredData.forEach((data, index) => {
      data.serial = index + 1;
    });

    return (
      <>
        <Header />
        <ScrollArrow />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Results</FirstLabel>
              </div>
              <Wrapper
                firstHeight={"60px"}
                secHeight={"120px"}
                widthChange={1600}
              >
                <div className={css(styles.block)}>
                  <CustomInput
                    name={"email"}
                    type={"text"}
                    placeholder={"Search email"}
                    onChangeValue={this.onChange}
                    value={email}
                  />
                </div>
                <div className={css(styles.block)}>
                  <CustomInput
                    name={"name"}
                    type={"text"}
                    placeholder={"Search name"}
                    onChangeValue={this.onChange}
                    value={name}
                  />
                </div>
              </Wrapper>
              <Wrapper
                firstHeight={"60px"}
                secHeight={"120px"}
                widthChange={1600}
              >
                <div className={css(styles.block)}>
                  <CustomInput
                    name={"score"}
                    type={"text"}
                    placeholder={"Search score"}
                    onChangeValue={this.onChange}
                    value={score}
                  />
                </div>
                <div className={css(styles.block)}>
                  <CustomInput
                    name={"grade"}
                    type={"text"}
                    placeholder={"Search grade"}
                    onChangeValue={this.onChange}
                    value={grade}
                  />
                </div>
              </Wrapper>
              <div className={css(styles.buttonCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Button
                    backgroundColor={configStyles.colors.darkBlue}
                    color={configStyles.colors.white}
                    padding={"8px"}
                    width={"100px"}
                    onClick={this.onReset}
                  >
                    Reset
                  </Button>
                </div>
              </div>

              <div style={{ margin: "25px 0px 100px 0px" }}>
                <Table data={filteredData} columns={tableHeader} />
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
  buttonCon: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "25px",
  },
  block: {
    flexWrap: "nowrap",
    backgroundColor: "plum",
    width: "450px",
    height: "auto",
    display: "flex",
    float: "left",
  },
});

export default ResultsContainer;
