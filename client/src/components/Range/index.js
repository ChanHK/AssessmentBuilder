import React from "react";
import { StyleSheet, css } from "aphrodite";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";
import CustomInput from "../../components/CustomInput";
import * as MdIcons from "react-icons/md";
import * as configStyles from "../../config/styles";

const Range = (props) => {
  const unit =
    props.unit === "" ? "" : props.unit === "percentage %" ? "%" : "p.";

  return (
    <div className={css(styles.con)}>
      <CustomColumn>
        <ThirdLabel textDecorationLine={"underline"}>
          Range {props.count}
        </ThirdLabel>
        <CustomRow>
          <div className={css(styles.label)}>
            <ThirdLabel fontSize={"15px"}>
              From{" "}
              {props.previous === undefined ? 0 : parseInt(props.previous) + 1}{" "}
              {unit} to
            </ThirdLabel>
          </div>
          <div className={css(styles.inputCon)}>
            <CustomInput
              type={"text"}
              onChangeValue={props.onChange}
              value={props.value}
              readOnly={props.readOnly}
              maxLength={4}
            />
          </div>
          <div className={css(styles.label)}>
            <ThirdLabel fontSize={"15px"}>{unit}</ThirdLabel>
          </div>
          {!props.readOnly && (
            <div style={{ width: "10%" }} className={css(styles.button)}>
              <MdIcons.MdDelete size={35} onClick={props.onClick} />
            </div>
          )}
        </CustomRow>
        <div style={{ width: "200px", padding: "25px 0px" }}>
          <CustomInput
            type={"text"}
            placeholder={"Enter grade here"}
            onChangeValue={props.onChangeValue}
            value={props.gradeValue}
            maxLength={10}
            readOnly={props.readOnly}
          />
        </div>
      </CustomColumn>
    </div>
  );
};

const styles = StyleSheet.create({
  con: {
    width: "100%",
  },
  label: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  inputCon: {
    width: "100px",
    marginLeft: "10px",
    marginRight: "10px",
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
});

export default Range;
