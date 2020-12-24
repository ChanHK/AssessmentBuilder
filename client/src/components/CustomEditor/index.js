import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

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
    onEditorStateChange={props.onEditorStateChange}
    toolbarHidden={props.toolbarHidden}
    readOnly={props.readOnly}
    key={props.key}
    editorStyle={{
      backgroundColor: props.isAnswer
        ? configStyles.colors.correctGreen
        : configStyles.colors.white,
    }}
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
