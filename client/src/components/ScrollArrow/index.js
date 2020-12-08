import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { StyleSheet, css } from "aphrodite";

const ScrollArrow = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return function cleanup() {
      window.removeEventListener("scroll", checkScrollTop);
    };
  });

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FaArrowCircleUp
      className={css(styles.scrollTop)}
      onClick={scrollTop}
      style={{
        height: 40,
        display: showScroll ? "flex" : "none",
      }}
    />
  );
};

const styles = StyleSheet.create({
  scrollTop: {
    position: "fixed",
    width: "100%",
    bottom: "20px",
    zIndex: 10000,
    cursor: "pointer",
    animation: "fadeIn 0.3s",
    transition: "opacity 0.4s",
    opacity: 0.2,
    ":hover": {
      opacity: 1,
    },
    marginBottom: "20px",
    left: 0,
  },
});

export default ScrollArrow;