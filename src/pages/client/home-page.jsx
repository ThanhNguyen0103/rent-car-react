import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { callGetCar } from "../../service/service-api";
import Banner from "../../components/client/banner";
import SearchBox from "../../components/client/search";
import CarList from "../../components/client/car-list";

const { Content } = Layout;

const HomePage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    handleGetCar();
  }, []);

  const handleGetCar = async () => {
    const res = await callGetCar();
    if (res.data && res.data.result) {
      setCars(res.data.result);
    }
  };

  const onFinish = (values) => {
    console.log("Search values:", values);
  };

  return (
    <Content style={{ backgroundColor: "#F2F7F6" }}>
      <Banner />
      <SearchBox onFinish={onFinish} />
      <CarList cars={cars} />
    </Content>
  );
};

export default HomePage;
