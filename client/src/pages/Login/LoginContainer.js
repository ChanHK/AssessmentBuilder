import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import "../../css/general.css";
import CustomTitle from "../../components/FormComponents/CustomTitle";
import CustomForm from "../../components/FormComponents/CustomForm";
import CustomSubLabel from "../../components/FormComponents/CustomSubLabel";

import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";
import * as configStyles from "../../config/styles";

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

  // handleClick = () => {
  //   this.props.history.push(`questionbank/createQuestion`);
  // };

  render() {
    return (
      <div className={css(styles.background)}>
        <div className={css(styles.whiteBox)}>
          <CustomTitle>Login</CustomTitle>
          <CustomForm>
            <CustomSubLabel>Email</CustomSubLabel>
            <div style={{ paddingBottom: "25px" }}>
              <CustomInput
                name={"email"}
                type={"text"}
                onChangeValue={this.onChange}
                placeholder={"Enter your email"}
              />
            </div>
            <CustomSubLabel>Password</CustomSubLabel>
            <CustomInput
              name={"password"}
              type={"password"}
              onChangeValue={this.onChange}
              placeholder={"Enter your password"}
            />
            <div style={{ padding: "25px 0px" }}>
              <Button
                backgroundColor={configStyles.colors.darkBlue}
                color={configStyles.colors.white}
                padding={"8px"}
                width={"100%"}
                onClick={this.handleClick}
              >
                Login
              </Button>
            </div>
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
