import React from "react";
import { StyleSheet, css } from "aphrodite";
import CustomLabel from "../../components/FormComponents/CustomLabel";

const CustomTitle = (props) => (
  <div className={css(styles.container)}>
    <CustomLabel>{props.children}</CustomLabel>
  </div>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "80px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
});

export default CustomTitle;
