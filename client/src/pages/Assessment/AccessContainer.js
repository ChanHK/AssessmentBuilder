import React, { Component } from "react";
import "../../css/general.css";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import QRCode from "qrcode.react";
import { ExcelRenderer } from "react-excel-renderer";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";
import Number from "./Data/Number";

import Modal from "../../components/Modal";
import Radio from "../../components/Radio";
import Button from "../../components/Button";
import Notice from "../../components/Notice";
import CustomDropdown from "../../components/CustomDropdown";
import UploadButton from "../../components/UploadButton";
import Table from "../../components/Table";
import CustomInput from "../../components/CustomInput";
import TableButton from "../../components/TableButton";
import ClickCopy from "../../components/ClickCopy";
import Wrapper from "../../components/Wrapper";
import LoaderSpinner from "../../components/LoaderSpinner";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateAssessmentAccess,
  fetchAssessmentAccess,
} from "../../actions/assessment.actions";

class AccessContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: `http://localhost:3000/assessment/start/${props.assessmentID}`,

      showModal: false, // display enlarged QR code
      noAuthenticationSelected: true,
      withAuthenticationSelected: false,
      attemptNum: 1,

      errorMessage: null,
      rows: [], //example * should be empty

      newEmail: "", //for user to enter new email to the table
      assessmentID: props.assessmentID,
      type: props.type,
      msg: null, //stores error messages
    };
  }

  componentDidMount() {
    const data = {
      assessmentID: this.state.assessmentID,
    };

    this.props.fetchAssessmentAccess(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const { assessmentReducer } = this.props;

    if (
      prevProps.assessmentReducer !== assessmentReducer &&
      assessmentReducer.assessmentLoad !== null &&
      assessmentReducer.message === undefined
    ) {
      const {
        link,
        noAuthenticationSelected,
        withAuthenticationSelected,
        attemptNum,
        accessEmail,
      } = assessmentReducer.assessmentLoad;

      let rows = [];

      for (let i = 0; i < accessEmail.length; i++) {
        rows.push({
          email: accessEmail[i],
          id: uuidv4(),
        });
      }

      this.setState({
        link: link === "" ? this.state.link : link,
        noAuthenticationSelected: noAuthenticationSelected,
        withAuthenticationSelected: withAuthenticationSelected,
        attemptNum: attemptNum,
        rows: rows,
      });
    }
  }

  componentWillUnmount() {
    this.props.assessmentReducer.assessmentLoad = null;
  }

  modalHandler = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  noAuthenticationOnClick = (e) => {
    if (this.state.type !== "view") {
      this.setState({
        noAuthenticationSelected: e.target.checked,
        withAuthenticationSelected: false,
      });
    }
  };

  withAuthenticationOnClick = (e) => {
    if (this.state.type !== "view") {
      this.setState({
        withAuthenticationSelected: e.target.checked,
        noAuthenticationSelected: false,
      });
    }
  };

  fileUploadHandler = (e) => {
    let fileObj = e.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];

        resp.rows.slice(1).forEach((item, index) => {
          if (item && item !== "undefined") {
            newRows.push({
              email: item[0],
              id: uuidv4(),
            });
          }
        });

        if (newRows.length === 0) {
          this.setState({
            errorMessage: "No data found in file!",
          });
          return false;
        } else {
          this.setState({
            rows: this.state.rows.concat(newRows),
            errorMessage: null,
          });
        }
      }
    });
  };

  onChangeEmail = (e) => {
    this.setState({ newEmail: e.target.value });
    e.preventDefault();
  };

  validateEmail = () => {
    let tempMsg = {};

    if (!validator.isEmail(this.state.newEmail)) {
      tempMsg.email = "Please enter valid email";
    }

    this.setState({ msg: tempMsg });
    if (Object.keys(tempMsg).length === 0) this.addEmail();
  };

  addEmail = () => {
    let newRows = [];
    if (this.state.newEmail !== "") {
      newRows.push({
        email: this.state.newEmail,
        id: uuidv4(),
      });
      this.setState({
        rows: this.state.rows.concat(newRows),
        newEmail: "",
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      link,
      noAuthenticationSelected,
      withAuthenticationSelected,
      attemptNum,
      rows,
      assessmentID,
    } = this.state;

    let accessEmail = [];

    rows.forEach((item, index) => {
      accessEmail.push(item.email);
    });

    const data = {
      link: link,
      noAuthenticationSelected: noAuthenticationSelected,
      withAuthenticationSelected: withAuthenticationSelected,
      attemptNum: attemptNum,
      accessEmail: accessEmail,
      assessmentID: assessmentID,
    };

    this.props.updateAssessmentAccess(data);
  };

  render() {
    const {
      link,
      showModal,
      noAuthenticationSelected,
      withAuthenticationSelected,
      attemptNum,
      rows,
      newEmail,
      type,
      msg,
    } = this.state;

    const column = [
      {
        name: "#",
        selector: "serial",
        cell: (row) => (
          <div>
            <div style={{ fontSize: "15px", fontFamily: "Ubuntu-Regular" }}>
              {row.serial}
            </div>
          </div>
        ),
        width: "50px",
      },
      {
        name: "Email",
        selector: "email",
        cell: (row) => (
          <div>
            <div
              style={{
                fontSize: "15px",
                fontFamily: "Ubuntu-Regular",
              }}
            >
              {row.email}
            </div>
          </div>
        ),
        width: "80%",
      },
      {
        name: "Action",
        selector: "id",
        cell: (row) => (
          <CustomRow>
            {type !== "view" && (
              <TableButton
                onClick={() => {
                  rows.forEach((item, index) => {
                    if (row.id === item.id) {
                      rows.splice(index, 1);
                      this.setState({ rows: this.state.rows });
                    }
                  });
                }}
              >
                Delete
              </TableButton>
            )}
          </CustomRow>
        ),
      },
    ];

    rows.forEach((rows, index) => {
      rows.serial = index + 1;
    });

    if (this.props.assessmentReducer.isLoading) return <LoaderSpinner />;
    else document.body.style.overflow = "unset";

    return (
      <form onSubmit={this.onSubmit} style={{ marginBottom: "300px" }}>
        <CustomColumn>
          <SecondLabel>URL</SecondLabel>
          <ClickCopy
            value={link}
            onClick={() => {
              navigator.clipboard.writeText(link);
            }}
          />
          <div style={{ padding: "25px 0px" }}>
            <SecondLabel>QR Code</SecondLabel>
            <QRCode
              id="123456"
              value={link} // the link
              level={"H"}
              includeMargin
              className={css(styles.qr)}
              onClick={this.modalHandler}
              size={260}
            />
          </div>
          <Modal show={showModal}>
            <QRCode
              id="123456"
              value={link} // the link
              level={"H"}
              includeMargin
              className={css(styles.modal)}
              onClick={this.modalHandler}
              size={600}
            />
          </Modal>

          <SecondLabel>Authentication Methods</SecondLabel>

          <div className={css(styles.bar)}>
            <CustomRow>
              <div className={css(styles.radionCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Radio
                    checked={noAuthenticationSelected}
                    onChange={this.noAuthenticationOnClick}
                  />
                </div>
                <ThirdLabel>No authentication</ThirdLabel>
              </div>
            </CustomRow>
            {noAuthenticationSelected && (
              <Notice>
                Everyone with the link can attempt this assessment
              </Notice>
            )}
            <CustomRow>
              <div className={css(styles.radionCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Radio
                    checked={withAuthenticationSelected}
                    onChange={this.withAuthenticationOnClick}
                  />
                </div>
                <ThirdLabel>With authentication</ThirdLabel>
              </div>
            </CustomRow>
            {withAuthenticationSelected && (
              <Notice>
                The system will check the candidates' email is eligible for the
                assessment or not
              </Notice>
            )}
          </div>

          {withAuthenticationSelected && (
            <>
              {type !== "view" && (
                <Wrapper
                  firstHeight={"60px"}
                  secHeight={"120px"}
                  widthChange={1425}
                >
                  <div className={css(styles.block)}>
                    <CustomColumn>
                      <CustomRow>
                        <CustomInput
                          type={"text"}
                          placeholder={"Enter new email"}
                          onChangeValue={this.onChangeEmail}
                          value={newEmail}
                        />

                        <div style={{ marginRight: "10px" }}></div>
                        <Button
                          backgroundColor={configStyles.colors.darkBlue}
                          color={configStyles.colors.white}
                          padding={"8px"}
                          width={"100px"}
                          onClick={this.validateEmail}
                        >
                          Add
                        </Button>
                      </CustomRow>
                      <span className={css(styles.redText)}>
                        {msg === null
                          ? null
                          : msg.hasOwnProperty("email")
                          ? "*" + msg.email
                          : null}
                      </span>
                    </CustomColumn>
                  </div>
                  <div className={css(styles.block)}>
                    <UploadButton
                      onChange={this.fileUploadHandler}
                      accept={
                        ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      }
                    />
                  </div>
                </Wrapper>
              )}

              <div style={{ marginTop: 20 }}>
                <Table data={rows} columns={column} />
              </div>
            </>
          )}

          <div style={{ paddingTop: "25px" }}>
            <SecondLabel>Number of attempts</SecondLabel>
            <div style={{ height: "auto" }}>
              <CustomDropdown
                options={Number}
                placeholder={"Select number"}
                value={attemptNum}
                onChange={(e) => this.setState({ attemptNum: e.value })}
                disabled={type === "view" ? true : false}
              />
            </div>
          </div>

          {type !== "view" && (
            <div style={{ paddingTop: "25px" }}>
              <Button
                backgroundColor={configStyles.colors.darkBlue}
                color={configStyles.colors.white}
                padding={"8px"}
                width={"100px"}
                type={"submit"}
              >
                Save
              </Button>
            </div>
          )}
        </CustomColumn>
      </form>
    );
  }
}

const styles = StyleSheet.create({
  qr: {
    borderRadius: "5px",
    border: "2px solid",
    borderColor: configStyles.colors.black,
    height: "auto",
    display: "flex",
    cursor: "pointer",
  },
  modal: {
    width: "100%",
    height: "auto",
    border: "none",
    borderRadius: "5px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  bar: {
    width: "100%",
    padding: "20px 20px",
    marginBottom: "50px",
    border: "2px solid",
    borderRadius: "5px",
    borderColor: configStyles.colors.black,
  },
  radionCon: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    marginBottom: "20px",
  },
  block: {
    flexWrap: "nowrap",
    width: "400px",
    height: "auto",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  redText: {
    color: configStyles.colors.inputErrorRed,
    fontFamily: "Ubuntu-Regular",
    fontSize: "15px",
  },
});

AccessContainer.propTypes = {
  updateAssessmentAccess: PropTypes.func.isRequired,
  fetchAssessmentAccess: PropTypes.func.isRequired,
  assessmentReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  assessmentReducer: state.assessmentReducer,
});

export default connect(mapStateToProps, {
  updateAssessmentAccess,
  fetchAssessmentAccess,
})(AccessContainer);
