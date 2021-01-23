import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";
import "../../css/general.css";

import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import CustomInput from "../../components/CustomInput";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import CustomSwitch from "../../components/CustomSwitch";
import CustomEditor from "../../components/CustomEditor";
import Wrapper from "../../components/Wrapper";
import CustomDropdown from "../../components/CustomDropdown";
import Range from "../../components/Range";
import LoaderSpinner from "../../components/LoaderSpinner";

import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateAssessmentSetting,
  fetchAssessmentSetting,
} from "../../actions/assessment.actions";

const unitOptions = ["percentage %", "points p."];

class SettingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testName: "",
      testDescription: "",
      testInstruction: EditorState.createEmpty(),
      passOrFailSelected: true, //switch button
      score: "", // score for pass and fail
      unit: "", // unit for pass and fail
      addGradingSelected: false, //switch button
      gradeUnit: "", // percentage or points
      gradeRange: [], // stores the range like 10,20,30
      gradeValue: [], //stores the value like A+, A, A-
      assessmentID: props.assessmentID,
      type: props.type, //edit | create | view
    };
  }

  componentDidMount() {
    const data = {
      assessmentID: this.state.assessmentID,
    };

    this.props.fetchAssessmentSetting(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const { assessmentReducer } = this.props;

    if (
      prevProps.assessmentReducer !== assessmentReducer &&
      assessmentReducer.assessmentLoad !== null &&
      assessmentReducer.message === undefined
    ) {
      const {
        testName,
        testInstruction,
        testDescription,
        score,
        unit,
        passOrFailSelected,
        gradeValue,
        gradeUnit,
        gradeRange,
        addGradingSelected,
      } = assessmentReducer.assessmentLoad;

      const ins = this.convertIns(testInstruction);

      this.setState({
        testName: testName,
        testInstruction: ins,
        testDescription: testDescription,
        score: score,
        unit: unit,
        passOrFailSelected: passOrFailSelected,
        gradeValue: gradeValue,
        gradeUnit: gradeUnit,
        gradeRange: gradeRange,
        addGradingSelected: addGradingSelected,
      });
    }
  }

  convertIns = (data) => {
    const contentBlock = htmlToDraft(data);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return EditorState.createWithContent(contentState);
    }
  };

  componentWillUnmount() {
    this.props.assessmentReducer.assessmentLoad = null;
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClickPassorFail = (e) => {
    if (this.state.type !== "view") {
      this.setState({
        passOrFailSelected: e,
        score: "",
        unit: "",
        addGradingSelected: false,
      });
    }
  };

  deleteRangeRow = (index) => {
    this.state.gradeRange.splice(index, 1);
    this.state.gradeValue.splice(index, 1);
    this.setState({
      gradeRange: this.state.gradeRange,
      gradeValue: this.state.gradeValue,
    });
  };

  onChangeGradeRange = (value, index) => {
    this.setState({
      gradeRange: [
        ...this.state.gradeRange.slice(0, index),
        value,
        ...this.state.gradeRange.slice(index + 1),
      ],
    });
  };

  onChangeGradeValue = (value, index) => {
    this.setState({
      gradeValue: [
        ...this.state.gradeValue.slice(0, index),
        value,
        ...this.state.gradeValue.slice(index + 1),
      ],
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      testName,
      testDescription,
      testInstruction,
      passOrFailSelected,
      score,
      unit,
      addGradingSelected,
      gradeUnit,
      gradeRange,
      gradeValue,
      assessmentID,
    } = this.state;

    const data = {
      testName: testName,
      testDescription: testDescription,
      testInstruction: draftToHtml(
        convertToRaw(testInstruction.getCurrentContent())
      ),
      passOrFailSelected: passOrFailSelected,
      score: score,
      unit: unit,
      addGradingSelected: addGradingSelected,
      gradeUnit: gradeUnit,
      gradeRange: gradeRange,
      gradeValue: gradeValue,
      assessmentID: assessmentID,
    };

    this.props.updateAssessmentSetting(data);
  };

  render() {
    const {
      testName,
      testDescription,
      testInstruction,
      passOrFailSelected,
      score,
      unit,
      addGradingSelected,
      gradeUnit,
      gradeRange,
      gradeValue,
      type,
    } = this.state;

    if (this.props.assessmentReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    return (
      <form onSubmit={this.onSubmit} style={{ marginBottom: "100px" }}>
        <SecondLabel>Title</SecondLabel>
        <div style={{ paddingBottom: "25px" }}>
          <CustomInput
            name={"testName"}
            type={"text"}
            placeholder={"Enter the title here"}
            onChangeValue={this.onChange}
            value={testName}
            readOnly={type === "view" ? true : false}
            maxLength={100}
          />
        </div>
        <CustomRow>
          <div className={css(styles.subLabel)}>
            <div style={{ marginRight: "15px" }}>
              <SecondLabel>Description</SecondLabel>
            </div>
            <ThirdLabel>
              Notes that are only visible by you (Optional)
            </ThirdLabel>
          </div>
        </CustomRow>
        <div style={{ paddingBottom: "25px" }}>
          <TextArea
            name={"testDescription"}
            type={"text"}
            placeholder={"Enter the description here"}
            onChange={this.onChange}
            value={testDescription}
            readOnly={type === "view" ? true : false}
            maxLength={250}
          />
        </div>
        <CustomRow>
          <div className={css(styles.subLabel)}>
            <div style={{ marginRight: "15px" }}>
              <SecondLabel>Instruction</SecondLabel>
            </div>
            <ThirdLabel>Rules that are visible to candidates</ThirdLabel>
          </div>
        </CustomRow>

        <div style={{ paddingBottom: "25px" }}>
          <CustomEditor
            onEditorStateChange={(e) => this.setState({ testInstruction: e })}
            editorState={testInstruction}
            readOnly={type === "view" ? true : false}
          />
        </div>

        <SecondLabel>Grading Criteria</SecondLabel>
        <div className={css(styles.gradeBar)}>
          <CustomRow>
            <CustomSwitch
              onChange={this.onClickPassorFail}
              checked={passOrFailSelected}
            />

            <div style={{ marginLeft: "15px" }}>
              <ThirdLabel>Pass or fail</ThirdLabel>
            </div>
          </CustomRow>
          {passOrFailSelected && (
            <>
              <CustomColumn>
                <div style={{ padding: "20px 0px 0px 60px" }}>
                  <ThirdLabel fontSize={"15px"}>Enter passing score</ThirdLabel>
                  <Wrapper
                    firstHeight={"60px"}
                    secHeight={"120px"}
                    widthChange={1425}
                  >
                    <div className={css(styles.block)}>
                      <CustomInput
                        name={"score"}
                        type={"number"}
                        step={"0.01"}
                        placeholder={
                          "Enter the passing score here (two digits)"
                        }
                        onChangeValue={this.onChange}
                        value={score}
                        readOnly={type === "view" ? true : false}
                      />
                    </div>
                    <div className={css(styles.block)}>
                      <CustomDropdown
                        options={unitOptions}
                        placeholder={"Select unit type"}
                        value={unit}
                        onChange={(e) => this.setState({ unit: e.value })}
                        padding={"12px"}
                        disabled={type === "view" ? true : false}
                      />
                    </div>
                  </Wrapper>
                </div>
              </CustomColumn>
            </>
          )}

          <div style={{ paddingTop: "25px" }}>
            <CustomRow>
              <CustomSwitch
                onChange={(e) => {
                  if (type !== "view") {
                    this.setState({
                      addGradingSelected: e,
                      gradeRange: [],
                      passOrFailSelected: false,
                    });
                  }
                }}
                checked={addGradingSelected}
              />

              <div style={{ marginLeft: "15px" }}>
                <ThirdLabel>Define grade range</ThirdLabel>
              </div>
            </CustomRow>
          </div>

          {addGradingSelected && (
            <>
              <CustomColumn>
                <div style={{ padding: "20px 0px 0px 0px" }}>
                  <ThirdLabel fontSize={"15px"}>Enter grade ranges</ThirdLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <Wrapper
                      firstHeight={"60px"}
                      secHeight={"120px"}
                      widthChange={1425}
                    >
                      <div className={css(styles.block)}>
                        <CustomDropdown
                          options={unitOptions}
                          placeholder={"Select unit type"}
                          value={gradeUnit}
                          onChange={(e) =>
                            this.setState({ gradeUnit: e.value })
                          }
                          padding={"12px"}
                          disabled={type === "view" ? true : false}
                        />
                      </div>
                      {type !== "view" && (
                        <div className={css(styles.block)}>
                          <Button
                            backgroundColor={configStyles.colors.darkBlue}
                            color={configStyles.colors.white}
                            padding={"8px"}
                            width={"100px"}
                            onClick={() => {
                              if (gradeValue.length < 10)
                                this.setState({
                                  gradeRange: this.state.gradeRange.concat(""),
                                  gradeValue: this.state.gradeValue.concat(""),
                                });
                            }}
                          >
                            Add range
                          </Button>
                        </div>
                      )}
                    </Wrapper>
                  </div>
                  {gradeRange.map((item, index) => (
                    <div style={{ width: "225px" }} key={index}>
                      <Range
                        count={index + 1}
                        value={item}
                        unit={gradeUnit}
                        onClick={() => this.deleteRangeRow(index)}
                        gradeValue={gradeValue[index]}
                        onChangeValue={(e) =>
                          this.onChangeGradeValue(e.target.value, index)
                        }
                        onChange={(e) =>
                          this.onChangeGradeRange(e.target.value, index)
                        }
                        previous={gradeRange[index - 1]}
                        readOnly={type === "view" ? true : false}
                      />
                    </div>
                  ))}
                </div>
              </CustomColumn>
            </>
          )}
        </div>
        {type !== "view" && (
          <div>
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
        )}
      </form>
    );
  }
}

const styles = StyleSheet.create({
  subLabel: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  gradeBar: {
    width: "100%",
    padding: "20px 20px",
    marginBottom: "50px",
    border: "2px solid",
    borderRadius: "5px",
    borderColor: configStyles.colors.black,
  },
  block: {
    flexWrap: "nowrap",
    width: "400px",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

SettingContainer.propTypes = {
  fetchAssessmentSetting: PropTypes.func.isRequired,
  updateAssessmentSetting: PropTypes.func.isRequired,
  assessmentReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  assessmentReducer: state.assessmentReducer,
});

export default connect(mapStateToProps, {
  updateAssessmentSetting,
  fetchAssessmentSetting,
})(SettingContainer);
