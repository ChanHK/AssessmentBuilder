import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import Radio from "../../components/Radio";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import * as configStyles from "../../config/styles";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

class TimerContainer extends Component {
  constructor() {
    super();
    this.state = {
      assessmentTimeSelected: false,
      questionTimeSelected: false,
    };
  }

  assessmentTimeOnClick = (e) => {
    this.setState({
      assessmentTimeSelected: e.target.checked,
      questionTimeSelected: false,
    });
  };

  questionTimeOnClick = (e) => {
    this.setState({
      questionTimeSelected: e.target.checked,
      assessmentTimeSelected: false,
    });
  };

  render() {
    const { assessmentTimeSelected, questionTimeSelected, time } = this.state;
    // console.log(assessmentTimeSelected);
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
                <ThirdLabel>Time to complete the assessment</ThirdLabel>
              </div>
            </CustomRow>
            <CustomRow>
              <div className={css(styles.radionCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Radio
                    checked={questionTimeSelected}
                    onChange={this.questionTimeOnClick}
                  />
                </div>
                <ThirdLabel>Time to complete each question</ThirdLabel>
              </div>
            </CustomRow>
          </CustomColumn>
        </div>
      </form>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    width: "100%",
    padding: "20px 20px",
    marginBottom: "50px",
    border: "2px solid",
    borderRadius: "5px",
    borderColor: configStyles.colors.black,
  },
  radionCon: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    marginBottom: "20px",
  },
});

export default TimerContainer;
