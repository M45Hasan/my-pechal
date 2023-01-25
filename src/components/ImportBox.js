import React from "react";
import TextField from "@mui/material/TextField";

export const ImportBox = ({
  label,
  variant,
  className,
  type,
  textChange,
  name,
}) => {
  return (
    <>
      <TextField
        onChange={textChange}
        name={name}
        type={type}
        label={label}
        variant={variant}
        className={className}
      />
    </>
  );
};

export default ImportBox;
