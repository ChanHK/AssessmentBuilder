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
import TableExtensions from "../../components/TableExtensions";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";
import FirstLabel from "../../components/LabelComponent/FirstLabel";

import * as MdIcons from "react-icons/md";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchResults,
  deleteResults,
  sendEmail,
} from "../../actions/home.actions";
import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

class ResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      score: "",
      grade: "",
      assessmentID: this.props.match.params.assessmentID,
      data: [], //stores results
      subject: this.props.match.params.subject,
      title: this.props.match.params.title,
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

    const data = { assessmentID: this.state.assessmentID };
    this.props.fetchResults(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const { homeReducer } = this.props;

    if (prevProps.homeReducer !== homeReducer && homeReducer.results !== null) {
      let data = [];

      homeReducer.results.forEach((item, index) => {
        let temp = {
          email: item.email,
          name: item.name,
          score: item.totalScore === "" ? "Did not attempt" : item.totalScore,
          grade: item.grade === "" ? "Did not attempt" : item.grade,
          submitDate:
            item.submissionDate === ""
              ? "Did not attempt"
              : item.submissionDate,
          id: item._id,
        };
        data.push(temp);
      });

      this.setState({ data: data });
    }
  }

  componentWillUnmount() {
    this.props.homeReducer.results = null;
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onReset = () => this.setState({ email: "", name: "", score: "", grade: "" });

  sendMultiEmail = () => {
    const { data, title } = this.state;
    let sent_email_data = [];
    data.forEach((item, index) => {
      sent_email_data.push({
        to: item.email,
        subject: `${title} results`,
        html: `<h3>${item.grade}</h3><p>${item.score}</p>`,
      });
    });
    this.props.sendEmail(sent_email_data);
  };

  render() {
    const {
      email,
      name,
      score,
      grade,
      data,
      assessmentID,
      subject,
      title,
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
        width: "20px",
      },
      {
        name: "Email",
        selector: "email",
        cell: (row) => (
          <div>
            <div className={css(styles.tableRow)}>{row.email}</div>
          </div>
        ),
      },
      {
        name: "Name",
        selector: "name",
        cell: (row) => (
          <div>
            <div className={css(styles.tableRow)}>{row.name}</div>
          </div>
        ),
      },
      {
        name: "Score",
        selector: "score",
        sortable: true,
        cell: (row) => (
          <div>
            <div className={css(styles.tableRow)}>{row.score}</div>
          </div>
        ),
      },
      {
        name: "Grade",
        selector: "grade",
        sortable: true,
        cell: (row) => (
          <div>
            {row.grade === "FAIL" && (
              <div className={css(styles.fail)}>{row.grade}</div>
            )}

            {row.grade === "PASS" && (
              <div className={css(styles.pass)}>{row.grade}</div>
            )}

            {row.grade !== "PASS" && row.grade !== "FAIL" && (
              <div className={css(styles.tableRow)}>{row.grade}</div>
            )}
          </div>
        ),
      },
      {
        name: "Submission Date",
        selector: "submitDate",
        cell: (row) => (
          <div>
            <div className={css(styles.tableRow)}>{row.submitDate}</div>
          </div>
        ),
      },
      {
        name: "Option",
        selector: "id,email,grade,score",
        cell: (row) => (
          <CustomRow>
            <TableButton
              onClick={() => {
                this.props.history.push(
                  `/assessment/response/${row.id}/${assessmentID}/${subject}/${title}`
                );
              }}
            >
              <MdIcons.MdOpenInNew size={20} />
            </TableButton>
            <TableButton
              onClick={() => {
                const data = {
                  candID: row.id,
                  assessmentID: assessmentID,
                };
                this.props.deleteResults(data);
              }}
            >
              <MdIcons.MdDelete size={20} />
            </TableButton>
            <TableButton
              onClick={() => {
                const sent_email_data = [
                  {
                    to: row.email,
                    subject: `${title} results`,
                    html: `<h3>${row.grade}</h3><p>${row.score}</p>`,
                  },
                ];
                this.props.sendEmail(sent_email_data);
              }}
            >
              <MdIcons.MdEmail size={20} />
            </TableButton>
          </CustomRow>
        ),
      },
    ];

    if (this.props.homeReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

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

    filteredData.forEach((data, index) => (data.serial = index + 1));
    
    const tableData = {
      data: filteredData,
      columns: tableHeader,
    };

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

              <div style={{ margin: "25px 0px 25px 0px" }}>
                <TableExtensions tableData={tableData}>
                  <Table data={filteredData} columns={tableHeader} />
                </TableExtensions>
              </div>
              <div className={css(styles.buttonRowCon)}>
                <Button
                  backgroundColor={configStyles.colors.darkBlue}
                  color={configStyles.colors.white}
                  padding={"8px"}
                  onClick={this.sendMultiEmail}
                >
                  Send result to all candidates
                </Button>
                <div style={{ marginRight: "15px" }}></div>
                <Button
                  backgroundColor={configStyles.colors.white}
                  color={configStyles.colors.darkBlue}
                  padding={"8px"}
                  width={"100px"}
                  onClick={() => {
                    this.props.history.push(`/assessment/${subject}`);
                  }}
                >
                  Back
                </Button>
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
    width: "450px",
    height: "auto",
    display: "flex",
    float: "left",
  },
  tableRow: {
    fontSize: "15px",
    fontFamily: "Ubuntu-Regular",
  },
  pass: {
    fontSize: "15px",
    fontFamily: "Ubuntu-Bold",
    backgroundColor: configStyles.colors.correctGreen,
    padding: "0px 10px 0px 10px",
  },
  fail: {
    fontSize: "15px",
    fontFamily: "Ubuntu-Bold",
    backgroundColor: configStyles.colors.inputErrorRed,
    padding: "0px 10px 0px 10px",
  },
  buttonRowCon: {
    marginBottom: "100px",
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "auto",
  },
});

ResultsContainer.propTypes = {
  fetchResults: PropTypes.func.isRequired,
  homeReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  deleteResults: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ homeReducer: state.homeReducer });

export default connect(mapStateToProps, {
  fetchResults,
  logout,
  deleteResults,
  sendEmail,
})(ResultsContainer);
