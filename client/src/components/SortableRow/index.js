import React from "react";
import { StyleSheet, css } from "aphrodite";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import * as configStyles from "../../config/styles";

// import Button from "../../components/Button";
import TableButton from "../../components/TableButton";

import CustomRow from "../../components/GridComponents/CustomRow";

// import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";

import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

const SortableItem = SortableElement(
  ({ questionAnswers, choice, questionType, index }) => {
    return (
      <>
        {questionType === "Multiple Choice" && (
          <div
            className={css(styles.choiceRow)}
            style={{
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
            }}
          >
            {choice}
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
            }}
          >
            {choice.toString()}
          </div>
        )}
        {questionType === "Single Choice" && (
          <div
            className={css(styles.choiceRow)}
            style={{
              backgroundColor:
                choice === questionAnswers[0] // single ans have only one ans
                  ? configStyles.colors.correctGreen
                  : configStyles.colors.white,
            }}
          >
            {choice}
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

//for question.questionType === "Single Choice" and more
// dont use !== 'Description' as it will produce bug

class SectionContainer extends React.Component {
  render() {
    const { question, sectionIndex, current, onSortEnd } = this.props;
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
              <TableButton>
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

const SortableSection = SortableElement(
  ({ question, index, sectionIndex, current, onSortEnd }) => (
    <SectionContainer
      question={question}
      index={index}
      sectionIndex={sectionIndex}
      onSortEnd={onSortEnd}
      current={current}
    />
  )
);

const SortableRow = SortableContainer(
  ({ questions, onSectionSortEnd, current }) => {
    return (
      <div>
        {questions.map((question, index) => (
          <SortableSection
            key={`item-${question}-${index}`}
            question={question}
            index={index}
            sectionIndex={index}
            onSortEnd={onSectionSortEnd}
            current={current}
          />
        ))}
      </div>
    );
  }
);

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

export default SortableRow;
