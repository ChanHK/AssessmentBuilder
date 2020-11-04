import React, { Component } from "react";
import Header from "../../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import Title from "../../components/Title";
import StatusBox from "../../components/StatusBarComponents/StatusBox";
import StatusBarWrapper from "../../components/StatusBarComponents/StatusBarWrapper";
import StatusBarImage from "../../components/StatusBarComponents/StatusBarImage";
import profile from "../../image/profile/dummyUser.png";
// import StatusBarMessage from "../../components/StatusBarComponents/StatusBarMessage";
import CustomLabelTitle from "../../components/ProfileComponents/CustomLabelTitle";
import CustomLabelInfo from "../../components/ProfileComponents/CustomLabelInfo";

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
              <Title>Profile</Title>
              <StatusBarWrapper>
                <StatusBarImage image={profile} style={[styles.imgPos]} />
                {/* <StatusBarMessage>Sparrow</StatusBarMessage> */}
                <StatusBox number={"67"} text={"Assessments Created"} />
                <StatusBox number={"200"} text={"Questions Created"} />
              </StatusBarWrapper>
              <br />
              <br />
              <br />
              <div className={css(styles.infoCon)}>
                <CustomColumn>
                  <CustomLabelTitle>Username</CustomLabelTitle>
                  <CustomLabelInfo>Captain Jack Sparrow</CustomLabelInfo>
                  <CustomLabelTitle>Email</CustomLabelTitle>
                  <CustomLabelInfo>CaptainJack@gmail.com</CustomLabelInfo>
                  <CustomLabelTitle>Gender</CustomLabelTitle>
                  <CustomLabelInfo>Male</CustomLabelInfo>
                  <CustomLabelTitle>Year of Birth</CustomLabelTitle>
                  <CustomLabelInfo>Empty</CustomLabelInfo>
                  <CustomLabelTitle>Country</CustomLabelTitle>
                  <CustomLabelInfo>Empty</CustomLabelInfo>
                  <CustomLabelTitle>Occupation</CustomLabelTitle>
                  <CustomLabelInfo>Pirate</CustomLabelInfo>
                  <div className={css(styles.buttonCon)}>
                    <Button
                      className={css(styles.button)}
                      onClick={this.handleClick}
                    >
                      Edit
                    </Button>
                  </div>
                </CustomColumn>
              </div>
              <br />
              <br />
              <br />
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
