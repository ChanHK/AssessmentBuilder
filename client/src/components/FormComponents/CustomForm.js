import React from "react";
import { StyleSheet, css } from "aphrodite";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";

const CustomForm = (props) => (
  <Form className={css(styles.style)}>
      {props.children}
  </Form>
);

const styles = StyleSheet.create({
  style: {
    width: "80%",
    height: "70%",
    display: "flex",
    padding: "30px 0px",
    flexDirection: "column",
  },
});

export default CustomForm;