import React from "react";
import { StyleSheet, css } from "aphrodite";
import ImageUploader from "react-images-uploading";
import * as configStyles from "../../config/styles";

const ImageUpload = (props) => (
  <ImageUploader
    withIcon={props.icon}
    onChange={props.onChange}
    imgExtension={[".jpg", ".png"]}
    maxFileSize={props.maxFileSize ? props.maxFileSize : 3145728}
    className={css(styles.upload, styles.noSelect)}
    buttonText={"Choose Images"}
    buttonClassName={css(styles.button)}
    withPreview
    label={
      props.label ? props.label : "Max file size: 3mb, accepted: jpg | png"
    }
    singleImage={props.singleImage}
    fileContainerStyle={{ boxShadow: "none" }}
  />
);

const styles = StyleSheet.create({
  upload: {
    border: "2px solid",
    borderColor: configStyles.colors.black,
    ":active": {
      borderColor: configStyles.colors.lightBlue,
    },
    borderRadius: "5px",
    color: configStyles.colors.black,
    fontFamily: "Ubuntu-Regular",
    backgroundColor: configStyles.colors.white,
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
      backgroundColor: configStyles.colors.darkBlue,
      border: "3px solid",
      borderColor: configStyles.colors.lightBlue,
    },
    border: "2px solid",
    borderColor: configStyles.colors.black,
    fontFamily: "Ubuntu-Bold",
    fontSize: "15px",
    lineHeight: "1.2",
  },
});

export default ImageUpload;
