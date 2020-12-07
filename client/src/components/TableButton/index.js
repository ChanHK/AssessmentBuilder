import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

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
      type={props.type ? props.type : "button"}
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
      color: configStyles.colors.lightBlue,
    },
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
