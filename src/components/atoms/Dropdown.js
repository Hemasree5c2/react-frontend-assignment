import { makeStyles, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";

const useStyles = makeStyles({
  autoCompleteDropdown: {
    "&  > .MuiInputBase-root": {
      opacity: 1,
      backgroundColor: "#FAFDFF",
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input':
      {
        padding: "0px",
        paddingLeft: "4px",
      },
    '&. MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"] .MuiAutocomplete-input':
      {
        padding: "0px",
        paddingLeft: "4px",
      },
  },
  autoCompleteInput: {
    backgroundColor: "#FAFDFF",
    "& .MuiAutocomplete-input": {
      padding: "0px",
      height: "27px",
    },
    '&. MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"] .MuiAutocomplete-input':
      {
        padding: "0px",
        paddingLeft: "4px",
      },
  },
});

const Dropdown = ({
  options,
  value,
  handleDropdownChange,
  label,
  width,
  height,
  ...restProps
}) => {
  const classes = useStyles();
  return (
    <Autocomplete
      id="combo-box-demo"
      options={options ?? []}
      value={value}
      onChange={handleDropdownChange}
      disableClearable
      classes={{
        root: classes.autoCompleteDropdown,
        input: classes.autoCompleteInput,
        inputRoot: classes.autoCompleteInput,
      }}
      style={{
        width: width ?? 300,
        height: height ?? 36,
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} size="small" variant="outlined" />
      )}
      {...restProps}
    />
  );
};

export default Dropdown;
