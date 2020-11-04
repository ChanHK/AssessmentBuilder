import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";

const CustomLabelTitle = (props) => (
  <Form.Label className={css(styles.text, styles.noSelect)}>{props.children}</Form.Label>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "Ubuntu-Bold",
    color: "black",
    fontSize: "20px",
  },
  noSelect: {
    userSelect:
      "none" /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */,
    webkitTouchCallout: "none" /* iOS Safari */,
    webkitUserSelect: "none" /* Safari */,
    khtmlUserSelect: "none" /* Konqueror HTML */,
    mozUserSelect: "none" /* Old versions of Firefox */,
    msUserSelect: "none" /* Internet Explorer/Edge */,
  },
});

export default CustomLabelTitle;
