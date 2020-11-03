import React from "react";
import { StyleSheet, css } from "aphrodite";

const CustomRow = (props) => (
  <div
    className={
      props.bar ? css(styles.container, styles.bar) : css(styles.container)
    }
  >
    {props.children}
  </div>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  bar: {
    backgroundColor: "#060b26",
    height: "60px",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "fixed",
    top: "0",
  },
});

export default CustomRow;
