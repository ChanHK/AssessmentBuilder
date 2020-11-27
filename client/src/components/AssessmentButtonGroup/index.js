import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";
import StatusBarWrapper from "../../components/StatusBarComponents/StatusBarWrapper";

const AssessmentButtonGroup = (props) => (
  <StatusBarWrapper first="center">
    <div style={{ marginRight: "20px" }}>
      <button
        type="button"
        className={css(styles.button, styles.noSelect)}
        onClick={props.onClick}
        value={"settings"}
        style={
          props.type === "settings"
            ? { backgroundColor: configStyles.colors.lightGreen }
            : { backgroundColor: configStyles.colors.white }
        }
      >
        <MdIcons.MdSettings size={30} className={css(styles.pE)} />
        Settings
      </button>
    </div>
    <div style={{ marginRight: "20px" }}>
      <button
        type="button"
        className={css(styles.button, styles.noSelect)}
        onClick={props.onClick}
        value={"questions"}
        style={
          props.type === "questions"
            ? { backgroundColor: configStyles.colors.lightGreen }
            : { backgroundColor: configStyles.colors.white }
        }
      >
        <MdIcons.MdQuestionAnswer size={30} className={css(styles.pE)} />
        Questions
      </button>
    </div>
    <div style={{ marginRight: "20px" }}>
      <button
        type="button"
        className={css(styles.button, styles.noSelect)}
        onClick={props.onClick}
        value={"set"}
        style={
          props.type === "set"
            ? { backgroundColor: configStyles.colors.lightGreen }
            : { backgroundColor: configStyles.colors.white }
        }
      >
        <GiIcons.GiFoldedPaper size={30} className={css(styles.pE)} />
        Sets
      </button>
    </div>
    <div style={{ marginRight: "20px" }}>
      <button
        type="button"
        className={css(styles.button, styles.noSelect)}
        onClick={props.onClick}
        value={"access"}
        style={
          props.type === "access"
            ? { backgroundColor: configStyles.colors.lightGreen }
            : { backgroundColor: configStyles.colors.white }
        }
      >
        <MdIcons.MdAccessibility size={30} className={css(styles.pE)} />
        Access
      </button>
    </div>
    <div style={{ marginRight: "20px" }}>
      <button
        type="button"
        className={css(styles.button, styles.noSelect)}
        onClick={props.onClick}
        value={"timer"}
        style={
          props.type === "timer"
            ? { backgroundColor: configStyles.colors.lightGreen }
            : { backgroundColor: configStyles.colors.white }
        }
      >
        <MdIcons.MdAccessTime size={30} className={css(styles.pE)} />
        Timer
      </button>
    </div>
  </StatusBarWrapper>
);

const styles = StyleSheet.create({
  typeBar: {
    backgroundColor: configStyles.colors.lightGrey,
    width: "100%",
    display: "flex",
    height: "auto",
    borderRadius: "5px",
    border: "2px solid",
    borderColror: configStyles.colors.black,
    alignItems: "center",
    padding: 20,
  },
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

export default AssessmentButtonGroup;
