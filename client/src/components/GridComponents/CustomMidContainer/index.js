import React from "react";
import { StyleSheet, css } from "aphrodite";

const CustomMidContainer = (props) => (
  <div className={css(styles.style)}>{props.children}</div>
);

const styles = StyleSheet.create({
  style: {
    justifyContent: "center",
    alignItems: "center",
    width: "65%",
    display: "flex",
  },
});

export default CustomMidContainer;
