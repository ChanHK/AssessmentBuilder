import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

const CustomLabelInfo = (props) => (
  <Form.Label className={css(styles.text)}>{props.children}</Form.Label>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "Ubuntu-Regular",
    color: configStyles.colors.black,
    fontSize: "20px",
    paddingBottom: "20px",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
});

export default CustomLabelInfo;
