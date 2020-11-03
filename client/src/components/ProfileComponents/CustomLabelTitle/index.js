import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";

const CustomLabelTitle = (props) => (
  <Form.Label className={css(styles.text)}>{props.children}</Form.Label>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "Ubuntu-Bold",
    color: "black",
    fontSize: "20px",
  },
});

export default CustomLabelTitle;
