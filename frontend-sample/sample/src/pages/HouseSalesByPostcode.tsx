import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import HousesTable from "../components/HousesTable";

export interface HouseSales {
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

const HouseSalesByPostcode = () => {
  const { postcode } = useParams();
  const { selectedArea } = useParams();
  const [houseSales, setHouseSales] = useState<HouseSales[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchHouseSales = async () => {
      let apiUrl;
      let requestBody;
      let requestOptions;
      if (selectedArea) {
        apiUrl = `/api/houses/postcode/selected`;
        requestBody = JSON.stringify({ selectedArea });
        requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        };
      } else {
        apiUrl = `/api/houses/postcode/`;
        // @ts-expect-error type -> postcodes
        const queryParams = new URLSearchParams({ postcode });

        apiUrl += `?${queryParams}`;
        requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      }
      const response = await fetch(apiUrl, requestOptions);
      const json = await response.json();

      if (response.ok) {
        setHouseSales(json);
        setIsLoading(false);
      }
    };

    fetchHouseSales();
  }, [postcode, selectedArea]);
  return (
    <div>
      <b style={{ display: "flex", fontSize: "30px", marginLeft: "40%" }}>
        {postcode}
      </b>
      {isLoading ? <LinearProgress /> : null}
      <HousesTable houseSales={houseSales} />
    </div>
  );
};

export default HouseSalesByPostcode;
