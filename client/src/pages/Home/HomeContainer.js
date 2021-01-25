import React, { Component } from "react";
import "../../css/general.css";
import * as configStyles from "../../config/styles";
import { StyleSheet, css } from "aphrodite";

import Header from "../../components/Header";
import Table from "../../components/Table";
import TableButton from "../../components/TableButton";
import ScrollArrow from "../../components/ScrollArrow";
import Wrapper from "../../components/Wrapper";
import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";
import LoaderSpinner from "../../components/LoaderSpinner";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import StatusBox from "../../components/StatusBarComponents/StatusBox";
import StatusBarWrapper from "../../components/StatusBarComponents/StatusBarWrapper";
import StatusBarImage from "../../components/StatusBarComponents/StatusBarImage";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  homeFetchAllAssessment,
  createAssessmentObj,
  fetchProfilePic,
  deleteAssessment,
} from "../../actions/home.actions";
import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      assessments: [], //assessments fetched from db
      setupNum: 0,
      totalAssessmentNum: 0,
      activateNum: 0,
      generatedID: "", //ID return from createAssessmentObj
      url: "", //pic
      posX: 0,
      posY: 0,
      scale: 0,
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

    this.props.homeFetchAllAssessment();
    this.props.fetchProfilePic();
  }

  componentDidUpdate(prevProps, prevState) {
    const { homeReducer } = this.props;

    if (
      prevProps.homeReducer !== homeReducer &&
      homeReducer.assessments !== null
    ) {
      const { assessments } = homeReducer;

      let tempSetupNum = 0;
      let tempActivateNum = 0;
      assessments.forEach((item, index) => {
        if (item.status === "Setup in progress") {
          tempSetupNum++;
        }
        if (item.status === "Activated") {
          tempActivateNum++;
        }
      });

      this.setState({
        assessments: assessments,
        totalAssessmentNum: assessments.length,
        setupNum: tempSetupNum,
        activateNum: tempActivateNum,
      });
    }

    if (prevProps.homeReducer !== homeReducer && homeReducer.newID !== null) {
      const { newID } = homeReducer;
      this.setState({ generatedID: newID.assessmentID });
    }

    if (prevProps.homeReducer !== homeReducer && homeReducer.pic !== null) {
      const { url, posX, posY, scale } = homeReducer.pic;
      this.setState({
        url: url,
        posX: parseFloat(posX),
        posY: parseFloat(posY),
        scale: parseFloat(scale),
      });
    }
  }

  componentWillUnmount() {
    this.props.homeReducer.assessments = null;
    this.props.homeReducer.newID = null;
  }

  onChangeSearchText = (e) => {
    this.setState({ searchText: e.target.value });
  };

  toCreateAssessment = () => {
    this.props.createAssessmentObj();
  };

  render() {
    const {
      searchText,
      assessments,
      setupNum,
      totalAssessmentNum,
      activateNum,
      generatedID,
      url,
      posX,
      posY,
      scale,
    } = this.state;

    let position = { x: 0.5, y: 0.5 };
    position.x = posX;
    position.y = posY;

    const tableHeader = [
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
        name: "Assessment Title",
        selector: "settings.testName",
        cell: (row) => (
          <div>
            <div className={css(styles.tableRow)}>{row.settings.testName}</div>
          </div>
        ),
        width: "40%",
      },
      {
        name: "Status",
        selector: "status",
        cell: (row) => (
          <div>
            <div
              className={css(styles.tableRow)}
              style={{
                backgroundColor:
                  row.status === "Setup in progress"
                    ? configStyles.colors.yellow
                    : row.status === "Activated"
                    ? configStyles.colors.green
                    : "inherit",
                padding: "5px",
              }}
            >
              {row.status}
            </div>
          </div>
        ),
        width: "170px",
      },
      {
        name: "Options",
        selector: "_id, status",
        cell: (row) => (
          <CustomRow>
            {row.status === "Setup in progress" && (
              <TableButton
                onClick={() => {
                  this.props.history.push(
                    `assessment/edit/settings/${row._id}`
                  );
                }}
              >
                Edit
              </TableButton>
            )}
            {row.status !== "Activated" && (
              <TableButton
                onClick={() => {
                  const data = {
                    assessmentID: row._id,
                  };
                  this.props.deleteAssessment(data);
                }}
              >
                Delete
              </TableButton>
            )}
            {row.status !== "Setup in progress" && (
              <TableButton
                onClick={() => {
                  this.props.history.push(
                    `assessment/view/settings/${row._id}`
                  );
                }}
              >
                View
              </TableButton>
            )}
            {row.status === "Ended" && (
              <>
                <TableButton
                  onClick={() => {
                    this.props.history.push(
                      `/assessment/descriptive/responses/${row._id}`
                    );
                  }}
                >
                  Mark
                </TableButton>

                <TableButton
                  onClick={() => {
                    this.props.history.push(`/assessment/results/${row._id}`);
                  }}
                >
                  Results
                </TableButton>
                <TableButton
                  onClick={() => {
                    this.props.history.push(
                      `/assessment/statistics/${row._id}`
                    );
                  }}
                >
                  Statistics
                </TableButton>
              </>
            )}
            {row.status !== "Ended" && (
              <TableButton
                onClick={() => {
                  this.props.history.push(`/assessment/activation/${row._id}`);
                }}
              >
                {row.status === "Activated" ? "Deactivate" : "Activate"}
              </TableButton>
            )}
          </CustomRow>
        ),
        width: "350px",
      },
    ];

    if (generatedID !== "") {
      this.props.history.push(`assessment/create/settings/${generatedID}`);
    }

    if (this.props.homeReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    const lowerCasedSearchText = searchText.toLowerCase();

    let filteredData = assessments;

    if (searchText !== "") {
      filteredData = filteredData.filter((item) => {
        return (
          item.settings.testName.toLowerCase().indexOf(lowerCasedSearchText) >=
          0
        );
      });
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
              <div style={{ paddingTop: "80px", paddingBottom: "20px" }}>
                <StatusBarWrapper>
                  <StatusBarImage
                    image={url}
                    style={[styles.imgPos]}
                    position={position}
                    scale={scale}
                  />
                  <StatusBox
                    number={totalAssessmentNum}
                    text={"Total Assessments"}
                  />
                  <StatusBox number={setupNum} text={"Setup In Progress"} />
                  <StatusBox
                    number={activateNum}
                    text={"Assessments Activated"}
                  />
                </StatusBarWrapper>
              </div>
              <FirstLabel>Assessments</FirstLabel>
              <Wrapper
                firstHeight={"60px"}
                secHeight={"120px"}
                widthChange={1250}
              >
                <div className={css(styles.block)}>
                  <CustomInput
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
              <div style={{ padding: "50px 0px", marginBottom: "100px" }}>
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
  tableRow: {
    fontSize: "15px",
    fontFamily: "Ubuntu-Regular",
  },
});

HomeContainer.propTypes = {
  homeFetchAllAssessment: PropTypes.func.isRequired,
  homeReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  createAssessmentObj: PropTypes.func.isRequired,
  fetchProfilePic: PropTypes.func.isRequired,
  deleteAssessment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  homeReducer: state.homeReducer,
});

export default connect(mapStateToProps, {
  homeFetchAllAssessment,
  logout,
  createAssessmentObj,
  fetchProfilePic,
  deleteAssessment,
})(HomeContainer);
