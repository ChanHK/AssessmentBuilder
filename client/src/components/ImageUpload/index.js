import React from "react";
import { StyleSheet, css } from "aphrodite";
import ImageUploader from "react-images-upload";

const ImageUpload = (props) => (
  <ImageUploader
    withIcon
    onChange={props.onChange}
    imgExtension={[".jpg", ".png"]}
    maxFileSize={3145728}
    className={css(styles.upload, styles.noSelect)}
    buttonText={"Choose Images"}
    buttonClassName={css(styles.button)}
    withPreview
    label={"Max file size: 3mb, accepted: jpg | png"}
  />
);

const styles = StyleSheet.create({
  upload: {
    border: "2px solid black",
    ":active": {
      borderColor: "#1a83ff",
    },
    borderRadius: "5px",
    color: "black",
    fontFamily: "Ubuntu-Regular",
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
  button: {
    outline: "none",
    marginLeft: "5px",
    borderRadius: "5px",
    ":active": {
      backgroundColor: "#060b26",
      border: "3px solid lightblue",
    },
    border: "2px solid black",
    fontFamily: "Ubuntu-Bold",
    fontSize: "15px",
    lineHeight: "1.2",
  },
});

export default ImageUpload;
