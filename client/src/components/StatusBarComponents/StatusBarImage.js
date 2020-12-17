import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";
import AvatarEditor from "react-avatar-editor";

const StatusBarImage = (props) => (
  <div className={css(styles.container, props.style, styles.noSelect)}>
    <AvatarEditor
      image={props.image}
      className={css(styles.img)}
      scale={props.scale}
      position={props.position}
      border={0}
    />
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
    borderRadius: "calc(100px / 2)",
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
