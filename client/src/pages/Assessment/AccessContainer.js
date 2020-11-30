import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import "../../css/general.css";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
// import ThirdLabel from "../../components/LabelComponent/ThirdLabel";
import AccessButtonBar from "../../components/AccessButtonBar";
import * as configStyles from "../../config/styles";
import QRCode from "qrcode.react";
import ClickCopy from "../../components/ClickCopy";

import Modal from "../../components/Modal";

class AccessContainer extends Component {
  constructor() {
    super();
    this.state = {
      accessType: "",
      link: "http://abc/abc/abc.com",

      showModal: false,
    };
  }

  onGetType = (e) => {
    console.log("a");
    this.setState({ accessType: e.target.value });
  };

  modalHandler = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  render() {
    const { accessType, link, showModal } = this.state;
    return (
      <form>
        <CustomColumn>
          <SecondLabel>Select access types</SecondLabel>

          <AccessButtonBar onClick={this.onGetType} type={accessType} />

          <div className={css(styles.infoBar)}>
            <SecondLabel>Link</SecondLabel>
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
        </CustomColumn>
      </form>
    );
  }
}

const styles = StyleSheet.create({
  infoBar: {
    backgroundColor: configStyles.colors.white,
    width: "100%",
    marginTop: "50px",
    borderRadius: "5px",
    borderColor: configStyles.colors.black,
    border: "2px solid",
    padding: 20,
    marginBottom: "50px",
  },
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
});

export default AccessContainer;
