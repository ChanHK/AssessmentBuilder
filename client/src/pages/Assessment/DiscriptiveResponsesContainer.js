import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import Header from "../../components/Header";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import "../../css/general.css";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
// import ThirdLabel from "../../components/LabelComponent/ThirdLabel";
import AccessButtonBar from "../../components/AccessButtonBar";
import * as configStyles from "../../config/styles";
import QRCode from "qrcode.react";
import ClickCopy from "../../components/ClickCopy";

class DiscriptiveResponsesContainer extends Component {
  constructor() {
    super();
    this.state = {
      accessType: "",
      link: "http://abc/abc/abc.com",
      fullPageQR: false,
    };
  }

  onGetType = (e) => {
    this.setState({ accessType: e.target.value });
  };

  render() {
    const { accessType, link, fullPageQR } = this.state;
    console.log(fullPageQR);
    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Discriptive Questions</FirstLabel>
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
});

export default DiscriptiveResponsesContainer;
