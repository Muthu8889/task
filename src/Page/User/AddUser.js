import React, { useState } from "react";
import {
  TextField,
  Button,
} from "@material-ui/core";
import { formComponent } from "./UserComponentData";
import { useFormik } from "formik";

function AddUser() {
  const [formValues, setFormValues] = useState({});
  const formik = useFormik({
    initialValues: formValues,
    onSubmit: (values) => {
      setFormValues(values);
    },
    handleChange: (values) => {
      console.log("Muthu", values);
    },
  });

  return (
    <div style={{ padding: "0px 100px 75px 100px" }}>
      <form onSubmit={formik.handleSubmit}>
        {formComponent.map((formItem, index) => {
          return (
            <div key={index}>
              {(formItem.type === "text" || formItem.type === "date") && (
                <TextField
                  {...formItem}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[formItem.name]}
                  key={index}
                />
              )}
            </div>
          );
        })}
        <div style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            // disabled
            style={{
              position: "absolute",
            }}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
