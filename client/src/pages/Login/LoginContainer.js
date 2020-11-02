import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import "../../css/general.css";
import CustomTitle from "../../components/FormComponents/CustomTitle";
import CustomForm from "../../components/FormComponents/CustomForm";
import CustomSubLabel from "../../components/FormComponents/CustomSubLabel";
import CustomFormControl from "../../components/FormComponents/CustomFormControl";
import CustomFormButton from "../../components/FormComponents/CustomFormButton";

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
      <div className={css(styles.background)}>
        <div className={css(styles.whiteBox)}>
          <CustomTitle>Login</CustomTitle>
          <CustomForm>
            <CustomSubLabel>Email</CustomSubLabel>
            <CustomFormControl
              name={"email"}
              type={"text"}
              onChange={this.onChange}
              placeholder={"Enter your email"}
            />
            <br />
            <CustomSubLabel>Password</CustomSubLabel>
            <CustomFormControl
              name={"password"}
              type={"password"}
              onChange={this.onChange}
              placeholder={"Enter your password"}
            />
            <CustomFormButton>Login</CustomFormButton>
          </CustomForm>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#e0e0e0",
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  whiteBox: {
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
});

export default LoginContainer;
