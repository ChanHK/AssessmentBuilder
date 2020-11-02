import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Form, Button } from "react-bootstrap";
import "../../css/general.css";

export default class HomeContainer extends Component {
  
  render() {
    return (
      <div className={css(styles.BGContainer)}>
        
      </div>
    );
  }
}

const styles = StyleSheet.create({
  BGContainer: {
    backgroundColor: "#e0e0e0",
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
});
