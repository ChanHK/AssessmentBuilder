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

const SortableItem = SortableElement(({ questionAns, choice, index }) => {
  return (
    <div
      className={css(styles.choiceRow)}
      style={{
        backgroundColor:
          choice === questionAns
            ? configStyles.colors.correctGreen
            : configStyles.colors.white,
      }}
    >
      {choice}
    </div>
  );
});

const SortableItemList = SortableContainer(
  ({ questionAns, questionChoice, disabled }) => (
    <ul>
      {questionChoice.map((choice, index) => (
        <SortableItem
          key={`item-${choice}`}
          questionAns={questionAns}
          choice={choice}
          index={index}
          disabled={disabled}
        />
      ))}
    </ul>
  )
);

class SectionContainer extends React.Component {
  render() {
    const { question, sectionIndex, onSortEnd } = this.props;
    // console.log(question);
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
          <ThirdLabel>Description</ThirdLabel>
          {question.questionDescriptive}

          {question.questionType === "Single Choice" && (
            <SortableItemList
              questionAns={question.questionAns}
              questionChoice={question.questionChoice}
              sectionIndex={sectionIndex}
              onSortEnd={onSortEnd.bind(this, sectionIndex)}
            />
          )}
        </div>
      </div>
    );
  }
}

const SortableSection = SortableElement(
  ({ question, index, sectionIndex, onSortEnd }) => (
    <SectionContainer
      question={question}
      index={index}
      sectionIndex={sectionIndex}
      onSortEnd={onSortEnd}
    />
  )
);

const SortableRow = SortableContainer(({ questions, onSectionSortEnd }) => {
  return (
    <div>
      {questions.map((question, index) => (
        <SortableSection
          collection="section"
          key={`item-${question}`}
          question={question}
          index={index}
          sectionIndex={index}
          onSortEnd={onSectionSortEnd}
        />
      ))}
    </div>
  );
});

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
  },
});

export default SortableRow;
