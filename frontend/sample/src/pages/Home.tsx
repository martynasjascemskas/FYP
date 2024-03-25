import React from "react";
import MyMap from "../components/MyMap";
import Sidebar from "../components/SideBar";
import "./Home.css";
const Home = () => {
  // Default slider value state to be used in sidebar sliders. Sliders update these values with setFilterValue.
  const [filterValue, setFilterValue] = React.useState<number[]>([0, 500000]);
  // Home page, containing sidebar with sliders,text along side a map.
  return (
    <>
      <div className="container2">
        <div className="text">
          <Sidebar value={filterValue} onChange={setFilterValue} />
        </div>
        <div className="map">
          <MyMap value={filterValue} />
        </div>
      </div>
    </>
  );
};

export default Home;
