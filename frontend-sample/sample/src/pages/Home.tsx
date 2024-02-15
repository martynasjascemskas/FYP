import MyMap from "../components/MyMap";
import Information from "../components/Information";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="container2">
        <div className="text">
          <Information />
        </div>
        <div className="map">
          <MyMap />
        </div>
      </div>
    </>
  );
};

export default Home;
