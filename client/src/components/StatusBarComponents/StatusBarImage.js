import React from "react";
import { StyleSheet, css } from "aphrodite";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image } from "react-bootstrap";
import * as configStyles from "../../config/styles";

const StatusBarImage = (props) => (
  <div className={css(styles.container, props.style, styles.noSelect)}>
    <Image src={props.image} className={css(styles.img)} roundedCircle />
  </div>
);

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: "auto",
    margin: 5,
  },
  img: {
    width: "100px",
    height: "100px",
    display: "flex",
    border: "2px solid",
    borderColor: configStyles.colors.black,
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

export default StatusBarImage;
