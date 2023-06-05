import React, { useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import { Circles } from "react-loader-spinner";

const LoaderSpinner = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  });
  return (
    <div className={css(styles.container)}>
      {/* <Loader type="Circles" color="#00BFFF" height={100} width={100} /> */}
      <Circles color="#00BFFF" height={100} width={100} />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "fixed",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: 24,
    zIndex: 1000,
    display: "flex",
    backgroundColor: "black",
    left: 0,
  },
  load: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
});

export default LoaderSpinner;
