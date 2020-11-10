import React from "react";
import { StyleSheet, css } from "aphrodite";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";
import TextArea from "../../components/TextArea";
import ImageUpload from "../../components/ImageUpload";
import * as configStyles from "../../config/styles";

const ChoiceRow = (props) => (
  <div className={css(styles.row)}>
    <CustomColumn>
      <CustomRow>
        <div className={css(styles.bar)}>
          <div className={css(styles.text)}>Choice {props.count} </div>
          <div className={css(styles.checkBoxCon)}>
            <input
              name="answer"
              type="checkbox"
              className={css(styles.checkBox)}
            />
            <div>Answer</div>
          </div>
        </div>
      </CustomRow>
      <div style={{ padding: "10px" }}>
        <div style={{ paddingBottom: "20px" }}>
          <TextArea name={"description"} type={"text"} height={"75px"} />
        </div>
        <div style={{ paddingBottom: "10px" }}>
          <ImageUpload
            icon={false}
            singleImage={true}
            label={"Max file size: 1mb, accepted: jpg | png"}
            maxFileSize={1048576}
          />
        </div>
      </div>
    </CustomColumn>
  </div>
);

const styles = StyleSheet.create({
  row: {
    width: "100%",
    height: "auto",
    display: "flex",
    border: "2px solid",
    borderColor: configStyles.colors.black,
    ":focus": {
      borderColor: configStyles.colors.lightBlue,
    },
    borderRadius: "5px",
    marginBottom: "50px",
  },
  bar: {
    width: "100%",
    height: "40px",
    backgroundColor: configStyles.colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: "10px",
    fontFamily: "Ubuntu-Bold",
    fontSize: "15px",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
  },
  checkBoxCon: {
    width: "50%",
    height: "40px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text: {
    width: "50%",
    height: "40px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  checkBox: {
    width: "30px",
    height: "26px",
    marginRight: "10px",
  },
});

export default ChoiceRow;
