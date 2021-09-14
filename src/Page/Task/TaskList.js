import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns, rows } from "./TaskComponentData";
import { Typography } from "@material-ui/core";

export default function TaskList() {
  const style = {
    flexGrow: 1,
  };

  const onEditCellPropsChange = data => {
    console.log("muthu", data);
  }
  return (
    <div>
      <Typography variant="h6" style={style}>
        Task Details 
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          onEditCellPropsChange={onEditCellPropsChange}
        />
      </div>
    </div>
  );
}
