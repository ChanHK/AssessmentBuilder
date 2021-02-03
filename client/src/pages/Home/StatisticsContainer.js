import React, { Component } from "react";
import "../../css/general.css";
import { css, StyleSheet } from "aphrodite";
import * as configStyles from "../../config/styles";

import Header from "../../components/Header";
import LoaderSpinner from "../../components/LoaderSpinner";
import ScrollArrow from "../../components/ScrollArrow";
import Button from "../../components/Button";
import CustomEditor from "../../components/CustomEditor";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import { Pie, Bar, HorizontalBar } from "react-chartjs-2";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAGrade, fetchResults } from "../../actions/home.actions";
import { fetchAllAssessmentQuestion } from "../../actions/assessmentQuestion.actions";
import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

import { EditorState, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";

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
      range: [], //stores the number of percentage in 0 - 10%.....
      unit: "",
      barLabel: [],
      passNFailShow: false,
      subject: this.props.match.params.subject,
      all_questionID: [],
      all_responses: [],
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
    this.props.fetchAGrade(data);
    this.props.fetchResults(data);
    this.props.fetchAllAssessmentQuestion(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const { homeReducer, assessmentQuestionReducer } = this.props;

    if (
      prevProps.homeReducer !== homeReducer &&
      homeReducer.grade !== null &&
      homeReducer.results !== null
    ) {
      const { grade, results } = homeReducer;
      const {
        passOrFailSelected,
        addGradingSelected,
        unit,
        gradeRange,
      } = grade[0];

      let temp = [];
      results.forEach((item, index) => {
        item.response.forEach((item2, index2) => {
          temp.push({
            id: item2.question_id,
            correct: item2.correct,
            des: item2.questionDescription,
          });
        });
      });

      if (passOrFailSelected) this.passFailDataGenerator(results, unit);
      if (addGradingSelected) this.gradedGenerator(results, gradeRange);
      this.setState({ gradeData: grade[0], all_responses: temp });
    }

    if (
      prevProps.assessmentQuestionReducer !== assessmentQuestionReducer &&
      assessmentQuestionReducer.assessmentQuestionLoad !== null
    ) {
      const { assessmentQuestionLoad } = assessmentQuestionReducer;

      let temp = [];
      assessmentQuestionLoad.forEach((item, index) => temp.push(item._id));
      this.setState({ all_questionID: temp });
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
    let tempRange_Points = [0]; // unit is points

    let isPoints = false;

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
        let biggest = results[0].maxScore;
        isPoints = true;
        results.forEach((item2, index2) => {
          if (item2.maxScore > biggest) biggest = item2.maxScore;
        });

        if (tempRange_Points.length !== 5) {
          for (let j = 0; j < 4; j++) {
            tempRange_Points.push(Math.ceil((biggest / 4) * (j + 1)));
          }
        }

        this.setState({
          unit: "p.",
          barLabel: [
            `0 - ${tempRange_Points[1]}p.`,
            `${tempRange_Points[1] + 1} -  ${tempRange_Points[2]}p.`,
            `${tempRange_Points[2] + 1} -  ${tempRange_Points[3]}p.`,
            `${tempRange_Points[3] + 1} -  ${tempRange_Points[4]}p.`,
          ],
        });

        let convertedScore = parseInt(
          item.totalScore.substring(0, item.totalScore.length - 2)
        );

        for (let i = 0; i < tempRange_Points.length - 1; i++) {
          if (tempRange_Points[i] === 0) {
            if (
              convertedScore >= tempRange_Points[i] &&
              convertedScore <= tempRange_Points[i + 1]
            ) {
              pointsRange[i] = pointsRange[i] + 1;
            }
          } else {
            if (
              convertedScore >= tempRange_Points[i] + 1 &&
              convertedScore <= tempRange_Points[i + 1]
            ) {
              pointsRange[i] = pointsRange[i] + 1;
            }
          }
        }
      }
    });

    this.setState({
      passNFailShow: true,
      passNum: passNum,
      failNum: failNum,
      candNum: candNum,
      range: isPoints ? pointsRange : percentageRange,
    });
  };

  gradedGenerator = (results, gradeRange) => {
    let candNum = 0;
    let range = [0];
    let collections = [0];

    gradeRange.forEach((grade, i) => {
      range.push(parseInt(grade));
      collections.push(0);
    });

    results.forEach((item, index) => {
      candNum++;

      let convertedScore = parseInt(
        item.totalScore.substring(0, item.totalScore.length - 2)
      );

      for (let i = 0; i < range.length - 1; i++) {
        if (range[i] === 0) {
          if (
            convertedScore >= parseInt(range[i]) &&
            convertedScore <= parseInt(range[i + 1])
          ) {
            collections[i] = collections[i] + 1;
          }
        } else {
          if (
            convertedScore >= parseInt(range[i]) + 1 &&
            convertedScore <= parseInt(range[i + 1])
          ) {
            collections[i] = collections[i] + 1;
          }
        }
      }
    });

    this.setState({ candNum: candNum, range: collections });
  };

  convertHtml = (data) => {
    const contentBlock = htmlToDraft(data);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return EditorState.createWithContent(contentState);
    }
  };

  render() {
    const {
      candNum,
      passNum,
      failNum,
      passNFailShow,
      range,
      unit,
      barLabel,
      gradeData,
      subject,
      all_questionID,
      all_responses,
    } = this.state;

    const { homeReducer, assessmentQuestionReducer } = this.props;
    if (homeReducer.isLoading || assessmentQuestionReducer.isLoading)
      return <LoaderSpinner />;
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
          data: range,
        },
      ],
    };

    const horizonBarData = {
      labels: gradeData.gradeValue,
      datasets: [
        {
          label: ["number of candidates"],
          backgroundColor: configStyles.colors.lightBlue,
          borderWidth: 1,
          data: range,
        },
      ],
    };

    if (candNum === 0) {
      return (
        <>
          <Header />
          <ScrollArrow />
          <CustomFullContainer>
            <CustomMidContainer style={[styles.customMidContainer]}>
              <CustomColumn>
                <div style={{ marginTop: "60px" }}>
                  <FirstLabel>Statistics</FirstLabel>
                </div>

                <div className={css(styles.textCon)}>
                  <SecondLabel>
                    There are no results to be displayed
                  </SecondLabel>
                </div>
              </CustomColumn>
            </CustomMidContainer>
          </CustomFullContainer>
        </>
      );
    }

    return (
      <>
        <Header />
        <ScrollArrow />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ marginTop: "60px" }}>
                <FirstLabel>Statistics</FirstLabel>
              </div>
              {passNFailShow && (
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
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                beginAtZero: true,
                                precision: 0,
                              },
                            },
                          ],
                        },
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

              {!passNFailShow && (
                <CustomColumn>
                  <div>
                    <HorizontalBar
                      data={horizonBarData}
                      width={300}
                      height={520}
                      options={{
                        maintainAspectRatio: false,
                        scales: {
                          xAxes: [
                            {
                              ticks: {
                                beginAtZero: true,
                                precision: 0,
                              },
                            },
                          ],
                        },
                      }}
                    />
                  </div>
                  <div className={css(styles.chartTitle)}>
                    <ThirdLabel>
                      Number of Grades out of {candNum} Candidates
                    </ThirdLabel>
                  </div>
                </CustomColumn>
              )}

              <div style={{ marginTop: "25px" }}>
                {all_questionID.map((item, index) => {
                  let correct = 0;
                  let wrong = 0;
                  let des = EditorState.createEmpty();
                  all_responses.forEach((item2, index2) => {
                    if (item === item2.id) {
                      if (item2.correct) correct++;
                      else wrong++;
                      des = item2.des;
                    }
                  });
                  let barData = {
                    labels: ["Correct", "Wrong"],
                    datasets: [
                      {
                        label: "number of candidates",
                        backgroundColor: [
                          configStyles.colors.correctGreen,
                          configStyles.colors.falseRed,
                        ],
                        borderWidth: 1,
                        data: [correct, wrong],
                      },
                    ],
                  };
                  return (
                    <div style={{ marginBottom: "50px" }}>
                      <CustomEditor
                        toolbarHidden={true}
                        readOnly={true}
                        editorState={this.convertHtml(des)}
                      />

                      <div style={{ marginTop: "25px" }}>
                        <Bar
                          data={barData}
                          width={150}
                          height={320}
                          options={{
                            maintainAspectRatio: false,
                            scales: {
                              yAxes: [
                                {
                                  ticks: {
                                    beginAtZero: true,
                                    precision: 0,
                                  },
                                },
                              ],
                            },
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ margin: "25px 0px 100px 0px" }}>
                <Button
                  backgroundColor={configStyles.colors.darkBlue}
                  color={configStyles.colors.white}
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
  chartTitle: {
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "50px 0px 100px 0px",
  },
  textCon: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginTop: "50px",
  },
});

StatisticsContainer.propTypes = {
  homeReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  fetchAGrade: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,
  assessmentQuestionReducer: PropTypes.object.isRequired,
  fetchAllAssessmentQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  homeReducer: state.homeReducer,
  assessmentQuestionReducer: state.assessmentQuestionReducer,
});

export default connect(mapStateToProps, {
  fetchAGrade,
  logout,
  fetchResults,
  fetchAllAssessmentQuestion,
})(StatisticsContainer);
