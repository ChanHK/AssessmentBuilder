import React from "react";
import { StyleSheet, css } from "aphrodite";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import * as configStyles from "../../config/styles";

const StatusBox = (props) => (
  <div className={css(styles.container)}>
    <Form.Label className={css(styles.num)}>{props.number}</Form.Label>
    <Form.Label className={css(styles.string)}>{props.text}</Form.Label>
  </div>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: configStyles.colors.white,
    width: "180px",
    height: "90px",
    borderRadius: "10px",
    margin: "10px",
  },
  num: {
    paddingTop: "10px",
    justifyContent: "flex-end",
    fontFamily: "Ubuntu-Bold",
    display: "flex",
    width: "90%",
    fontSize: "25px",
  },
  string: {
    paddingTop: "5px",
    justifyContent: "flex-end",
    fontFamily: "Ubuntu-Bold",
    display: "flex",
    width: "90%",
    fontSize: "13px",
  },
});

export default StatusBox;
