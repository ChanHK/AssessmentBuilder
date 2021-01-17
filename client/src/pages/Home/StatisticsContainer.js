import React, { Component } from "react";
import "../../css/general.css";
import { StyleSheet } from "aphrodite";
// import * as configStyles from "../../config/styles";

import Header from "../../components/Header";
import LoaderSpinner from "../../components/LoaderSpinner";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";

import { Pie } from "react-chartjs-2";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAGrade, fetchResults } from "../../actions/home.actions";
import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

const data = {
  labels: ["Pass", "Fail"],
  datasets: [
    {
      //   label: "My First dataset",
      //   backgroundColor: configStyles.colors.lightBlue,
      backgroundColor: ["green", "red"],

      //   borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: ["40", "60"],
    },
  ],
};

class StatisticsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessmentID: this.props.match.params.assessmentID,
      gradeData: {},
      candidateData: {},
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
      console.log(grade);
      console.log(results);

      this.setState({ gradeData: grade });
    }
  }

  componentWillUnmount() {
    this.props.homeReducer.grade = null;
    this.props.homeReducer.results = null;
  }

  render() {
    if (this.props.homeReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Statistics</FirstLabel>
              </div>
              <div>
                <Pie
                  data={data}
                  width={300}
                  height={520}
                  options={{
                    maintainAspectRatio: false,
                  }}
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
