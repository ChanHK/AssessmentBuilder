import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as configStyles from "../../config/styles";
import * as MdIcons from "react-icons/md";
import Button from "../../components/Button";

const UploadButton = (props) => {
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  return (
    <>
      <Button
        backgroundColor={configStyles.colors.darkBlue}
        color={configStyles.colors.white}
        padding={"8px"}
        width={"100px"}
        onClick={handleClick}
      >
        <MdIcons.MdFileUpload size={20} className={css(styles.pE)} />
        Upload
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={props.onChange}
        style={{ display: "none" }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  pE: {
    pointerEvents: "none",
  },
});

export default UploadButton;
