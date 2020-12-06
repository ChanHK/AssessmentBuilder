import React from "react";
import AvatarEditor from "react-avatar-editor";
import { isMobile } from "react-device-detect";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";

const Avatar = (props) => {
  return (
    <AvatarEditor
      image={props.image}
      width={250}
      height={250}
      color={[20, 20, 20, 0.5]}
      scale={1.2}
      rotate={0}
      borderRadius={250 / 2}
      style={{
        width: isMobile ? "100%" : "60%",
        height: "auto",
        maxWidth: isMobile ? "auto" : "400px",
        minWidth: isMobile ? "auto" : "220px",
      }}
      className={isMobile ? css(styles.flexbox, styles.con) : css(styles.con)}
    />
  );
};

const styles = StyleSheet.create({
  con: {
    border: "2px solid",
    borderColor: configStyles.colors.black,
    borderRadius: "5px",
  },
  flexbox: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
});

export default Avatar;
