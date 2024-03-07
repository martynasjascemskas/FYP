import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";
import App from "../App";

describe("App", () => {
  it("renders Navbar and text in App", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const navbarElement = screen.getByTestId("navbar");
    expect(navbarElement).toBeInTheDocument();

    const navbarText = screen.getByText("UK House Prices: 2015 to 2022");
    expect(navbarText).toBeInTheDocument();
  });
});
