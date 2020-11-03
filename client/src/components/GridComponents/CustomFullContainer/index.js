import React from "react";
import { StyleSheet, css } from "aphrodite";

const CustomFullContainer = (props) => (
  <div className={css(styles.style)}>{props.children}</div>
);

const styles = StyleSheet.create({
  style: {
    width: "100%",
    height: "auto",
  },
});

export default CustomFullContainer;
