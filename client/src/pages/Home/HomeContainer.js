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

//tempory since this will be obtain from the store
const data = [
  { id: 1, title: "english test 1", status: "Setup in progress" },
  { id: 2, title: "mathematics", status: "Active" },
  { id: 3, title: "physics", status: "Ended" },
  { id: 4, title: "chemistry", status: "Active" },
  { id: 5, title: "biology", status: "Ended" },
  { id: 6, title: "programming", status: "Setup in progress" },
  { id: 7, title: "english test 1", status: "Setup in progress" },
  { id: 8, title: "mathematics", status: "Active" },
  { id: 9, title: "physics", status: "Ended" },
  { id: 10, title: "chemistry", status: "Active" },
  { id: 11, title: "biology", status: "Ended" },
  { id: 12, title: "programming", status: "Setup in progress" },
];

export default class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {
      searchText: null,
    };
  }

  onChangeSearchText = (e) => {
    this.setState({ searchText: e.target.value });
  };

  render() {
    const tableHeader = [
      {
        name: "#",
        selector: "id",
      },
      {
        name: "Assessment Title",
        selector: "title",
        sortable: true,
      },
      {
        name: "Status",
        selector: "status",
        sortable: true,
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
                  <StatusBox number={"67"} text={"Assessments Created"} />
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
                    onClick={this.handleClick}
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
