import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import SectionContainer from "./SecondRow";

const SortableSection = SortableElement(
  ({
    question,
    assessmentID,
    type,
    index,
    sectionIndex,
    current,
    onSortEnd,
  }) => (
    <SectionContainer
      question={question}
      assessmentID={assessmentID}
      type={type}
      index={index}
      sectionIndex={sectionIndex}
      onSortEnd={onSortEnd}
      current={current}
    />
  )
);

const SortableRow = SortableContainer(
  ({ questions, assessmentID, type, onSectionSortEnd, current }) => {
    return (
      <div>
        {questions.map((question, index) => (
          <SortableSection
            key={`item-${question}-${index}`}
            assessmentID={assessmentID}
            type={type}
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

export default SortableRow;
