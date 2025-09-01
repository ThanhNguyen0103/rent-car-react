import {
  Button,
  Card,
  Carousel,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Row,
  theme,
} from "antd";

import {
  ArrowRightOutlined,
  LikeOutlined,
  SearchOutlined,
  StarOutlined,
} from "@ant-design/icons";

import carRight from "../../assets/car-right.png";
import Meta from "antd/es/card/Meta";
import { callGetCar } from "../../service/service-api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../style/global.css";
const { Content } = Layout;

const HomePage = () => {
  const [car, setCar] = useState();
  useEffect(() => {
    handleGetCar();
  }, []);

  const handleGetCar = async () => {
    const res = await callGetCar();
    if (res.data && res.data.result) {
      setCar(res.data.result);
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <Content>
      <section className="section-banner">
        <div style={{ margin: "0 100px" }}>
          <Row>
            <Col span={12}>
              <p class="banner-text">
                <LikeOutlined style={{ color: "#eda600", marginRight: 4 }} />
                100% Trusted and Reliable Car Sales Platform in the World
              </p>
              <h1 style={{ fontSize: 62, lineHeight: 1 }}>
                Find Your Best <br></br>
                <span style={{ color: "#eda600" }}>Your Dream Car Awaits</span>
              </h1>
              <p style={{ color: "#787878", fontSize: 16, marginTop: 5 }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
              <Link to={"/cars"}>
                <Button
                  className="btn-banner"
                  size="large"
                  style={{
                    marginTop: 10,
                    width: "25%",
                    border: "2px solid #201f1d",
                    color: " #201f1d",
                    backgroundColor: "#ffff",
                    fontWeight: 500,
                    fontSize: 15,
                  }}
                >
                  View all Cars <ArrowRightOutlined />
                </Button>
              </Link>
            </Col>
            <Col span={12}>
              <div class="banner-img">
                <img src={carRight} alt="" style={{ maxWidth: "100%" }} />
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section className="section-search">
        <div
          style={{
            margin: "0 100px",
            backgroundColor: "#fff",
            position: "relative",
            bottom: 40,
            borderRadius: 16,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            padding: 20,
          }}
        >
          <Form layout="vertical" onFinish={onFinish}>
            <Row gutter={16} align="middle">
              <Col span={6}>
                <Form.Item
                  label="Pickup Location"
                  name="pickupLocation"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input placeholder="Enter location" />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label="Pickup Date"
                  name="startDate"
                  rules={[{ required: true, message: "Please select!" }]}
                >
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    placeholder="Select date & time"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label="Return Date"
                  name="endDate"
                  rules={[{ required: true, message: "Please select!" }]}
                >
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    placeholder="Select date & time"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{
                    backgroundColor: "#ffa633",
                    width: "100%",
                    borderRadius: 8,
                  }}
                >
                  <SearchOutlined /> Search
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </section>
      <section
        className="cars"
        style={{
          padding: "50px 20px",
          background: "#f9f9f9",
          margin: "0 100px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 30 }}>
          🚗 Danh sách xe nổi bật
        </h2>
        <Row gutter={[24, 24]}>
          {car?.map((car) => (
            <Col xs={24} sm={12} md={8} key={car.id}>
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                cover={
                  <Carousel autoplay>
                    {car.carImages && car.carImages.length > 0 ? (
                      car.carImages.map((img) => (
                        <img
                          key={img.id}
                          alt={car.carModel?.name}
                          src={`http://localhost:8080/storage/car_images/${img.url}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ))
                    ) : (
                      <img
                        alt="default"
                        src="/default-car.jpg"
                        style={{ height: 200, objectFit: "cover" }}
                      />
                    )}
                  </Carousel>
                }
              >
                <Meta
                  title={
                    <span style={{ fontSize: 18, fontWeight: 600 }}>
                      {car.carModel?.brand.name} {car.carModel?.name}
                    </span>
                  }
                  description={
                    <div>
                      <div style={{ margin: "8px 0", color: "#666" }}>
                        {car.available ? "✅ Còn xe" : "❌ Hết xe"}
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <StarOutlined
                            key={index}
                            style={{
                              fontSize: 16,
                              marginRight: 4,
                              color: "#faad14",
                            }}
                          />
                        ))}
                        <span style={{ marginLeft: 8, color: "#999" }}>
                          (4.5) 120 Reviews
                        </span>
                      </div>
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: 18,
                          color: "#1890ff",
                          marginTop: 8,
                        }}
                      >
                        {car.price.toLocaleString("vi-VN")} đ / ngày
                      </div>
                    </div>
                  }
                />
                <Link to={`/car/${car.id}`}>
                  <Button
                    type="primary"
                    block
                    style={{ marginTop: 12, borderRadius: 8, height: 40 }}
                    // disabled={!car.available}
                  >
                    Thuê xe
                  </Button>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Content>
  );
};
export default HomePage;
