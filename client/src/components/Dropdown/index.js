import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

const Dropdown = (props) => {
  return (
    <div className={css(styles.container)}>
      <select
        className={
          props.value === ""
            ? css(styles.select, styles.default)
            : css(styles.select, styles.nondefault)
        }
        style={{ padding: props.padding ? props.padding : "10px" }}
        onChange={props.onChangeValue}
        value={props.value === "" ? undefined : props.value}
        name={props.name}
      >
        <option
          value={"default"}
          disabled
          hidden
          defaultValue={props.value === "" ? true : false}
          key={0}
        >
          {props.placeholder}
        </option>
        {props.options.map((x) => (
          <option
            value={x.value}
            className={css(styles.optionStyle)}
            key={x.key}
          >
            {x.value}
          </option>
        ))}
      </select>
    </div>
  );
};

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
