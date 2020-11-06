import React from "react";
import { StyleSheet, css } from "aphrodite";

const TabelButton = (props) => (
  <div className={css(styles.buttonCon)}>
    <button
      className={css(styles.button)}
      style={{
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : "inherit",
        color: props.color,
        padding: props.padding,
        width: props.width,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  </div>
);

const styles = StyleSheet.create({
  button: {
    outline: "none",
    marginLeft: "5px",
    borderRadius: "5px",
    ":active": {
      backgroundColor: "#060b26",
      color: "white",
      border: "3px solid lightblue",
    },
    // border: "2px solid black",
    fontFamily: "Ubuntu-Bold",
    fontSize: "15px",
    lineHeight: "1.2",
    border: "none",
  },
  buttonCon: {
    display: "flex",
    paddingRight: "10px",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TabelButton;
