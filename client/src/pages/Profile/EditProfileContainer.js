import React, { Component } from "react";
import Header from "../../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import Title from "../../components/Title";
import CustomLabelTitle from "../../components/ProfileComponents/CustomLabelTitle";
import CustomInput from "../../components/CustomInput";
import "../../css/general.css";
import Dropdown from "../../components/Dropdown";
import GenderData from "./Data/GenderData";
import { GenerateYear } from "./Data/GenerateYear";

class EditProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      gender: null,
      birthYear: null,
      occupation: null,
    };
  }

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
    // console.log(this.state.gender);
    // need to double check again when submit
  };

  onChangeGender = (e) => {
    this.setState({ gender: e.target.value });
    // console.log(this.state.gender);
    // need to double check again when submit
  };

  onChangeBirthYear = (e) => {
    this.setState({ birthYear: e.target.value });
    // console.log(this.state.birthYear);
    // need to double check again when submit
  };

  onChangeOccupation = (e) => {
    this.setState({ occupation: e.target.value });
    // console.log(this.state.birthYear);
    // need to double check again when submit
  };

  handleClick = () => {
    this.props.history.push(`/profile`);
  };

  render() {
    const { username, gender, birthYear, occupation } = this.state;
    // console.log("rerenders");
    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <Title>Update Profile</Title>
              <div className={css(styles.infoCon)}>
                <CustomColumn>
                  <CustomLabelTitle>Username</CustomLabelTitle>
                  <CustomInput
                    name={"username"}
                    type={"text"}
                    placeholder={" Enter your username"}
                    onChangeValue={this.onChangeUsername}
                    value={username}
                  />
                  <br />
                  <CustomLabelTitle>Gender</CustomLabelTitle>
                  <Dropdown
                    options={GenderData}
                    placeholder={"Select your gender"}
                    value={gender}
                    onChangeValue={this.onChangeGender}
                  />
                  <br />
                  <CustomLabelTitle>Year of Birth</CustomLabelTitle>
                  <Dropdown
                    options={GenerateYear()}
                    placeholder={"Select your birth year"}
                    value={birthYear}
                    onChangeValue={this.onChangeBirthYear}
                  />
                  <br />
                  <CustomLabelTitle>Occupation</CustomLabelTitle>
                  <CustomInput
                    name={"occupation"}
                    type={"text"}
                    placeholder={" Enter your occupation"}
                    onChangeValue={this.onChangeOccupation}
                    value={occupation}
                  />
                  <br />
                  <br />
                  <br />
                  <div className={css(styles.buttonCon)}>
                    <Button
                      className={css(styles.button)}
                      onClick={this.handleClick}
                    >
                      Save
                    </Button>
                  </div>
                </CustomColumn>
              </div>
            </CustomColumn>
          </CustomMidContainer>
        </CustomFullContainer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  customMidContainer: {
    paddingLeft: "10px",
  },
  infoCon: {
    width: "auto",
    backgroundColor: "#e0e0e0",
    height: "auto",
    // margin: "50px 40px 40px 40px",
    borderRadius: "5px",
    display: "flex",
    border: "2px solid black",
    padding: "40px",
    boxShadow: "0px 3px 20px 0px grey",
  },
  button: {
    border: "none",
    outline: "none",
    fontFamily: "Ubuntu-Bold",
    backgroundColor: "#060b26",
    color: "white",
    borderRadius: "5px",
    fontSize: "15px",
    textTransform: "uppercase",
    lineHeight: "1.2",
    width: "100px",
  },
  buttonCon: {
    justifyContent: "flex-end",
    display: "flex",
  },
});

export default EditProfileContainer;
