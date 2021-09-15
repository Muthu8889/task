import React, { useState } from "react";
import {
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";
import { formComponent } from "./UserComponentData";
import { useFormik } from "formik";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AddUser() {
  const [formValues, setFormValues] = useState({});
  const [openToastMsg, setOpenToastMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  
  const formik = useFormik({
    initialValues: formValues,
    onSubmit: async (values) => {
      try {
        const res = await fetch("/api/editUser", {
          method: "POST",
          body: JSON.stringify(values),
        });
        const json = await res.json();
        const message = json.message;
        setOpenToastMsg(true);
        setSuccessMsg(message);
      } catch (err) {
        console.log(err);
      }
      setFormValues(values);
    },
    handleChange: async(values) => {
      
    },
  });

  const handleToastClose = (data) => {
    setOpenToastMsg(false);
  };

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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openToastMsg}
        autoHideDuration={6000}
        onClose={handleToastClose}
      >
        <Alert onClose={handleToastClose} severity="success">
          {successMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AddUser;
