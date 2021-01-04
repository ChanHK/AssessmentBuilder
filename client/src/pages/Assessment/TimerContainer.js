import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import Radio from "../../components/Radio";
import CustomDropdown from "../../components/CustomDropdown";
import Wrapper from "../../components/Wrapper";
import CustomDatePicker from "../../components/CustomDatePicker";
import Button from "../../components/Button";

import Hour from "./Data/Hour";
import MinuteSeconds from "./Data/MinuteSeconds";

class TimerContainer extends Component {
  constructor() {
    super();
    this.state = {
      assessmentTimeSelected: false,
      questionTimeSelected: false,
      hour: "",
      minute: "",
      second: "",
      noLimitSelected: false,
      startDate: "",
      endDate: "",
    };
  }

  assessmentTimeOnClick = (e) => {
    this.setState({
      assessmentTimeSelected: e.target.checked,
      questionTimeSelected: false,
      noLimitSelected: false,
      hour: "",
      minute: "",
      second: "",
    });
  };

  questionTimeOnClick = (e) => {
    this.setState({
      questionTimeSelected: e.target.checked,
      assessmentTimeSelected: false,
      noLimitSelected: false,
      hour: "",
      minute: "",
      second: "",
    });
  };

  noLimitOnClicked = (e) => {
    this.setState({
      noLimitSelected: e.target.checked,
      assessmentTimeSelected: false,
      questionTimeSelected: false,
      hour: "",
      minute: "",
      second: "",
    });
  };

  render() {
    const {
      assessmentTimeSelected,
      questionTimeSelected,
      hour,
      minute,
      second,
      noLimitSelected,
      startDate,
      endDate,
    } = this.state;

    return (
      <form>
        <SecondLabel>Duration</SecondLabel>
        <div className={css(styles.bar)}>
          <CustomColumn>
            <CustomRow>
              <div className={css(styles.radionCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Radio
                    checked={assessmentTimeSelected}
                    onChange={this.assessmentTimeOnClick}
                  />
                </div>
                <ThirdLabel>
                  Time to complete the assessment (hours : minutes)
                </ThirdLabel>
              </div>
            </CustomRow>
            {assessmentTimeSelected && (
              <div style={{ marginLeft: "45px", marginBottom: "25px" }}>
                <Wrapper
                  firstHeight={"60px"}
                  secHeight={"120px"}
                  widthChange={1425}
                >
                  <div className={css(styles.block)}>
                    <CustomDropdown
                      options={Hour}
                      placeholder={"Select hour"}
                      value={hour}
                      onChang={(e) =>
                        this.setState({
                          hour: e.value,
                        })
                      }
                    />
                  </div>
                  <div className={css(styles.block)}>
                    <CustomDropdown
                      options={MinuteSeconds}
                      placeholder={"Select minute"}
                      value={minute}
                      onChange={(e) =>
                        this.setState({
                          minute: e.value,
                        })
                      }
                    />
                  </div>
                </Wrapper>
              </div>
            )}
            <CustomRow>
              <div className={css(styles.radionCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Radio
                    checked={questionTimeSelected}
                    onChange={this.questionTimeOnClick}
                  />
                </div>
                <ThirdLabel>
                  Time to complete each question (minutes : seconds)
                </ThirdLabel>
              </div>
            </CustomRow>
            {questionTimeSelected && (
              <div style={{ marginLeft: "45px", marginBottom: "25px" }}>
                <Wrapper
                  firstHeight={"60px"}
                  secHeight={"120px"}
                  widthChange={1425}
                >
                  <div className={css(styles.block)}>
                    <CustomDropdown
                      options={MinuteSeconds}
                      placeholder={"Select minutes"}
                      value={minute}
                      onChange={(e) =>
                        this.setState({
                          minute: e.value,
                        })
                      }
                    />
                  </div>
                  <div className={css(styles.block)}>
                    <CustomDropdown
                      options={MinuteSeconds}
                      placeholder={"Select seconds"}
                      value={second}
                      onChange={(e) =>
                        this.setState({
                          second: e.value,
                        })
                      }
                    />
                  </div>
                </Wrapper>
              </div>
            )}
            <CustomRow>
              <div className={css(styles.radionCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Radio
                    checked={noLimitSelected}
                    onChange={this.noLimitOnClicked}
                  />
                </div>
                <ThirdLabel>No time limit</ThirdLabel>
              </div>
            </CustomRow>
          </CustomColumn>
        </div>

        <SecondLabel>Availability</SecondLabel>
        <div className={css(styles.bar)}>
          <Wrapper firstHeight={"80px"} secHeight={"180px"} widthChange={1175}>
            <div className={css(styles.timeBlock)}>
              <div>
                <ThirdLabel>Start Date</ThirdLabel>
                <CustomDatePicker
                  selected={startDate}
                  onChange={(e) => this.setState({ startDate: e })}
                  placeholderText={"Select start date"}
                  startDate={startDate}
                  endDate={endDate}
                  selectsStart={true}
                  selectsEnd={false}
                />
              </div>
            </div>

            <div className={css(styles.timeBlock)}>
              <div>
                <ThirdLabel>End Date</ThirdLabel>
                <CustomDatePicker
                  selected={endDate}
                  onChange={(e) => this.setState({ endDate: e })}
                  placeholderText={"Select end date"}
                  startDate={startDate}
                  endDate={endDate}
                  selectsStart={false}
                  selectsEnd={true}
                />
              </div>
            </div>
          </Wrapper>
        </div>
        <div style={{ paddingBottom: "300px" }}>
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
  bar: {
    width: "100%",
    padding: "20px 20px",
    border: "2px solid",
    borderRadius: "5px",
    borderColor: configStyles.colors.black,
    marginBottom: "50px",
  },
  radionCon: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    marginBottom: "20px",
  },
  block: {
    flexWrap: "nowrap",
    width: "400px",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  timeBlock: {
    flexWrap: "nowrap",
    width: "350px",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

export default TimerContainer;
