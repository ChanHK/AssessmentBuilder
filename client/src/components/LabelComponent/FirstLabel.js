import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

const FirstLabel = (props) => (
  <div className={css(styles.container)}>
    <h6 className={css(styles.text, styles.noSelect)}>{props.children}</h6>
  </div>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    display: "flex",
    height: "30%",
    // paddingTop: "60px", //
  },
  text: {
    fontFamily: "Ubuntu-Bold",
    paddingTop: "20px",
    paddingBottom: "20px",
    fontSize: "30px",
    lineHeight: "34px",
    color: configStyles.colors.black,
  },
  noSelect: {
    userSelect:
      "none" /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */,
    webkitTouchCallout: "none" /* iOS Safari */,
    webkitUserSelect: "none" /* Safari */,
    khtmlUserSelect: "none" /* Konqueror HTML */,
    mozUserSelect: "none" /* Old versions of Firefox */,
    msUserSelect: "none" /* Internet Explorer/Edge */,
  },
});

export default FirstLabel;
