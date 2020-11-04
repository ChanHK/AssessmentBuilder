import React from "react";
import { StyleSheet, css } from "aphrodite";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";

const CustomSubLabel = (props) => (
  <Form.Label className={css(styles.style)}>{props.children}</Form.Label>
);

const styles = StyleSheet.create({
  style: {
    fontFamily: "Ubuntu-Bold",
    paddingBottom: "10px",
    paddingTop: "10px",
    color: "black",
  },
});

export default CustomSubLabel;
