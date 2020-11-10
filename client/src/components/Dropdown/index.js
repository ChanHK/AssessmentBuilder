import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

const Dropdown = (props) => (
  <div className={css(styles.container)}>
    <select
      className={
        props.value === null
          ? css(styles.select, styles.default)
          : css(styles.select, styles.nondefault)
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
    backgroundColor: configStyles.colors.white,
    border: "2px solid",
    borderColor: configStyles.colors.black,
    outline: 0,
    padding: "10px",
    borderRadius: "5px",
    ":focus": {
      borderColor: configStyles.colors.lightBlue,
    },
  },
  default: {
    color: configStyles.colors.placeholderGrey,
  },
  nondefault: {
    color: configStyles.colors.black,
  },
  optionStyle: {
    fontFamily: "Ubuntu-Regular",
    fontSize: "15px",
    color: configStyles.colors.black,
  },
});

export default Dropdown;
