import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";

export class StatusBarWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpace: window.innerWidth > 600 ? true : false,
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
            justifyContent: this.state.showSpace ? "space-between" : "center",
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
    backgroundColor: "#e0e0e0",
    height: "auto",
    // margin: "50px 40px 40px 40px",
    borderRadius: "5px",
    display: "flex",
    border: "2px solid black",
    // boxShadow: "0px 3px 20px 0px grey",
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
