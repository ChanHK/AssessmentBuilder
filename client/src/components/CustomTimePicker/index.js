import React from "react";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import { StyleSheet, css } from "aphrodite";

// const str = showSecond ? "HH:mm:ss" : "HH:mm";

const CustomTimePicker = (props) => (
  <>
    <TimePicker
      showSecond={true}
      disabledHours={props.disabledHours}
      disabledSeconds={props.disabledSeconds}
      onChange={props.onChange}
      // value={props.value}
      className={css(styles.con)}
    />
  </>
);

const styles = StyleSheet.create({
  con: {
    maxWidth: "400px",
    marginLeft: "43px",
    border: "2px solid",
    borderRadius: "5px",
    display: "flex",
  },
});

export default CustomTimePicker;

