import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import CustomInput from "../../components/CustomInput";
import CustomRow from "../../components/GridComponents/CustomRow";
import * as MdIcons from "react-icons/md";
import * as configStyles from "../../config/styles";

const ClickCopy = (props) => (
  <div className={css(styles.con)}>
    <CustomRow>
      <div style={{ width: "90%" }}>
        <CustomInput type="text" value={props.value} readOnly={true} />
      </div>
      <div className={css(styles.button)}>
        <MdIcons.MdContentCopy size={30} onClick={props.onClick} />
      </div>
    </CustomRow>
  </div>
);

const styles = StyleSheet.create({
  con: {
    width: "100%",
  },
  button: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    color: configStyles.colors.black,
    ":active": {
      color: configStyles.colors.lightBlue,
    },
    margin: 10,
  },
});

export default ClickCopy;
