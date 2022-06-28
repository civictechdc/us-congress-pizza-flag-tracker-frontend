//https://gist.github.com/hubgit/e394e9be07d95cd5e774989178139ae8?permalink_comment_id=3366379#gistcomment-3366379
import React from "react";
import Select from "react-select";
import { useField } from "formik";

function SelectField(props) {
  const [field, state, { setValue, setTouched }] = useField(props.field.name);

  const onChange = ({ value }) => {
    setValue(value);
  };

  return <Select {...props} onChange={onChange} onBlur={setTouched} />;
}

export default SelectField;
