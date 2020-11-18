import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";
import * as IoIcons from "react-icons/io";

const Section = (props) => (
  <div className={css(styles.con)}>
    <CustomColumn>
      <CustomRow>
        <div className={css(styles.topBar)}>
          <div
            className={css(styles.icon, styles.noSelect)}
            style={{ marginRight: "10px" }}
          >
            <IoIcons.IoIosArrowForward size={100} />
          </div>
          <div className={css(styles.label, styles.noSelect)}>
            <ThirdLabel>Section</ThirdLabel>
          </div>
        </div>
      </CustomRow>
      <CustomRow>
        <div className={css(styles.qBar)}>a</div>
      </CustomRow>
    </CustomColumn>
  </div>
);

const styles = StyleSheet.create({
  con: {
    width: "100%",
    borderRadius: "5px",
    border: "2px solid",
    borderColor: configStyles.colors.black,
    display: "flex",
    height: "300px",
    // backgroundColor: "plum",
  },
  topBar: {
    width: "100%",
    height: "50px",
    backgroundColor: configStyles.colors.lightGrey,
    padding: 10,
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    display: "flex",
  },
  icon: {
    color: configStyles.colors.black,
    width: "30px",
    height: "30px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: 4,
  },
  label: {
    textAlign: "center",
    display: "flex",
    height: "30px",
    paddingTop: 4,
  },
  qBar: {
    margin: 10,
    borderRadius: "5px",
    border: "2px solid",
    borderColor: configStyles.colors.black,
    width: "100%",
    height: "100px",
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

export default Section;

//IoIosArrowForward
//IoIosArrowDown
