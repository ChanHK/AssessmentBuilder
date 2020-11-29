import React from "react";
import { StyleSheet, css } from "aphrodite";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as configStyles from "../../config/styles";

const filterPassedTime = (time) => {
  const currentDate = new Date();
  const selectedDate = new Date(time);
  // console.log(time);
  return currentDate.getTime() < selectedDate.getTime();
};

const CustomDatePicker = (props) => (
  <DatePicker
    selected={props.selected}
    onChange={props.onChange}
    showTimeSelect
    allowSameDay={false}
    showMonthDropdown
    showYearDropdown
    isClearable
    placeholderText={props.placeholderText}
    closeOnScroll
    calendarClassName={css(styles.calendarClassName)}
    className={css(styles.className)}
    selectsStart={props.selectsStart}
    selectsEnd={props.selectsEnd}
    startDate={props.startDate}
    endDate={props.endDate}
    minDate={new Date()}
    showDisabledMonthNavigation
    shouldCloseOnSelect={false}
    // excludeDates={[new Date()]}
    // dateFormat="MMMM d, yyyy h:mm aa"
    dateFormat="Pp"
    timeFormat="HH:mm"
    filterTime={filterPassedTime}
    // monthsShown={2}
    withPortal
  />
);

const styles = StyleSheet.create({
  calendarClassName: {
    fontFamily: "Ubuntu-Regular",
    color: configStyles.colors.black,
  },
  className: {
    borderRadius: "5px",
    padding: 5,
    borderColor: configStyles.colors.black,
    border: "2px solid",
    ":active": {
      borderColor: configStyles.colors.lightBlue,
    },
    color: configStyles.colors.black,
    fontFamily: "Ubuntu-Regular",
    width: "100%",
  },
});

export default CustomDatePicker;

//refer more to https://reactdatepicker.com/
