import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
//import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: "#e7195a",
  height: 3,
  padding: "10px 0",
  "& .MuiSlider-thumb": {
    height: 15,
    width: 15,
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
  },
  "& .MuiSlider-track": {
    height: 4,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 4,
  },
  "& .MuiSlider-markLabel": {
    fontSize: "9px",
    fontWeight: "bold",
    lineHeight: "0.3",
    '&[data-index="2"]': {
      transform: "translateX(-65%)",
    },
  },
}));

const marks = [
  {
    value: 1000000,
    label: "£1,000,000",
  },
  {
    value: 3000000,
    label: "£3,000,000",
  },
  {
    value: 5000000,
    label: "£5,000,000+",
  },
];

export default function RangeSlider(props: {
  value: number[];
  onChange: (value: number[]) => void;
}) {
  const [value2, setValue2] = React.useState<number[]>([1000000, 5000000]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue2(newValue as number[]);
  };
  return (
    <Box sx={{ width: 300 }}>
      {/* <Typography
        id="range-slider"
        align={"center"}
        variant="button"
        sx={{ fontWeight: "bold" }}
        display="block"
        marginTop={"10px"}
      >
        {"House Price 2015-2022"}
      </Typography> */}
      <CustomSlider
        getAriaLabel={() => "House Price 2018-2022"}
        value={value2}
        onChange={handleChange}
        onChangeCommitted={(event, newValue) => {
          props.onChange(newValue as number[]);
        }}
        valueLabelDisplay="auto"
        marks={marks}
        min={1000000}
        max={5000000}
        step={100000}
        color="error"
        size="small"
      />
    </Box>
  );
}
