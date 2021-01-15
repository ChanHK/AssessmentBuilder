import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import "../../css/general.css";
import * as configStyles from "../../config/styles";

import Header from "../../components/Header";
import ScrollArrow from "../../components/ScrollArrow";
import LoaderSpinner from "../../components/LoaderSpinner";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAResult } from "../../actions/home.actions";
import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

class ViewResponseContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candID: this.props.match.params.candID,
      name: "",
      email: "",
      grade: "",
      submissionDate: "",
      totalScore: "",
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
      candID: this.state.candID,
    };

    this.props.fetchAResult(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const { homeReducer } = this.props;

    if (
      prevProps.homeReducer !== homeReducer &&
      homeReducer.aCandResult !== null
    ) {
      console.log(homeReducer.aCandResult);
      const { aCandResult } = this.props.homeReducer;
      const {
        email,
        grade,
        name,
        response,
        submissionDate,
        totalScore,
      } = aCandResult;

      this.setState({
        name: name,
        email: email,
        grade: grade,
        submissionDate: submissionDate,
        totalScore: totalScore,
      });
    }
  }

  componentWillUnmount() {
    this.props.homeReducer.aCandResult = null;
  }

  render() {
    const { email, grade, name, submissionDate, totalScore } = this.state;

    if (this.props.homeReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    return (
      <>
        <Header />
        <ScrollArrow />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>View Response</FirstLabel>
              </div>

              <CustomRow>
                <div className={css(styles.infoCon)}>
                  <SecondLabel marginRight={"10px"}>
                    Candidate Name :{" "}
                  </SecondLabel>
                  <ThirdLabel>{name}</ThirdLabel>
                </div>
              </CustomRow>
              <CustomRow>
                <div className={css(styles.infoCon)}>
                  <SecondLabel marginRight={"10px"}>
                    Candidate Email :{" "}
                  </SecondLabel>
                  <ThirdLabel>{email}</ThirdLabel>
                </div>
              </CustomRow>
              <CustomRow>
                <div className={css(styles.infoCon)}>
                  <SecondLabel marginRight={"10px"}>
                    Submission Date :{" "}
                  </SecondLabel>
                  <ThirdLabel>{submissionDate}</ThirdLabel>
                </div>
              </CustomRow>
              <CustomRow>
                <div className={css(styles.infoCon)}>
                  <SecondLabel marginRight={"10px"}>Score : </SecondLabel>
                  <ThirdLabel>{totalScore}</ThirdLabel>
                </div>
              </CustomRow>
              <CustomRow>
                <div className={css(styles.infoCon)}>
                  <SecondLabel marginRight={"10px"}>Grade : </SecondLabel>
                  <ThirdLabel>{grade}</ThirdLabel>
                </div>
              </CustomRow>
              <hr className={css(styles.hr)} />
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
  infoCon: {
    width: "100%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  hr: {
    backgroundColor: configStyles.colors.black,
    height: "1px",
  },
});

ViewResponseContainer.propTypes = {
  fetchAResult: PropTypes.func.isRequired,
  homeReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  homeReducer: state.homeReducer,
});

export default connect(mapStateToProps, {
  fetchAResult,
  logout,
})(ViewResponseContainer);
