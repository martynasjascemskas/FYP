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

const Something = () => {
  const { postcode } = useParams();
  const [houseSales, setHouseSales] = useState<HouseSales[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchHouseSales = async () => {
      const response = await fetch(`/api/houses/${postcode}`);
      const json = await response.json();

      if (response.ok) {
        setHouseSales(json);
        setIsLoading(false);
      }
    };

    fetchHouseSales();
  }, []);
  return (
    <div>
      <b style={{ display: "flex", fontSize: "30px", marginLeft: "40%" }}>
        {postcode}
      </b>
      {isLoading ? <LinearProgress /> : null}
      <HousesTable houseSales={houseSales} />
      {/* <HousesTable
        housesTableInfo={{
          "House Price": houseSale.price
          "Date Sold": houseSale.date,
          "New Build": houseSale.new_build,
          "House Number": houseSale.address1,
          "Sub-building Number": houseSale.address2,
          "Street": houseSales.address3,
          "Locality": houseSales.address4,
          "Town/City": houseSales.address5,
          "District": houseSales.address6,
          "County": houseSales.address7,
        }}
      /> */}
    </div>
  );
};

export default Something;