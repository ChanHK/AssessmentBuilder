import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import Header from "../../components/Header";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import "../../css/general.css";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import TextArea from "../../components/TextArea";

class EditQuestionContainer extends Component {
  constructor() {
    super();
    this.state = {
      questionDescriptive: null,
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
              <FirstLabel>View Question</FirstLabel>
              <form onSubmit={this.onSubmit}>
                <CustomColumn>
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
});

export default EditQuestionContainer;
