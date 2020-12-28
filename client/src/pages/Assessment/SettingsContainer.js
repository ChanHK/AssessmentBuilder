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
import Dropdown from "../../components/Dropdown";
import Range from "../../components/Range";

import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

const unitOptions = [{ value: "percentage %" }, { value: "points p." }];

class SettingContainer extends Component {
  constructor() {
    super();
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
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClickPassorFail = (e) => {
    this.setState({ passOrFailSelected: e, score: "", unit: null });
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
    } = this.state;

    return (
      <form>
        <SecondLabel>Title</SecondLabel>
        <div style={{ paddingBottom: "25px" }}>
          <CustomInput
            name={"testName"}
            type={"text"}
            placeholder={"Enter the title here"}
            onChangeValue={this.onChange}
            value={testName}
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
                      />
                    </div>
                    <div className={css(styles.block)}>
                      <Dropdown
                        options={unitOptions}
                        placeholder={"Select unit type"}
                        value={unit}
                        onChangeValue={(e) =>
                          this.setState({ unit: e.target.value })
                        }
                        padding={"12px"}
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
                onChange={(e) =>
                  this.setState({ addGradingSelected: e, gradeRange: [] })
                }
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
                        <Dropdown
                          options={unitOptions}
                          placeholder={"Select unit type"}
                          value={gradeUnit}
                          onChangeValue={(e) =>
                            this.setState({
                              gradeUnit: e.target.value,
                            })
                          }
                          padding={"12px"}
                        />
                      </div>
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
                    </Wrapper>
                  </div>
                  {gradeRange.map((item, index) => (
                    <div style={{ width: "225px" }}>
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
                      />
                    </div>
                  ))}
                </div>
              </CustomColumn>
            </>
          )}
        </div>
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

export default SettingContainer;
