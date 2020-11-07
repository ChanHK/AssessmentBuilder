import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import Header from "../../components/Header";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import Title from "../../components/Title";
import "../../css/general.css";

class EditQuestionContainer extends Component {
    render() {
        console.log("rendered");
        return (
          <>
            <Header />
            <CustomFullContainer>
              <CustomMidContainer style={[styles.customMidContainer]}>
                <CustomColumn>
                  <Title>Edit Question</Title>
                  
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
