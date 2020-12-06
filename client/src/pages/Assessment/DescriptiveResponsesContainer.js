import React, { Component } from "react";

import { StyleSheet } from "aphrodite";

import Header from "../../components/Header";
import Table from "../../components/Table";
import SearchBar from "../../components/SearchBar";
import TableButton from "../../components/TableButton";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
// import SecondLabel from "../../components/LabelComponent/SecondLabel";

import "../../css/general.css";

const data = [
  { qd: "aaaaaaaaaaaaaaaaaaaa" },
  {
    qd:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    qt: "Single Choice",
  },
  { qd: "aaaaaaaaaaaaaaaaaaaa" },
  { qd: "aaaaaaaaaaaaaaaaaaaa" },
  { qd: "aaaaaaaaaaaaaaaaaaaa" },
  { qd: "aaaaaaaaaaaaaaaaaaaa" },
];

class DescriptiveResponsesContainer extends Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { searchText } = this.state;

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
        width: "700px",
      },
      {
        name: "Options",
        selector: "opt",
        cell: (row) => (
          <CustomRow>
            <TableButton
              onClick={() => {
                this.props.history.push(`/assessment/gradeResponses`);
              }}
            >
              Mark
            </TableButton>
          </CustomRow>
        ),
        width: "100px",
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
                <FirstLabel>Descriptive Questions</FirstLabel>
              </div>
              <div style={{ marginBottom: "50px" }}>
                <SearchBar
                  name={"searchText"}
                  type={"text"}
                  placeholder={"Enter question description here to search"}
                  onChangeValue={this.onChange}
                  value={searchText}
                />
              </div>
              <Table
                data={data}
                columns={column}
                path={`/assessment/gradeResponses`}
              />
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
});

export default DescriptiveResponsesContainer;
