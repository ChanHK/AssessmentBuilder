import React from "react";
import { css, StyleSheet } from "aphrodite";
import CustomRow from "../../components/GridComponents/CustomRow";
import * as MdIcons from "react-icons/md";
import * as configStyles from "../../config/styles";
import CustomInput from "../../components/CustomInput";

const ShortAns = (props) => (
  <div className={css(styles.con)}>
    <CustomRow>
      <div
        style={{ width: "8%", marginRight: "2%" }}
        className={css(styles.numCon, styles.noSelect)}
      >
        {props.rowNum + 1}
      </div>
      <div style={{ width: "80%" }}>
        <CustomInput
          onChangeValue={props.onChange}
          value={props.value}
          maxLength={props.maxLength}
        />
      </div>
      <div style={{ width: "10%" }} className={css(styles.button)}>
        <MdIcons.MdDelete size={45} onClick={props.onClick} />
      </div>
    </CustomRow>
  </div>
);

const styles = StyleSheet.create({
  con: {
    width: "100%",
    paddingBottom: "25px",
  },
  button: {
    color: configStyles.colors.darkBlue,
    cursor: "pointer",
    height: "50px",
    ":active": {
      color: configStyles.colors.red,
      size: 40,
    },
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  numCon: {
    borderRadius: "5px",
    border: "2px solid",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    fontFamily: "Ubuntu-Bold",
    height: "46px",
    backgroundColor: configStyles.colors.lightGrey,
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

export default ShortAns;
