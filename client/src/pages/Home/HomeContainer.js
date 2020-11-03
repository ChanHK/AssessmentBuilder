import React, { Component } from "react";

import NavSideBar from "../../components/NavSideBar";
import Header from "../../components/Header";

import "../../css/general.css";

export default class HomeContainer extends Component {
  render() {
    return (
      <div>
        <Header />
        <NavSideBar />

      </div>
    );
  }
}
