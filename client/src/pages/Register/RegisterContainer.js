import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import "../../css/general.css";
import * as configStyles from "../../config/styles";

import CustomTitle from "../../components/FormComponents/CustomTitle";
import CustomSubLabel from "../../components/FormComponents/CustomSubLabel";

import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../actions/auth.actions";

import { isMobile } from "react-device-detect";
import * as IoIcons from "react-icons/io";

import { clearErrors } from "../../actions/error.actions";
import LoaderSpinner from "../../components/LoaderSpinner";

class RegisterContainer extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      showPassword: false,
      showPassword2: false,
      msg: null,
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }

    if (prevProps.errors !== this.props.errors) {
      this.setState({ msg: this.props.errors.message });
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleEye = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  toggleEye2 = () => {
    this.setState({ showPassword2: !this.state.showPassword2 });
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
    // console.log(newUser);
    e.preventDefault();

    this.props.register(newUser);
  };

  render() {
    const {
      username,
      email,
      password,
      password2,
      showPassword,
      showPassword2,
      msg,
    } = this.state;

    if (this.props.auth.isLoading) return <LoaderSpinner />;
    return (
      <div
        className={css(styles.background)}
        style={{
          minHeight: isMobile
            ? window.innerWidth >= 1024
              ? "100vh"
              : "auto"
            : "100vh",
        }}
      >
        <div
          className={css(styles.whiteBox)}
          style={{
            width: isMobile
              ? window.innerWidth >= 1024
                ? "500px"
                : "100%"
              : "500px",
          }}
        >
          <form className={css(styles.formStyle)} onSubmit={this.onSubmit}>
            <div style={{ marginTop: "30px" }}>
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

              <span className={css(styles.redText)}>
                {msg === null
                  ? null
                  : msg.hasOwnProperty("username")
                  ? "*" + msg.username
                  : null}
              </span>
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
              <span className={css(styles.redText)}>
                {msg === null
                  ? null
                  : msg.hasOwnProperty("email")
                  ? "*" + msg.email
                  : null}
              </span>
            </div>
            <CustomSubLabel>Password</CustomSubLabel>
            <div style={{ paddingBottom: "25px" }}>
              <div className={css(styles.passWrapper)}>
                <CustomInput
                  name={"password"}
                  type={showPassword ? "text" : "password"}
                  onChangeValue={this.onChange}
                  placeholder={"Enter your password"}
                  value={password}
                />
                <i className={css(styles.i)} onClick={this.toggleEye}>
                  {showPassword ? (
                    <IoIcons.IoMdEye size={20} />
                  ) : (
                    <IoIcons.IoMdEyeOff size={20} />
                  )}
                </i>
              </div>
              <span className={css(styles.redText)}>
                {msg === null
                  ? null
                  : msg.hasOwnProperty("password")
                  ? "*" + msg.password
                  : null}
              </span>
            </div>
            <CustomSubLabel>Confirm password</CustomSubLabel>
            <div style={{ paddingBottom: "25px" }}>
              <div className={css(styles.passWrapper)}>
                <CustomInput
                  name={"password2"}
                  type={showPassword2 ? "text" : "password"}
                  onChangeValue={this.onChange}
                  placeholder={"Reenter your password"}
                  value={password2}
                />
                <i className={css(styles.i)} onClick={this.toggleEye2}>
                  {showPassword2 ? (
                    <IoIcons.IoMdEye size={20} />
                  ) : (
                    <IoIcons.IoMdEyeOff size={20} />
                  )}
                </i>
              </div>
              <span className={css(styles.redText)}>
                {msg === null
                  ? null
                  : msg.hasOwnProperty("password2")
                  ? "*" + msg.password2
                  : null}
              </span>
            </div>
            <div style={{ paddingBottom: "25px" }}>
              <span className={css(styles.redText)}>
                {msg === null
                  ? null
                  : msg.hasOwnProperty("message")
                  ? "*" + msg.message
                  : null}
              </span>
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
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    // minHeight: "-webkit-fill-available",
  },
  whiteBox: {
    backgroundColor: configStyles.colors.white,
    borderRadius: "5px",
    boxShadow: "0 3px 20px 0px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    height: "auto",
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
  passWrapper: {
    position: "relative",
    display: "flex",
  },
  i: {
    position: "absolute",
    top: "14%",
    right: "5%",
    ":hover": {
      color: configStyles.colors.lightBlue,
    },
    cursor: "pointer",
  },
  redText: {
    color: configStyles.colors.inputErrorRed,
    fontFamily: "Ubuntu-Regular",
    fontSize: "15px",
  },
});

RegisterContainer.propTypes = {
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { register, clearErrors })(
  withRouter(RegisterContainer)
);
