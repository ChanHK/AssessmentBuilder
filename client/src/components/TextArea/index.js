import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

const TextArea = (props) => (
  <textarea
    name={props.name}
    className={css(styles.style, styles.hover)}
    type={props.type}
    placeholder={props.placeholder}
    onChange={props.onChange}
    value={props.value}
    autocomplete="off"
    style={{ height: props.height ? props.height : "200px" }}
    readOnly={props.readOnly ? props.readOnly : false}
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
});

export default TextArea;
