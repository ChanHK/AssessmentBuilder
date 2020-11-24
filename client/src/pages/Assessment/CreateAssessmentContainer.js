import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import Header from "../../components/Header";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import "../../css/general.css";
import CustomInput from "../../components/CustomInput";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import TextArea from "../../components/TextArea";
import Section from "../../components/Section";
import Button from "../../components/Button";
import CustomSwitch from "../../components/CustomSwitch";
import * as configStyles from "../../config/styles";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";
import CustomRow from "../../components/GridComponents/CustomRow";
import Radio from "../../components/Radio";
import AssessmentButtonGroup from "../../components/AssessmentButtonGroup";
import CustomEditor from "../../components/CustomEditor";
import Wrapper from "../../components/Wrapper";
import Dropdown from "../../components/Dropdown";
import Range from "../../components/Range";

const unitOptions = [{ value: "percentage %" }, { value: "points p." }];

export default class CreateAssessmentContainer extends Component {
  constructor() {
    super();
    this.state = {
      testName: "",
      testDescription: "",
      testInstruction: "",
      type: "settings",
      passOrFail: true,
      score: "",
      unit: null,
      addGrading: true, //
      gradeUnit: null,
      gradeRange: [],
      sizeCheck: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClickPassorFail = (e) => {
    this.setState({ passOrFail: e, score: "", unit: null });
  };

  render() {
    const {
      testName,
      testDescription,
      testInstruction,
      type,
      passOrFail,
      score,
      unit,
      addGrading,
      gradeUnit,
      gradeRange,
      sizeCheck,
    } = this.state;
    console.log(testInstruction);
    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Create Assessment</FirstLabel>
              </div>
              <div style={{ paddingBottom: "50px" }}>
                <AssessmentButtonGroup
                  onClick={(e) => this.setState({ type: e.target.value })}
                  type={type}
                />
              </div>

              {type === "settings" ? (
                <>
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
                      <ThirdLabel>
                        Rules that are visible to candidates
                      </ThirdLabel>
                    </div>
                  </CustomRow>

                  <div style={{ paddingBottom: "25px" }}>
                    <CustomEditor
                      onEditorStateChange={(e) =>
                        this.setState({ testInstruction: e })
                      }
                      editorState={testInstruction}
                    />
                  </div>

                  <SecondLabel>Grading Criteria</SecondLabel>
                  <div className={css(styles.gradeBar)}>
                    <CustomRow>
                      <CustomSwitch
                        onChange={this.onClickPassorFail}
                        checked={passOrFail}
                      />

                      <div style={{ marginLeft: "15px" }}>
                        <ThirdLabel>Pass or fail</ThirdLabel>
                      </div>
                    </CustomRow>
                    {passOrFail ? (
                      <>
                        <CustomColumn>
                          <div style={{ padding: "20px 0px 0px 60px" }}>
                            <ThirdLabel fontSize={"15px"}>
                              Enter passing score
                            </ThirdLabel>
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
                    ) : (
                      <></>
                    )}

                    <div style={{ paddingTop: "25px" }}>
                      <CustomRow>
                        <CustomSwitch
                          onChange={(e) => this.setState({ addGrading: e })}
                          checked={addGrading}
                        />

                        <div style={{ marginLeft: "15px" }}>
                          <ThirdLabel>Define grade range</ThirdLabel>
                        </div>
                      </CustomRow>
                    </div>

                    {addGrading ? (
                      <>
                        <CustomColumn>
                          <div style={{ padding: "20px 0px 0px 60px" }}>
                            <ThirdLabel fontSize={"15px"}>
                              Enter grade ranges
                            </ThirdLabel>
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
                                    backgroundColor={
                                      configStyles.colors.darkBlue
                                    }
                                    color={configStyles.colors.white}
                                    padding={"8px"}
                                    width={"100px"}
                                    onClick={() =>
                                      this.setState({
                                        gradeRange: this.state.gradeRange.concat(
                                          ""
                                        ),
                                      })
                                    }
                                  >
                                    Add range
                                  </Button>
                                </div>
                              </Wrapper>
                            </div>
                            {gradeRange.map((item, index) => (
                              <Range count={index + 1} value={item} />
                            ))}
                          </div>
                        </CustomColumn>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              ) : (
                <></>
              )}

              {/* 
              <Section />
              <div style={{ padding: "25px 0" }}>
                <Button
                  backgroundColor={configStyles.colors.darkBlue}
                  color={configStyles.colors.white}
                  padding={"8px"}
                  // width={"100px"}
                  onClick={this.handleClick}
                >
                  Add Section
                </Button>
              </div>

              <SecondLabel>Question Order</SecondLabel>
              <div className={css(styles.bar)}>
                <CustomColumn>
                  <CustomRow>
                    <Radio />
                    <ThirdLabel></ThirdLabel>
                  </CustomRow>
                </CustomColumn>
              </div>

              <div className={css(styles.bar)}>
                <CustomRow>
                  <div style={{ paddingRight: "20px" }}>
                    <ThirdLabel>Honestly Check</ThirdLabel>
                  </div>
                  <CustomSwitch
                    onChange={(e) => this.setState({ sizeCheck: e })}
                    checked={sizeCheck}
                  />
                </CustomRow>
              </div> */}
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
  bar: {
    width: "100%",
    padding: "10px 20px",
    backgroundColor: configStyles.colors.lightGrey,
    marginBottom: "50px",
    border: "2px solid",
    borderRadius: "5px",
    borderColor: configStyles.colors.black,
  },
  subLabel: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  gradeBar: {
    width: "100%",
    padding: "20px 20px",
    marginBottom: "500px",
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
