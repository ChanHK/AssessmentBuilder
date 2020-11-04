import React from "react";
import { StyleSheet, css } from "aphrodite";

const CustomInput = (props) => (
  <input
    name={props.name}
    className={css(
      styles.style,
      styles.input__webkit_autofill,
      styles.input__webkit_autofill_hover,
      styles.input__webkit_autofill_focus_input__webkit_autofill,
      styles.input__webkit_autofill__first_line,
      styles.input__webkit_autofill_active,
      styles.input__webkit_autofill_focus
    )}
    type={props.type}
    placeholder={props.placeholder}
    // autocomplete="off"
  />
);

const styles = StyleSheet.create({
  style: {
    width: "auto",
    fontFamily: "Ubuntu-Regular",
    color: "black",
    outline: "none",
    border: 0,
    borderBottom: "2px solid black",
    backgroundColor: "#e0e0e0",
    fontSize: "15px",
    ":focus": {
      borderColor: "#1a83ff",
    },
  },
  input__webkit_autofill: {
    WebkitTextFillColor: "inherit !important",
    transition: "background-color 5000s ease-in-out 0s",
    fontFamily: '"Ubuntu-Regular"',
    fontSize: "15px !important",
  },
  input__webkit_autofill_hover: {
    WebkitTextFillColor: "inherit !important",
    transition: "background-color 5000s ease-in-out 0s",
    fontFamily: '"Ubuntu-Regular"',
    fontSize: "15px !important",
  },
  input__webkit_autofill_focus_input__webkit_autofill: {
    WebkitTextFillColor: "inherit !important",
    transition: "background-color 5000s ease-in-out 0s",
    fontFamily: '"Ubuntu-Regular"',
    fontSize: "15px !important",
  },
  input__webkit_autofill__first_line: {
    WebkitTextFillColor: "inherit !important",
    transition: "background-color 5000s ease-in-out 0s",
    fontFamily: '"Ubuntu-Regular"',
    fontSize: "15px !important",
  },
  input__webkit_autofill_active: {
    WebkitTextFillColor: "inherit !important",
    transition: "background-color 5000s ease-in-out 0s",
    fontFamily: '"Ubuntu-Regular"',
    fontSize: "15px !important",
  },
  input__webkit_autofill_focus: {
    WebkitTextFillColor: "inherit !important",
    transition: "background-color 5000s ease-in-out 0s",
    fontFamily: '"Ubuntu-Regular"',
    fontSize: "15px !important",
  },
});

export default CustomInput;
