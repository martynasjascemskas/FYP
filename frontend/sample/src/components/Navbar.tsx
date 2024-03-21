import { Link } from "react-router-dom";
import logo from "./assets/logo.svg";
// Navigation bar containing icon, etc.
const Navbar = () => {
  return (
    <header data-testid="navbar">
      <div className="container">
        <Link to="">
          <img
            src={logo}
            alt="Logo"
            style={{ height: "70px", width: "100px" }}
          ></img>
          <h1>SAMPLE UK House Prices: 2018 to 2022</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
