import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import SideBar from "../components/SideBar";

describe("SideBar", () => {
  it("renders sidebar with explanation paragraphs", () => {
    render(<SideBar value={[0, 500000]} onChange={() => {}} />);

    const paragraph1 = screen.getByText(
      /This map illustrates the fluctuation/i
    );
    const paragraph2 = screen.getByText(
      /To determine the value for each postcode/i
    );

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
  it("renders sliders in the sidebar", () => {
    render(<SideBar value={[0, 500000]} onChange={() => {}} />);

    const minMaxSlider = screen.getByTestId("min-max-slider");
    const secondSlider = screen.getByTestId("high-value-slider");

    expect(minMaxSlider).toBeInTheDocument();
    expect(secondSlider).toBeInTheDocument();
  });
});
