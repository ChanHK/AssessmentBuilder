import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import Header from "../../components/Header";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import "../../css/general.css";
import SecondLabel from "../../components/LabelComponent/SecondLabel";
// import ThirdLabel from "../../components/LabelComponent/ThirdLabel";
import AccessButtonBar from "../../components/AccessButtonBar";
import * as configStyles from "../../config/styles";
import QRCode from "qrcode.react";
import ClickCopy from "../../components/ClickCopy";

class AccessContainer extends Component {
  constructor() {
    super();
    this.state = {
      accessType: "",
      link: "http://abc/abc/abc.com",
      fullPageQR: false,
    };
  }

  onGetType = (e) => {
    this.setState({ accessType: e.target.value });
  };

  render() {
    const { accessType, link, fullPageQR } = this.state;
    console.log(fullPageQR);
    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              {fullPageQR ? (
                <>
                  <div className={css(styles.modal)}>
                    <div className={css(styles.modalContent)}>
                      <QRCode
                        id="123456"
                        value={link} // the link
                        level={"H"}
                        includeMargin
                        className={css(styles.qr)}
                        onClick={() =>
                          this.setState({ fullPageQR: !fullPageQR })
                        }
                        style={{ width: "50%" }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ paddingTop: "60px" }}>
                    <FirstLabel>Access</FirstLabel>
                  </div>
                  <AccessButtonBar onClick={this.onGetType} type={accessType} />

                  <div className={css(styles.linkCon)}>
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
                        onClick={() =>
                          this.setState({ fullPageQR: !fullPageQR })
                        }
                        style={{ width: "40%" }}
                      />
                    </div>
                  </div>
                </>
              )}
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
  linkCon: {
    backgroundColor: configStyles.colors.lightGrey,
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
    display: "flex",
    position: "fixed",
    zIndex: -3,
    left: 0,
    top: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: "rgb(0, 0, 0)",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
});

export default AccessContainer;
