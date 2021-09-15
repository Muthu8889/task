import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./TaskComponentData";
import { Typography, Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { isEmpty } from "lodash-es";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function TaskList() {
  const style = {
    flexGrow: 1,
  };
  const [rows, setRows] = useState([]);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [buttonDeleteDisable, setButtonDeleteDisable] = useState(true);
  const [editedData, setEditedData] = useState([]);
  const [openToastMsg, setOpenToastMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetch("/api/task")
      .then((res) => res.json())
      .then((json) => setRows(json.task));
  }, []);

  const onEditCellPropsChange = (data) => {
    setButtonDisable(false);
    let editedDataTemp = rows.map((item) => {
      if (item.id === data.id) {
        item[data.field] = data.props.value;
      }
      return item;
    });
    setEditedData(editedDataTemp);
  };

  const onClickButton = async () => {
    try {
      const res = await fetch("/api/editUser", {
        method: "POST",
        body: JSON.stringify(editedData),
      });
      const json = await res.json();
      const message = json.message;
      setButtonDisable(true);
      setOpenToastMsg(true);
      setSuccessMsg(message);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToastClose = (data) => {
    setOpenToastMsg(false);
  };

  const onClickDeleteButton = async () => {
    try {
      const res = await fetch("/api/deleteTask", {
        method: "POST",
        body: JSON.stringify(selectedRows),
      });
      const json = await res.json();
      const resData = json.task;
      const message = json.message;
      setButtonDeleteDisable(true);
      setOpenToastMsg(true);
      setSuccessMsg(message);
      setRows(resData);
    } catch (err) {
      console.log(err);
    }
  };

  const onSelectionModelChange = (data) => {
    let selectedTemp = rows.filter((el) => {
      return data.find((element) => {
        return element === el.id;
      });
    });
    console.log("Muthu", selectedTemp);
    setSelectedRows(selectedTemp);
    !isEmpty(data)
      ? setButtonDeleteDisable(false)
      : setButtonDeleteDisable(true);
  };

  return (
    <div>
      <Typography variant="h6" style={style}>
        Task Details
      </Typography>
      <div style={{ height: 450, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={onSelectionModelChange}
          onEditCellPropsChange={onEditCellPropsChange}
        />
      </div>
      <div style={{ textAlign: "center", paddingTop: "10px" }}>
        <div style={{ marginLeft: "200px" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={buttonDisable}
            onClick={onClickButton}
            style={{
              position: "absolute",
            }}
          >
            Save
          </Button>
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={buttonDeleteDisable}
          onClick={onClickDeleteButton}
          style={{
            position: "absolute",
          }}
        >
          Delete
        </Button>
      </div>
      <div style={{ color: "blue", textAlign: "left" }}>
        *Note Double click on Data grid to edit
      </div>
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
