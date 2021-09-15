import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Snackbar,
} from "@material-ui/core";
import { formComponent } from "./TaskComponentData";
import { useFormik } from "formik";
import { isEmpty } from "lodash-es";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function CreateTask() {
  const [formValues, setFormValues] = useState({});
  const [dropDownValue, setDropDownValue] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [dropDownOptions, setDropDownOptions] = useState([]);
  const [openToastMsg, setOpenToastMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((json) => setUserDetails(json.users));
  }, []);

  useEffect(() => {
    if (!isEmpty(userDetails)) {
      let dropDownOptionsTemp = [];
      !isEmpty(userDetails) &&
        userDetails.map((item) => {
          let tempObj = {
            value: "",
            label: "",
          };
          tempObj.value = item.id;
          tempObj.label = `${item.firstName} ${item.lastName}`;
          dropDownOptionsTemp.push(tempObj);
          return item;
        });
      setDropDownOptions(dropDownOptionsTemp);
    }
  }, [userDetails]);
  const classes = useStyles();
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
    handleChange: (values) => {
      console.log("Muthu", values);
    },
  });

  const dropDownChange = (e) => {
    setDropDownValue(e.target.value);
    console.log("Muthu", e);
  };

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
              {formItem.type === "select" && (
                <div style={{ marginTop: "16px", marginBottom: "8px" }}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    style={{ width: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      {formItem.label}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={dropDownValue}
                      onChange={dropDownChange}
                      label="Age"
                    >
                      {dropDownOptions &&
                        dropDownOptions.map((item) => {
                          return (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </div>
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

export default CreateTask;
