import React from "react";
import Switch from "react-switch";
import * as configStyles from "../../config/styles";

const CustomSwitch = (props) => (
  <>
    <Switch
      checked={props.checked}
      onChange={props.onChange}
      onColor="#86d3ff"
      // onColor={configStyles.colors.lightBlue}
      // onHandleColor="#2693e6"
      onHandleColor={configStyles.colors.lightBlue}
      handleDiameter={25}
      uncheckedIcon={false}
      checkedIcon={false}
      height={15}
      width={43}
      draggable={false}
      offHandleColor={configStyles.colors.lightGrey}
    />
  </>
);

export default CustomSwitch;
