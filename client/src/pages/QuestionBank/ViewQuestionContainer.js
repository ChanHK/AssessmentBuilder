import React, { Component } from "react";

import { StyleSheet, css } from "aphrodite";

import Header from "../../components/Header";
import TextArea from "../../components/TextArea";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import SecondLabel from "../../components/LabelComponent/SecondLabel";

import "../../css/general.css";

class EditQuestionContainer extends Component {
  constructor() {
    super();
    this.state = {
      questionDescriptive: "",
    };
  }

  onChangeDescription = (e) => {
    this.setState({ questionDescriptive: e.target.value });
  };

  render() {
    const { questionDescriptive } = this.state;

    console.log("rendered");
    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>View Question</FirstLabel>
              </div>
              <form onSubmit={this.onSubmit}>
                <CustomColumn>
                  <CustomRow>
                    <div className={css(styles.typeCon)}>
                      <SecondLabel marginRight={"10px"}>
                        Question Type :{" "}
                      </SecondLabel>
                      <ThirdLabel>Single Choice </ThirdLabel>
                    </div>
                  </CustomRow>

                  <SecondLabel>Question Description</SecondLabel>
                  <div style={{ paddingBottom: "25px" }}>
                    <TextArea
                      name={"description"}
                      type={"text"}
                      placeholder={"Enter the description here"}
                      onChange={this.onChangeDescription}
                      value={questionDescriptive}
                    />
                  </div>

                  {/* <input type="submit" value="Submit" /> */}
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
  typeCon: {
    width: "100%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    marginBottom: "25px",
  },
});

export default EditQuestionContainer;
