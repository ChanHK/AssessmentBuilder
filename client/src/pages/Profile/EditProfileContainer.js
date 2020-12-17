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

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchUserProfileData,
  updateUserProfileData,
} from "../../actions/profile.actions";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

class EditProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      image: "",
      imagePos: "",
      imageScale: 1,
      allowZoomOut: false,
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
          gender: profile.gender === "Empty" ? null : profile.gender,
          birthYear:
            profile.yearOfBirth === "Empty" ? null : profile.yearOfBirth,
          occupation: profile.occupation === "Empty" ? "" : profile.occupation,
          isLoading: this.props.profile.isLoading,
          image: profile.picture,
          imagePos: JSON.parse(profile.imagePos),
          imageScale: parseFloat(profile.imageScale),
        }));
      }
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDrop = (dropped) => {
    this.setState({
      image: dropped[0],
    });
  };

  onDropRejected = () => {
    this.setState({ fileRejected: true });
  };

  onDropAccepted = () => {
    this.setState({ fileRejected: false });
  };

  fileUploadHandler = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };

  handlePositionChange = (position) => {
    this.setState({ imagePos: position });
  };

  handleScale = (e) => {
    this.setState({ imageScale: parseFloat(e.target.value) });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      username,
      gender,
      birthYear,
      occupation,
      image,
      imagePos,
      imageScale,
    } = this.state;

    const gender2 = gender === null ? "Empty" : gender;
    const yearOfBirth = birthYear === null ? "Empty" : birthYear.toString();
    const occupation2 = occupation === "" ? "Empty" : occupation;
    const imagePos2 = JSON.stringify(imagePos);
    const imageScale2 = imageScale.toString();

    const formData = new FormData();
    formData.append("picture", image);
    formData.append("username", username);
    formData.append("gender", gender2);
    formData.append("yearOfBirth", yearOfBirth);
    formData.append("occupation", occupation2);
    formData.append("imagePos", imagePos2);
    formData.append("imageScale", imageScale2);

    this.props.updateUserProfileData(formData);
    console.log("quite con");
    this.props.history.push("/profile");
  };

  render() {
    const {
      image,
      imagePos,
      imageScale,
      allowZoomOut,
      username,
      gender,
      birthYear,
      occupation,
      fileRejected,
    } = this.state;

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
              <form
                className={css(styles.infoCon)}
                onSubmit={this.onSubmit}
                encType="multipart/form-data"
              >
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
                      <Avatar
                        image={image}
                        position={imagePos}
                        onPositionChange={this.handlePositionChange}
                        scale={parseFloat(imageScale)}
                      />
                    </DragDrop>
                    {fileRejected && (
                      <p className={css(styles.p)}>
                        Please select image in jpeg or png format
                      </p>
                    )}
                    <ThirdLabel>Zoom</ThirdLabel>
                    <input
                      name="scale"
                      type="range"
                      onChange={this.handleScale}
                      min={allowZoomOut ? "0.1" : "1"}
                      max="2"
                      step="0.01"
                      defaultValue="1"
                      value={imageScale}
                    />
                    <div style={{ paddingTop: "10px" }}>
                      <UploadButton
                        onChange={this.fileUploadHandler}
                        accept={"image/jpeg,image/png,image/jpg"}
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
                      name={"gender"}
                      options={GenderData}
                      placeholder={"Select your gender"}
                      value={gender}
                      onChangeValue={this.onChange}
                    />
                  </div>

                  <SecondLabel>Year of Birth</SecondLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <Dropdown
                      name={"birthYear"}
                      options={GenerateYear()}
                      placeholder={"Select your birth year"}
                      value={birthYear}
                      onChangeValue={this.onChange}
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
    borderRadius: "5px",
    display: "flex",
    border: "2px solid",
    borderColor: configStyles.colors.black,
    padding: "40px",
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
