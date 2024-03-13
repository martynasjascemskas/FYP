import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
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
    value: 0,
    label: "£0",
  },
  {
    value: 250000,
    label: "£250,000",
  },
  {
    value: 500000,
    label: "£500,000+",
  },
];

export default function RangeSlider(props: {
  value: number[];
  onChange: (value: number[]) => void;
}) {
  const [value2, setValue2] = React.useState<number[]>([0, 500000]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue2(newValue as number[]);
  };
  return (
    <Box sx={{ width: 300 }}>
      <Typography
        id="range-slider"
        align={"center"}
        variant="button"
        sx={{ fontWeight: "bold" }}
        display="block"
        marginTop={"10px"}
      >
        {"Postcode Price 2018-2022"}
      </Typography>
      <CustomSlider
        getAriaLabel={() => "Postcode Price 2018-2022"}
        value={value2}
        onChange={handleChange}
        onChangeCommitted={(event, newValue) => {
          props.onChange(newValue as number[]);
        }}
        valueLabelDisplay="auto"
        marks={marks}
        min={0}
        max={500000}
        step={10000}
        color="error"
        size="small"
      />
    </Box>
  );
}
