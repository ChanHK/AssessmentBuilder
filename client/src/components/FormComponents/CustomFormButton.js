import React from "react";
import { StyleSheet, css } from "aphrodite";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

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
    // backgroundColor: "blueviolet",
    color: "white",
    borderRadius: "5px",
    fontSize: "15px",
    textTransform: "uppercase",
    lineHeight: "1.2",
  },
});

export default CustomFormButton;
