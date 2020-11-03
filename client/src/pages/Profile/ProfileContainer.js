import React, { Component } from "react";

import Header from "../../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import "../../css/general.css";

export default class ProfileContainer extends Component {
  render() {
    return (
      <>
        <Header />
        <div style={{ width: "100%", height: "100vh" }}>
          <div className={css(styles.container)}>
            <div className={css(styles.acontainer)}>
              <Form.Label className={css(styles.text)}>Profile</Form.Label>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const styles = StyleSheet.create({
  acontainer: {
    // justifyContent: "center",
    alignItems: "center",
    width: "100%",
    display: "flex",
    // backgroundColor: "pink",
  },
  text: {
    fontFamily: "Ubuntu-Bold",
    paddingTop: "20px",
    paddingBottom: "20px",
    fontSize: "30px",
    lineHeight: "34px",
    // paddingLeft: "20px",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "65%",
    // minHeight: "100vh",
    display: "flex",
    backgroundColor: "lightgreen",
    alignSelf: "center",
  },
});
