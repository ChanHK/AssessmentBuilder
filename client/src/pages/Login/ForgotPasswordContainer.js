import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import "../../css/general.css";
import * as configStyles from "../../config/styles";

import CustomTitle from "../../components/FormComponents/CustomTitle";
import CustomSubLabel from "../../components/FormComponents/CustomSubLabel";

import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { forgotPassword } from "../../actions/auth.actions";

class ForgotPasswordContainer extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
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

  backToLogin = () => {
    this.props.history.push("/login");
  };

  directToRegister = () => {
    this.props.history.push("/");
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: this.state.email,
    };

    this.props.forgotPassword(data);
  };

  render() {
    const { email, msg, successMsg } = this.state;

    return (
      <div className={css(styles.background)}>
        <div className={css(styles.whiteBox)}>
          {successMsg === null || successMsg === undefined ? (
            <>
              <CustomTitle>Forgot Password</CustomTitle>
              <form className={css(styles.form)} onSubmit={this.onSubmit}>
                <CustomSubLabel>Enter your email here</CustomSubLabel>
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
                    Submit
                  </Button>
                </div>
                <div className={css(styles.textCon)}>
                  <h6
                    className={css(styles.text, styles.noSelect)}
                    onClick={this.backToLogin}
                  >
                    Back to login
                  </h6>
                </div>
              </form>{" "}
            </>
          ) : (
            <>
              <span className={css(styles.redText)}>{successMsg}</span>
              <div
                className={css(styles.textCon)}
                style={{ marginTop: "25px" }}
              >
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
                  onClick={this.backToLogin}
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
    color: configStyles.colors.black,
    fontFamily: "Ubuntu-Regular",
    fontSize: "25px",
  },
  slash: {
    color: configStyles.colors.black,
    fontFamily: "Ubuntu-Bold",
    cursor: "pointer",
    fontSize: "16px",
  },
});

ForgotPasswordContainer.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  sucMsg: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
  sucMsg: state.sucMsg,
});

export default connect(mapStateToProps, { forgotPassword })(
  ForgotPasswordContainer
);
