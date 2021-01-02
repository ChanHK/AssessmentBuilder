import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import SectionContainer from "./SecondRow";

const SortableSection = SortableElement(
  ({ question, assessmentID, index, sectionIndex, current, onSortEnd }) => (
    <SectionContainer
      question={question}
      assessmentID={assessmentID}
      index={index}
      sectionIndex={sectionIndex}
      onSortEnd={onSortEnd}
      current={current}
    />
  )
);

const SortableRow = SortableContainer(
  ({ questions, assessmentID, onSectionSortEnd, current }) => {
    return (
      <div>
        {questions.map((question, index) => (
          <SortableSection
            key={`item-${question}-${index}`}
            assessmentID={assessmentID}
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
