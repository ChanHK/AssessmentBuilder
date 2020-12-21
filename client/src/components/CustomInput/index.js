import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

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
      styles.input__webkit_autofill_focus,
      styles.hover
    )}
    type={props.type}
    placeholder={props.placeholder}
    onChange={props.onChangeValue}
    value={props.value}
    // autoComplete="off"
    readOnly={props.readOnly}
    step={props.step}
    maxLength={props.maxLength}
    min={props.min}
    max={props.max}
  />
);

const styles = StyleSheet.create({
  style: {
    width: "100%",
    fontFamily: "Ubuntu-Regular",
    color: configStyles.colors.black,
    outline: "none",
    border: "2px solid",
    borderColor: configStyles.colors.black,
    backgroundColor: configStyles.colors.white,
    fontSize: "15px",
    ":focus": {
      borderColor: configStyles.colors.lightBlue,
    },
    padding: 10,
    borderRadius: "5px",
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
  // hover: {
  //   ":hover": {
  //     border: "2px solid #1a83ff",
  //     padding: "10px 0px",
  //   },
  // },
});

export default CustomInput;
