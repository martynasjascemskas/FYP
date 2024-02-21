import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { HouseSales } from "../pages/HouseSalesByPostcode";
import Button from "@mui/material/Button";

export default function DataTable({
  houseSales,
}: {
  houseSales: HouseSales[];
}) {
  const rows = houseSales
    ? houseSales.map((houseSale) => ({
        id: houseSale._id,
        price: houseSale.price,
        date: houseSale.date,
        new_build: houseSale.new_build === "N" ? "No" : "Yes",
        type:
          houseSale.type === "F"
            ? "Flat"
            : houseSale.type === "S"
            ? "Semi-Detached"
            : houseSale.type === "O"
            ? "Office"
            : houseSale.type === "T"
            ? "Terraced"
            : houseSale.type === "D"
            ? "Detached"
            : houseSale.type,
        houseNumber: houseSale.address1,
        subBuildingNumber: houseSale.address2,
        street: houseSale.address3,
        locality: houseSale.address4,
        townCity: houseSale.address5,
        district:
          houseSale.address6 === houseSale.address5 ? "" : houseSale.address6,
        county:
          houseSale.address7 === houseSale.address6 ? "" : houseSale.address7,
      }))
    : [];

  const columns: GridColDef[] = [
    { field: "price", headerName: "Price Sold", width: 150 },
    { field: "date", headerName: "Date Sold", width: 150 },
    { field: "new_build", headerName: "New Build", width: 90 },
    { field: "type", headerName: "Type", width: 120 },
    {
      field: "fullAddress",
      headerName: "Full Address",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 750,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.houseNumber || ""} ${
          params.row.subBuildingNumber || ""
        } ${params.row.street || ""} ${params.row.locality || ""} ${
          params.row.townCity || ""
        } ${params.row.district || ""} ${params.row.county || ""}`,
    },
    {
      field: "button",
      headerName: "",
      width: 130,
      renderCell: (params) => {
        console.log(params);
        return <Button variant="contained">DETAILS</Button>;
      },
    },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20]}
        checkboxSelection={false}
        sx={{ m: 2, border: 2, boxShadow: 4, borderColor: "primary.light" }}
      />
    </div>
  );
}
