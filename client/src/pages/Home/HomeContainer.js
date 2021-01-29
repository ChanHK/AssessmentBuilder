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
import Modal from "../../components/Modal";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import StatusBox from "../../components/StatusBarComponents/StatusBox";
import StatusBarWrapper from "../../components/StatusBarComponents/StatusBarWrapper";
import StatusBarImage from "../../components/StatusBarComponents/StatusBarImage";

import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  homeFetchAllAssessment,
  fetchProfilePic,
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
      url: "", //pic
      posX: 0,
      posY: 0,
      scale: 0,
      new_subject: "", //new created subject in input
      msg: null, //stores error msg
      search: "", //filter search text
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
    this.props.homeReducer.pic = null;
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      searchText,
      assessments,
      setupNum,
      totalAssessmentNum,
      activateNum,
      url,
      posX,
      posY,
      scale,
      new_subject,
      msg,
      search,
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
        name: "Subject",
        selector: "sub",
        cell: (row) => (
          <div>
            <div className={css(styles.tableRow)}>{row.sub}</div>
          </div>
        ),
        width: "80%",
      },
      {
        name: "Options",
        selector: "sub",
        cell: (row) => (
          <CustomRow>
            <TableButton>
              <BsIcons.BsFillEyeFill />
            </TableButton>
            <TableButton
            // onClick={() => {
            //   this.setState({ deleteSubject: row.sub, showModal: true });
            // }}
            >
              <MdIcons.MdDelete />
            </TableButton>
          </CustomRow>
        ),
        width: "15%",
      },
    ];

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
              <div style={{ marginBottom: "25px" }}>
                <Wrapper
                  firstHeight={"60px"}
                  secHeight={"120px"}
                  widthChange={1250}
                >
                  <div className={css(styles.block)}>
                    <CustomColumn>
                      <CustomRow>
                        <CustomInput
                          name={"new_subject"}
                          type={"text"}
                          placeholder={"Enter new subject here"}
                          onChangeValue={this.onChange}
                          value={new_subject}
                          maxLength={25}
                        />
                        <div style={{ marginRight: "10px" }}></div>
                        <Button
                          backgroundColor={configStyles.colors.darkBlue}
                          color={configStyles.colors.white}
                          padding={"8px"}
                          width={"100px"}
                          type={"button"}
                          onClick={this.addSub}
                        >
                          Add
                        </Button>
                      </CustomRow>
                      <span className={css(styles.redText)}>
                        {msg === null
                          ? null
                          : msg.hasOwnProperty("SUB")
                          ? "*" + msg.SUB
                          : null}
                      </span>
                    </CustomColumn>
                  </div>
                  <div className={css(styles.block)}>
                    <CustomInput
                      name={"search"}
                      type={"text"}
                      placeholder={"Enter subject here to search"}
                      onChangeValue={this.onChange}
                      value={search}
                      maxLength={25}
                    />
                  </div>
                </Wrapper>
              </div>
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
  redText: {
    color: configStyles.colors.inputErrorRed,
    fontFamily: "Ubuntu-Regular",
    fontSize: "15px",
  },
  modal: {
    width: "100%",
    height: "auto",
    border: "none",
    borderRadius: "5px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    backgroundColor: configStyles.colors.white,
    padding: "20px",
  },
});

HomeContainer.propTypes = {
  homeFetchAllAssessment: PropTypes.func.isRequired,
  homeReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  fetchProfilePic: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  homeReducer: state.homeReducer,
});

export default connect(mapStateToProps, {
  homeFetchAllAssessment,
  logout,
  fetchProfilePic,
})(HomeContainer);
