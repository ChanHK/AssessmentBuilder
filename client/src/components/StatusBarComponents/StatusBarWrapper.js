import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

class StatusBarWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpace: window.innerWidth > 800 ? true : false,
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
    if (window.innerWidth <= 800) {
      //needs to further test on different screens when deployed
      this.setState({ showSpace: false });
    } else {
      this.setState({ showSpace: true });
    }
  };
  render() {
    return (
      <div className={css(styles.outerLayer)}>
        <div
          className={css(styles.innerLayer)}
          style={{
            justifyContent: this.state.showSpace
              ? this.props.first
                ? this.props.first
                : "space-between"
              : "center",
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  outerLayer: {
    width: "auto",
    backgroundColor: configStyles.colors.lightGrey,
    height: "auto",
    borderRadius: "5px",
    display: "flex",
    border: "2px solid",
    borderColor: configStyles.colors.black,
    // boxShadow: "0px 3px 20px 0px",
    // boxShadowColor: configStyles.colors.lightGrey,
  },
  innerLayer: {
    flexWrap: "wrap",
    width: "100%",
    minHeight: "160px",
    display: "flex",
    alignItems: "center",
    padding: "10px 45px 10px 45px",
  },
});

export default StatusBarWrapper;
