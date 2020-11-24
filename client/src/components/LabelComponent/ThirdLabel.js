import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

const ThirdLabel = (props) => (
  <h6
    className={css(styles.text)}
    style={{ fontSize: props.fontSize ? props.fontSize : "18px" }}
  >
    {props.children}
  </h6>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "Ubuntu-Regular",
    color: configStyles.colors.black,
    // paddingBottom: "20px",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
});

export default ThirdLabel;
