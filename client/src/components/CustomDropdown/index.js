import React from "react";
import { StyleSheet, css } from "aphrodite";

const CustomDropdown = (props) => (
  <div className={css(styles.container)}>
    <select
      className={
        props.value === null
          ? css(styles.default, styles.hover)
          : css(styles.select, styles.hover)
      }
      onChange={props.onChangeValue}
      value={props.value}
    >
      <option
        value={"default"}
        disabled
        hidden
        selected={props.value === null ? true : false}
      >
        {props.placeholder}
      </option>
      {props.options.map((x) => (
        <option value={x.value} className={css(styles.optionStyle)}>
          {x.value}
        </option>
      ))}
    </select>
  </div>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100%",
  },
  select: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    fontFamily: "Ubuntu-Regular",
    fontSize: "15px",
    backgroundColor: "inherit !important",
    border: 0,
    outline: 0,
    borderBottom: "2px solid black",
    paddingLeft: 0,
    paddingBottom: "2px",
    color: "black",
  },
  default: {
    color: "grey", //
    fontFamily: "Ubuntu-Regular",
    fontSize: "15px",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    backgroundColor: "inherit !important",
    border: 0,
    outline: 0,
    borderBottom: "2px solid black",
    paddingLeft: 0,
    paddingBottom: "2px",
  },
  hover: {
    // ":hover": {
    //   border: "2px solid #1a83ff",
    //   padding: "10px 0px",
    // },
    ":focus": {
      // padding: "10px 0px",
      borderColor: "#1a83ff",
    },
  },
  optionStyle: {
    fontFamily: "Ubuntu-Regular",
    fontSize: "15px",
    color: "black",
  },
});

export default CustomDropdown;
