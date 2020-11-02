import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Image, Form } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import logo from "../../image/logo/logo.png";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showLogo: window.innerWidth > 600 ? true : false,
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

  render() {
    return (
      <Row className={css(styles.navbar)}>
        <FaIcons.FaBars className={css(styles.icon)} />

        {this.state.showLogo ? (
          <>
            <Image
              src={logo}
              className={css(styles.icon, styles.noSelect)}
              rounded
            />
            <Form.Label className={css(styles.logo, styles.noSelect)}>
              Assessment Builder
            </Form.Label>
          </>
        ) : (
          <AiIcons.AiFillHome className={css(styles.icon)} />
        )}
      </Row>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#060b26",
    height: "60px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  icon: {
    height: "40px",
    marginLeft: "2rem",
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
});

export default Header;
