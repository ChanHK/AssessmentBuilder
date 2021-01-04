import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";

import CustomSubLabel from "../../components/FormComponents/CustomSubLabel";

import ScrollArrow from "../../components/ScrollArrow";
import CustomEditor from "../../components/CustomEditor";
import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";

// import { EditorState, convertToRaw, ContentState } from "draft-js";
import { EditorState } from "draft-js";
// import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";

class StartingPageContainer extends Component {
  constructor() {
    super();
    this.state = {
      assessmentTitle: "mathematics exam degree year 3",
      instruction: EditorState.createEmpty(),
      name: "",
      email: "",
      accessCode: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const {
      assessmentTitle,
      instruction,
      name,
      email,
      accessCode,
    } = this.state;

    return (
      <>
        <ScrollArrow />
        <CustomFullContainer>
          <CustomMidContainer>
            <form className={css(styles.whiteCon)} onSubmit={this.onSubmit}>
              <CustomColumn>
                <div style={{ flexDirection: "row", marginBottom: "25px" }}>
                  <h4 className={css(styles.text)}>{assessmentTitle}</h4>
                </div>
                <CustomSubLabel>Instructions</CustomSubLabel>
                <div style={{ marginBottom: "25px" }}>
                  <CustomEditor
                    toolbarHidden={true}
                    readOnly={true}
                    heightAuto={true}
                    editorState={instruction}
                  />
                </div>

                <CustomSubLabel>Candidate Name</CustomSubLabel>
                <div style={{ marginBottom: "25px" }}>
                  <CustomInput
                    name={"name"}
                    type={"text"}
                    onChangeValue={this.onChange}
                    placeholder={"Enter your name"}
                    value={name}
                  />
                </div>
                <CustomSubLabel>Candidate Email</CustomSubLabel>
                <div style={{ marginBottom: "25px" }}>
                  <CustomInput
                    name={"email"}
                    type={"text"}
                    onChangeValue={this.onChange}
                    placeholder={"Enter your email"}
                    value={email}
                  />
                </div>
                <CustomSubLabel>Candidate Access Code</CustomSubLabel>
                <div style={{ marginBottom: "25px" }}>
                  <CustomInput
                    name={"accessCode"}
                    type={"text"}
                    onChangeValue={this.onChange}
                    placeholder={"Enter your access code"}
                    value={accessCode}
                  />
                </div>

                <div style={{ marginBottom: "250px" }}>
                  <Button
                    backgroundColor={configStyles.colors.darkBlue}
                    color={configStyles.colors.white}
                    padding={"8px"}
                    width={"100px"}
                    type={"submit"}
                  >
                    Start Test
                  </Button>
                </div>
              </CustomColumn>
            </form>
          </CustomMidContainer>
        </CustomFullContainer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  whiteCon: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "grey",
    marginTop: "100px",
    padding: "0px 20px",
    height: "auto",
  },
  text: {
    flexShrink: 1,
    color: configStyles.colors.black,
    fontSize: "20px",
    fontFamily: "Ubuntu-Bold",
    width: "100%",
    display: "flex",
    height: "auto",
    backgroundColor: "inherit",
  },
});

export default StartingPageContainer;
