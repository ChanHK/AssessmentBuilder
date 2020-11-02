import React from "react";
import { StyleSheet, css } from "aphrodite";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";

const CustomLabel = (props) => (
  <Form.Label className={css(styles.style)}>{props.children}</Form.Label>
);

const styles = StyleSheet.create({
  style: {
    textAlign: "center",
    fontSize: "40px",
    fontFamily: "Ubuntu-Bold",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
});

export default CustomLabel;
