import { Button, Card, Carousel, Col, Layout, Row, theme } from "antd";

import { StarOutlined } from "@ant-design/icons";
import hinh2 from "../../assets/hinh2.png";
import hinh3 from "../../assets/hinh3.png";
import Meta from "antd/es/card/Meta";
import { callGetCar } from "../../service/service-api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const contentStyle = {
    height: "500px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    // background: "#364d79",
  };
  const imgStyle = {
    width: "100%",
    objectFit: "cover", // cắt ảnh cho vừa khung mà không méo
    borderRadius: "10px", // bo góc cho đẹp
    transition: "transform 0.4s ease-in-out",
  };

  return (
    <Content>
      <div
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          marginTop: 56,
        }}
      >
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>
              <img style={imgStyle} src={hinh2} alt="" />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img style={imgStyle} src={hinh3} alt="" />
            </h3>
          </div>
        </Carousel>
      </div>
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
                      {car.carModel?.name}
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
