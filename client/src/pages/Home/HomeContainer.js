import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import Header from "../../components/Header";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import StatusBox from "../../components/StatusBarComponents/StatusBox";
import StatusBarWrapper from "../../components/StatusBarComponents/StatusBarWrapper";
import StatusBarImage from "../../components/StatusBarComponents/StatusBarImage";
import profile from "../../image/profile/dummyUser.png";
import "../../css/general.css";
import Wrapper from "../../components/Wrapper";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import * as configStyles from "../../config/styles";
import Table from "../../components/Table";
import CustomRow from "../../components/GridComponents/CustomRow";
// import * as MdIcons from "react-icons/md";
// import * as BsIcons from "react-icons/bs";
import TableButton from "../../components/TableButton";

//tempory since this will be obtain from the store
const data = [
  { title: "english test 1", status: "Setup in progress" },
  { title: "mathematics", status: "Active" },
  { title: "physics", status: "Ended" },
  { title: "chemistry", status: "Active" },
  { title: "biology", status: "Ended" },
  { title: "programming", status: "Setup in progress" },
  { title: "english test 1", status: "Setup in progress" },
  { title: "mathematics", status: "Active" },
  { title: "physics", status: "Ended" },
  { title: "chemistry", status: "Active" },
  { title: "biology", status: "Ended" },
  { title: "programming", status: "Setup in progress" },
];

export default class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {
      searchText: null,
      rowNum: 0,
    };
  }

  onChangeSearchText = (e) => {
    this.setState({ searchText: e.target.value });
  };

  toCreateAssessment = () => {
    this.props.history.push("assessment/createAssessment");
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
        width: "50px",
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
        width: "200px",
      },
      {
        name: "Status",
        selector: "status",
        sortable: true,
        cell: (row) => (
          <div>
            <div style={{ fontSize: "15px", fontFamily: "Ubuntu-Regular" }}>
              {row.status}
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
              {/* <MdIcons.MdModeEdit /> */}
              Edit
            </TableButton>
            <TableButton>
              {/* <MdIcons.MdDelete /> */}
              Delete
            </TableButton>
            <TableButton
              onClick={() => {
                this.props.history.push(`questionbank/viewQuestion`);
              }}
            >
              {/* <BsIcons.BsFillEyeFill /> */}
              View
            </TableButton>
            <TableButton
              onClick={() => {
                this.props.history.push(`/assessment/discriptiveResponses`);
              }}
            >
              Mark
            </TableButton>
            <TableButton
              onClick={() => {
                this.props.history.push(`/assessment/results`);
              }}
            >
              Results
            </TableButton>
            <TableButton
              onClick={() => {
                this.props.history.push(`/assessment/statistics`);
              }}
            >
              Statistics
            </TableButton>
          </CustomRow>
        ),
      },
    ];

    const { searchText } = this.state;
    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "80px", paddingBottom: "20px" }}>
                <StatusBarWrapper>
                  <StatusBarImage image={profile} style={[styles.imgPos]} />
                  <StatusBox number={"67"} text={"Total Assessments"} />
                  <StatusBox number={"2"} text={"Setup In Progress"} />
                  <StatusBox number={"200"} text={"Assessments Activated"} />
                </StatusBarWrapper>
              </div>
              <FirstLabel>Assessments</FirstLabel>
              <Wrapper
                firstHeight={"60px"}
                secHeight={"120px"}
                widthChange={1250}
              >
                <div className={css(styles.block)}>
                  <SearchBar
                    name={"search"}
                    type={"text"}
                    placeholder={"Enter assessment title here to search"}
                    onChangeValue={this.onChangeSearchText}
                    value={searchText}
                  />
                </div>
                <div className={css(styles.block)}>
                  <Button
                    backgroundColor={configStyles.colors.darkBlue}
                    color={configStyles.colors.white}
                    padding={"8px"}
                    onClick={this.toCreateAssessment}
                  >
                    Create Assessments
                  </Button>
                </div>
              </Wrapper>
              <div style={{ padding: "50px 0px" }}>
                <Table
                  data={data}
                  columns={tableHeader}
                  path={`questionbank/viewQuestion`}
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
  imgPos: {
    float: "left",
  },
  block: {
    flexWrap: "nowrap",
    width: "400px",
    height: "auto",
    display: "flex",
    float: "left",
  },
});
