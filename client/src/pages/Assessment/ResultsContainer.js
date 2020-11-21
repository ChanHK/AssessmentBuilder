import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import Header from "../../components/Header";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import "../../css/general.css";
import * as MdIcons from "react-icons/md";
import TableButton from "../../components/TableButton";
import Table from "../../components/Table";
import CustomRow from "../../components/GridComponents/CustomRow";
import Button from "../../components/Button";
import CustomInput from "../../components/CustomInput";
import * as configStyles from "../../config/styles";

const data = [
  {
    title: "english test 1",
    email: "abc@gmail.com",
    name: "abc",
    score: "not graded",
    submitDate: "2020-09-13 23:07",
  },
  {
    title: "english test 1",
    email: "abc@gmail.com",
    name: "abc",
    score: "not graded",
    submitDate: "2020-09-13 23:07",
  },
  {
    title: "english test 1",
    email: "abc@gmail.com",
    name: "abc",
    score: "not graded",
    submitDate: "2020-09-13 23:07",
  },
  {
    title: "english test 1",
    email: "abc@gmail.com",
    name: "abc",
    score: "not graded",
    submitDate: "2020-09-13 23:07",
  },
  {
    title: "english test 1",
    email: "abc@gmail.com",
    name: "abc",
    score: "not graded",
    submitDate: "2020-09-13 23:07",
  },
];

export default class ResultsContainer extends Component {
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
    this.setState({ title: "", email: "", name: "" });
  };

  render() {
    const tableHeader = [
      {
        name: "#",
        selector: "serial",
        // https://stackoverflow.com/questions/61652186/adding-serial-number-column-in-the-table
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
        name: "Assessment Title",
        selector: "title",
        sortable: true,
        cell: (row) => (
          <div>
            <div style={{ fontSize: "15px", fontFamily: "Ubuntu-Regular" }}>
              {row.title}
            </div>
          </div>
        ),
      },
      {
        name: "Email",
        selector: "email",
        sortable: true,
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
        sortable: true,
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
        name: "Submit Date",
        selector: "submitDate",
        sortable: true,
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
                this.props.history.push(`/assessment/statistics`);
              }}
            >
              <MdIcons.MdOpenInNew />
            </TableButton>
          </CustomRow>
        ),
      },
    ];

    const { title, email, name } = this.state;

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
                  name={"title"}
                  type={"text"}
                  placeholder={"Enter assessment title here"}
                  onChangeValue={this.onChange}
                  value={title}
                />
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
              <CustomRow>
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
                  <div>
                    <Button
                      backgroundColor={configStyles.colors.darkBlue}
                      color={configStyles.colors.white}
                      padding={"8px"}
                      width={"100px"}
                      // onClick={this.handleClick}  //call search func
                    >
                      Show
                    </Button>
                  </div>
                </div>
              </CustomRow>
              <div style={{ margin: "25px 0px" }}>
                <Table
                  data={data}
                  columns={tableHeader}
                  path={`/assessment/statistics`}
                />
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
