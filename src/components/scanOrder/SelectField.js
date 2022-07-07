import React from "react";
import Select from "react-select";
import { useField } from "formik";

function SelectField(props) {
  const [field, state, { setValue, setTouched }] = useField(props.field.name);
  const initialValue = props.initialValue;

  const onChange = ({ value }) => {
    setValue(value, field.name);
  };

  return (
    <Select
      {...props}
      onChange={onChange}
      onBlur={setTouched}
      options={props.options}
      value={
        props.options
          ? props.options.find((option) => option.value === field.value)
          : initialValue
      }
    />
  );
}

export default SelectField;
