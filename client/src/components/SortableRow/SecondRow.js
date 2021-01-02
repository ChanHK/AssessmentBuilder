import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import * as configStyles from "../../config/styles";

import TableButton from "../TableButton";
import CustomRow from "../GridComponents/CustomRow";
import ThirdLabel from "../LabelComponent/ThirdLabel";

import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";

import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addToQuestionBank,
  deleteAssessmentQuestion,
} from "../../actions/assessmentQuestion.actions";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

const SortableItem = SortableElement(
  ({ questionAnswers, choice, questionType, index }) => {
    const contentBlock = htmlToDraft(choice);
    let editorState = "";
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      editorState = EditorState.createWithContent(contentState);
    }
    return (
      <>
        {(questionType === "Multiple Choice" ||
          questionType === "Short Answer") && (
          <div style={{ zIndex: 100 }}>
            <Editor
              editorState={editorState}
              toolbarHidden={true}
              readOnly
              editorStyle={{
                backgroundColor:
                  choice === questionAnswers[0] ||
                  choice === questionAnswers[1] ||
                  choice === questionAnswers[2] ||
                  choice === questionAnswers[3] ||
                  choice === questionAnswers[4] ||
                  choice === questionAnswers[5] ||
                  choice === questionAnswers[6] ||
                  choice === questionAnswers[7]
                    ? configStyles.colors.correctGreen
                    : configStyles.colors.white,
                paddingLeft: "5px",
                marginBottom: "5px",
                borderRadius: "5px",
                border: "2px solid black",
              }}
            />
          </div>
        )}
        {questionType === "True or False" && (
          <div
            className={css(styles.choiceRow)}
            style={{
              backgroundColor:
                choice === questionAnswers[0] // true or false have only one ans
                  ? configStyles.colors.correctGreen
                  : configStyles.colors.white,
              borderRadius: "5px",
              border: "2px solid black",
              zIndex: 100,
            }}
          >
            {choice.toString()}
          </div>
        )}
        {questionType === "Single Choice" && (
          <div style={{ zIndex: 100 }}>
            <Editor
              editorState={editorState}
              toolbarHidden={true}
              readOnly
              editorStyle={{
                backgroundColor:
                  choice === questionAnswers[0] // single ans have only one ans
                    ? configStyles.colors.correctGreen
                    : configStyles.colors.white,
                paddingLeft: "5px",
                marginBottom: "5px",
                borderRadius: "5px",
                border: "2px solid black",
              }}
            />
          </div>
        )}
        {questionType === "Order" && (
          <div style={{ zIndex: 100 }}>
            {questionAnswers.map((item, index) => {
              if (choice === item) {
                return (
                  <div className={css(styles.orderRow)}>
                    <CustomRow>
                      <div className={css(styles.orderCount)}>{index + 1}</div>
                      <div style={{ width: "100%" }}>
                        <Editor
                          editorState={editorState}
                          toolbarHidden={true}
                          readOnly
                          editorStyle={{
                            paddingLeft: "5px",
                            marginBottom: "5px",
                            borderRadius: "5px",
                            border: "2px solid black",
                            backgroundColor: configStyles.colors.white,
                          }}
                        />
                      </div>
                    </CustomRow>
                  </div>
                );
              }
            })}
          </div>
        )}
      </>
    );
  }
);

const SortableItemList = SortableContainer(
  ({ questionAnswers, questionChoices, questionType, disabled }) => (
    <ul>
      {questionChoices.map((choice, index) => {
        return (
          <SortableItem
            key={`item-${choice}`}
            questionAnswers={questionAnswers}
            choice={choice}
            questionType={questionType}
            index={index}
            disabled={disabled}
          />
        );
      })}
    </ul>
  )
);

class SectionContainer extends Component {
  componentWillUnmount() {
    this.props.assessmentQuestionReducer.assessmentQuestionLoad = null;
  }

  render() {
    const {
      question,
      assessmentID,
      sectionIndex,
      current,
      onSortEnd,
    } = this.props;

    const contentBlock = htmlToDraft(question.questionDescription);
    let editorState = "";
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      editorState = EditorState.createWithContent(contentState);
    }

    return (
      <div className={css(styles.itemRow)}>
        <div className={css(styles.bar)}>
          <CustomRow>
            <div style={{ width: "90%" }}>
              <ThirdLabel>Question {question.serial}</ThirdLabel>
            </div>
            <div className={css(styles.buttonCon)}>
              <TableButton
                onClick={() => {
                  const data = {
                    assessmentID: assessmentID,
                    questionID: question._id,
                  };

                  this.props.addToQuestionBank(data);
                }}
              >
                <RiIcons.RiBankFill size={20} className={css(styles.pE)} />
              </TableButton>
              <TableButton
                onClick={() => {
                  this.props.history.push(
                    `/assessment/update_question/${question.section}/${this.props.match.params.type}/edit/${assessmentID}/${question._id}`
                  );
                }}
              >
                <MdIcons.MdModeEdit size={20} className={css(styles.pE)} />
              </TableButton>
              <TableButton
                onClick={() => {
                  const data = {
                    assessmentID: assessmentID,
                    questionID: question._id,
                  };

                  this.props.deleteAssessmentQuestion(data);
                }}
              >
                <MdIcons.MdDelete size={20} className={css(styles.pE)} />
              </TableButton>
            </div>
          </CustomRow>
        </div>
        <div className={css(styles.infoCon)}>
          <ThirdLabel>Question Type: {question.questionType}</ThirdLabel>
          <ThirdLabel>Score: {question.score}</ThirdLabel>
          <ThirdLabel>Description</ThirdLabel>
          {<Editor editorState={editorState} toolbarHidden={true} readOnly />}

          {question.questionType !== "Descriptive" && (
            <SortableItemList
              questionAnswers={question.questionAnswers}
              questionChoices={question.questionChoices}
              questionType={question.questionType}
              sectionIndex={sectionIndex}
              onSortEnd={onSortEnd.bind(this, sectionIndex, current)}
            />
          )}
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  itemRow: {
    backgroundColor: configStyles.colors.white,
    border: "2px solid",
    borderColor: configStyles.colors.black,
    marginBottom: "20px",
    borderRadius: "5px",
  },
  bar: {
    backgroundColor: configStyles.colors.lightGrey,
    padding: 10,
    width: "100%",
    display: "flex",
    alignItems: "center",
    borderTopRightRadius: "5px",
    borderTopLeftRadius: "5px",
  },
  buttonCon: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  pE: {
    pointerEvents: "none",
  },
  infoCon: {
    width: "100%",
    borderBottomRightRadius: "5px",
    borderBottomLeftRadius: "5px",
    padding: 10,
  },
  choiceRow: {
    padding: "15px 5px",
    fontFamily: "Ubuntu-Bold",
    fontSize: "15px",
    marginBottom: "5px",
  },
  orderCount: {
    height: "auto",
    width: "50px",
    borderColor: configStyles.colors.black,
    border: "2px solid",
    borderRadius: "5px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginRight: "10px",
    backgroundColor: configStyles.colors.correctGreen,
    fontFamily: "Ubuntu-Bold",
  },
  orderRow: {
    marginBottom: "10px",
    width: "100%",
    zIndex: 100,
  },
});

SectionContainer.propTypes = {
  addToQuestionBank: PropTypes.func.isRequired,
  assessmentQuestionReducer: PropTypes.object.isRequired,
  deleteAssessmentQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assessmentQuestionReducer: state.assessmentQuestionReducer,
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    addToQuestionBank,
    deleteAssessmentQuestion,
  })
)(SectionContainer);
