import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite";
import "../../css/general.css";
import * as configStyles from "../../config/styles";

import Radio from "../../components/Radio";

import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

class SetContainer extends Component {
  constructor() {
    super();
    this.state = {
      fixedSelected: true,
      randomSelected: false,
    };
  }

  fixedOnClick = (e) => {
    this.setState({ fixedSelected: e.target.checked, randomSelected: false });
  };

  randomOnClick = (e) => {
    this.setState({ randomSelected: e.target.checked, fixedSelected: false });
  };

  render() {
    const { fixedSelected, randomSelected } = this.state;
    return (
      <form>
        <SecondLabel>Question Order and Assessment Set Generation</SecondLabel>
        <div className={css(styles.bar)}>
          <CustomColumn>
            <CustomRow>
              <div className={css(styles.radionCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Radio checked={fixedSelected} onChange={this.fixedOnClick} />
                </div>
                <ThirdLabel>Fixed order of questions and choices</ThirdLabel>
              </div>
            </CustomRow>
            <CustomRow>
              <div className={css(styles.radionCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Radio
                    checked={randomSelected}
                    onChange={this.randomOnClick}
                  />
                </div>
                <ThirdLabel>Random order of questions and choices</ThirdLabel>
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
});

export default SetContainer;
