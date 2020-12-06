import React from "react";
import { StyleSheet, css } from "aphrodite";

const CustomLabel = (props) => (
  <h6 className={css(styles.style)}>{props.children}</h6>
);

const styles = StyleSheet.create({
  style: {
    textAlign: "center",
    fontSize: "40px",
    fontFamily: "Ubuntu-Bold",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
});

export default CustomLabel;
