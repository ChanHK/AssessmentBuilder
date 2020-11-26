import React from "react";
// import * as configStyles from "../../config/styles";
import { StyleSheet, css } from "aphrodite";

const Radio = (props) => (
  <>
    <input
      type="radio"
      className={css(styles.radio)}
      checked={props.checked}
      onChange={props.onChange}
    />
  </>
);

const styles = StyleSheet.create({
  radio: {
    width: 25,
    height: 25,
  },
});

export default Radio;
