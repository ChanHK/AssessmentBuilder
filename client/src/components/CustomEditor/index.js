import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    var formdata = new FormData();

    formdata.append("file", file);
    formdata.append("cloud_name", "dityuyf5q");
    formdata.append("resource_type", "image");
    formdata.append("upload_preset", "assessmentbuilder");

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://api.cloudinary.com/v1_1/dityuyf5q/image/upload",
      true
    );
    xhr.send(formdata);
    xhr.onload = function () {
      const data = JSON.parse(xhr.responseText);
      const response = { data: { link: data.secure_url } };
      resolve(response);
    };

    xhr.onerror = function () {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    };
  });
}

const CustomEditor = (props) => (
  <Editor
    editorState={props.editorState}
    toolbarClassName={css(styles.toolbar)}
    wrapperClassName={css(styles.wrapper)}
    editorClassName={
      props.heightAuto
        ? css(styles.auto, styles.editor)
        : props.minHeight
        ? css(styles.editor, styles.minheight)
        : css(styles.editor, styles.height)
    }
    toolbar={{
      options: [
        "inline",
        "blockType",
        // "fontSize",
        "fontFamily",
        "list",
        "textAlign",
        "colorPicker",
        // "link",
        // "embedded",
        "emoji",
        "image",
        "remove",
        "history",
      ],
      image: {
        uploadCallback: uploadImageCallBack,
        alt: { present: true, mandatory: false },
        defaultSize: {
          height: "100px",
          width: "100px",
        },
        inputAccept: "image/jpeg,image/jpg,image/png",
        previewImage: true,
      },
    }}
    onEditorStateChange={props.onEditorStateChange}
    toolbarHidden={props.toolbarHidden}
    readOnly={props.readOnly}
    editorStyle={{
      backgroundColor: props.isAnswer
        ? configStyles.colors.correctGreen
        : configStyles.colors.white,
    }}
    handleBeforeInput={props.handleBeforeInput}
    handlePastedText={props.handlePastedText}
  />
);

const styles = StyleSheet.create({
  wrapper: {
    border: "2px solid",
    borderRadius: "5px",
    borderColor: configStyles.colors.black,
  },
  toolbar: {
    borderBottom: "2px solid",
    backgroundColor: configStyles.colors.lightGrey,
  },
  editor: {
    width: "100%",
    padding: "5px 20px",
    borderRadius: "5px",
  },
  minheight: {
    minHeight: "200px",
  },
  height: {
    height: "200px",
  },
  auto: {
    height: "auto",
  },
});

export default CustomEditor;

//https://jpuri.github.io/react-draft-wysiwyg/#/demo
