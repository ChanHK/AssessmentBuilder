import React from "react";
import { StyleSheet, css } from "aphrodite";

const CustomColumn = (props) => (
  <div className={css(styles.container, props.style)}>{props.children}</div>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    display: "flex",
    width: "100%",
  },
});

export default CustomColumn;