import React from "react";
import { css, StyleSheet } from "aphrodite";
import TextArea from "../../components/TextArea";
import CustomRow from "../../components/GridComponents/CustomRow";
import * as MdIcons from "react-icons/md";
import * as configStyles from "../../config/styles";

const Order = (props) => (
  <div className={css(styles.con)}>
    <CustomRow>
      <div
        style={{ width: "8%", marginRight: "2%" }}
        className={css(styles.numCon, styles.noSelect)}
      >
        {props.rowNum + 1}
      </div>
      <div style={{ width: "80%" }}>
        <TextArea
          name={props.name}
          type={"text"}
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
          height={props.height}
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
    height: "50px",
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

export default Order;
