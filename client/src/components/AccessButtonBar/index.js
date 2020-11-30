import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";
import * as MdIcons from "react-icons/md";
import StatusBarWrapper from "../../components/StatusBarComponents/StatusBarWrapper";

const AccessButtonBar = (props) => (
  <StatusBarWrapper first="flex-start">
    <div style={{ marginRight: "20px" }}>
      <button
        type="button"
        className={css(styles.button, styles.noSelect)}
        onClick={props.onClick}
        value={"public"}
        style={
          props.type === "public"
            ? { backgroundColor: configStyles.colors.lightGreen }
            : { backgroundColor: configStyles.colors.white }
        }
      >
        <MdIcons.MdPublic size={30} className={css(styles.pE)} />
        Public
      </button>
    </div>
    <div style={{ marginRight: "20px" }}>
      <button
        type="button"
        className={css(styles.button, styles.noSelect)}
        onClick={props.onClick}
        value={"private"}
        style={
          props.type === "private"
            ? { backgroundColor: configStyles.colors.lightGreen }
            : { backgroundColor: configStyles.colors.white }
        }
      >
        <MdIcons.MdLock size={30} className={css(styles.pE)} />
        Private
      </button>
    </div>
    <div style={{ marginRight: "20px" }}>
      <button
        type="button"
        className={css(styles.button, styles.noSelect)}
        onClick={props.onClick}
        value={"group"}
        style={
          props.type === "group"
            ? { backgroundColor: configStyles.colors.lightGreen }
            : { backgroundColor: configStyles.colors.white }
        }
      >
        <MdIcons.MdGroupWork size={30} className={css(styles.pE)} />
        Group
      </button>
    </div>
  </StatusBarWrapper>
);

const styles = StyleSheet.create({
  button: {
    width: "150px",
    outline: "none",
    border: "2px solid",
    padding: 10,
    borderRadius: "5px",
    fontFamily: "Ubuntu-Bold",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
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
  pE: {
    pointerEvents: "none",
  },
});

export default AccessButtonBar;
