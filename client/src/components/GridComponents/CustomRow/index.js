import React from "react";
import { StyleSheet, css } from "aphrodite";

const CustomRow = (props) => (
  <div className={css(styles.container, props.style)}>{props.children}</div>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
});

export default CustomRow;
