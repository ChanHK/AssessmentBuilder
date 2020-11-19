import React from "react";
import { css, StyleSheet } from "aphrodite";
import CustomRow from "../../components/GridComponents/CustomRow";
import * as configStyles from "../../config/styles";

const TrueFalse = (props) => (
  <div className={css(styles.con)}>
    <CustomRow>
      <button
        name={props.name}
        className={
          props.isTrue === "true"
            ? css(styles.button, styles.noSelect, styles.chosen)
            : css(styles.button, styles.noSelect)
        }
        type="button"
        value={true}
        onClick={props.onClick}
      >
        True
      </button>
      <button
        name={props.name}
        className={
          props.isTrue === "false"
            ? css(styles.button, styles.noSelect, styles.chosen)
            : css(styles.button, styles.noSelect)
        }
        type="button"
        value={false}
        onClick={props.onClick}
      >
        False
      </button>
    </CustomRow>
  </div>
);

const styles = StyleSheet.create({
  con: {
    width: "100%",
  },
  button: {
    fontSize: "15px",
    fontFamily: "Ubuntu-Bold",
    outline: "none",
    padding: "8px",
    borderRadius: "5px",
    border: "2px solid",
    borderColor: configStyles.colors.black,
    width: "100px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginRight: "20px",
    cursor: "pointer",
  },
  chosen: {
    backgroundColor: configStyles.colors.lightGreen,
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

export default TrueFalse;
