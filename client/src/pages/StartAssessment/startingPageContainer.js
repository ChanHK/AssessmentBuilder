import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

class StartingPageContainer extends Component {
  constructor() {
    super();
    this.state = {
      instruction: "",
      name: "",
      email: "",
      accessCode: "",
    };
  }

  render() {
    return (
      <div className={css(styles.background)}>
        <div className={css(styles.whiteBox)}>a</div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: configStyles.colors.lightGrey,
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  whiteBox: {
    backgroundColor: configStyles.colors.white,
    borderRadius: "5px",
    boxShadow: "0 3px 20px 0px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
});

export default StartingPageContainer;
