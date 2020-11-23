import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import Header from "../../components/Header";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import "../../css/general.css";
// import SecondLabel from "../../components/LabelComponent/SecondLabel";
import Table from "../../components/Table";
import SearchBar from "../../components/SearchBar";
import CustomRow from "../../components/GridComponents/CustomRow";
import TableButton from "../../components/TableButton";

const data = [
  { id: 1, qd: "aaaaaaaaaaaaaaaaaaaa" },
  {
    id: 2,
    qd:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    qt: "Single Choice",
  },
  { id: 3, qd: "aaaaaaaaaaaaaaaaaaaa" },
  { id: 4, qd: "aaaaaaaaaaaaaaaaaaaa" },
  { id: 5, qd: "aaaaaaaaaaaaaaaaaaaa" },
  { id: 6, qd: "aaaaaaaaaaaaaaaaaaaa" },
];

class DiscriptiveResponsesContainer extends Component {
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
        selector: "id",
        cell: (row) => (
          <div>
            <div style={{ fontSize: "15px", fontFamily: "Ubuntu-Regular" }}>
              {row.id}
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
        width: "500px",
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
    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Discriptive Questions</FirstLabel>
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

export default DiscriptiveResponsesContainer;
