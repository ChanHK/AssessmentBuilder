import React from "react";
import { StyleSheet, css } from "aphrodite";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import * as configStyles from "../../config/styles";

// import Button from "../../components/Button";
import TableButton from "../../components/TableButton";

import CustomRow from "../../components/GridComponents/CustomRow";

import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";

import arrayMove from "array-move";

//questionType
// questionDescriptive: "",
//       questionAns: [],
//       questionChoice: [],
// { value: "Single Choice" },
// { value: "Multiple Choice" },
// { value: "Descriptive" },
// { value: "True or False" },
// { value: "Short Answer" },
// { value: "Order" },

const SortableItem = SortableElement(({ value }) => {
  // const onSortEnd = ({ oldIndex, newIndex }) => {
  //   value.questionChoice = arrayMove(value.questionChoice, oldIndex, newIndex);
  // };
  // console.log(value.questionChoice);
  return (
    <div className={css(styles.itemRow)}>
      <div className={css(styles.bar)}>
        <CustomRow>
          <div style={{ width: "90%" }}>
            <ThirdLabel>Question {value.serial}</ThirdLabel>
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
        <ThirdLabel>Question Type: {value.questionType}</ThirdLabel>
        <ThirdLabel>Description</ThirdLabel>
        {value.questionDescriptive}

        {value.questionType === "Single Choice" &&
          value.questionChoice.map((item, index) => {
            return (
              <div
                className={css(styles.choiceRow)}
                style={{
                  backgroundColor:
                    item === value.questionAns
                      ? configStyles.colors.correctGreen
                      : configStyles.colors.white,
                }}
              >
                {item}
              </div>
            );
          })
          // <SortableChoicesRow
          //   items={value.questionChoice}
          //   onSortEnd={onSortEnd}
          // />
        }
      </div>
    </div>
  );
});

const SortableRow = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </ul>
  );
});

// const SortableChoices = SortableElement(({ value, ans }) => (
//   <div
//     className={css(styles.choiceRow)}
//     style={{
//       backgroundColor:
//         value === "A"
//           ? configStyles.colors.correctGreen
//           : configStyles.colors.white,
//     }}
//   >
//     {value}
//   </div>
// ));

// const SortableChoicesRow = SortableContainer(({ items }) => {
//   return (
//     <ul>
//       {items.map((value, index) => (
//         <SortableChoices key={`item-${value}`} index={index} value={value} />
//       ))}
//     </ul>
//   );
// });

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
