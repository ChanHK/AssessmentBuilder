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
    // If logged in and user navigates to Register page, should redirect them to dashboard
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
        <div className={css(styles.whiteBox)}>
          <CustomTitle>Sign Up</CustomTitle>

          <form className={css(styles.form)} onSubmit={this.onSubmit}>
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
            <Button
              backgroundColor={configStyles.colors.darkBlue}
              color={configStyles.colors.white}
              padding={"8px"}
              width={"100%"}
              type="submit"
            >
              Sign Up
            </Button>
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
    width: "50%",
    minHeight: "70%",
    borderRadius: "20px",
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

// export default RegisterContainer;

export default connect(mapStateToProps, { registerUser })(
  withRouter(RegisterContainer)
);
