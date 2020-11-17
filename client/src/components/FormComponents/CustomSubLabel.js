import React from "react";
import { StyleSheet, css } from "aphrodite";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import * as configStyles from "../../config/styles";

const CustomSubLabel = (props) => (
  <Form.Label className={css(styles.style)}>{props.children}</Form.Label>
);

const styles = StyleSheet.create({
  style: {
    fontFamily: "Ubuntu-Bold",
    paddingBottom: "10px",
    paddingTop: "10px",
    color: configStyles.colors.black,
    fontSize: "18px",
  },
});

export default CustomSubLabel;
