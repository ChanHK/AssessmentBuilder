import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as CgIcons from "react-icons/cg";
import * as configStyles from "../../config/styles";

const SearchBar = (props) => (
  <div className={css(styles.container)}>
    <input
      name={props.name}
      className={css(styles.style)}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChangeValue}
      value={props.value}
      autoComplete="off"
    />
    <button className={css(styles.button)}>
      <CgIcons.CgSearch className={css(styles.icon)} />
    </button>
  </div>
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
  },
  style: {
    width: "100%",
    fontFamily: "Ubuntu-Regular",
    color: "black",
    outline: "none",
    border: "2px solid",
    borderColor: configStyles.colors.black,
    backgroundColor: configStyles.colors.white,
    fontSize: "15px",
    ":focus": {
      borderColor: configStyles.colors.lightBlue,
    },
    padding: 8,
    borderRadius: "5px",
  },
  icon: {
    color: configStyles.colors.darkBlue,
    width: "auto",
    height: "auto",
    padding: "8px",
    ":active": {
      color: configStyles.colors.white,
    },
  },
  button: {
    outline: "none",
    marginLeft: "5px",
    borderRadius: "5px",
    ":active": {
      backgroundColor: configStyles.colors.darkBlue,
    },
    border: "2px solid",
    borderColor: configStyles.colors.black,
  },
});

export default SearchBar;
