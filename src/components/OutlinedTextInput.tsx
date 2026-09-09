import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles, Select } from "@material-ui/core";
import { useDispatch } from "react-redux";

interface TextInputProps {
  inputLabel: string;
  inputType?: string;
  inputShrink?: boolean;
  required?: boolean;
  InputHelper?: string;
  inputSelect?: boolean;
  inputOption?: string[] | number[];
  multiline?: boolean;
  inputName: string;
  inputValue?: string | number;
  handleChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
}

const OutlineTextInput = ({
  inputLabel,
  inputType,
  required,
  InputHelper,
  inputShrink,
  inputSelect = false,
  inputOption,
  multiline = false,
  inputName,
  inputValue,
  handleChange,
}: TextInputProps) => {
  const dispatch = useDispatch();
  interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
  }

  return (
    <TextField
      id="outlined-basic"
      label={inputLabel}
      onChange={handleChange}
      placeholder={inputLabel}
      select={inputSelect}
      required={required}
      // classes={{ root: classes.root }}
      name={inputName}
      value={inputValue}
      variant="outlined"
      multiline={multiline}
      type={inputType ? inputType : ""}
      helperText={InputHelper ? InputHelper : ""}
      // FormHelperTextProps={{ classes: { root: classes.helperText } }}
      rows={multiline ? 4 : ""}
      // InputLabelProps={{
      //   classes: {
      //     root: classes.cssLabel,
      //     focused: classes.cssFocused,
      //   },
      //   shrink: inputShrink,
      // }}
      // InputProps={{
      //   classes: {
      //     root: classes.cssOutlinedInput,
      //     focused: classes.cssFocused,
      //     notchedOutline: classes.notchedOutline,
      //   },
      // }}
    >
      {inputOption?.map((option, index) => (
        <option value={option} key={index}>
          {option}
        </option>
      ))}
    </TextField>
  );
};

export default OutlineTextInput;
