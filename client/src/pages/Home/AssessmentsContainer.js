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

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import StatusBox from "../../components/StatusBarComponents/StatusBox";
import StatusBarWrapper from "../../components/StatusBarComponents/StatusBarWrapper";

import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as ImIcons from "react-icons/im";
import * as RiIcons from "react-icons/ri";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchAssSub,
  createAssessmentObj,
  deleteAssessment,
  reuseAssessment,
} from "../../actions/home.actions";
import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

class AssessmentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      assessments: [], //assessments fetched from db
      generatedID: "", //ID return from createAssessmentObj
      subject: this.props.match.params.subject,
      totalAssessmentNum: 0,
      showModal: false,
      reuse_id: "",
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
    const data = { subject: this.state.subject };
    this.props.fetchAssSub(data);
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
  }

  componentWillUnmount() {
    this.props.homeReducer.assessments = null;
    this.props.homeReducer.newID = null;
  }

  onChangeSearchText = (e) => this.setState({ searchText: e.target.value });

  toCreateAssessment = () => {
    const data = { subject: this.state.subject };
    this.props.createAssessmentObj(data);
  };

  render() {
    const {
      searchText,
      assessments,
      generatedID,
      subject,
      totalAssessmentNum,
      setupNum,
      activateNum,
      showModal,
      reuse_id,
    } = this.state;

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
                    `/assessment/edit/settings/${row._id}`
                  );
                }}
              >
                <MdIcons.MdModeEdit size={20} />
              </TableButton>
            )}
            {row.status !== "Activated" && (
              <TableButton
                onClick={() => {
                  const data = {
                    assessmentID: row._id,
                    subject: subject,
                  };
                  this.props.deleteAssessment(data);
                }}
              >
                <MdIcons.MdDelete size={20} />
              </TableButton>
            )}
            {row.status !== "Setup in progress" && (
              <TableButton
                onClick={() => {
                  this.props.history.push(
                    `/assessment/view/settings/${row._id}`
                  );
                }}
              >
                <BsIcons.BsFillEyeFill size={20} />
              </TableButton>
            )}
            {row.status === "Ended" && (
              <>
                <TableButton
                  onClick={() => {
                    this.props.history.push(
                      `/assessment/descriptive/responses/${row._id}/${subject}`
                    );
                  }}
                >
                  <RiIcons.RiMarkPenFill size={20} />
                </TableButton>

                <TableButton
                  onClick={() => {
                    this.props.history.push(
                      `/assessment/results/${row._id}/${subject}`
                    );
                  }}
                >
                  <FaIcons.FaClipboardCheck size={20} />
                </TableButton>
                <TableButton
                  onClick={() => {
                    this.props.history.push(
                      `/assessment/statistics/${row._id}/${subject}`
                    );
                  }}
                >
                  <ImIcons.ImStatsBars size={20} />
                </TableButton>
                <TableButton
                  onClick={() => {
                    this.setState({ showModal: true, reuse_id: row._id });
                  }}
                >
                  <FaIcons.FaRecycle size={20} />
                </TableButton>
              </>
            )}
            {row.status !== "Ended" && (
              <TableButton
                onClick={() => {
                  this.props.history.push(
                    `/assessment/activation/${subject}/${row._id}`
                  );
                }}
              >
                {row.status === "Activated" ? "Deactivate" : "Activate"}
              </TableButton>
            )}
          </CustomRow>
        ),
        width: "200px",
      },
    ];

    if (generatedID !== "") {
      this.props.history.push(`/assessment/create/settings/${generatedID}`);
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

    filteredData.forEach((data, index) => (data.serial = index + 1));

    return (
      <>
        <Header />
        <ScrollArrow />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ marginTop: "80px", marginBottom: "20px" }}>
                <StatusBarWrapper>
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
              <FirstLabel>Assessments - {subject}</FirstLabel>
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
              <div style={{ padding: "50px 0px" }}>
                <Table data={filteredData} columns={tableHeader} />
              </div>
              <div style={{ marginBottom: "100px" }}>
                <CustomRow>
                  <div
                    className={css(styles.iconCon)}
                    style={{ marginRight: "10%" }}
                  >
                    <CustomColumn>
                      <CustomRow>
                        <MdIcons.MdModeEdit size={20} />
                        <div style={{ marginRight: "10px" }}></div>
                        <ThirdLabel>Edit</ThirdLabel>
                      </CustomRow>
                      <CustomRow>
                        <MdIcons.MdDelete size={20} />
                        <div style={{ marginRight: "10px" }}></div>
                        <ThirdLabel>Delete</ThirdLabel>
                      </CustomRow>
                      <CustomRow>
                        <FaIcons.FaClipboardCheck size={20} />
                        <div style={{ marginRight: "10px" }}></div>
                        <ThirdLabel>Results</ThirdLabel>
                      </CustomRow>
                      <CustomRow>
                        <FaIcons.FaRecycle size={20} />
                        <div style={{ marginRight: "10px" }}></div>
                        <ThirdLabel>Reuse</ThirdLabel>
                      </CustomRow>
                    </CustomColumn>
                  </div>
                  <div className={css(styles.iconCon)}>
                    <CustomColumn>
                      <CustomRow>
                        <BsIcons.BsFillEyeFill size={20} />
                        <div style={{ marginRight: "10px" }}></div>
                        <ThirdLabel>View</ThirdLabel>
                      </CustomRow>
                      <CustomRow>
                        <RiIcons.RiMarkPenFill size={20} />
                        <div style={{ marginRight: "10px" }}></div>
                        <ThirdLabel>Mark</ThirdLabel>
                      </CustomRow>
                      <CustomRow>
                        <ImIcons.ImStatsBars size={20} />
                        <div style={{ marginRight: "10px" }}></div>
                        <ThirdLabel>Statistics</ThirdLabel>
                      </CustomRow>
                    </CustomColumn>
                  </div>
                </CustomRow>
              </div>
            </CustomColumn>
            <Modal show={showModal}>
              <div className={css(styles.modal)}>
                <CustomColumn>
                  <SecondLabel>Reuse assessment</SecondLabel>
                  <ThirdLabel>
                    All the responses, results, statistics and candidates will
                    be removed. Are you sure?
                  </ThirdLabel>
                  <div style={{ marginTop: "25px" }}>
                    <CustomRow>
                      <Button
                        backgroundColor={configStyles.colors.darkBlue}
                        color={configStyles.colors.white}
                        padding={"8px"}
                        width={"100px"}
                        type={"button"}
                        marginLeft={"20px"}
                        onClick={() => {
                          const data = {
                            assessmentID: reuse_id,
                            subject: subject,
                          };
                          this.props.reuseAssessment(data);
                          this.setState({ showModal: false, reuse_id: "" });
                        }}
                      >
                        Yes
                      </Button>
                      <Button
                        backgroundColor={configStyles.colors.white}
                        color={configStyles.colors.darkBlue}
                        padding={"8px"}
                        width={"100px"}
                        type={"button"}
                        marginLeft={"20px"}
                        onClick={() => {
                          this.setState({ showModal: false, reuse_id: "" });
                        }}
                      >
                        Cancel
                      </Button>
                    </CustomRow>
                  </div>
                </CustomColumn>
              </div>
            </Modal>
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
    display: "flex",
    float: "left",
  },
  tableRow: {
    fontSize: "15px",
    fontFamily: "Ubuntu-Regular",
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
  iconCon: {
    display: "flex",
    width: "40%",
  },
});

AssessmentsContainer.propTypes = {
  fetchAssSub: PropTypes.func.isRequired,
  homeReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  createAssessmentObj: PropTypes.func.isRequired,
  deleteAssessment: PropTypes.func.isRequired,
  reuseAssessment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ homeReducer: state.homeReducer });

export default connect(mapStateToProps, {
  fetchAssSub,
  logout,
  createAssessmentObj,
  deleteAssessment,
  reuseAssessment,
})(AssessmentsContainer);
