import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";

import "../../css/general.css";

export default class RegisterContainer extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      secpass: "",
    };
  }

  render() {
    return (
      <div className={css(styles.BGContainer)}>
        <div className={css(styles.WhiteBoxContainer)}>
          <div className={css(styles.titleContainer)}>
            <a className={css(styles.title)}>Sign up</a>
          </div>
          <form className={css(styles.formContainer)}>
            <a className={css(styles.subtitle)}>Username</a>
            <input
              className={css(styles.input)}
              type="text"
              // value={this.state.username}
              placeholder="enter your username"
              onchange={(value) => this.setState({ username: value })}
            />
            <br />
            <a className={css(styles.subtitle)}>Email</a>
            <input
              className={css(styles.input)}
              type="text"
              //   value={this.state.email}
              placeholder="enter your email"
            />
            <br />
            <a className={css(styles.subtitle)}>Password</a>
            <input
              className={css(styles.input)}
              type="text"
              //   value={this.state.password}
              placeholder="enter your password"
            />
            <br />
            <a className={css(styles.subtitle)}>Reenter password</a>
            <input
              className={css(styles.input)}
              type="text"
              //   value={this.state.secpass}
              placeholder="reenter your password"
            />
            <button className={css(styles.button)}>Sign up</button>
          </form>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  BGContainer: {
    backgroundColor: "#e0e0e0",
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  WhiteBoxContainer: {
    backgroundColor: "white",
    boxShadow: "0 3px 20px 0px rgba(0, 0, 0, 0.1)",
    width: "50%",
    minHeight: "70%",
    borderRadius: "20px",
    display: "flex",
    padding: "20px",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  titleContainer: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  title: {
    textAlign: "center",
    fontSize: "40px",
    fontFamily: "Ubuntu-Bold",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  formContainer: {
    width: "80%",
    height: "70%",
    display: "flex",
    paddingTop: "30px",
    flexDirection: "column",
    flexDirection: "column",
  },
  subtitle: {
    fontFamily: "Ubuntu-Bold",
    paddingBottom: "10px",
    paddingTop: "10px",
  },
  input: {
    backgroundColor: "#e0e0e0",
    outline: "none",
    border: "none",
    width: "auto",
    height: "20px",
    padding: "10px 0px",
    borderRadius: "5px",
    fontFamily: "Ubuntu-Bold",
    paddingLeft: "10px",
  },
  button: {
    marginTop: "40px",
    width: "auto",
    height: "50px",
    padding: "5px 0px",
    border: "none",
    outline: "none",
    fontFamily: "Ubuntu-Bold",
    backgroundColor: "blueviolet",
    color: "white",
    borderRadius: "5px",
    fontSize: "15px",
    textTransform: "uppercase",
    lineHeight: "1.2",
  },
});
