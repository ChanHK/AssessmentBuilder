import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import "../../css/general.css";
import * as configStyles from "../../config/styles";

import Header from "../../components/Header";
import Button from "../../components/Button";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import StatusBox from "../../components/StatusBarComponents/StatusBox";
import StatusBarWrapper from "../../components/StatusBarComponents/StatusBarWrapper";
import StatusBarImage from "../../components/StatusBarComponents/StatusBarImage";

import profilePic from "../../image/profile/dummyUser.png";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUserProfileData } from "../../actions/profile.actions";

class ProfileContainer extends Component {
  componentDidMount() {
    console.log("componentDidMount");
    this.props.fetchUserProfileData();
  }

  handleClick = () => {
    this.props.history.push(`profile/edit`);
  };

  render() {
    // console.log(this.props.profile.isLoading);
    if (this.props.profile.profile === null) return false;
    const { profile } = this.props.profile;
    console.log(this.props.profile.isLoading);
    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Profile</FirstLabel>
              </div>
              <StatusBarWrapper>
                <StatusBarImage image={profilePic} style={[styles.imgPos]} />
                <StatusBox number={"67"} text={"Assessments Created"} />
                <StatusBox number={"200"} text={"Questions Created"} />
              </StatusBarWrapper>
              <div className={css(styles.infoCon)}>
                <CustomColumn>
                  <div style={{ paddingBottom: "25px" }}>
                    <SecondLabel>Username</SecondLabel>
                    <ThirdLabel>{profile.username}</ThirdLabel>
                  </div>
                  <div style={{ paddingBottom: "25px" }}>
                    <SecondLabel>Email</SecondLabel>
                    <ThirdLabel>{profile.email}</ThirdLabel>
                  </div>
                  <div style={{ paddingBottom: "25px" }}>
                    <SecondLabel>Gender</SecondLabel>
                    <ThirdLabel>
                      {profile.gender === "" ? "Empty" : profile.gender}
                    </ThirdLabel>
                  </div>
                  <div style={{ paddingBottom: "25px" }}>
                    <SecondLabel>Year of Birth</SecondLabel>
                    <ThirdLabel>
                      {profile.yearOfBirth === null
                        ? "Empty"
                        : profile.yearOfBirth}
                    </ThirdLabel>
                  </div>
                  <div style={{ paddingBottom: "25px" }}>
                    <SecondLabel>Occupation</SecondLabel>
                    <ThirdLabel>
                      {profile.occupation === "" ? "Empty" : profile.occupation}
                    </ThirdLabel>
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
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { fetchUserProfileData })(
  ProfileContainer
);
