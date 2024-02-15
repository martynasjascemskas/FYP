import React from "react";
import { useParams } from "react-router-dom";

const Something = () => {
  const { postcode } = useParams();
  return <div>Something page, {postcode}</div>;
};

export default Something;
