import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";

import SecondLabel from "../../components/LabelComponent/SecondLabel";

import arrayMove from "array-move";

import SortableRow from "../../components/SortableRow";
import Button from "../../components/Button";

import * as configStyles from "../../config/styles";

class QuestionsContainer extends Component {
  constructor() {
    super();
    this.state = {
      questions: [
        {
          questionType: "Single Choice",
          questionDescriptive:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          questionAns: "A",
          questionChoice: ["B", "C", "A", "D"],
        },
        {
          questionType: "Single Choice",
          questionDescriptive: "adadsadsadsadsaaaaaaaaaaaaa",
          questionAns: "A",
          questionChoice: ["B", "C", "A", "D"],
        },
        {
          questionType: "Single Choice",
          questionDescriptive:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id tortor porta, faucibus ante a, lacinia leo. Nullam ullamcorper metus id dapibus euismod. Vivamus fermentum pulvinar metus eu ornare. Sed congue ultricies felis in porta. Nullam gravida malesuada neque sit amet euismod. Nulla vehicula dui massa, eu rutrum tortor porta ut. Nulla eu ex ultrices, interdum ex a, consectetur quam. Etiam velit ipsum, eleifend eget mattis vitae, ullamcorper eget dui. Nam id placerat augue, in egestas mi. Praesent mattis tempus interdum. Quisque in lacus dictum, consectetur quam eu, dapibus justo. Phasellus vitae nulla a orci vestibulum lacinia. Vestibulum placerat ut augue a lobortis. Suspendisse elementum porta quam, ac vehicula augue sodales consectetur. In sit amet tortor ac tortor feugiat tincidunt. Proin sit amet vehicula elit. Quisque aliquet orci a accumsan suscipit. Nulla ipsum mauris, volutpat quis ultrices iaculis, sollicitudin sit amet turpis. Nulla malesuada erat nisi, sed ultricies lorem vehicula accumsan.",
          questionAns: "A",
          questionChoice: ["B", "C", "A", "D"],
        },
      ],
    };
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ questions }) => ({
      questions: arrayMove(questions, oldIndex, newIndex),
    }));
  };

  render() {
    const { questions } = this.state;
    questions.forEach((questions, index) => {
      questions.serial = index + 1;
    });
    console.log(questions);
    return (
      <form>
        <Button
          backgroundColor={configStyles.colors.darkBlue}
          color={configStyles.colors.white}
          padding={"8px"}
        >
          Add Section
        </Button>
        <SecondLabel>Questions</SecondLabel>
        <hr className={css(styles.hr)} />
        <SortableRow items={questions} onSortEnd={this.onSortEnd} />
        <div style={{ height: "500px" }}></div>
      </form>
    );
  }
}

const styles = StyleSheet.create({
  hr: {
    backgroundColor: configStyles.colors.black,
  },
});

export default QuestionsContainer;
