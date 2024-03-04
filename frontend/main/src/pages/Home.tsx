import React from "react";
import MyMap from "../components/MyMap";
import Sidebar from "../components/SideBar";
import "./Home.css";

const Home = () => {
  const [filterValue, setFilterValue] = React.useState<number[]>([0, 500000]);

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
