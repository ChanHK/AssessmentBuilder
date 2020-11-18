import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

const ThirdLabel = (props) => (
  <h6 className={css(styles.text)}>{props.children}</h6>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "Ubuntu-Regular",
    color: configStyles.colors.black,
    fontSize: "18px",
    // paddingBottom: "20px",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
});

export default ThirdLabel;
