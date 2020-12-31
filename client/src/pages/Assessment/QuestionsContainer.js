import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";
import CustomRow from "../../components/GridComponents/CustomRow";

import arrayMove from "array-move";
import { withRouter } from "react-router-dom";

import SortableRow from "../../components/SortableRow";
import Button from "../../components/Button";
import LoaderSpinner from "../../components/LoaderSpinner";

import * as MdIcons from "react-icons/md";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";
import { fetchAllAssessmentQuestion } from "../../actions/assessmentQuestion.actions";
import { compose } from "redux";

class QuestionsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessmentID: props.assessmentID,
      type: props.type,
      questions: [[]],
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

    this.props.fetchAllAssessmentQuestion(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const { assessmentQuestionReducer } = this.props;

    if (
      prevProps.assessmentQuestionReducer !== assessmentQuestionReducer &&
      assessmentQuestionReducer.assessmentQuestionLoad !== null &&
      assessmentQuestionReducer.message === undefined
    ) {
      let biggest = 0;

      assessmentQuestionReducer.assessmentQuestionLoad.forEach(
        (item, index) => {
          if (item.section > biggest) biggest = item.section;
        }
      );

      let tempQuestions = [];
      for (let i = 0; i < biggest; i++) {
        tempQuestions.push([]);
      }

      assessmentQuestionReducer.assessmentQuestionLoad.forEach((x, index) => {
        tempQuestions[x.section - 1].push(x);
      });

      this.setState({
        questions: tempQuestions,
      });
    }
  }

  componentWillUnmount() {
    this.props.assessmentQuestionReducer.assessmentQuestionLoad = null;
  }

  onSortEnd(arrayNum, { oldIndex, newIndex }) {
    this.setState({
      questions: [
        ...this.state.questions.slice(0, arrayNum),
        arrayMove(this.state.questions[arrayNum], oldIndex, newIndex),
        ...this.state.questions.slice(arrayNum + 1),
      ],
    });
  }

  onSectionSortEnd(sectionIndex, current, { oldIndex, newIndex }) {
    let currentValue = current === undefined ? 0 : current;
    const question = this.state.questions[currentValue][sectionIndex];

    question.questionChoices = arrayMove(
      question.questionChoices,
      oldIndex,
      newIndex
    );

    this.setState({
      questions: this.state.questions,
    });
  }

  addSection = () => {
    if (this.state.questions.length < 10) {
      this.setState({ questions: this.state.questions.concat(null) });
    }
  };

  deleteSection = (index) => {
    var array = [...this.state.questions];
    array.splice(index, 1);
    this.setState({ questions: array });
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { questions, assessmentID, type } = this.state;

    if (this.props.assessmentQuestionReducer.isLoading)
      return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    for (let i = 0; i < questions.length; i++) {
      if (questions[i] !== null) {
        questions[i].forEach((questions, index) => {
          questions.serial = index + 1;
        });
      }
    }

    return (
      <form onSubmit={this.onSubmit}>
        <Button
          backgroundColor={configStyles.colors.darkBlue}
          color={configStyles.colors.white}
          padding={"8px"}
          onClick={this.addSection}
        >
          Add Section
        </Button>
        {questions.length > 1 ? (
          <SecondLabel>Section 1</SecondLabel>
        ) : (
          <SecondLabel>Questions</SecondLabel>
        )}
        <hr className={css(styles.hr)} />
        {questions[0].length === 0 && (
          <div style={{ marginBottom: "15px" }}>
            <ThirdLabel>
              Create your own questions or retrieve them from question bank
            </ThirdLabel>
          </div>
        )}
        <SortableRow
          questions={questions[0]}
          onSortEnd={this.onSortEnd.bind(this, 0)}
          onSectionSortEnd={this.onSectionSortEnd.bind(this)}
        />
        <div style={{ marginBottom: "25px" }}>
          <CustomRow>
            <div style={{ marginRight: 10 }}>
              <Button
                backgroundColor={configStyles.colors.darkBlue}
                color={configStyles.colors.white}
                padding={"8px"}
                onClick={() =>
                  this.props.history.push(
                    `/assessment/update_question/1/${type}/${assessmentID}`
                  )
                }
              >
                Create Question
              </Button>
            </div>
            <div>
              <Button
                backgroundColor={configStyles.colors.darkBlue}
                color={configStyles.colors.white}
                padding={"8px"}
                onClick={() => {
                  this.props.history.push(
                    `/assessment/question_bank/1/${type}/${assessmentID}`
                  );
                }}
              >
                Retrieve from Question Bank
              </Button>
            </div>
          </CustomRow>
        </div>

        {questions.slice(1).map((item, index) => {
          return (
            <div key={index}>
              <CustomRow>
                <div className={css(styles.label)}>
                  <SecondLabel>Section {index + 2}</SecondLabel>
                </div>
                <div
                  className={css(styles.button)}
                  onClick={() => this.deleteSection(index + 1)}
                >
                  <MdIcons.MdDelete size={25} />
                </div>
              </CustomRow>
              <hr className={css(styles.hr)} />
              {item !== null && (
                <SortableRow
                  questions={questions[index + 1]}
                  onSortEnd={this.onSortEnd.bind(this, index + 1)}
                  onSectionSortEnd={this.onSectionSortEnd.bind(this)}
                  current={index + 1}
                />
              )}
              <div style={{ marginBottom: "25px" }}>
                <CustomRow>
                  <div style={{ marginRight: 10 }}>
                    <Button
                      backgroundColor={configStyles.colors.darkBlue}
                      color={configStyles.colors.white}
                      padding={"8px"}
                      onClick={() =>
                        this.props.history.push(
                          `/assessment/update_question/${
                            index + 2
                          }/${type}/${assessmentID}`
                        )
                      }
                    >
                      Create Question
                    </Button>
                  </div>
                  <div>
                    <Button
                      backgroundColor={configStyles.colors.darkBlue}
                      color={configStyles.colors.white}
                      padding={"8px"}
                      onClick={() => {
                        this.props.history.push(
                          `/assessment/question_bank/${
                            index + 2
                          }/${type}/${assessmentID}`
                        );
                      }}
                    >
                      Retrieve from Question Bank
                    </Button>
                  </div>
                </CustomRow>
              </div>
            </div>
          );
        })}

        <div style={{ marginBottom: "100px" }}>
          <Button
            backgroundColor={configStyles.colors.darkBlue}
            color={configStyles.colors.white}
            padding={"8px"}
            width={"100px"}
            type={"submit"}
          >
            Save
          </Button>
        </div>
      </form>
    );
  }
}

const styles = StyleSheet.create({
  hr: {
    backgroundColor: configStyles.colors.black,
    height: "1px",
  },
  button: {
    color: configStyles.colors.darkBlue,
    cursor: "pointer",
    height: "auto",
    ":active": {
      color: configStyles.colors.red,
    },
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginLeft: "10px",
    width: "10%",
  },
  label: {
    height: "auto",
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
  },
});

QuestionsContainer.propTypes = {
  fetchAllAssessmentQuestion: PropTypes.func.isRequired,
  assessmentQuestionReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assessmentQuestionReducer: state.assessmentQuestionReducer,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { fetchAllAssessmentQuestion, logout })
)(QuestionsContainer);
