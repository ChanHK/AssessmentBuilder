import React from "react";
import { StyleSheet, css } from "aphrodite";
import { isMobile } from "react-device-detect";

const CustomMidContainer = (props) => (
  <div
    className={css(styles.style, props.style)}
    style={{ width: isMobile ? "80%" : "65%" }}
  >
    {props.children}
  </div>
);

const styles = StyleSheet.create({
  style: {
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    display: "flex",
  },
});

export default CustomMidContainer;
