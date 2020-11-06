import React from "react";
import { StyleSheet, css } from "aphrodite";

const TextArea = (props) => (
  <textarea
    name={props.name}
    className={css(styles.style, styles.hover)}
    type={props.type}
    placeholder={props.placeholder}
    onChange={props.onChange}
    value={props.value}
    autocomplete="off"
    style={{height: props.height ? props.height : "200px"}}
  />
);

const styles = StyleSheet.create({
  style: {
    width: "100%",
    fontFamily: "Ubuntu-Regular",
    color: "black",
    outline: "none",
    border: "2px solid black",
    backgroundColor: "white",
    fontSize: "15px",
    ":focus": {
      borderColor: "#1a83ff",
    },
    padding: 10,
    borderRadius: "5px",
  },
});

export default TextArea;
