import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import HouseSalesByPostcode from "../pages/HouseSalesByPostcode";

describe("HouseSalesByPostcode", () => {
  it("renders postcode", () => {
    render(<HouseSalesByPostcode />);

    const postcode = screen.getByTestId("selected-postcode");

    expect(postcode).toBeInTheDocument();
  });
});
