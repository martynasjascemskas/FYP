import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { HouseSales } from "../pages/HouseSalesByPostcode";
import HousesTable from "../components/HousesTable";
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
  useEffect(() => {
    setIsLoading(true);
    const fetchSingleHouseSale = async () => {
      const response = await fetch(`/api/houses/${_id}`);
      const json = await response.json();

      if (response.ok) {
        return json;
      }
    };

    const fetchHouseSales = async (postcode: string) => {
      const response = await fetch(`/api/houses/postcode/${postcode}`);
      const json = await response.json();

      if (response.ok) {
        return json;
      }
    };

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
  return (
    <div>
      {isLoading ? <LinearProgress /> : null}
      <Paper sx={{ mt: 2, mx: 40 }} elevation={7}>
        <Container
          sx={{
            display: "flex",
          }}
        >
          <Box
            component="section"
            sx={{ width: "800px", border: "3px solid lightgrey", margin: 2 }}
          >
            <Typography
              sx={{
                backgroundColor: "lightgrey",
                border: "3px solid grey",
                p: 1,
                textAlign: "center",
                fontWeight: "600",
              }}
              variant="h4"
              gutterBottom
            >
              Property Details
            </Typography>
            <Typography sx={{ margin: 2 }} variant="h6">
              ADDRESS
              <Typography
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "lightgrey",
                  border: "2px solid grey",
                }}
                variant="h6"
              >
                {singleHouseSale?.address1} {singleHouseSale?.address2}
                {singleHouseSale?.address3} {singleHouseSale?.address4}
                {singleHouseSale?.address5}{" "}
                {singleHouseSale?.address6 === singleHouseSale?.address5
                  ? ""
                  : singleHouseSale?.address6}
                {singleHouseSale?.address7 === singleHouseSale?.address6
                  ? ""
                  : singleHouseSale?.address7}
              </Typography>
            </Typography>
            <div style={{ display: "flex", alignContent: "center" }}>
              <Typography sx={{ margin: 2 }} variant="h6">
                DATE SOLD
                <Typography
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "lightgrey",
                    border: "2px solid grey",
                  }}
                  variant="h6"
                >
                  {singleHouseSale?.date}
                </Typography>
              </Typography>
              <Typography sx={{ margin: 2 }} variant="h6">
                PRICE SOLD
                <Typography
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "lightgrey",
                    border: "2px solid grey",
                  }}
                  variant="h6"
                >
                  {singleHouseSale?.price}
                </Typography>
              </Typography>
            </div>
            <div style={{ display: "flex", alignContent: "center" }}>
              <Typography sx={{ margin: 2 }} variant="h6">
                NEW BUILD
                <Typography
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "lightgrey",
                    border: "2px solid grey",
                  }}
                  variant="h6"
                >
                  {singleHouseSale?.new_build === "N" ? "NO" : "YES"}
                </Typography>
              </Typography>
              <Typography sx={{ margin: 2 }} variant="h6">
                TYPE OF BUILDING
                <Typography
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "lightgrey",
                    border: "2px solid grey",
                  }}
                  variant="h6"
                >
                  {singleHouseSale?.type === "F"
                    ? "Flat"
                    : singleHouseSale?.type === "S"
                    ? "Semi-Detached"
                    : singleHouseSale?.type === "O"
                    ? "Office"
                    : singleHouseSale?.type === "T"
                    ? "Terraced"
                    : singleHouseSale?.type === "D"
                    ? "Detached"
                    : singleHouseSale?.type}
                </Typography>
              </Typography>
            </div>
          </Box>
          <Box
            component="section"
            sx={{ width: "800px", border: "3px solid lightgrey", margin: 2 }}
          >
            <Typography
              sx={{
                backgroundColor: "lightgrey",
                alignItems: "center",
                border: "3px solid grey",
                p: 1,
                textAlign: "center",
                fontWeight: "600",
              }}
              variant="h4"
              gutterBottom
            >
              Location
            </Typography>
            <iframe
              width="600"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${
                import.meta.env.VITE_GOOGLE_MAPS_API
              }
    &q=${singleHouseSale?.address1}+${singleHouseSale?.address2}+${
                singleHouseSale?.address3
              }+${singleHouseSale?.address4}+${singleHouseSale?.address5}+${
                singleHouseSale?.address6 === singleHouseSale?.address5
                  ? ""
                  : singleHouseSale?.address6
              }+${
                singleHouseSale?.address7 === singleHouseSale?.address6
                  ? ""
                  : singleHouseSale?.address7
              }`}
            ></iframe>
          </Box>
        </Container>
        <HousesTable houseSales={houseSales} />
      </Paper>
    </div>
  );
};

export default HouseSaleInfo;
