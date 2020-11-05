import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as CgIcons from "react-icons/cg";

const SearchBar = (props) => (
  <div className={css(styles.container)}>
    <input
      name={props.name}
      className={css(styles.style)}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChangeValue}
      value={props.value}
      autocomplete="off"
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
    border: "2px solid black",
    backgroundColor: "white",
    fontSize: "15px",
    ":focus": {
      borderColor: "#1a83ff",
    },
    padding: 8,
    borderRadius: "5px",
  },
  icon: {
    color: "#060b26",
    width: "auto",
    height: "auto",
    padding: "8px",
    ":active": {
      color: "white",
    },
  },
  button: {
    outline: "none",
    marginLeft: "5px",
    borderRadius: "5px",
    ":active": {
      backgroundColor: "#060b26",
    },
    border: "2px solid black",
  },
});

export default SearchBar;
