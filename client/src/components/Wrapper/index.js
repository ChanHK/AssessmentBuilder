import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";

class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpace: window.innerWidth > this.props.widthChange ? true : false,
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
    if (window.innerWidth <= this.props.widthChange) {
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
            height: this.state.showSpace
              ? this.props.firstHeight
              : this.props.secHeight,
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
    height: "auto",
    display: "flex",
    // backgroundColor: "pink",
  },
  innerLayer: {
    flexWrap: "wrap",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Wrapper;
