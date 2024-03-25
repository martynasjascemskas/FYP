import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import SideBar from "../components/SideBar";

describe("SideBar", () => {
  it("renders sidebar with 1st explanation paragraph", () => {
    render(<SideBar value={[0, 500000]} onChange={() => {}} />);

    const paragraph1 = screen.getByText(
      /This map illustrates the fluctuation/i
    );

    expect(paragraph1).toBeInTheDocument();
  });
  it("renders sidebar with 2nd explanation paragraph", () => {
    render(<SideBar value={[0, 500000]} onChange={() => {}} />);

    const paragraph2 = screen.getByText(
      /To determine the value for each postcode/i
    );

    expect(paragraph2).toBeInTheDocument();
  });
  it("renders low value slider in the sidebar", () => {
    render(<SideBar value={[0, 500000]} onChange={() => {}} />);

    const minMaxSlider = screen.getByTestId("min-max-slider");

    expect(minMaxSlider).toBeInTheDocument();
  });
  it("renders high value slider in the sidebar", () => {
    render(<SideBar value={[0, 500000]} onChange={() => {}} />);

    const secondSlider = screen.getByTestId("high-value-slider");
    expect(secondSlider).toBeInTheDocument();
  });
});
