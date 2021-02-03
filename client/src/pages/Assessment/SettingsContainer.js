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

import { EditorState, convertToRaw, ContentState, Modifier } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import validator from "validator";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

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
      msg: null, //stores error messages
      subject: props.subject,
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

  _handleBeforeInput = (input, length, editorObj) => {
    const inputLength = editorObj.getCurrentContent().getPlainText().length;
    if (input && inputLength >= length) {
      return "handled";
    }
  };

  _handlePastedText = (input, length, editorObj) => {
    const inputLength = editorObj.getCurrentContent().getPlainText().length;
    let remainingLength = length - inputLength;
    if (input.length + inputLength >= length) {
      const newContent = Modifier.insertText(
        editorObj.getCurrentContent(),
        editorObj.getSelection(),
        input.slice(0, remainingLength)
      );

      EditorState.push(editorObj, newContent, "insert-characters");

      return true;
    } else {
      return false;
    }
  };

  validateForm = (data) => {
    const {
      testName,
      passOrFailSelected,
      score,
      unit,
      addGradingSelected,
      gradeUnit,
      gradeRange,
      gradeValue,
    } = data;
    const { testInstruction } = this.state;
    let tempMsg = {};

    if (testName === "") {
      tempMsg.TN = "Assessment title field is required";
    }

    if (!testInstruction.getCurrentContent().hasText()) {
      tempMsg.INS = "Instruction field is required";
    }

    let curr_sco = parseFloat(score);

    if (passOrFailSelected) {
      if (score === "") {
        tempMsg.P_SCO = "Passing score field is required";
      } else if (validator.isAlpha(score)) {
        tempMsg.P_SCO = `Please enter numbers only`;
      } else {
        if (
          validator.isDecimal(score, { decimal_digits: "1,2" }) ||
          validator.isInt(score)
        ) {
          if (unit === "percentage %" && !(curr_sco > 0 && curr_sco <= 100)) {
            tempMsg.P_SCO = `Please enter number between 1 and 100`;
          }

          if (unit === "points p." && !(curr_sco > 0 && curr_sco <= 1000)) {
            tempMsg.P_SCO = `Please enter number between 1 and 1000`;
          }
        } else {
          tempMsg.P_SCO = `Please enter valid score, eg: 1, 1.5, 2.00`;
        }
      }

      if (unit === "") {
        tempMsg.P_UNIT = "Unit type field is required";
      }
    }

    if (addGradingSelected) {
      if (gradeUnit === "") {
        tempMsg.G_UNIT = "Grade unit type field is required";
      }

      let error = [];
      gradeRange.forEach((item, index) => {
        if (item === "") {
          error.push("Range field is required");
          tempMsg.RAN = error;
        } else if (!validator.isInt(item)) {
          error.push("Please enter number only");
          tempMsg.RAN = error;
        } else if (
          gradeUnit === "percentage %" &&
          !(parseInt(item) > 0 && parseInt(item) <= 100)
        ) {
          error.push("Please enter number between 1 and 100");
          tempMsg.RAN = error;
        } else if (
          gradeUnit === "points p." &&
          !(parseInt(item) > 0 && parseInt(item) <= 1000)
        ) {
          error.push("Please enter number between 1 and 1000");
          tempMsg.RAN = error;
        } else if (parseInt(item) <= gradeRange[index - 1] && index !== 0) {
          error.push("Please enter range bigger than the previous range");
          tempMsg.RAN = error;
        } else if (parseInt(item) === 0 && index === 0) {
          error.push("Please enter range bigger 0");
          tempMsg.RAN = error;
        } else {
          error.push("");
          tempMsg.RAN = error;
        }
      });

      let error2 = [];
      gradeValue.forEach((item, index) => {
        if (item === "") {
          error2.push("Grade field is required");
          tempMsg.VAL = error2;
        } else {
          error2.push("");
          tempMsg.VAL = error2;
        }
      });

      let count = 0;
      let count2 = 0;
      tempMsg.RAN.forEach((item, index) => {
        if (item === "") count++; //check is there any error
      });
      tempMsg.VAL.forEach((item, index) => {
        if (item === "") count2++; //check is there any error
      });
      if (count === tempMsg.RAN.length && count2 === tempMsg.VAL.length) {
        delete tempMsg.RAN;
        delete tempMsg.VAL;
      }
    }

    this.setState({ msg: tempMsg });

    if (Object.keys(tempMsg).length === 0) return true;
    else return false;
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

    if (this.validateForm(data)) {
      this.props.updateAssessmentSetting(data);
    }
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
      msg,
      subject,
    } = this.state;

    if (this.props.assessmentReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    return (
      <form onSubmit={this.onSubmit} style={{ marginBottom: "100px" }}>
        <SecondLabel>Title</SecondLabel>
        <div style={{ paddingBottom: "25px" }}>
          <CustomColumn>
            <CustomInput
              name={"testName"}
              type={"text"}
              placeholder={"Enter the title here"}
              onChangeValue={this.onChange}
              value={testName}
              readOnly={type === "view" ? true : false}
              maxLength={100}
            />
            <span className={css(styles.redText)}>
              {msg === null
                ? null
                : msg.hasOwnProperty("TN")
                ? "*" + msg.TN
                : null}
            </span>
          </CustomColumn>
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
          <CustomColumn>
            <CustomEditor
              onEditorStateChange={(e) => this.setState({ testInstruction: e })}
              editorState={testInstruction}
              readOnly={type === "view" ? true : false}
              handleBeforeInput={(input) =>
                this._handleBeforeInput(input, 500, testInstruction)
              }
              handlePastedText={(input) =>
                this._handlePastedText(input, 500, testInstruction)
              }
            />
            <span className={css(styles.redText)}>
              {msg === null
                ? null
                : msg.hasOwnProperty("INS")
                ? "*" + msg.INS
                : null}
            </span>
          </CustomColumn>
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
                      <CustomColumn>
                        <CustomInput
                          name={"score"}
                          type={"text"}
                          placeholder={"Enter the passing score here"}
                          onChangeValue={this.onChange}
                          value={score}
                          readOnly={type === "view" ? true : false}
                        />
                        <span className={css(styles.redText)}>
                          {msg === null
                            ? null
                            : msg.hasOwnProperty("P_SCO")
                            ? "*" + msg.P_SCO
                            : null}
                        </span>
                      </CustomColumn>
                    </div>
                    <div className={css(styles.block)}>
                      <CustomColumn>
                        <CustomDropdown
                          options={unitOptions}
                          placeholder={"Select unit type"}
                          value={unit}
                          onChange={(e) => this.setState({ unit: e.value })}
                          padding={"12px"}
                          disabled={type === "view" ? true : false}
                        />
                        <span className={css(styles.redText)}>
                          {msg === null
                            ? null
                            : msg.hasOwnProperty("P_UNIT")
                            ? "*" + msg.P_UNIT
                            : null}
                        </span>
                      </CustomColumn>
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
                        <CustomColumn>
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
                          <span className={css(styles.redText)}>
                            {msg === null
                              ? null
                              : msg.hasOwnProperty("G_UNIT")
                              ? "*" + msg.G_UNIT
                              : null}
                          </span>
                        </CustomColumn>
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
                      <CustomColumn>
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
                        <span className={css(styles.redText)}>
                          {msg === null
                            ? null
                            : msg.hasOwnProperty("RAN")
                            ? msg.RAN[index] !== "" &&
                              msg.RAN[index] !== undefined
                              ? "*" + msg.RAN[index]
                              : null
                            : null}
                        </span>
                        <span className={css(styles.redText)}>
                          {msg === null
                            ? null
                            : msg.hasOwnProperty("VAL")
                            ? msg.VAL[index] !== "" &&
                              msg.VAL[index] !== undefined
                              ? "*" + msg.VAL[index]
                              : null
                            : null}
                        </span>
                      </CustomColumn>
                    </div>
                  ))}
                </div>
              </CustomColumn>
            </>
          )}
        </div>

        <div className={css(styles.buttonCon)}>
          {type !== "view" && (
            <div style={{ marginRight: "15px" }}>
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
          <div>
            <Button
              backgroundColor={configStyles.colors.white}
              color={configStyles.colors.darkBlue}
              padding={"8px"}
              width={"100px"}
              type={"button"}
              onClick={() => {
                this.props.history.push(`/assessment/${subject}`);
              }}
            >
              Back
            </Button>
          </div>
        </div>
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
  redText: {
    color: configStyles.colors.inputErrorRed,
    fontFamily: "Ubuntu-Regular",
    fontSize: "15px",
  },
  buttonCon: {
    width: "100%",
    height: "auto",
    justifyContent: "flex-end",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
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

export default compose(
  withRouter,
  connect(mapStateToProps, { updateAssessmentSetting, fetchAssessmentSetting })
)(SettingContainer);
