import React from "react";
import { StyleSheet, css } from "aphrodite";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import * as configStyles from "../../config/styles";

const CustomFormButton = (props) => (
  <Button className={css(styles.style)}>{props.children}</Button>
);

const styles = StyleSheet.create({
  style: {
    marginTop: "40px",
    width: "auto",
    height: "40px",
    border: "none",
    outline: "none",
    fontFamily: "Ubuntu-Bold",
    color: configStyles.colors.white,
    borderRadius: "5px",
    fontSize: "15px",
    textTransform: "uppercase",
    lineHeight: "1.2",
  },
});

export default CustomFormButton;
