import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

const columns: GridColDef[] = [
  { field: "id", headerName: "DATE", width: 150 },
  { field: "firstName", headerName: "PRICE", width: 150 },
  { field: "lastName", headerName: "ADDRESS", width: 750 },
  {
    field: "button",
    headerName: "",
    width: 130,
    renderCell: (params) => {
      console.log(params);
      return (
        <Button
          variant="contained"
          onClick={() => {
            alert("go to new house tab");
          }}
        >
          Details
        </Button>
      );
    },
  },
];

const rows = [
  {
    id: "2022-09-15",
    lastName: "13 Street street ",
    firstName: "Jon",
  },
  {
    id: "2022-09-15",
    lastName: "8 BUTLERS YARD ST ALBANS HERTFORDSHIRE",
    firstName: "415000",
  },
  {
    id: "2022-09-15",
    lastName: "8 BUTLERS YARD ST ALBANS HERTFORDSHIRE",
    firstName: "415000",
  },
  {
    id: "2022-09-15",
    lastName: "8 BUTLERS YARD ST ALBANS HERTFORDSHIRE",
    firstName: "415000",
  },
  {
    id: "2022-09-15",
    lastName: "8 BUTLERS YARD ST ALBANS HERTFORDSHIRE",
    firstName: "415000",
  },
  {
    id: "2022-09-15",
    lastName: "8 BUTLERS YARD ST ALBANS HERTFORDSHIRE",
    firstName: "415000",
  },
  {
    id: "2022-09-15",
    lastName: "8 BUTLERS YARD ST ALBANS HERTFORDSHIRE",
    firstName: "415000",
  },
  {
    id: "2022-09-15",
    lastName: "8 BUTLERS YARD ST ALBANS HERTFORDSHIRE",
    firstName: "415000",
  },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
