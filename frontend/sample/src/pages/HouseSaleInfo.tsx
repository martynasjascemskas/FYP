import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { HouseSales } from "../pages/HouseSalesByPostcode";
import HousesTable from "../components/HousesTable";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPoundRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
interface SingleHouseSale {
  _id: string;
  price: string;
  date: string;
  postcode: string;
  type: string;
  new_build: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  address5: string;
  address6: string;
  address7: string;
}

const HouseSaleInfo = () => {
  const { _id } = useParams();
  const [singleHouseSale, setSingleHouseSale] = useState<SingleHouseSale>();
  const [houseSales, setHouseSales] = useState<HouseSales[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format;
  useEffect(() => {
    setIsLoading(true);
    // Fetch single house sale by ID from previous page table.
    const fetchSingleHouseSale = async () => {
      const response = await fetch(`/api/houses/${_id}`);
      const json = await response.json();

      if (response.ok) {
        return json;
      }
    };
    // Fetch All house sales based on selected postcode.
    const fetchHouseSales = async (postcode: string) => {
      let apiUrl;
      apiUrl = `/api/houses/postcode/`;
      const queryParams = new URLSearchParams({ postcode });

      apiUrl += `?${queryParams}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(apiUrl, requestOptions);
      const json = await response.json();

      if (response.ok) {
        return json;
      }
    };
    // Function to fetch both and then setLoading to false.
    const fetchSingleHouseAndHouseSalesByPostcode = async () => {
      const tempSingleHouse = await fetchSingleHouseSale();
      const tempHouseSalesByPostcode = await fetchHouseSales(
        tempSingleHouse.postcode
      );
      setSingleHouseSale(tempSingleHouse);
      setHouseSales(tempHouseSalesByPostcode);
      setIsLoading(false);
    };
    fetchSingleHouseAndHouseSalesByPostcode();
  }, [_id]);
  // Parsing number to float and formatting value for easier visualisation.
  const priceNumber = parseFloat(singleHouseSale?.price ?? "0");
  const formattedPrice = currencyFormatter(priceNumber);
  // Google embedded Map for house sale along with information about house. Table for more house sales in postcode.
  return (
    <div>
      {isLoading ? <LinearProgress /> : null}
      <Paper sx={{ mt: 2, mx: 40 }} elevation={7}>
        <Box component="section" sx={{ width: "1230px" }}>
          <iframe
            width="1243"
            height="450"
            style={{
              border: 0,
              margin: "10px",
              borderRadius: "6px",
              boxShadow: "0 2px 5px 1px rgba(0, 0, 0, 0.5)",
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${
              import.meta.env.VITE_GOOGLE_MAPS_API
            }&q=${singleHouseSale?.address1}+${singleHouseSale?.address2}+${
              singleHouseSale?.address3
            }+${singleHouseSale?.address4}+${singleHouseSale?.address5}+${
              singleHouseSale?.address6 === singleHouseSale?.address5
                ? ""
                : singleHouseSale?.address6
            }+${
              singleHouseSale?.address7 === singleHouseSale?.address6
                ? ""
                : singleHouseSale?.address7
            }&maptype=satellite&zoom=19`}
          ></iframe>
        </Box>
        <Typography
          sx={{
            color: "text.primary",
            mx: 2,
            fontSize: 28,
          }}
          variant="h5"
        >
          {singleHouseSale?.address1} {singleHouseSale?.address2}{" "}
          {singleHouseSale?.address3 + ","}
          <Typography
            variant="h6"
            sx={{ fontWeight: "400", color: "grey", fontSize: 22 }}
          >
            {singleHouseSale?.address4 === ""
              ? ""
              : singleHouseSale?.address4 + ", "}
            {singleHouseSale?.address5 === ""
              ? ""
              : singleHouseSale?.address5 + ", "}
            {singleHouseSale?.address6 === singleHouseSale?.address5
              ? ""
              : singleHouseSale?.address6 + ", "}
            {singleHouseSale?.address7 === singleHouseSale?.address6
              ? ""
              : singleHouseSale?.address7}
          </Typography>
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mx: 2,
            color: "text.secondary",
            fontWeight: "400",
            fontSize: 20,
          }}
        >
          {singleHouseSale?.type === "F"
            ? "Flat"
            : singleHouseSale?.type === "S"
            ? "Semi-Detached House"
            : singleHouseSale?.type === "O"
            ? "Office"
            : singleHouseSale?.type === "T"
            ? "Terraced House"
            : singleHouseSale?.type === "D"
            ? "Detached House"
            : singleHouseSale?.type}
        </Typography>
        <Typography sx={{ margin: 2, display: "flex" }} variant="h6">
          <CurrencyPoundIcon viewBox="2 -5 28 24" />
          Price
          <Typography variant="h6" sx={{ ml: 1, color: "#e7195a" }}>
            {formattedPrice}
          </Typography>
        </Typography>
        <Typography sx={{ margin: 2, display: "flex" }} variant="h6">
          <AccessTimeRoundedIcon viewBox="2 -2 23 24" />
          Date sold
          <Typography variant="h6" sx={{ ml: 1, color: "#e7195a" }}>
            {singleHouseSale?.date}
          </Typography>
        </Typography>
        <Typography variant="h6" sx={{ ml: 2, color: "success.dark" }}>
          {singleHouseSale?.new_build === "N"
            ? "Well-established property"
            : "Newly built!"}
        </Typography>
        <HousesTable houseSales={houseSales} />
      </Paper>
    </div>
  );
};

export default HouseSaleInfo;
