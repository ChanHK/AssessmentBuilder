import React, { Component } from "react";
import { StyleSheet } from "aphrodite";
import Header from "../../components/Header";
import CustomFullContainer from "../../components/GridComponents/CustomFullContainer";
import CustomMidContainer from "../../components/GridComponents/CustomMidContainer";
import CustomColumn from "../../components/GridComponents/CustomColumn";
import FirstLabel from "../../components/LabelComponent/FirstLabel";
import "../../css/general.css";

// import * as configStyles from "../../config/styles";
import { Pie } from "react-chartjs-2";

const data = {
  labels: ["Pass", "Fail"],
  datasets: [
    {
      //   label: "My First dataset",
      //   backgroundColor: configStyles.colors.lightBlue,
      backgroundColor: ["green", "red"],

      //   borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: ["40", "60"],
    },
  ],
};

export default class StatisticsContainer extends Component {
  render() {
    return (
      <>
        <Header />
        <CustomFullContainer>
          <CustomMidContainer style={[styles.customMidContainer]}>
            <CustomColumn>
              <div style={{ paddingTop: "60px" }}>
                <FirstLabel>Statistics</FirstLabel>
              </div>
              <div>
                <Pie
                  data={data}
                  width={300}
                  height={520}
                  options={{
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </CustomColumn>
          </CustomMidContainer>
        </CustomFullContainer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  customMidContainer: {
    paddingLeft: "10px",
  },
});

//https://stackoverflow.com/questions/46420578/it-is-possible-to-change-the-color-of-periphery-of-pie-chart-in-chart-js
