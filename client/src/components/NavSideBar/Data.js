import React from "react";
import * as MdIcons from "react-icons/md";
import * as CgIcons from "react-icons/cg";
import * as RiIcons from "react-icons/ri";
import * as HiIcons from "react-icons/hi";

export const Data = [
  {
    title: "Profile",
    path: "/profile",
    icon: <CgIcons.CgProfile />,
    hoverName: "hoverProfile",
  },
  {
    title: "Assessments",
    path: "/home",
    icon: <MdIcons.MdAssessment />,
    hoverName: "hoverAssessment",
  },
  {
    title: "Question Bank",
    path: "/questionBank",
    icon: <RiIcons.RiBankFill />,
    hoverName: "hoverQuestionBank",
  },
  {
    title: "Log Out",
    path: `this.props.logout`,
    icon: <HiIcons.HiOutlineLogout />,
    hoverName: "hoverLogOut",
  },
];
