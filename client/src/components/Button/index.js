import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

const Button = (props) => (
  <div className={css(styles.buttonCon)}>
    <button
      className={css(styles.button, styles.noSelect)}
      style={{
        backgroundColor: props.backgroundColor,
        color: props.color,
        padding: props.padding,
        width: props.width,
      }}
      onClick={props.onClick}
      type={props.type ? props.type : "button"}
    >
      {props.children}
    </button>
  </div>
);

const styles = StyleSheet.create({
  button: {
    outline: "none",
    borderRadius: "5px",
    ":active": {
      backgroundColor: configStyles.colors.darkBlue,
      border: "3px solid",
      borderColor: configStyles.colors.lightBlue,
      color: configStyles.colors.white,
    },
    border: "2px solid",
    borderColor: configStyles.colors.black,
    fontFamily: "Ubuntu-Bold",
    fontSize: "15px",
    lineHeight: "1.2",
  },
  buttonCon: {
    justifyContent: "flex-end",
    display: "flex",
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

export default Button;
