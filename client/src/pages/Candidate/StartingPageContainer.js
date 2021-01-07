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
import LoaderSpinner from "../../components/LoaderSpinner";

import { EditorState, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAssessmentInfo } from "../../actions/candidate.actions";

import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

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
    const data = {
      assessmentID: this.props.match.params.assessmentID,
    };

    this.props.fetchAssessmentInfo(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const { candidateReducer } = this.props;

    if (
      prevProps.candidateReducer !== candidateReducer &&
      candidateReducer.assessmentStartInfo !== null
    ) {
      const {
        testName,
        testInstruction,
      } = candidateReducer.assessmentStartInfo;

      let temp = this.convert(testInstruction);

      this.setState({
        assessmentTitle: testName,
        instruction: temp,
      });
    }
  }

  componentWillUnmount() {
    this.props.candidateReducer.assessmentStartInfo = null;
  }

  convert = (data) => {
    const contentBlock = htmlToDraft(data);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return EditorState.createWithContent(contentState);
    }
  };

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

    if (this.props.candidateReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

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

StartingPageContainer.propTypes = {
  fetchAssessmentInfo: PropTypes.func.isRequired,
  candidateReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  candidateReducer: state.candidateReducer,
});

export default connect(mapStateToProps, { fetchAssessmentInfo, logout })(
  StartingPageContainer
);
