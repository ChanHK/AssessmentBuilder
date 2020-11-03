import React, { Component } from "react";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as RiIcons from "react-icons/ri";

import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import "../../css/general.css";

export default class NavSideBar extends Component {
  constructor() {
    super();
    this.state = {
      hoverA: false,
      hoverQ: false,
      hoverC: false,
      hovers: false,
    };
  }

  toggleHoverA = () => {
    this.setState({ hoverA: !this.state.hoverA });
  };

  toggleHoverQ = () => {
    this.setState({ hoverQ: !this.state.hoverQ });
  };

  toggleHoverC = () => {
    this.setState({ hoverC: !this.state.hoverC });
  };

  toggleHoverS = () => {
    this.setState({ hoverS: !this.state.hoverS });
  };

  render() {
    return (
      <>
        <nav className={css(styles.active)}>
          <div className={css(styles.width100)}>
            <li className={css(styles.listIcon)}>
              <Link
                to="/home"
                className={css(styles.listIconText)}
                onMouseEnter={this.toggleHoverA}
                onMouseLeave={this.toggleHoverA}
                style={
                  this.state.hoverA
                    ? { backgroundColor: "#1a83ff" }
                    : { backgroundColor: " #060b26" }
                }
              >
                <MdIcons.MdAssessment />
                <span style={{ marginLeft: "16px" }}>Assessment</span>
              </Link>
            </li>
            <li className={css(styles.listIcon)}>
              <Link
                to="/questionbank"
                className={css(styles.listIconText)}
                onMouseEnter={this.toggleHoverQ}
                onMouseLeave={this.toggleHoverQ}
                style={
                  this.state.hoverQ
                    ? { backgroundColor: "#1a83ff" }
                    : { backgroundColor: " #060b26" }
                }
              >
                <RiIcons.RiBankFill />
                <span style={{ marginLeft: "16px" }}>Question Bank</span>
              </Link>
            </li>
            <li className={css(styles.listIcon)}>
              <Link
                to="/candidate"
                className={css(styles.listIconText)}
                onMouseEnter={this.toggleHoverC}
                onMouseLeave={this.toggleHoverC}
                style={
                  this.state.hoverC
                    ? { backgroundColor: "#1a83ff" }
                    : { backgroundColor: " #060b26" }
                }
              >
                <HiIcons.HiUsers />
                <span style={{ marginLeft: "16px" }}>Candidate List</span>
              </Link>
            </li>
            <li className={css(styles.listIcon)}>
              <Link
                to="/settings"
                className={css(styles.listIconText)}
                onMouseEnter={this.toggleHoverS}
                onMouseLeave={this.toggleHoverS}
                style={
                  this.state.hoverS
                    ? { backgroundColor: "#1a83ff" }
                    : { backgroundColor: " #060b26" }
                }
              >
                <RiIcons.RiSettings5Fill />
                <span style={{ marginLeft: "16px" }}>Settings</span>
              </Link>
            </li>
          </div>
        </nav>
      </>
    );
  }
}

const styles = StyleSheet.create({
  width100: {
    width: "100%",
  },
  active: {
    backgroundColor: "#060b26",
    width: "250px",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    top: "60px",
    left: "0",
    transition: "350ms",
    zIndex: 1,
  },
  listIcon: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    padding: "8px 8px 8px 16px",
    listStyle: "none",
    height: "60px",
  },
  listIconText: {
    textDecoration: "none",
    color: "#f5f5f5",
    fontSize: "18px",
    fontFamily: "Ubuntu-Bold",
    width: "95%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    borderRadius: "4px",
  },
});
