import React from "react";
import { css, StyleSheet } from "aphrodite";
import TextArea from "../../components/TextArea";
import CustomRow from "../../components/GridComponents/CustomRow";
import * as MdIcons from "react-icons/md";
import * as configStyles from "../../config/styles";

const ShortAns = (props) => (
  <div className={css(styles.con)}>
    <CustomRow>
      <div style={{ width: "90%" }}>
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
      size: 40,
    },
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
});

export default ShortAns;
