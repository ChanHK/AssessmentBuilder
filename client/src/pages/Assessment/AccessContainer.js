import React, { Component } from "react";
import { StyleSheet } from "aphrodite";
import Header from "../../components/Header";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import "../../css/general.css";
// import SecondLabel from "../../components/LabelComponent/SecondLabel";
// import ThirdLabel from "../../components/LabelComponent/ThirdLabel";
import AccessButtonBar from "../../components/AccessButtonBar";

class AccessContainer extends Component {
  constructor() {
    super();
    this.state = {
      accessType: "",
    };
  }

  onGetType = (e) => {
    this.setState({ accessType: e.target.value });
  };

  render() {
    const { accessType } = this.state;
    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Access</FirstLabel>
              </div>
              <AccessButtonBar onClick={this.onGetType} type={accessType} />
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

export default AccessContainer;
