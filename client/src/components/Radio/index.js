import React from "react";
import * as configStyles from "../../config/styles";
import { StyleSheet, css } from "aphrodite";

const Radio = (props) => (
  <>
    <input
      type="radio"
      className={css(styles.radio)}
      value={props.value}
      onClick={props.onClick}
      name={props.name}
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
