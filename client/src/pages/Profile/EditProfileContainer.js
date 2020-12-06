import React, { Component } from "react";

import Header from "../../components/Header";
import Button from "../../components/Button";
import CustomInput from "../../components/CustomInput";
import Dropdown from "../../components/Dropdown";
import Avatar from "../../components/Avatar";
import DragDrop from "../../components/DragDrop";
import UploadButton from "../../components/UploadButton";

import { StyleSheet, css } from "aphrodite";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";

import "../../css/general.css";

import GenderData from "./Data/GenderData";
import { GenerateYear } from "./Data/GenerateYear";

import * as configStyles from "../../config/styles";

import DragImage from "../../image/profile/drag.png";

class EditProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      image: DragImage,
      username: "",
      password: "",
      gender: null,
      birthYear: null,
      occupation: "",
      fileRejected: false,
    };
  }
  
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeGender = (e) => {
    this.setState({ gender: e.target.value });
  };

  onChangeBirthYear = (e) => {
    this.setState({ birthYear: e.target.value });
  };

  handleClick = () => {
    this.props.history.push(`/profile`);
  };

  handleDrop = (dropped) => {
    this.setState({ image: dropped[0] });
  };

  onDropRejected = () => {
    this.setState({ fileRejected: true });
  };

  onDropAccepted = () => {
    this.setState({ fileRejected: false });
  };

  fileUploadHandler = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  render() {
    const {
      image,
      username,
      password,
      gender,
      birthYear,
      occupation,
      fileRejected,
    } = this.state;

    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Update Profile</FirstLabel>
              </div>
              <div className={css(styles.infoCon)}>
                <CustomColumn>
                  <div style={{ paddingBottom: "25px" }}>
                    <SecondLabel>Profile Picture</SecondLabel>
                    <DragDrop
                      onDrop={this.handleDrop}
                      accept="image/jpeg,image/png"
                      multiple={false}
                      maxFiles={1}
                      onDropRejected={this.onDropRejected}
                      onDropAccepted={this.onDropAccepted}
                      noClick={true}
                    >
                      <Avatar image={image} />
                    </DragDrop>
                    {fileRejected && (
                      <p className={css(styles.p)}>
                        Please select image in jpeg or png format
                      </p>
                    )}
                    <div style={{ paddingTop: "10px" }}>
                      <UploadButton
                        onChange={this.fileUploadHandler}
                        accept={"image/jpeg,image/png"}
                      />
                    </div>
                  </div>
                  <SecondLabel>Username</SecondLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <CustomInput
                      name={"username"}
                      type={"text"}
                      placeholder={" Enter your username"}
                      onChangeValue={this.onChange}
                      value={username}
                    />
                  </div>
                  <SecondLabel>Password</SecondLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <CustomInput
                      name={"password"}
                      type={"text"}
                      placeholder={" Enter your password"}
                      onChangeValue={this.onChange}
                      value={password}
                    />
                  </div>
                  <SecondLabel>Gender</SecondLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <Dropdown
                      options={GenderData}
                      placeholder={"Select your gender"}
                      value={gender}
                      onChangeValue={this.onChangeGender}
                    />
                  </div>

                  <SecondLabel>Year of Birth</SecondLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <Dropdown
                      options={GenerateYear()}
                      placeholder={"Select your birth year"}
                      value={birthYear}
                      onChangeValue={this.onChangeBirthYear}
                    />
                  </div>

                  <SecondLabel>Occupation</SecondLabel>
                  <div style={{ paddingBottom: "75px" }}>
                    <CustomInput
                      name={"occupation"}
                      type={"text"}
                      placeholder={" Enter your occupation"}
                      onChangeValue={this.onChange}
                      value={occupation}
                    />
                  </div>
                  <Button
                    backgroundColor={configStyles.colors.darkBlue}
                    color={configStyles.colors.white}
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
    backgroundColor: configStyles.colors.lightGrey,
    height: "auto",
    // margin: "50px 40px 40px 40px",
    borderRadius: "5px",
    display: "flex",
    border: "2px solid",
    borderColor: configStyles.colors.black,
    padding: "40px",
    // boxShadow: "0px 3px 20px 0px",
    // boxShadowColor: configStyles.colors.lightGrey,
  },
  p: {
    fontFamily: "Ubuntu-Regular",
    color: "red",
  },
});

export default EditProfileContainer;
