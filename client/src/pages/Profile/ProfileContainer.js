import React, { Component } from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { StyleSheet, css } from "aphrodite";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";
import StatusBox from "../../components/StatusBarComponents/StatusBox";
import StatusBarWrapper from "../../components/StatusBarComponents/StatusBarWrapper";
import StatusBarImage from "../../components/StatusBarComponents/StatusBarImage";
import profile from "../../image/profile/dummyUser.png";
import * as configStyles from "../../config/styles";
import "../../css/general.css";

export default class ProfileContainer extends Component {
  handleClick = () => {
    this.props.history.push(`profile/edit`);
  };

  render() {
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
                <StatusBarImage image={profile} style={[styles.imgPos]} />
                {/* <StatusBarMessage>Sparrow</StatusBarMessage> */}
                <StatusBox number={"67"} text={"Assessments Created"} />
                <StatusBox number={"200"} text={"Questions Created"} />
              </StatusBarWrapper>
              <div className={css(styles.infoCon)}>
                <CustomColumn>
                  <SecondLabel>Username</SecondLabel>
                  <ThirdLabel>Captain Jack Sparrow</ThirdLabel>
                  <SecondLabel>Email</SecondLabel>
                  <ThirdLabel>CaptainJack@gmail.com</ThirdLabel>
                  <SecondLabel>Gender</SecondLabel>
                  <ThirdLabel>Male</ThirdLabel>
                  <SecondLabel>Year of Birth</SecondLabel>
                  <ThirdLabel>Empty</ThirdLabel>
                  {/* <SecondLabel>Country</SecondLabel>
                  <ThirdLabel>Empty</ThirdLabel> 
                  might remove in the future *reason-> takes too much spaces
                  */}
                  <SecondLabel>Occupation</SecondLabel>
                  <ThirdLabel>Pirate</ThirdLabel>
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
    // margin: "50px 40px 40px 40px",
    borderRadius: "5px",
    display: "flex",
    border: "2px solid",
    borderColor: configStyles.colors.black,
    padding: "40px",
    // boxShadow: "0px 3px 20px 0px",
    // boxShadowColor: configStyles.colors.lightGrey,
    margin: "75px 0px",
  },
});
