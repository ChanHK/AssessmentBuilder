import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import "../../css/general.css";
import * as configStyles from "../../config/styles";

import Header from "../../components/Header";
import Button from "../../components/Button";
import LoaderSpinner from "../../components/LoaderSpinner";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import StatusBox from "../../components/StatusBarComponents/StatusBox";
import StatusBarWrapper from "../../components/StatusBarComponents/StatusBarWrapper";
import StatusBarImage from "../../components/StatusBarComponents/StatusBarImage";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUserProfileData } from "../../actions/profile.actions";

import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

class ProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      picture: "",
      imagePosX: 0.5,
      imagePosY: 0.5,
      imageScale: 1,
      username: "",
      email: "",
      gender: null,
      yearOfBirth: null,
      occupation: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);

      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        this.props.logout();
        this.props.history.push("/login");
      }
    }
    this.props.fetchUserProfileData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { profile } = this.props.profile;
    if (
      prevProps.profile !== this.props.profile &&
      this.props.profile.profile !== null &&
      profile.message === undefined
    ) {
      this.setState(() => ({
        picture: profile.image.url,
        imagePosX: parseFloat(profile.image.posX),
        imagePosY: parseFloat(profile.image.posY),
        imageScale: parseFloat(profile.image.scale),
        username: profile.username,
        email: profile.email,
        gender: profile.gender,
        yearOfBirth: profile.yearOfBirth,
        occupation: profile.occupation,
        isLoading: this.props.profile.isLoading,
      }));
    }
  }

  handleClick = () => {
    this.props.history.push(`profile/edit`);
  };

  render() {
    const {
      picture,
      imagePosX,
      imagePosY,
      imageScale,
      username,
      email,
      gender,
      yearOfBirth,
      occupation,
      isLoading,
    } = this.state;

    if (this.props.profile.profile === null) return false;
    let position = { x: 0.5, y: 0.5 };
    position.x = imagePosX;
    position.y = imagePosY;

    return (
      <>
        <Header />
        {isLoading ? (
          <LoaderSpinner />
        ) : (
          (document.body.style.overflow = "unset")
        )}
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Profile</FirstLabel>
              </div>
              <StatusBarWrapper>
                <StatusBarImage
                  image={picture}
                  style={[styles.imgPos]}
                  position={position}
                  scale={imageScale}
                />
                <StatusBox number={"67"} text={"Assessments Created"} />
                <StatusBox number={"200"} text={"Questions Created"} />
              </StatusBarWrapper>
              <div className={css(styles.infoCon)}>
                <CustomColumn>
                  <div style={{ paddingBottom: "25px" }}>
                    <SecondLabel>Username</SecondLabel>
                    <ThirdLabel>{username}</ThirdLabel>
                  </div>
                  <div style={{ paddingBottom: "25px" }}>
                    <SecondLabel>Email</SecondLabel>
                    <ThirdLabel>{email}</ThirdLabel>
                  </div>
                  <div style={{ paddingBottom: "25px" }}>
                    <SecondLabel>Gender</SecondLabel>
                    <ThirdLabel>{gender}</ThirdLabel>
                  </div>
                  <div style={{ paddingBottom: "25px" }}>
                    <SecondLabel>Year of Birth</SecondLabel>
                    <ThirdLabel>{yearOfBirth}</ThirdLabel>
                  </div>
                  <div style={{ paddingBottom: "25px" }}>
                    <SecondLabel>Occupation</SecondLabel>
                    <ThirdLabel>{occupation}</ThirdLabel>
                  </div>

                  <Button
                    backgroundColor={configStyles.colors.darkBlue}
                    color={configStyles.colors.white}
                    padding={"8px"}
                    width={"100px"}
                    onClick={this.handleClick}
                  >
                    Edit
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
  },
  imgPos: {
    float: "left",
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
    margin: "75px 0px",
  },
});

ProfileContainer.propTypes = {
  fetchUserProfileData: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { fetchUserProfileData, logout })(
  ProfileContainer
);
