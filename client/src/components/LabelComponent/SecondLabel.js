import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

const SecondLabel = (props) => (
  <h6
    className={css(styles.text, styles.noSelect)}
    style={{ marginRight: props.marginRight }}
  >
    {props.children}
  </h6>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "Ubuntu-Bold",
    color: configStyles.colors.black,
    fontSize: "20px",
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

export default SecondLabel;
