import React, { Component } from "react";
import "../../css/general.css";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";
import Button from "../../components/Button";
import Table from "../../components/Table";
import TableButton from "../../components/TableButton";
import LoaderSpinner from "../../components/LoaderSpinner";
import CustomInput from "../../components/CustomInput";
import ScrollArrow from "../../components/ScrollArrow";

import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import FirstLabel from "../../components/LabelComponent/FirstLabel";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchQuestionData } from "../../actions/question.actions";

import jwt_decode from "jwt-decode";
import { logout } from "../../actions/auth.actions";

class QBSubjectsContainer extends Component {
  constructor() {
    super();
    this.state = {
      new_subject: "",
      search: "",
      totalSubjects: ["Others", "Maths"],
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
    this.props.fetchQuestionData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { questionReducer } = this.props;

    if (
      prevProps.questionReducer !== questionReducer &&
      questionReducer.questionBankData !== null
    ) {
      const { totalSubjects } = questionReducer.questionBankData;
      this.setState({ totalSubjects: totalSubjects });
    }
  }

  componentWillUnmount() {
    this.props.questionReducer.questionBankData = null;
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { new_subject, search, totalSubjects } = this.state;

    if (this.props.questionReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    let data = [];
    totalSubjects.forEach((item, index) => {
      data.push({ sub: item });
    });

    if (search !== "") {
      const lowerCasedSearchText = search.toLowerCase();
      data = data.filter((item) => {
        return item.sub.toLowerCase().indexOf(lowerCasedSearchText) >= 0;
      });
    }

    const column = [
      {
        name: "#",
        selector: "serial",
        cell: (row) => (
          <div>
            <div className={css(styles.tableRow)}>{row.serial}</div>
          </div>
        ),
        width: "50px",
      },
      {
        name: "Subject",
        selector: "sub",
        cell: (row) => (
          <div>
            <div className={css(styles.tableRow)}>{row.sub}</div>
          </div>
        ),
        width: "80%",
      },
      {
        name: "Options",
        selector: "sub",
        cell: (row) => (
          <CustomRow>
            <TableButton>
              <BsIcons.BsFillEyeFill />
            </TableButton>
            <TableButton>
              <MdIcons.MdDelete />
            </TableButton>
          </CustomRow>
        ),
        width: "15%",
      },
    ];

    data.forEach((x, index) => {
      x.serial = index + 1;
    });

    return (
      <>
        <Header />
        <ScrollArrow />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ marginTop: "60px" }}>
                <FirstLabel>Question Bank - Subjects</FirstLabel>
              </div>

              <div style={{ marginBottom: "25px" }}>
                <Wrapper
                  firstHeight={"60px"}
                  secHeight={"120px"}
                  widthChange={1250}
                >
                  <div className={css(styles.block)}>
                    <CustomRow>
                      <CustomInput
                        name={"new_subject"}
                        type={"text"}
                        placeholder={"Enter new subject here"}
                        onChangeValue={this.onChange}
                        value={new_subject}
                      />
                      <div style={{ marginRight: "10px" }}></div>
                      <Button
                        backgroundColor={configStyles.colors.darkBlue}
                        color={configStyles.colors.white}
                        padding={"8px"}
                        width={"100px"}
                        type={"button"}
                      >
                        Add
                      </Button>
                    </CustomRow>
                  </div>
                  <div className={css(styles.block)}>
                    <CustomInput
                      name={"search"}
                      type={"text"}
                      placeholder={"Enter subject here to search"}
                      onChangeValue={this.onChange}
                      value={search}
                    />
                  </div>
                </Wrapper>
              </div>
              <Table data={data} columns={column} />
            </CustomColumn>
          </CustomMidContainer>
        </CustomFullContainer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  customMidContainer: {
    paddingLeft: "10px",
  },
  block: {
    flexWrap: "nowrap",
    width: "400px",
    height: "auto",
  },
  tableRow: {
    fontSize: "15px",
    fontFamily: "Ubuntu-Regular",
  },
});

QBSubjectsContainer.propTypes = {
  fetchQuestionData: PropTypes.func.isRequired,
  questionReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questionReducer: state.questionReducer,
});

export default connect(mapStateToProps, {
  fetchQuestionData,
  logout,
})(QBSubjectsContainer);
