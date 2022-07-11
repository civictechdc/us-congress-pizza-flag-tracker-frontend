import React, { useEffect, useState } from "react";
import { STATES } from "../states";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import styles from "../../style/scanOrder.module.css";
import { updateOrder } from "../../utils/orderUtils";

import SelectField, { DistrictSelectField } from "./SelectField";
import { editOrderControl } from "../protectedRoute/permissions";

const InfoTop = (props) => {
  const {
    order,
    setOrder,
    statuses,
    message,
    setMessage,
    editMode,
    setEditMode,
  } = props;

  const initialValues = {
    order_number: order.order_number,
    usa_state: order.usa_state,
    home_office_code: order.home_office_code,
    status: order.status.sequence_num,
  };

  const validationSchema = Yup.object().shape({
    order_number: Yup.string()
      .max(15, "Must be 15 digits or less")
      .required("Cannot be blank!")
      .matches(/^[0-9]+$/, "must be a numeric code"),
    usa_state: Yup.string().required("Required"),
  });

  let optionUSStates = [];
  if (STATES) {
    optionUSStates = STATES.map((state) => ({
      label: state.name,
      name: "usa_state",
      value: state.name,
    }));
  }

  let optionDistricts = [];
  if (STATES && order.usa_state) {
    optionDistricts = STATES.filter(
      (state) => state.name === order.usa_state
    )[0].districts.map((district) => ({
      label: district,
      name: "home_office_code",
      value: district,
    }));
  }

  let optionStatuses = [];
  if (statuses) {
    optionStatuses = statuses.map((status) =>
      /* Old Filter by DEMO Organization Code was here
        to be rewired to ACTUAL User Profile DB info  */
      ({
        label: `#${status.sequence_num} ${status.description}`,
        name: "order_status_id",
        value: status.sequence_num,
      })
    );
  }

  const isEditor = editOrderControl();

  const updateDistricts = (option) => {
    {
      optionDistricts = STATES.filter((state) => state.name === option);
      if (optionDistricts.length) {
        optionDistricts[0].districts.map((district) => ({
          label: district,
          name: "home_office_code",
          value: district,
        }));
      }
    }
  };

  // putting this in Component State makes this check old state instead of what state is being updated to
  // and/or exceed maximum update depth error
  let districtMatchCheck = true;
  if (order.usa_state && order.home_office_code) {
    let currentDistricts = STATES.filter(
      (state) => state.name === order.usa_state
    );
    districtMatchCheck = currentDistricts[0].districts.includes(
      order.home_office_code
    );
  }

  const handleStatusChange = (event) => {
    // the backend doesn't need this but the frontend does need it to make select box display correctly
    let { name, value, label } = event;

    for (let i = 0; i < label.length; i++) {
      if (label[i] === " ") {
        let result = label.slice(i + 1);
        label = result;
        break;
      }
    }

    setOrder((prevOrderFunc) => {
      return {
        ...prevOrderFunc,
        status: { sequence_num: value, description: label },
      };
    });
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
        enableReinitialize
      >
        {(props) => {
          const {
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            touched,
            isValid,
            dirty,
          } = props;

          return (
            <>
              <div className={styles.toggleEdit}>
                {isEditor && (
                  <>
                    <button
                      onClick={() => {
                        setEditMode(!editMode);
                      }}
                    >
                      Edit
                    </button>
                  </>
                )}{" "}
                Print
              </div>
              <Form onSubmit={handleSubmit} className={styles.formBox}>
                <div className={styles.constituentBox}>
                  {order.person === undefined ? (
                    <div>
                      {" "}
                      <p className={styles.constituentName}>Temp Name</p>
                      <p className={styles.constituentPhone}>Temp Phone</p>
                      <p className={styles.constituentAddress1}>Temp Address</p>
                      <p className={styles.constituentAddress2}>
                        Anytown, USA 11111
                      </p>
                    </div>
                  ) : (
                    // Until person is added to the DB model, order.person will be undefined after page refresh, because the person data is added on getAll route but isn't able to be fetched from any other route. Bleh.
                    <>
                      <p className={styles.constituentName}>
                        {order.person.name}
                      </p>
                      <p className={styles.constituentPhone}>
                        {order.person.phone}
                      </p>
                      <p className={styles.constituentAddress1}>
                        {order.person.address}
                      </p>
                      <p className={styles.constituentAddress2}>
                        {order.person.town}
                      </p>
                    </>
                  )}
                </div>
                <div className={styles.flagDataBox}>
                  <div className="form-group">
                    <label htmlFor="order_number">
                      Order Number:{" "}
                      {!editMode ? (
                        <strong>{order.order_number}</strong>
                      ) : (
                        <>
                          <Field
                            type="text"
                            className="form-control"
                            id="order_number"
                            required
                            value={values.order_number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="order_number"
                          />
                          {touched.order_number && errors.order_number && (
                            <div className={styles.error}>
                              {errors.order_number}
                            </div>
                          )}
                        </>
                      )}
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="usa_state">
                      US State:{" "}
                      {editMode ? (
                        <>
                          <Field
                            component={SelectField}
                            inputId="edit-us-state"
                            name="usa_state"
                            options={optionUSStates}
                            initialValue={values.usa_state}
                            updateDistricts={updateDistricts}
                          />
                          {touched.usa_state && errors.usa_state && (
                            <div className={styles.error}>
                              {errors.usa_state}
                            </div>
                          )}
                        </>
                      ) : (
                        <strong>{order.usa_state}</strong>
                      )}
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="home_office_code">
                      Congressional Office:{" "}
                      {editMode ? (
                        <Field
                          component={SelectField}
                          inputId="edit-office"
                          options={optionDistricts}
                          name="home_office_code"
                        />
                      ) : (
                        <strong>{order.home_office_code}</strong>
                      )}
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="current_status">
                      Current Status:{" "}
                      {editMode ? (
                        <Field
                          component={SelectField}
                          inputId="edit-status"
                          name="status"
                          options={optionStatuses}
                        />
                      ) : order.status.description ? (
                        <strong>
                          #{order.status.sequence_num} -{" "}
                          {order.status.description}
                        </strong>
                      ) : (
                        <strong>Missing status...</strong>
                      )}
                    </label>
                  </div>
                  {editMode ? (
                    <>
                      <button type="submit" disabled={!isValid || !dirty}>
                        Submit
                      </button>
                      <button onClick={() => setEditMode(false)}>Cancel</button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </Form>
            </>
          );
        }}
      </Formik>{" "}
    </div>
  );
};

export default InfoTop;
