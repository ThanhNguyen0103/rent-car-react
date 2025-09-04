import { Button, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { callGetCar } from "../../service/service-api";
import Banner from "../../components/client/banner";
import SearchBox from "../../components/client/search";
import CarList from "../../components/client/car-list";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Content } = Layout;

const HomePage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    handleGetCar();
  }, []);

  const handleGetCar = async (value) => {
    const query = {
      page: 1,
      size: 10,
      location: value?.location,
      brand: value?.brand,
    };

    try {
      const res = await callGetCar(query);
      if (res.data && res.data.result) {
        setCars(res.data.result);
      }
    } catch (error) {}
  };

  return (
    <Content style={{ backgroundColor: "#F2F7F6" }}>
      <Banner />
      <SearchBox onFinish={handleGetCar} />
      <CarList cars={cars} handleGetCar={handleGetCar} />
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <Link to={"/cars"}>
          <Button
            className="btn-banner"
            size="large"
            style={{
              marginTop: 10,
              border: "2px solid #201f1d",
              color: "#201f1d",
              backgroundColor: "#fff",
              fontWeight: 500,
              fontSize: 15,
            }}
          >
            View all Cars <ArrowRightOutlined />
          </Button>
        </Link>
      </div>
    </Content>
  );
};

export default HomePage;
