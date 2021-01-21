import React from "react";
import { StyleSheet, css } from "aphrodite";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";
import * as configStyles from "../../config/styles";
import * as MdIcons from "react-icons/md";
import CustomEditor from "../../components/CustomEditor";

const ChoiceRow = (props) => {
  return (
    <div className={css(styles.row)}>
      <CustomColumn>
        <CustomRow>
          <div className={css(styles.bar)}>
            <div className={css(styles.text)}>Choice {props.count} </div>
            {props.editorState === "" ? (
              <div className={css(styles.checkBoxCon)}></div>
            ) : (
              <div className={css(styles.checkBoxCon)}>
                <input
                  name="answer"
                  type="checkbox"
                  className={css(styles.checkBox)}
                  value={props.checkedValue}
                  onChange={props.onChangeValue}
                  checked={props.checked}
                />
                <div>Answer</div>
              </div>
            )}
            <div className={css(styles.button)}>
              <MdIcons.MdDelete size={30} onClick={props.onClick} />
            </div>
          </div>
        </CustomRow>
        <div style={{ paddingTop: "10px" }}>
          <div style={{ paddingBottom: "20px" }}>
            <CustomEditor
              onEditorStateChange={props.onChange}
              editorState={props.editorState}
              handleBeforeInput={props.handleBeforeInput}
              handlePastedText={props.handlePastedText}
            />
          </div>
        </div>
      </CustomColumn>
    </div>
  );
};

const styles = StyleSheet.create({
  row: {
    width: "100%",
    height: "auto",
    display: "flex",
    ":focus": {
      borderColor: configStyles.colors.lightBlue,
    },
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
    borderRadius: "5px",
    border: "2px solid",
    borderColor: configStyles.colors.black,
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
    marginLeft: "10px",
  },
});

export default ChoiceRow;
