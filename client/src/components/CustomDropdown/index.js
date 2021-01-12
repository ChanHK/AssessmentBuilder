import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const CustomDropdown = (props) => {
  return (
    <Dropdown
      options={props.options}
      onChange={props.onChange}
      value={props.value}
      placeholder={props.placeholder}
      className={css(styles.className)}
      controlClassName={css(styles.controlClassName)}
      placeholderClassName={css(styles.placeholderClassName)}
      menuClassName={css(styles.menuClassName)}
      disabled={props.disabled}
    />
  );
};

const styles = StyleSheet.create({
  className: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    fontFamily: "Ubuntu-Regular",
    fontSize: "15px",
    backgroundColor: configStyles.colors.white,
    border: "2px solid",
    borderColor: configStyles.colors.black,
    outline: 0,
    borderRadius: "5px",
    cursor: "pointer",
    ":focus": {
      borderColor: configStyles.colors.lightBlue,
    },
  },
  controlClassName: {
    width: "100%",
    fontFamily: "Ubuntu-Regular",
    fontSize: "15px",
    color: configStyles.colors.black,
  },
  menuClassName: {
    width: "100%",
    fontFamily: "Ubuntu-Regular",
    fontSize: "15px",
    color: configStyles.colors.black,
  },
});

export default CustomDropdown;
