import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";

const DatePicker = ({ selectedDate, handleDateChange, ...props }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        id="date-picker-dialog"
        format="MM/dd/yyyy"
        inputVariant="outlined"
        size="small"
        style={{ width: "180px", backgroundColor: "#FAFDFF" }}
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
