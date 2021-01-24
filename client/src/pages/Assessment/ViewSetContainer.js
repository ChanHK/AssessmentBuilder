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
import { fetchQuestionsSet } from "../../actions/assessmentSet.actions";
import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

class ViewSetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessmentID: this.props.match.params.assessmentID,
      setNum: this.props.match.params.setNum,
      totalScore: 0,
      totalQuestion: 0,
      questions: [],
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
      setNum: this.state.setNum,
    };

    this.props.fetchQuestionsSet(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const { assessmentSetReducer } = this.props;

    if (
      prevProps.assessmentSetReducer !== assessmentSetReducer &&
      assessmentSetReducer.questions !== null &&
      assessmentSetReducer.message === undefined
    ) {
      const { questions } = this.props.assessmentSetReducer;

      console.log(questions);

      let totalScore = 0;
      questions.forEach((item, index) => {
        totalScore = totalScore + item.score;
      });

      this.setState({
        questions: questions,
        totalQuestion: questions.length,
        totalScore: totalScore,
      });
    }
  }

  componentWillUnmount() {
    this.props.assessmentSetReducer.questions = null;
  }

  render() {
    const { totalQuestion, totalScore } = this.state;

    if (this.props.assessmentSetReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    return (
      <>
        <Header />
        <ScrollArrow />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>View Set</FirstLabel>
              </div>

              <CustomRow>
                <div className={css(styles.infoCon)}>
                  <SecondLabel marginRight={"10px"}>
                    Total questions :{" "}
                  </SecondLabel>
                  <ThirdLabel>{totalQuestion}</ThirdLabel>
                </div>
              </CustomRow>
              <CustomRow>
                <div className={css(styles.infoCon)}>
                  <SecondLabel marginRight={"10px"}>Total score : </SecondLabel>
                  <ThirdLabel>{totalScore}</ThirdLabel>
                </div>
              </CustomRow>
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
});

ViewSetContainer.propTypes = {
  fetchQuestionsSet: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  assessmentSetReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  assessmentSetReducer: state.assessmentSetReducer,
});

export default connect(mapStateToProps, {
  fetchQuestionsSet,
  logout,
})(ViewSetContainer);
