import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import CustomRow from "../../components/GridComponents/CustomRow";

import "../../css/general.css";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
import ThirdLabel from "../../components/LabelComponent/ThirdLabel";

import * as configStyles from "../../config/styles";
import QRCode from "qrcode.react";
import ClickCopy from "../../components/ClickCopy";

import Modal from "../../components/Modal";
import Radio from "../../components/Radio";
import Button from "../../components/Button";

class AccessContainer extends Component {
  constructor() {
    super();
    this.state = {
      link: "http://abc/abc/abc.com",

      showModal: false,
      noAuthenticationSelected: false,
      privateAuthenticationSelected: false,
      groupAuthenticationSelected: false,
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
      privateAuthenticationSelected: false,
      groupAuthenticationSelected: false,
    });
  };

  privateAuthenticationOnClick = (e) => {
    this.setState({
      privateAuthenticationSelected: e.target.checked,
      noAuthenticationSelected: false,
      groupAuthenticationSelected: false,
    });
  };

  groupAuthenticationOnClick = (e) => {
    this.setState({
      groupAuthenticationSelected: e.target.checked,
      noAuthenticationSelected: false,
      privateAuthenticationSelected: false,
    });
  };

  render() {
    const {
      link,
      showModal,
      noAuthenticationSelected,
      privateAuthenticationSelected,
      groupAuthenticationSelected,
    } = this.state;
    return (
      <form>
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
            <CustomRow>
              <div className={css(styles.radionCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Radio
                    checked={privateAuthenticationSelected}
                    onChange={this.privateAuthenticationOnClick}
                  />
                </div>
                <ThirdLabel>Private access code</ThirdLabel>
              </div>
            </CustomRow>
            <CustomRow>
              <div className={css(styles.radionCon)}>
                <div style={{ paddingRight: "20px" }}>
                  <Radio
                    checked={groupAuthenticationSelected}
                    onChange={this.groupAuthenticationOnClick}
                  />
                </div>
                <ThirdLabel>Group access code</ThirdLabel>
              </div>
            </CustomRow>
          </div>
          <div style={{ paddingBottom: "300px" }}>
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
});

export default AccessContainer;
