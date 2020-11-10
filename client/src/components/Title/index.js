import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

const Title = (props) => (
  <div className={css(styles.container)}>
    <Form.Label className={css(styles.text, styles.noSelect)}>
      {props.children}
    </Form.Label>
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
    color: configStyles.colors.black,
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

export default Title;
