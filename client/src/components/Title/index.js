import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";

const Title = (props) => (
  <div className={css(styles.container)}>
    <Form.Label className={css(styles.text)}>{props.children}</Form.Label>
  </div>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    display: "flex",
    height: "30%",
    paddingTop: "60px", //
  },
  text: {
    fontFamily: "Ubuntu-Bold",
    paddingTop: "20px",
    paddingBottom: "20px",
    fontSize: "30px",
    lineHeight: "34px",
    color: "black",
  },
});

export default Title;
