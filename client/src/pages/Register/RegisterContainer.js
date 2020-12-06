import React, { Component } from "react";

import { StyleSheet, css } from "aphrodite";

import CustomTitle from "../../components/FormComponents/CustomTitle";
import CustomSubLabel from "../../components/FormComponents/CustomSubLabel";

import "../../css/general.css";

import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";

import * as configStyles from "../../config/styles";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/auth.actions";

import { isMobile } from "react-device-detect";

class RegisterContainer extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  goToLogin = () => {
    this.props.history.push("/login");
  };

  onSubmit = (e) => {
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    console.log(newUser);
    e.preventDefault();

    if (this.validateForm()) {
      this.props.registerUser(newUser, this.props.history);
    }
  };

  validateForm() {
    //// write validation here

    return true;
  }

  render() {
    const { username, email, password, password2 } = this.state;

    return (
      <div className={css(styles.background)}>
        <div
          className={css(styles.whiteBox)}
          style={{
            width: isMobile
              ? window.innerHeight >= 1024
                ? "500px"
                : "100%"
              : "500px",
          }}
        >
          <form className={css(styles.formStyle)} onSubmit={this.onSubmit}>
            <div style={{ marginTop: "50px" }}>
              <CustomTitle>Sign Up</CustomTitle>
            </div>
            <CustomSubLabel>Username</CustomSubLabel>
            <div style={{ paddingBottom: "25px" }}>
              <CustomInput
                name={"username"}
                type={"text"}
                onChangeValue={this.onChange}
                placeholder={"Enter your username"}
                value={username}
              />
            </div>
            <CustomSubLabel>Email</CustomSubLabel>
            <div style={{ paddingBottom: "25px" }}>
              <CustomInput
                name={"email"}
                type={"text"}
                onChangeValue={this.onChange}
                placeholder={"Enter your email"}
                value={email}
              />
            </div>
            <CustomSubLabel>Password</CustomSubLabel>
            <div style={{ paddingBottom: "25px" }}>
              <CustomInput
                name={"password"}
                type={"password"}
                onChangeValue={this.onChange}
                placeholder={"Enter your password"}
                value={password}
              />
            </div>
            <CustomSubLabel>Reenter password</CustomSubLabel>
            <div style={{ paddingBottom: "25px" }}>
              <CustomInput
                name={"password2"}
                type={"password"}
                onChangeValue={this.onChange}
                placeholder={"Reenter your password"}
                value={password2}
              />
            </div>
            <div style={{ paddingBottom: "25px" }}>
              <Button
                backgroundColor={configStyles.colors.darkBlue}
                color={configStyles.colors.white}
                padding={"8px"}
                width={"100%"}
                type="submit"
              >
                Sign Up
              </Button>
            </div>
            <div className={css(styles.textCon)}>
              <h6
                className={css(styles.text, styles.noSelect)}
                onClick={this.goToLogin}
              >
                Already have an account? Login
              </h6>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: configStyles.colors.lightGrey,
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  whiteBox: {
    backgroundColor: configStyles.colors.white,
    borderRadius: "5px",
    boxShadow: "0 3px 20px 0px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  formStyle: {
    width: "80%",
    height: "70%",
    display: "flex",
    flexDirection: "column",
    margin: "50px 20px",
  },
  text: {
    color: configStyles.colors.black,
    fontFamily: "Ubuntu-Bold",
    cursor: "pointer",
    fontSize: "16px",
    ":hover": {
      color: configStyles.colors.lightBlue,
    },
    ":active": {
      color: configStyles.colors.lightBlue,
      fontSize: "12px",
    },
  },
  textCon: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  noSelect: {
    userSelect:
      "none" /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */,
    webkitTouchCallout: "none" /* iOS Safari */,
    webkitUserSelect: "none" /* Safari */,
    khtmlUserSelect: "none" /* Konqueror HTML */,
    mozUserSelect: "none" /* Old versions of Firefox */,
    msUserSelect: "none" /* Internet Explorer/Edge */,
  },
});

RegisterContainer.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(
  withRouter(RegisterContainer)
);
