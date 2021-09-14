import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { formComponent } from "./TaskComponentData";
import { useFormik } from "formik";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

function CreateTask() {
  const [formValues, setFormValues] = useState({});
  const [dropDownValue, setDropDownValue] = useState("");
//   const [dropDownOptions, setDropDownOptions] = useState([]);
  const classes = useStyles();
  const formik = useFormik({
    initialValues: formValues,
    onSubmit: (values) => {
      setFormValues(values);
    },
    handleChange: (values) => {
      console.log("Muthu", values);
    },
  });

  const dropDownChange = e => {
    setDropDownValue(e.target.value);
    console.log("Muthu", e);
  }

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
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
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
    </div>
  );
}

export default CreateTask;
