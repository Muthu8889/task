import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./UserComponentData";
import { Typography, Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UserList() {
  const style = {
    flexGrow: 1,
  };
  const [rows, setRows] = useState([]);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [editedData, setEditedData] = useState([]);
  const [openToastMsg, setOpenToastMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((json) => setRows(json.users));
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

  return (
    <div>
      <Typography variant="h6" style={style}>
        User Details
      </Typography>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          onEditCellPropsChange={onEditCellPropsChange}
        />
      </div>
      <div style={{ textAlign: "center", paddingTop: "10px" }}>
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
