import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import CustomSubLabel from "../../components/FormComponents/CustomSubLabel";

import ScrollArrow from "../../components/ScrollArrow";
import CustomEditor from "../../components/CustomEditor";
import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";
import LoaderSpinner from "../../components/LoaderSpinner";

import { EditorState, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import moment from "moment";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchAssessmentInfo,
  candidateRegister,
  candidateRegister2,
  fetchAllQuestionForCandidate,
} from "../../actions/candidate.actions";

import { clearErrors } from "../../actions/error.actions";

class StartingPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessmentTitle: "",
      instruction: EditorState.createEmpty(),
      name: "",
      email: "",
      msg: null, // receives error messages from API
      withAuthenticationSelected: false, //does the user needs authentication ?
      time: "",
      timeSettings: "",
      attemptNum: 0, // number of attempts that a candidate can do
      status: "", // status of the assessment (setup, activated or ended)
      startDate: "",
      endDate: "",
      assessmentID: this.props.match.params.assessmentID,
      final_questions: [], //set of questions to be submitted, array of obj
      tabChecktype: "",
      warn_num: "",
    };
  }

  componentDidMount() {
    const data = { assessmentID: this.state.assessmentID };

    this.props.fetchAssessmentInfo(data);
    this.props.fetchAllQuestionForCandidate(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const { candidateReducer } = this.props;

    if (
      prevProps.candidateReducer !== candidateReducer &&
      candidateReducer.assessmentStartInfo !== null &&
      candidateReducer.all_question_data !== null
    ) {
      const { assessmentStartInfo, all_question_data } = candidateReducer;
      const {
        testName,
        testInstruction,
        tabCheckType_END,
        tabCheckType_WARN,
        warn_num,
      } = assessmentStartInfo.settings;
      const { status } = assessmentStartInfo;
      const {
        withAuthenticationSelected,
        attemptNum,
      } = assessmentStartInfo.access;

      const {
        fixedSelected,
        randomSelected,
        manualSelected,
        manualRandomSelected,

        definedTakeFromSectionSelected,
        sectionFilterNum,

        randomTakeFromTotalSelected,
        randomQuestionNum,
      } = assessmentStartInfo.sets;

      const {
        assessmentTimeSelected,
        questionTimeSelected,
        noLimitSelected,
        time,
        startDate,
        endDate,
      } = assessmentStartInfo.timer;

      if (tabCheckType_END) this.setState({ tabChecktype: "END" });
      if (tabCheckType_WARN) {
        this.setState({ tabChecktype: "WARN", warn_num: warn_num });
      }

      if (fixedSelected) this.setState({ final_questions: all_question_data });
      if (randomSelected) this._randomSelected(all_question_data);
      if (manualSelected) {
        let temp = all_question_data;
        if (manualRandomSelected) temp = this._shuffle_QC(temp);

        if (randomTakeFromTotalSelected) {
          const temp2 = this.getRandom(temp, randomQuestionNum);
          this.setState({ final_questions: temp2 });
        }

        if (definedTakeFromSectionSelected) {
          const questions_sec_based = this._convert_to_section(
            temp,
            sectionFilterNum.length
          );
          const result = this._sort_from_sections(
            questions_sec_based,
            sectionFilterNum
          );

          let final = [];
          result.forEach((item, index) => {
            item.forEach((item2, index2) => {
              final.push(item2);
            });
          });

          this.setState({ final_questions: final });
        }
      }

      if (assessmentTimeSelected) this.setState({ timeSettings: 1 });
      if (questionTimeSelected) this.setState({ timeSettings: 2 });
      if (noLimitSelected) this.setState({ timeSettings: 3 });

      let hour = parseInt(time.substring(0, 2));
      let minute = parseInt(time.substring(3, 5));
      let second = parseInt(time.substring(6, 9));

      this.setState({
        assessmentTitle: testName,
        instruction: this.convert(testInstruction),
        withAuthenticationSelected: withAuthenticationSelected,
        time: (hour * 3600 + minute * 60 + second).toString(),
        attemptNum: parseInt(attemptNum),
        status: status,
        startDate: startDate,
        endDate: endDate,
      });
    }

    const { errors } = this.props;
    if (prevProps.errors !== errors && errors.message !== undefined) {
      this.setState({ msg: errors.message });
    }
  }

  componentWillUnmount() {
    this.props.candidateReducer.assessmentStartInfo = null;
    this.props.candidateReducer.direct = false;
    this.props.candidateReducer.all_question_data = null;
    this.props.clearErrors();
  }

  convert = (data) => {
    const contentBlock = htmlToDraft(data);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return EditorState.createWithContent(contentState);
    }
  };

  _shuffle_QC = (array) => {
    array.forEach((item, index) => {
      if (
        item.questionType !== "Descriptive" &&
        item.questionType !== "Short Answer"
      ) {
        array[index].questionChoices = this.shuffleArray(item.questionChoices);
      }
    });
    return array;
  };

  _randomSelected = (array) => {
    let temp = this._shuffle_QC(array);

    let num_array = [];
    temp.forEach((item, index) => num_array.push(index));
    const final_num = this.shuffleArray(num_array);

    let new_array = [];
    final_num.forEach((item, index) => new_array.push(temp[item]));

    this.setState({ final_questions: new_array });
  };

  _sort_from_sections = (array, num) => {
    let temp = [];
    array.forEach((item, index) => {
      temp.push(this.getRandom(item, parseInt(num[index])));
    });
    return temp;
  };

  getRandom = (arr, n) => {
    let result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  };

  _convert_to_section = (array, size) => {
    let temp = [];
    for (let i = 0; i < size; i++) temp.push([]);

    array.forEach((item, index) => temp[item.section - 1].push(item));
    return temp;
  };

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      email,
      withAuthenticationSelected,
      attemptNum,
      assessmentID,
      final_questions,
    } = this.state;

    let temp = [];
    final_questions.forEach((item, index) => {
      temp.push(item);
      temp[index].question_id = item._id;
    });

    const data = {
      assessmentID: assessmentID,
      name: name,
      email: email,
      attemptNum: attemptNum,
      response: temp,
    };

    if (withAuthenticationSelected) this.props.candidateRegister(data);
    else this.props.candidateRegister2(data);
  };

  render() {
    const {
      assessmentTitle,
      instruction,
      name,
      email,
      msg,
      timeSettings,
      time,
      status,
      startDate,
      endDate,
      assessmentID,
      tabChecktype,
      warn_num,
    } = this.state;

    const {
      direct,
      assessmentStartInfo,
      isLoading,
    } = this.props.candidateReducer;

    if (direct) {
      localStorage.setItem("time", time);
      localStorage.setItem("timeSettings", timeSettings);
      localStorage.setItem("tabChecktype", tabChecktype);
      localStorage.setItem("warn_num", warn_num);

      this.props.history.push(
        `/assessment/attempt/${timeSettings}/${time}/${assessmentID}`
      );
    }

    if (isLoading || assessmentStartInfo === null) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    const today = new Date();
    let SD = moment(startDate).toDate();
    let ED = moment(endDate).toDate();

    if (status !== "Activated") {
      return (
        <>
          <CustomFullContainer>
            <CustomMidContainer>
              <div className={css(styles.whiteCon)}>
                <FirstLabel>Assessment not available</FirstLabel>
              </div>
            </CustomMidContainer>
          </CustomFullContainer>
        </>
      );
    } else if (!(today >= SD && today <= ED)) {
      return (
        <>
          <CustomFullContainer>
            <CustomMidContainer>
              <div className={css(styles.whiteCon)}>
                <FirstLabel>Assessment not available</FirstLabel>
              </div>
            </CustomMidContainer>
          </CustomFullContainer>
        </>
      );
    }

    return (
      <>
        <ScrollArrow />
        <CustomFullContainer>
          <CustomMidContainer>
            <form className={css(styles.whiteCon)} onSubmit={this.onSubmit}>
              <CustomColumn>
                <div style={{ flexDirection: "row", marginBottom: "25px" }}>
                  <h4 className={css(styles.text)}>{assessmentTitle}</h4>
                </div>
                <CustomSubLabel>Instructions</CustomSubLabel>
                <div style={{ marginBottom: "25px" }}>
                  <CustomEditor
                    toolbarHidden={true}
                    readOnly={true}
                    heightAuto={true}
                    editorState={instruction}
                  />
                </div>

                <CustomSubLabel>Candidate Name</CustomSubLabel>
                <div style={{ marginBottom: "25px" }}>
                  <CustomColumn>
                    <CustomInput
                      name={"name"}
                      type={"text"}
                      onChangeValue={this.onChange}
                      placeholder={"Enter your name"}
                      value={name}
                    />
                    <span className={css(styles.redText)}>
                      {msg === null
                        ? null
                        : msg.hasOwnProperty("name")
                        ? "*" + msg.name
                        : null}
                    </span>
                  </CustomColumn>
                </div>
                <CustomSubLabel>Candidate Email</CustomSubLabel>
                <div style={{ marginBottom: "25px" }}>
                  <CustomColumn>
                    <CustomInput
                      name={"email"}
                      type={"text"}
                      onChangeValue={this.onChange}
                      placeholder={"Enter your email"}
                      value={email}
                    />
                    <span className={css(styles.redText)}>
                      {msg === null
                        ? null
                        : msg.hasOwnProperty("email")
                        ? "*" + msg.email
                        : null}
                    </span>
                  </CustomColumn>
                </div>

                <div className={css(styles.redText)}>
                  {msg === null
                    ? null
                    : msg.hasOwnProperty("message")
                    ? "*" + msg.message
                    : null}
                </div>

                <div style={{ marginBottom: "250px" }}>
                  <Button
                    backgroundColor={configStyles.colors.darkBlue}
                    color={configStyles.colors.white}
                    padding={"8px"}
                    width={"100px"}
                    type={"submit"}
                  >
                    Start Test
                  </Button>
                </div>
              </CustomColumn>
            </form>
          </CustomMidContainer>
        </CustomFullContainer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  whiteCon: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100px",
    padding: "0px 20px",
    height: "auto",
  },
  text: {
    flexShrink: 1,
    color: configStyles.colors.black,
    fontSize: "20px",
    fontFamily: "Ubuntu-Bold",
    width: "100%",
    display: "flex",
    height: "auto",
    backgroundColor: "inherit",
  },
  redText: {
    color: configStyles.colors.inputErrorRed,
    fontFamily: "Ubuntu-Regular",
    fontSize: "15px",
  },
});

StartingPageContainer.propTypes = {
  fetchAssessmentInfo: PropTypes.func.isRequired,
  candidateReducer: PropTypes.object.isRequired,
  candidateRegister: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  candidateRegister2: PropTypes.func.isRequired,
  fetchAllQuestionForCandidate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  candidateReducer: state.candidateReducer,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  fetchAssessmentInfo,
  candidateRegister,
  clearErrors,
  candidateRegister2,
  fetchAllQuestionForCandidate,
})(StartingPageContainer);
