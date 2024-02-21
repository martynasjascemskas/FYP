import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

function valuetext(value: number) {
  return `${value}`;
}

export default function RangeSlider(props: {
  value: number[];
  onChange: (value: number[]) => void;
}) {
  const handleChange = (event: Event, newValue: number | number[]) => {
    props.onChange(newValue as number[]);
    console.log(newValue);
  };
  return (
    <Box sx={{ width: 300 }}>
      <Typography
        id="range-slider"
        gutterBottom
        align={"center"}
        variant="button"
        sx={{ fontWeight: "bold" }}
        display="block"
      >
        {"House Price 2015-2022"}
      </Typography>
      <Slider
        getAriaLabel={() => "House Price 2015-2022"}
        value={props.value}
        onChange={handleChange}
        valueLabelDisplay="on"
        marks
        min={0}
        max={500000}
        step={10000}
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
