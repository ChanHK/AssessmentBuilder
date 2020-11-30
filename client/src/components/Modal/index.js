import React from "react";
import { StyleSheet, css } from "aphrodite";

const Modal = (props) => (
  <div
    className={css(styles.modal)}
    onClick={props.onClick}
    style={{ display: props.show ? "flex" : "none" }}
  >
    <div className={css(styles.content)}>{props.children}</div>
  </div>
);

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "rgba(20,20,20,0.9)", //#333333
    zIndex: 10,
    width: "100%",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    overflow: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "65%",
    maxWidth: "640px",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
});

export default Modal;
