import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

const StatusBox = (props) => (
  <div className={css(styles.container)}>
    <h6 className={css(styles.num)}>{props.number}</h6>
    <h6 className={css(styles.string)}>{props.text}</h6>
  </div>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: configStyles.colors.white,
    width: "180px",
    height: "90px",
    borderRadius: "5px",
    margin: "10px",
    padding: 10,
  },
  num: {
    justifyContent: "flex-end",
    fontFamily: "Ubuntu-Bold",
    display: "flex",
    fontSize: "25px",
  },
  string: {
    paddingTop: "5px",
    justifyContent: "flex-end",
    fontFamily: "Ubuntu-Bold",
    display: "flex",
    fontSize: "13px",
    textAlign: "end",
  },
});

export default StatusBox;
