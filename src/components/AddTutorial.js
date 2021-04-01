import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";

const AddTutorial = () => {
  const initialTutorialState = {
    id: null,
    order_number: "",
    coffice: "",
    usastate: "",
    published: false
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      order_number: tutorial.order_number,
      coffice: tutorial.coffice,
      usa_state: tutorial.usa_state
    };

    TutorialDataService.create(data)
      .then(response => {
        setTutorial({
          id: response.data.id,
          order_number: response.data.order_number,
          coffice: response.data.coffice,
          usa_state: response.data.usa_state,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="order_number">Order Number</label>
            <input
              type="text"
              className="form-control"
              id="order_number"
              required
              value={tutorial.order_number}
              onChange={handleInputChange}
              name="order_number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="coffice">Congressional Office</label>
            <input
              type="text"
              className="form-control"
              id="coffice"
              required
              value={tutorial.coffice}
              onChange={handleInputChange}
              name="coffice"
            />
          </div>

          <div className="form-group">
            <label htmlFor="usa_state">US State</label>
            <input
              type="text"
              className="form-control"
              id="usa_state"
              required
              value={tutorial.usa_state}
              onChange={handleInputChange}
              name="usa_state"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;