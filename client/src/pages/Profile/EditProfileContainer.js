import React, { Component } from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";
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
import ImageUpload from "../../components/ImageUpload";

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
                  <div style={{ paddingBottom: "25px" }}>
                    <CustomLabelTitle>Profile Picture</CustomLabelTitle>
                    <ImageUpload
                      icon={false}
                      singleImage={true}
                      label={"Max file size: 1mb, accepted: jpg | png"}
                      maxFileSize={1048576}
                    />
                  </div>
                  <CustomLabelTitle>Username</CustomLabelTitle>
                  <div style={{ paddingBottom: "25px" }}>
                    <CustomInput
                      name={"username"}
                      type={"text"}
                      placeholder={" Enter your username"}
                      onChangeValue={this.onChangeUsername}
                      value={username}
                    />
                  </div>
                  <CustomLabelTitle>Gender</CustomLabelTitle>
                  <div style={{ paddingBottom: "25px" }}>
                    <Dropdown
                      options={GenderData}
                      placeholder={"Select your gender"}
                      value={gender}
                      onChangeValue={this.onChangeGender}
                    />
                  </div>

                  <CustomLabelTitle>Year of Birth</CustomLabelTitle>
                  <div style={{ paddingBottom: "25px" }}>
                    <Dropdown
                      options={GenerateYear()}
                      placeholder={"Select your birth year"}
                      value={birthYear}
                      onChangeValue={this.onChangeBirthYear}
                    />
                  </div>

                  <CustomLabelTitle>Occupation</CustomLabelTitle>
                  <div style={{ paddingBottom: "75px" }}>
                    <CustomInput
                      name={"occupation"}
                      type={"text"}
                      placeholder={" Enter your occupation"}
                      onChangeValue={this.onChangeOccupation}
                      value={occupation}
                    />
                  </div>
                  <Button
                    backgroundColor={"#060b26"}
                    color={"white"}
                    padding={"8px"}
                    width={"100px"}
                    onClick={this.handleClick}
                  >
                    Save
                  </Button>
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
    paddingBottom: "75px",
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
});

export default EditProfileContainer;
