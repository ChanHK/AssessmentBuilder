import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";

import SecondLabel from "../../components/LabelComponent/SecondLabel";

import arrayMove from "array-move";

import SortableRow from "../../components/SortableRow";
import Button from "../../components/Button";

import * as configStyles from "../../config/styles";
import CustomRow from "../../components/GridComponents/CustomRow";

import * as MdIcons from "react-icons/md";

class QuestionsContainer extends Component {
  constructor() {
    super();
    this.state = {
      questions: [
        [
          {
            questionType: "Single Choice",
            questionDescriptive:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            questionAns: "A",
            questionChoice: ["B", "C", "A", "D"],
            score: 2,
          },
          {
            questionType: "Multiple Choice",
            questionDescriptive: "adadsadsadsadsaaaaaaaaaaaaa",
            questionAns: ["A", "B"],
            questionChoice: ["B", "C", "A", "D"],
            score: 2,
          },
          // {
          //   questionType: "Descriptive",
          //   questionDescriptive:
          //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id tortor porta, faucibus ante a, lacinia leo. Nullam ullamcorper metus id dapibus euismod. Vivamus fermentum pulvinar metus eu ornare. Sed congue ultricies felis in porta. Nullam gravida malesuada neque sit amet euismod. Nulla vehicula dui massa, eu rutrum tortor porta ut. Nulla eu ex ultrices, interdum ex a, consectetur quam. Etiam velit ipsum, eleifend eget mattis vitae, ullamcorper eget dui. Nam id placerat augue, in egestas mi. Praesent mattis tempus interdum. Quisque in lacus dictum, consectetur quam eu, dapibus justo. Phasellus vitae nulla a orci vestibulum lacinia. Vestibulum placerat ut augue a lobortis. Suspendisse elementum porta quam, ac vehicula augue sodales consectetur. In sit amet tortor ac tortor feugiat tincidunt. Proin sit amet vehicula elit. Quisque aliquet orci a accumsan suscipit. Nulla ipsum mauris, volutpat quis ultrices iaculis, sollicitudin sit amet turpis. Nulla malesuada erat nisi, sed ultricies lorem vehicula accumsan.",
          //   score: 10,
          // },
          // {
          //   questionType: "True or False",
          //   questionDescriptive: "1+1=2",
          //   questionAns: true,
          //   questionChoice: [true, false],
          //   score: 2,
          // },
        ],
        [
          {
            questionType: "Single Choice",
            questionDescriptive:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            questionAns: "A",
            questionChoice: ["B", "C", "A", "D"],
            score: 2,
          },
          // {
          //   questionType: "Multiple Choice",
          //   questionDescriptive: "adadsadsadsadsaaaaaaaaaaaaa",
          //   questionAns: ["A", "B"],
          //   questionChoice: ["B", "C", "A", "D"],
          //   score: 2,
          // },
          // {
          //   questionType: "Single Choice",
          //   questionDescriptive:
          //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          //   questionAns: "A",
          //   questionChoice: ["B", "C", "A", "D"],
          //   score: 2,
          // },
          // {
          //   questionType: "Single Choice",
          //   questionDescriptive:
          //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          //   questionAns: "A",
          //   questionChoice: ["B", "C", "A", "D"],
          //   score: 2,
          // },
        ],
      ],
    };
  }
  onSortEnd(arrayNum, { oldIndex, newIndex }) {
    this.setState({
      questions: [
        ...this.state.questions.slice(0, arrayNum),
        arrayMove(this.state.questions[arrayNum], oldIndex, newIndex),
        ...this.state.questions.slice(arrayNum + 1),
      ],
    });
  }

  onSectionSortEnd(sectionIndex, current, { oldIndex, newIndex }) {
    let currentValue = current === undefined ? 0 : current;
    const question = this.state.questions[currentValue][sectionIndex];

    question.questionChoice = arrayMove(
      question.questionChoice,
      oldIndex,
      newIndex
    );

    this.setState({
      questions: this.state.questions,
    });
  }

  addSection = () => {
    if (this.state.questions.length < 10) {
      this.setState({ questions: this.state.questions.concat(null) });
    }
  };

  deleteSection = (index) => {
    var array = [...this.state.questions];
    array.splice(index, 1);
    this.setState({ questions: array });
  };

  render() {
    const { questions } = this.state;

    for (let i = 0; i < questions.length; i++) {
      if (questions[i] !== null) {
        questions[i].forEach((questions, index) => {
          questions.serial = index + 1;
        });
      }
    }

    return (
      <form>
        <Button
          backgroundColor={configStyles.colors.darkBlue}
          color={configStyles.colors.white}
          padding={"8px"}
          onClick={this.addSection}
        >
          Add Section
        </Button>
        {questions.length > 1 ? (
          <SecondLabel>Section 1</SecondLabel>
        ) : (
          <SecondLabel>Questions</SecondLabel>
        )}
        <hr className={css(styles.hr)} />
        <SortableRow
          questions={questions[0]}
          onSortEnd={this.onSortEnd.bind(this, 0)}
          onSectionSortEnd={this.onSectionSortEnd.bind(this)}
        />
        <div style={{ marginBottom: "25px" }}>
          <CustomRow>
            <div style={{ marginRight: 10 }}>
              <Button
                backgroundColor={configStyles.colors.darkBlue}
                color={configStyles.colors.white}
                padding={"8px"}
              >
                Create Question
              </Button>
            </div>
            <div>
              <Button
                backgroundColor={configStyles.colors.darkBlue}
                color={configStyles.colors.white}
                padding={"8px"}
              >
                Retrieve from Question Bank
              </Button>
            </div>
          </CustomRow>
        </div>

        {questions.slice(1).map((item, index) => {
          return (
            <>
              <CustomRow>
                <div className={css(styles.label)}>
                  <SecondLabel>Section {index + 2}</SecondLabel>
                </div>
                <div
                  className={css(styles.button)}
                  onClick={() => this.deleteSection(index + 1)}
                >
                  <MdIcons.MdDelete size={25} />
                </div>
              </CustomRow>
              <hr className={css(styles.hr)} />
              {item !== null && (
                <SortableRow
                  questions={questions[index + 1]}
                  onSortEnd={this.onSortEnd.bind(this, index + 1)}
                  onSectionSortEnd={this.onSectionSortEnd.bind(this)}
                  current={index + 1}
                />
              )}
              <div style={{ marginBottom: "25px" }}>
                <CustomRow>
                  <div style={{ marginRight: 10 }}>
                    <Button
                      backgroundColor={configStyles.colors.darkBlue}
                      color={configStyles.colors.white}
                      padding={"8px"}
                    >
                      Create Question
                    </Button>
                  </div>
                  <div>
                    <Button
                      backgroundColor={configStyles.colors.darkBlue}
                      color={configStyles.colors.white}
                      padding={"8px"}
                    >
                      Retrieve from Question Bank
                    </Button>
                  </div>
                </CustomRow>
              </div>
            </>
          );
        })}

        <div style={{ height: "500px" }}></div>
      </form>
    );
  }
}

const styles = StyleSheet.create({
  hr: {
    backgroundColor: configStyles.colors.black,
    height: "1px",
  },
  button: {
    color: configStyles.colors.darkBlue,
    cursor: "pointer",
    height: "auto",
    ":active": {
      color: configStyles.colors.red,
    },
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginLeft: "10px",
    width: "10%",
  },
  label: {
    height: "auto",
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
  },
});

export default QuestionsContainer;
