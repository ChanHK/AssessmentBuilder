import React, { Component } from "react";
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import { Data } from "./Data";
import "../../css/general.css";

export default class NavSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverProfile: false,
      hoverAssessment: false,
      hoverQuestionBank: false,
      hoverLogOut: false,
    };
  }

  componentDidMount() {
    console.log(this.props.showBar);
  }

  toggleEnter = (e) => {
    this.setState({
      hoverProfile: false,
      hoverAssessment: false,
      hoverQuestionBank: false,
      hoverLogOut: false,
      [e.target.type]: true,
    });
  };

  toggleLeave = (e) => {
    this.setState({ [e.target.type]: false });
  };

  render() {
    return (
      <>
        <nav
          className={
            this.props.showBar ? css(styles.active) : css(styles.xactive)
          }
        >
          <div style={{ width: "100%" }}>
            {Data.map((item, index) => {
              return (
                <li key={index} className={css(styles.listIcon)}>
                  <Link
                    type={item.hoverName}
                    to={item.path}
                    className={css(styles.listIconText, styles.noSelect)}
                    onMouseEnter={this.toggleEnter}
                    onMouseLeave={this.toggleLeave}
                    style={
                      this.state[item.hoverName]
                        ? { backgroundColor: "#1a83ff" }
                        : { backgroundColor: " #060b26" }
                    }
                  >
                    {item.icon}
                    <span style={{ marginLeft: "16px" }}>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </div>
        </nav>
      </>
    );
  }
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: "#060b26",
    width: "250px",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: "60px",
    left: "0",
    transition: "350ms",
    zIndex: 1,
  },
  xactive: {
    backgroundColor: "#060b26",
    width: "250px",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: "60px",
    left: "-100%",
    transition: "850ms",
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
  noSelect: {
    userSelect:
      "none" /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */,
    webkitTouchCallout: "none" /* iOS Safari */,
    webkitUserSelect: "none" /* Safari */,
    khtmlUserSelect: "none" /* Konqueror HTML */,
    mozUserSelect: "none" /* Old versions of Firefox */,
    msUserSelect: "none" /* Internet Explorer/Edge */,
  },
});
