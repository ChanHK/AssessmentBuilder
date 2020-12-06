import React, { Component } from "react";

import { StyleSheet, css } from "aphrodite";

import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import "../../css/general.css";

import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import * as configStyles from "../../config/styles";

import QRCode from "qrcode.react";
import { ExcelRenderer } from "react-excel-renderer";

import generator from "generate-password";

import Number from "./Data/Number";

import Modal from "../../components/Modal";
import Radio from "../../components/Radio";
import Button from "../../components/Button";
import Notice from "../../components/Notice";
import Dropdown from "../../components/Dropdown";
import UploadButton from "../../components/UploadButton";
import Table from "../../components/Table";
import CustomInput from "../../components/CustomInput";
import TableButton from "../../components/TableButton";
import ClickCopy from "../../components/ClickCopy";
import Wrapper from "../../components/Wrapper";

class AccessContainer extends Component {
  constructor() {
    super();
    this.state = {
      link: "http://abc/abc/abc.com",

      showModal: false,
      noAuthenticationSelected: true,
      withAuthenticationSelected: false,
      attemptNum: 1,

      errorMessage: null,
      rows: [{ accessCode: "1234567890", email: "chan@gmail.com" }], //example * should be empty

      //for delete can straight away delete using api, but first i need to set an ID or get ID // might use uuid
      column: [
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
          name: "Access Code",
          selector: "accessCode",
          cell: (row) => (
            <div>
              <div
                style={{
                  fontSize: "15px",
                  fontFamily: "Ubuntu-Regular",
                }}
              >
                {row.accessCode}
              </div>
            </div>
          ),
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
        },
        {
          name: "Action",
          selector: "delete",
          cell: (row) => (
            <CustomRow>
              <TableButton>Delete</TableButton>
            </CustomRow>
          ),
        },
      ],

      newEmail: "",
    };
  }

  modalHandler = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  noAuthenticationOnClick = (e) => {
    this.setState({
      noAuthenticationSelected: e.target.checked,
      withAuthenticationSelected: false,
    });
  };

  withAuthenticationOnClick = (e) => {
    this.setState({
      withAuthenticationSelected: e.target.checked,
      noAuthenticationSelected: false,
    });
  };

  ///////////////Excel part/////////////////

  fileUploadHandler = (e) => {
    let fileObj = e.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];

        resp.rows.slice(1).forEach((item, index) => {
          if (item && item !== "undefined") {
            var password = generator.generate({
              length: 10,
              numbers: true,
              uppercase: true,
              lowercase: true,
              excludeSimilarCharacters: true,
              symbols: false,
            });
            newRows.push({
              email: item[0],
              accessCode: password,
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

  /////////////////////////////////////////

  onChangeEmail = (e) => {
    this.setState({ newEmail: e.target.value });
    e.preventDefault();
  };

  addEmail = () => {
    let newRows = [];
    var password = generator.generate({
      length: 10,
      numbers: true,
      uppercase: true,
      lowercase: true,
      excludeSimilarCharacters: true,
      symbols: false,
    });
    if (this.state.newEmail !== "") {
      newRows.push({
        email: this.state.newEmail,
        accessCode: password,
      });
      this.setState({
        rows: this.state.rows.concat(newRows),
        newEmail: "",
      });
    }
  };

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    const {
      link,
      showModal,
      noAuthenticationSelected,
      withAuthenticationSelected,
      attemptNum,
      rows,
      column,
      newEmail,
    } = this.state;

    rows.forEach((rows, index) => {
      rows.serial = index + 1;
    });

    return (
      <form onSubmit={this.onSubmit}>
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
              style={{ minWidth: "30%" }}
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
                Each candidates have to enter their own access code in order to
                access to the assessment
              </Notice>
            )}
          </div>

          {withAuthenticationSelected && (
            <>
              <Wrapper
                firstHeight={"60px"}
                secHeight={"120px"}
                widthChange={1425}
              >
                <div className={css(styles.block)}>
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
                    onClick={this.addEmail}
                  >
                    Add
                  </Button>
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

              <div style={{ marginTop: 20 }}>
                <Table data={rows} columns={column} />
              </div>
            </>
          )}

          <div style={{ paddingTop: "25px" }}>
            <SecondLabel>Number of attempts</SecondLabel>
            <Dropdown
              options={Number}
              placeholder={"Select number"}
              value={attemptNum}
              onChangeValue={(e) =>
                this.setState({
                  attemptNum: e.target.value,
                })
              }
              padding={"12px"}
            />
          </div>

          <div style={{ paddingBottom: "300px", paddingTop: "25px" }}>
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
});

export default AccessContainer;
