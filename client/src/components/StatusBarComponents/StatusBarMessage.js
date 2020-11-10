import React from "react";
import { StyleSheet, css } from "aphrodite";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";

const StatusBarMessage = (props) => (
  <div className={css(styles.container)}>
    <Form.Label className={css(styles.string)}>Welcome {props.children}!</Form.Label>
  </div>
);

const styles = StyleSheet.create({
  container: {
    flexWrap: "nowrap",
    width: "100px",// 200
    height: 46,
    margin: 5,
  },
  string: {
    fontFamily: "Ubuntu-Bold",
    fontSize: "20px",
  },
});

export default StatusBarMessage;