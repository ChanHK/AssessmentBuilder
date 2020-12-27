import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";

import CustomSubLabel from "../../components/FormComponents/CustomSubLabel";

import CustomEditor from "../../components/CustomEditor";

class StartingPageContainer extends Component {
  constructor() {
    super();
    this.state = {
      assessmentTitle: "mathematics exam degree year 3",
      instruction: "",
      name: "",
      email: "",
      accessCode: "",
    };
  }

  render() {
    const { assessmentTitle } = this.state;
    return (
      <>
        <CustomFullContainer>
          <CustomMidContainer>
            <div className={css(styles.whiteCon)}>
              <CustomColumn>
                <div style={{ flexDirection: "row", marginBottom: "25px" }}>
                  <h4 className={css(styles.text)}>{assessmentTitle}</h4>
                </div>
                <CustomSubLabel>Instructions</CustomSubLabel>
                <div>
                  <CustomEditor
                    toolbarHidden={true}
                    readOnly={true}
                    heightAuto={true}
                  />
                </div>
              </CustomColumn>
            </div>
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
    // backgroundColor: "grey",
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
});

export default StartingPageContainer;
