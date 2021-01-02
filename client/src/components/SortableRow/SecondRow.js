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
import { addToQuestionBank } from "../../actions/assessmentQuestion.actions";

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
        {questionType === "Multiple Choice" && (
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
            }}
          />
        )}
        {questionType === "True or False" && (
          <div
            className={css(styles.choiceRow)}
            style={{
              backgroundColor:
                choice === questionAnswers[0] // true or false have only one ans
                  ? configStyles.colors.correctGreen
                  : configStyles.colors.white,
            }}
          >
            {choice.toString()}
          </div>
        )}
        {questionType === "Single Choice" && (
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
            }}
          />
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

//for question.questionType === "Single Choice" and more
// dont use !== 'Description' as it will produce bug

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
                  //   console.log(data);
                  this.props.addToQuestionBank(data);
                }}
              >
                <RiIcons.RiBankFill size={20} className={css(styles.pE)} />
              </TableButton>
              <TableButton>
                <MdIcons.MdModeEdit size={20} className={css(styles.pE)} />
              </TableButton>
              <TableButton>
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

          {question.questionType === "Single Choice" && (
            <SortableItemList
              questionAnswers={question.questionAnswers}
              questionChoices={question.questionChoices}
              questionType={question.questionType}
              sectionIndex={sectionIndex}
              onSortEnd={onSortEnd.bind(this, sectionIndex, current)}
            />
          )}
          {question.questionType === "Multiple Choice" && (
            <SortableItemList
              questionAnswers={question.questionAnswers}
              questionChoices={question.questionChoices}
              questionType={question.questionType}
              sectionIndex={sectionIndex}
              onSortEnd={onSortEnd.bind(this, sectionIndex, current)}
            />
          )}
          {question.questionType === "True or False" && (
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
    padding: 5,
    fontFamily: "Ubuntu-Bold",
    fontSize: "15px",
    marginBottom: "5px",
  },
});

SectionContainer.propTypes = {
  addToQuestionBank: PropTypes.func.isRequired,
  assessmentQuestionReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  assessmentQuestionReducer: state.assessmentQuestionReducer,
});

export default connect(mapStateToProps, {
  addToQuestionBank,
})(SectionContainer);
