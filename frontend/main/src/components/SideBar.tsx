import MinMaxSlider from "./MinMaxSlider";
import SecondSlider from "./Slider1to5";
const SideBar = (props: {
  value: number[];
  onChange: (value: number[]) => void;
}) => {
  return (
    <>
      <p>
        This map illustrates the fluctuation in house prices from 2010 to the
        present, categorized by postcode. It focuses on the sale prices of
        individual properties for all properties within the postcode.
      </p>
      <p>
        To determine the value for each postcode, we examined the prices of each
        property sale within a certain postcode for the years 2015 to 2022.(
        <a
          href="https://www.gov.uk/government/statistical-data-sets/price-paid-data-downloads"
          target="_blank"
        >
          GOV.UK
        </a>
        )
        <br />
        The median price for each postcode was then computed and utilized for
        the map representation.
      </p>
      <MinMaxSlider value={props.value} onChange={props.onChange} />
      <SecondSlider value={props.value} onChange={props.onChange} />
    </>
  );
};

export default SideBar;
