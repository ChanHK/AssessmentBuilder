import React from "react";
import * as MdIcons from "react-icons/md";
import * as CgIcons from "react-icons/cg";
import * as RiIcons from "react-icons/ri";

export const Data = [
  {
    title: "Profile",
    path: "/profile",
    icon: <CgIcons.CgProfile />,
  },
  {
    title: "Assessments",
    path: "/home",
    icon: <MdIcons.MdAssessment />,
  },
  {
    title: "Question Bank",
    path: "/questionBank",
    icon: <RiIcons.RiBankFill />,
  },
];
