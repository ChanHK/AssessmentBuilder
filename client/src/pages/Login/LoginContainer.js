import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import "../../css/general.css";

class LoginContainer extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className={css(styles.BGContainer)}>
        <div className={css(styles.WhiteBoxContainer)}>
          <div className={css(styles.titleContainer)}>
            <Form.Label className={css(styles.title)}>Login</Form.Label>
          </div>
          <Form className={css(styles.formContainer)}>
            <Form.Label className={css(styles.subtitle)}>Email</Form.Label>
            <Form.Control
              name="email"
              className={css(styles.input)}
              type="text"
              onChange={this.onChange}
              placeholder="Enter your email"
            />
            <br />
            <Form.Label className={css(styles.subtitle)}>Password</Form.Label>
            <Form.Control
              name="password"
              className={css(styles.input)}
              type="text"
              onChange={this.onChange}
              placeholder="Enter your password"
            />
            <Button className={css(styles.button)}>Login</Button>
          </Form>
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
    minHeight: "50%",
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
    padding: "30px 0px",
    flexDirection: "column",
  },
  subtitle: {
    fontFamily: "Ubuntu-Bold",
    paddingBottom: "10px",
    paddingTop: "10px",
  },
  input: {
    // backgroundColor: "#e0e0e0",
    // outline: "none",
    // border: "none",
    border: "1px solid black",
    width: "auto",
    // height: "20px",
    // padding: "10px 0px",
    borderRadius: "5px",
    fontFamily: "Ubuntu-Bold",
    paddingLeft: "10px",
  },
  button: {
    marginTop: "40px",
    width: "auto",
    height: "40px",
    // padding: "5px 0px",
    border: "none",
    outline: "none",
    fontFamily: "Ubuntu-Bold",
    // backgroundColor: "blueviolet",
    color: "white",
    borderRadius: "5px",
    fontSize: "15px",
    textTransform: "uppercase",
    lineHeight: "1.2",
  },
});

export default LoginContainer;
