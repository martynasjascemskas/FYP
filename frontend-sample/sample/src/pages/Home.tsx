import React from "react";
import MyMap from "../components/MyMap";
import Sidebar from "../components/SideBar";
import "./Home.css";

const Home = () => {
  const [value, setValue] = React.useState<number[]>([0, 500000]);

  return (
    <>
      <div className="container2">
        <div className="text">
          <Sidebar value={value} onChange={setValue} />
        </div>
        <div className="map">
          <MyMap value={value} />
        </div>
      </div>
    </>
  );
};

export default Home;
