import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import "../../css/general.css";
import * as configStyles from "../../config/styles";

import CustomTitle from "../../components/FormComponents/CustomTitle";
import CustomSubLabel from "../../components/FormComponents/CustomSubLabel";

import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";

import * as IoIcons from "react-icons/io";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/auth.actions";
import { clearErrors } from "../../actions/error.actions";

class ResetPasswordContainer extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      password2: "",
      showPassword: false,
      showPassword2: false,
      msg: null,
      successMsg: null,
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push("/home");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) this.props.history.push("/home");

    if (nextProps.errors) {
      this.setState({
        msg: nextProps.errors.message,
      });
    }

    if (nextProps.sucMsg) {
      this.setState({
        successMsg: nextProps.sucMsg.message.message,
      });
    }
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

  directToRegister = () => {
    this.props.history.push("/");
  };

  directToLogin = () => {
    this.props.history.push("/login");
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      match: { params },
    } = this.props;

    const userData = {
      password: this.state.password,
      password2: this.state.password2,
      resetPasswordLink: params.token,
    };

    this.props.resetPassword(userData);
  };

  render() {
    const {
      password,
      password2,
      showPassword,
      showPassword2,
      msg,
      successMsg,
    } = this.state;

    return (
      <div className={css(styles.background)}>
        <div className={css(styles.whiteBox)}>
          {successMsg === null || successMsg === undefined ? (
            <>
              <CustomTitle>Reset Password</CustomTitle>
              <form className={css(styles.form)} onSubmit={this.onSubmit}>
                <CustomSubLabel>Password</CustomSubLabel>
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

                <div
                  className={css(styles.passWrapper)}
                  style={{ marginTop: "25px" }}
                >
                  <CustomInput
                    name={"password2"}
                    type={showPassword2 ? "text" : "password"}
                    onChangeValue={this.onChange}
                    placeholder={"Enter your password"}
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
                <div style={{ padding: "25px 0px" }}>
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
                    Reset
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <>
              <span className={css(styles.blackText)}>{successMsg}</span>
              <div className={css(styles.textCon)}>
                <h6
                  className={css(styles.text, styles.noSelect)}
                  onClick={this.directToRegister}
                >
                  Register
                </h6>
                <h6 className={css(styles.slash, styles.noSelect)}>
                  &nbsp;/&nbsp;
                </h6>
                <h6
                  className={css(styles.text, styles.noSelect)}
                  onClick={this.directToLogin}
                >
                  Login
                </h6>
              </div>
            </>
          )}
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
    width: "500px",
    borderRadius: "5px",
    display: "flex",
    padding: "20px",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  form: {
    width: "80%",
    height: "70%",
    display: "flex",
    padding: "30px 0px",
    flexDirection: "column",
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
  slash: {
    color: configStyles.colors.black,
    fontFamily: "Ubuntu-Bold",
    cursor: "pointer",
    fontSize: "16px",
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
    top: "23%",
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
  blackText: {
    color: configStyles.colors.black,
    fontFamily: "Ubuntu-Regular",
    fontSize: "25px",
  },
});

ResetPasswordContainer.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  sucMsg: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
  sucMsg: state.sucMsg,
});

export default connect(mapStateToProps, { resetPassword, clearErrors })(
  ResetPasswordContainer
);
