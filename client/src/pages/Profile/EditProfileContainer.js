import React, { Component } from "react";
import "../../css/general.css";
import * as configStyles from "../../config/styles";
import { StyleSheet, css } from "aphrodite";

import Header from "../../components/Header";
import Button from "../../components/Button";
import CustomInput from "../../components/CustomInput";
import Dropdown from "../../components/Dropdown";
import Avatar from "../../components/Avatar";
import DragDrop from "../../components/DragDrop";
import UploadButton from "../../components/UploadButton";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";

import GenderData from "./Data/GenderData";
import { GenerateYear } from "./Data/GenerateYear";

// import DragImage from "../../image/profile/drag.png";
import DragImage from "../../image/profile/dummyUser.png";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchUserProfileData,
  updateUserProfileData,
} from "../../actions/profile.actions";

class EditProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      image: DragImage,
      username: "",
      gender: null,
      birthYear: null,
      occupation: "",
      fileRejected: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.props.fetchUserProfileData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { profile } = this.props.profile;

    if (prevProps.profile !== this.props.profile) {
      if (this.props.profile.profile !== null) {
        this.setState(() => ({
          username: profile.username,
          gender: profile.gender,
          birthYear: profile.yearOfBirth,
          occupation: profile.occupation,
          isLoading: this.props.profile.isLoading,
        }));
      }
    }
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

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      gender: this.state.gender,
      yearOfBirth: this.state.birthYear,
      occupation: this.state.occupation,
    };

    this.props.updateUserProfileData(data);
    this.props.history.push("/profile");
  };

  render() {
    const {
      image,
      username,
      gender,
      birthYear,
      occupation,
      fileRejected,
      isLoading,
    } = this.state;
    // console.log(isLoading);
    if (this.props.profile.profile === null) return false;

    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Update Profile</FirstLabel>
              </div>
              <form className={css(styles.infoCon)} onSubmit={this.onSubmit}>
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
                    type={"submit"}
                  >
                    Save
                  </Button>
                </CustomColumn>
              </form>
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

EditProfileContainer.propTypes = {
  fetchUserProfileData: PropTypes.func.isRequired,
  updateUserProfileData: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  fetchUserProfileData,
  updateUserProfileData,
})(EditProfileContainer);
