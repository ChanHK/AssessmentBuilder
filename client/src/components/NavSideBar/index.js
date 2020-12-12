import React, { Component } from "react";
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import { Data } from "./Data";
import "../../css/general.css";
import * as configStyles from "../../config/styles";
import { connect } from "react-redux";
import { logout } from "../../actions/auth.actions";

import * as HiIcons from "react-icons/hi";

class NavSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowPosition: window.pageYOffset,
    };
  }

  handleScroll() {
    this.setState({ windowPosition: window.pageYOffset });
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll.bind(this));
  }

  render() {
    return (
      <>
        <nav
          className={
            this.props.showBar ? css(styles.active) : css(styles.xactive)
          }
          style={{
            top:
              this.state.windowPosition > "60px"
                ? this.state.windowPosition + "60px"
                : "60px",
          }}
        >
          <div style={{ width: "100%" }}>
            {Data.map((item, index) => {
              return (
                <li key={index} className={css(styles.listIcon)}>
                  <Link
                    type={item.hoverName}
                    to={item.path}
                    className={css(
                      styles.listIconText,
                      styles.noSelect,
                      styles.hover
                    )}
                  >
                    {item.icon}
                    <span style={{ marginLeft: "16px" }}>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li
              key={Data.length + 1}
              className={css(styles.listIcon)}
              onClick={() => this.props.logout()}
            >
              <Link
                type={"hoverLogOut"}
                className={css(
                  styles.listIconText,
                  styles.noSelect,
                  styles.hover
                )}
              >
                <HiIcons.HiOutlineLogout />
                <span style={{ marginLeft: "16px" }}>Log Out</span>
              </Link>
            </li>
          </div>
        </nav>
      </>
    );
  }
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: configStyles.colors.darkBlue,
    width: "250px",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    left: "0",
    transition: "350ms",
    zIndex: 1,
  },
  xactive: {
    backgroundColor: configStyles.colors.darkBlue,
    width: "250px",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    left: "-100%",
    transition: "1000ms",
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
    color: configStyles.colors.white,
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
  hover: {
    ":hover": {
      backgroundColor: configStyles.colors.lightBlue,
    },
  },
});

export default connect(null, { logout })(NavSideBar);
