import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";
import App from "../App";

describe("App", () => {
  it("renders Navbar in App", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const navbarElement = screen.getByTestId("navbar");
    expect(navbarElement).toBeInTheDocument();
  });
  it("renders text in App", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const navbarText = screen.getByText("SAMPLE UK House Prices: 2018 to 2022");
    expect(navbarText).toBeInTheDocument();
  });
});
