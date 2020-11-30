import React from "react";
import { StyleSheet, css } from "aphrodite";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";
import CustomRow from "../../components/GridComponents/CustomRow";
import * as BsIcons from "react-icons/bs";
import * as configStyles from "../../config/styles";
const Notice = (props) => (
  <div className={css(styles.con)}>
    <CustomRow>
      <div style={{ marginRight: "10px" }}>
        <BsIcons.BsQuestionCircleFill size={18} />
      </div>
      <div style={{ marginTop: "4px" }}>
        <ThirdLabel>{props.children}</ThirdLabel>
      </div>
    </CustomRow>
  </div>
);

const styles = StyleSheet.create({
  con: {
    width: "auto",
    backgroundColor: configStyles.colors.noticeYellow,
    marginBottom: "20px",
    marginLeft: "45px",
    borderRadius: "5px",
    minHeight: "50px",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
});

export default Notice;
