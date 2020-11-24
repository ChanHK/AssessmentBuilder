import React from "react";
import { StyleSheet, css } from "aphrodite";

const Range = (props) => (
  <div className={css(styles.con)}>
    <div>a</div>
  </div>
);

const styles = StyleSheet.create({
  con: {
    width: "100%",
    backgroundColor: "plum",
  },
});

export default Range;
