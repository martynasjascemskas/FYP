import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { HouseSales } from "../pages/HouseSalesByPostcode";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function DataTable({
  houseSales,
}: {
  houseSales: HouseSales[];
}) {
  const navigate = useNavigate();
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format;
  const rows = houseSales
    ? houseSales.map((houseSale) => ({
        id: houseSale._id,
        price: houseSale.price,
        date: houseSale.date,
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
    { field: "date", headerName: "Date Sold", width: 150 },
    {
      field: "fullAddress",
      headerName: "Full Address",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 600,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.houseNumber || ""} ${
          params.row.subBuildingNumber || ""
        } ${params.row.street || ""} ${params.row.locality || ""} ${
          params.row.townCity || ""
        } ${params.row.district || ""} ${params.row.county || ""}`,
    },
    {
      field: "price",
      headerName: "Price Sold",
      width: 150,
      valueFormatter: (params) => currencyFormatter(params.value),
    },
    { field: "type", headerName: "Type", width: 120 },
    {
      field: "button",
      headerName: "",
      width: 130,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/houseSaleInfo/${params.row.id}`);
            }}
          >
            Details
          </Button>
        );
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
        sx={{
          m: 2,
          border: 2,
          boxShadow: 4,
          borderColor: "primary.light",
          fontFamily: "Poppins",
        }}
      />
    </div>
  );
}
