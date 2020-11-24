import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

const CustomEditor = (props) => (
  <>
    <Editor
      editorState={props.editorState}
      toolbarClassName={css(styles.toolbar)}
      wrapperClassName={css(styles.wrapper)}
      editorClassName={css(styles.editor)}
      onEditorStateChange={props.onEditorStateChange}
    />
  </>
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
    height: "200px",
    padding: "5px 20px",
  },
});

export default CustomEditor;
