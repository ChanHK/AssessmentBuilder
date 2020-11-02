import React from "react";
import { StyleSheet, css } from "aphrodite";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";

const CustomFormControl = (props) => (
  <Form.Control
    name={props.name}
    className={css(styles.style)}
    type={props.type}
    placeholder={props.placeholder}
  />
);

const styles = StyleSheet.create({
  style: {
    border: "1px solid black",
    width: "auto",
    borderRadius: "5px",
    fontFamily: "Ubuntu-Bold",
    paddingLeft: "10px",
    color: "black",
  },
});

export default CustomFormControl;
