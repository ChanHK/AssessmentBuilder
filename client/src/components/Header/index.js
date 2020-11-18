import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image, Form } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import logo from "../../image/logo/logo.png";
import NavSideBar from "../../components/NavSideBar";
import CustomFullContainer from "../GridComponents/CustomFullContainer";
import CustomRow from "../GridComponents/CustomRow";
import "../../css/general.css";
import * as configStyles from "../../config/styles";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showLogo: window.innerWidth > 600 ? true : false,
      showBar: false,
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
    //be careful the 'inspect' element will alter the width of the screen
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    if (window.innerWidth <= 600) {
      //needs to further test on different screens when deployed
      this.setState({ showLogo: false });
    } else {
      this.setState({ showLogo: true });
    }
  };

  barShow = () => {
    this.setState({ showBar: !this.state.showBar });
  };

  render() {
    return (
      <CustomFullContainer>
        <CustomRow style={[styles.rowStyle]}>
          <FaIcons.FaBars
            className={css(styles.icon, styles.pointer)}
            style={{ marginLeft: "2rem" }}
            onClick={this.barShow}
          />

          {this.state.showLogo ? (
            <>
              <Image
                src={logo}
                className={css(styles.icon, styles.noSelect)}
                style={{ marginLeft: "1.5rem" }}
                rounded
              />
              <Form.Label className={css(styles.logo, styles.noSelect)}>
                Assessment Builder
              </Form.Label>
            </>
          ) : (
            <Image
              src={logo}
              className={css(styles.icon, styles.noSelect)}
              style={{ marginLeft: "1.5rem" }}
              rounded
            />
          )}
        </CustomRow>
        <NavSideBar showBar={this.state.showBar} />
      </CustomFullContainer>
    );
  }
}

const styles = StyleSheet.create({
  rowStyle: {
    backgroundColor: configStyles.colors.darkBlue,
    height: "60px",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "fixed",
    top: "0",
    zIndex: 1,
  },
  icon: {
    height: "40px",
    fontSize: "1.5rem",
    background: "none",
    color: "white",
  },
  logo: {
    height: "40px",
    marginLeft: "0.5rem",
    fontSize: "1.5rem",
    color: "white",
    paddingTop: 4,
    fontFamily: "Ubuntu-Bold",
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
  pointer: {
    cursor: "pointer",
  },
});

export default Header;
