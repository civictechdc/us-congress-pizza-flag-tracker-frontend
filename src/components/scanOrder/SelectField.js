import React, { useEffect } from "react";
import Select from "react-select";
import { useField, useFormikContext } from "formik";

function SelectField(props) {
  const [field, state, { setValue, setTouched }] = useField(props.field.name);
  const {
    values: { home_office_code },
    touched,
    setFieldValue,
  } = useFormikContext();
  const initialValue = props.initialValue;
  const updateDistricts = props.updateDistricts;

  const onChange = ({ value }) => {
    setValue(value, field.name);
    if (field.name === "usa_state") {
      updateDistricts(value);
      const blankOffice = { name: "", value: "", label: "" };
      setFieldValue(home_office_code, blankOffice);
    }
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

export const DistrictSelectField = (props) => {
  const {
    values: { usa_state },
    touched,
    setFieldValue,
  } = useFormikContext();
  const [field, state, { setValue, setTouched }] = useField(props.field.name);

  const onChange = ({ value }) => {
    setValue(value, field.name);
  };

  // useEffect(()=> {
  //   console.log(usa_state)
  //   console.log(touched.usa_state)
  //   if(touched.usa_state){
  //     setTouched(field.usa_state, false)
  //     // console.log(touched.usa_state)
  //     // const firstOffice = {name: "", value: "", label: ""}
  //     // setFieldValue(field.name, firstOffice)
  //     // console.log(field.name)

  //   }
  // },[usa_state, touched.usa_state, setFieldValue, field.name, props.options, field.usa_state, setTouched]);

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
};

export default SelectField;
