import React, { Component } from "react";
import "../../css/general.css";
import { css, StyleSheet } from "aphrodite";
import * as configStyles from "../../config/styles";

import Header from "../../components/Header";
import LoaderSpinner from "../../components/LoaderSpinner";
import ScrollArrow from "../../components/ScrollArrow";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import { Pie, Bar } from "react-chartjs-2";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAGrade, fetchResults } from "../../actions/home.actions";
import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

class StatisticsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessmentID: this.props.match.params.assessmentID,
      gradeData: {},
      candidateData: {},
      passNum: 0,
      failNum: 0,
      candNum: 0,
      percentageRange: [], //stores the number of percentage in 0 - 10%.....
      unit: "",
      barLabel: [],
      piePassNFailShow: false,
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

    const data = {
      assessmentID: this.state.assessmentID,
    };

    this.props.fetchAGrade(data);
    this.props.fetchResults(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const { homeReducer } = this.props;

    if (
      prevProps.homeReducer !== homeReducer &&
      homeReducer.grade !== null &&
      homeReducer.results !== null
    ) {
      const { grade, results } = homeReducer;
      const { passOrFailSelected, addGradingSelected, unit } = grade[0];
      console.log(grade);
      console.log(results);

      if (passOrFailSelected) {
        this.passFailDataGenerator(results, unit);
      }
      if (addGradingSelected) {
      }

      this.setState({
        gradeData: grade,
      });
    }
  }

  componentWillUnmount() {
    this.props.homeReducer.grade = null;
    this.props.homeReducer.results = null;
  }

  passFailDataGenerator = (results, unit) => {
    let passNum = 0;
    let failNum = 0;
    let candNum = 0;

    let percentageRange = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //unit is percentage
    let tempRange_Percentage = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; //unit is percentage

    let pointsRange = [0, 0, 0, 0]; // unit is points
    let tempRange_Points = []; // unit is points

    results.forEach((item, index) => {
      candNum++;
      if (item.grade === "PASS") passNum++;
      else failNum++;

      if (unit === "percentage %") {
        this.setState({
          unit: "%",
          barLabel: [
            "0 - 10%",
            "11 - 20%",
            "21 - 30%",
            "31 - 40%",
            "41 - 50%",
            "51 - 60%",
            "61 - 70%",
            "71 - 80%",
            "81 - 90%",
            "91 - 100%",
          ],
        });

        let convertedScore = parseInt(
          item.totalScore.substring(0, item.totalScore.length - 2)
        );
        
        for (let i = 0; i < tempRange_Percentage.length - 1; i++) {
          if (tempRange_Percentage[i] === 0) {
            if (
              convertedScore >= tempRange_Percentage[i] &&
              convertedScore <= tempRange_Percentage[i + 1]
            ) {
              percentageRange[i] = percentageRange[i] + 1;
            }
          } else {
            if (
              convertedScore >= tempRange_Percentage[i] + 1 &&
              convertedScore <= tempRange_Percentage[i + 1]
            ) {
              percentageRange[i] = percentageRange[i] + 1;
            }
          }
        }
      } else {
        this.setState({ unit: "p." });
      }
    });

    this.setState({
      piePassNFailShow: true,
      passNum: passNum,
      failNum: failNum,
      candNum: candNum,
      percentageRange: percentageRange,
    });
  };

  render() {
    const {
      candNum,
      passNum,
      failNum,
      piePassNFailShow,
      percentageRange,
      unit,
      barLabel,
    } = this.state;

    if (this.props.homeReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    const passFailPieData = {
      labels: ["Pass", "Fail"],
      datasets: [
        {
          label: ["number of candidates"],
          backgroundColor: [
            configStyles.colors.correctGreen,
            configStyles.colors.falseRed,
          ],
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [passNum, failNum],
        },
      ],
    };

    const scoreBarData = {
      labels: barLabel,
      datasets: [
        {
          label: ["number of candidates"],
          backgroundColor: configStyles.colors.lightBlue,
          borderWidth: 1,
          data: percentageRange,
        },
      ],
    };

    return (
      <>
        <Header />
        <ScrollArrow />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Statistics</FirstLabel>
              </div>
              {piePassNFailShow && (
                <CustomColumn>
                  <div>
                    <Pie
                      data={passFailPieData}
                      width={300}
                      height={520}
                      options={{
                        maintainAspectRatio: false,
                      }}
                    />
                  </div>
                  <div className={css(styles.chartTitle)}>
                    <ThirdLabel>
                      Pass and Fail Rate of {candNum} Candidates
                    </ThirdLabel>
                  </div>

                  <div>
                    <Bar
                      data={scoreBarData}
                      width={300}
                      height={520}
                      options={{
                        maintainAspectRatio: false,
                      }}
                    />
                  </div>
                  <div className={css(styles.chartTitle)}>
                    <ThirdLabel>
                      Score Ranges ({unit}) of {candNum} Candidates
                    </ThirdLabel>
                  </div>
                </CustomColumn>
              )}

              <div style={{ marginBottom: "500px" }}></div>
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
  chartTitle: {
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "50px 0px 100px 0px",
  },
});

StatisticsContainer.propTypes = {
  homeReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  fetchAGrade: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  homeReducer: state.homeReducer,
});

export default connect(mapStateToProps, {
  fetchAGrade,
  logout,
  fetchResults,
})(StatisticsContainer);

//https://stackoverflow.com/questions/46420578/it-is-possible-to-change-the-color-of-periphery-of-pie-chart-in-chart-js
