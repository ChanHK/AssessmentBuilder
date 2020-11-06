import React from "react";
import { StyleSheet, css } from "aphrodite";

const Button = (props) => (
  <button
    className={css(styles.button)}
    style={{
      backgroundColor: props.backgroundColor,
      color: props.color,
      padding: props.padding,
      width: props.width,
    }}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

const styles = StyleSheet.create({
  button: {
    outline: "none",
    marginLeft: "5px",
    borderRadius: "5px",
    ":active": {
      backgroundColor: "#060b26",
      border: "3px solid lightblue",
    },
    border: "2px solid black",
    fontFamily: "Ubuntu-Bold",
    fontSize: "15px",
    lineHeight: "1.2",
  },
});

export default Button;
