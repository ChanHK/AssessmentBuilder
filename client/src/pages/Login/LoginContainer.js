import React, { Component } from "react";

import { StyleSheet, css } from "aphrodite";

import "../../css/general.css";

import CustomTitle from "../../components/FormComponents/CustomTitle";
import CustomSubLabel from "../../components/FormComponents/CustomSubLabel";

import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";

import * as configStyles from "../../config/styles";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth.actions";

class LoginContainer extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  forgotPassword = () => {
    //
  };

  onSubmit = (e) => {
    console.log(this.state.email, this.state.password);
    e.preventDefault();

    if (this.validateForm()) {
      const userData = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.loginUser(userData);
    }
  };

  validateForm() {
    //// write validation here

    return true;
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className={css(styles.background)}>
        <div className={css(styles.whiteBox)}>
          <CustomTitle>Login</CustomTitle>
          <form className={css(styles.form)} onSubmit={this.onSubmit}>
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
            <CustomInput
              name={"password"}
              type={"password"}
              onChangeValue={this.onChange}
              placeholder={"Enter your password"}
              value={password}
            />
            <div style={{ padding: "25px 0px" }}>
              <Button
                backgroundColor={configStyles.colors.darkBlue}
                color={configStyles.colors.white}
                padding={"8px"}
                width={"100%"}
                type="submit"
              >
                Login
              </Button>
            </div>
            <div className={css(styles.textCon)}>
              <h6
                className={css(styles.text, styles.noSelect)}
                onClick={this.forgotPassword}
              >
                Forgot Password ?
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
    minHeight: "50%",
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

LoginContainer.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(LoginContainer);
