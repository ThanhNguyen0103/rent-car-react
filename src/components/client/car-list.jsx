import { Button, Card, Carousel, Col, Divider, Row } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import titleHead from "../../assets/title-head.png";
import carparts01 from "../../assets/car-parts-01.svg";
import carparts02 from "../../assets/car-parts-02.svg";
import carparts03 from "../../assets/car-parts-03.svg";
import carparts04 from "../../assets/car-parts-04.svg";
import carparts05 from "../../assets/car-parts-05.svg";
import carparts06 from "../../assets/car-parts-06.svg";

const CarList = ({ cars }) => {
  const renderFeatures = (car) => [
    [
      { icon: carparts01, text: "Manual" },
      { icon: carparts02, text: `${car.mileage} KM` },
      { icon: carparts03, text: car.fuelType },
    ],
    [
      { icon: carparts04, text: "Power" },
      { icon: carparts05, text: car.year },
      { icon: carparts06, text: `${car.capacity} Persons` },
    ],
  ];

  return (
    <section
      className="cars"
      style={{ padding: "50px 20px", margin: "0 100px" }}
    >
      <div
        className="section-heading"
        style={{ textAlign: "center", marginBottom: 30 }}
      >
        <h1 style={{ fontSize: 36, fontWeight: 700 }}>
          Explore Most Popular Cars
        </h1>
        <img src={titleHead} alt="heading" />
        <p style={{ color: "#787878", fontSize: 16 }}>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s,
        </p>
      </div>
      <Row gutter={[24, 24]}>
        {cars?.map((car) => (
          <Col xs={24} sm={12} md={8} key={car.id}>
            <Card
              className="card-car"
              style={{
                padding: 16,
                borderRadius: 20,
                overflow: "hidden",
              }}
              cover={
                <div style={{ borderRadius: 20, overflow: "hidden" }}>
                  <Carousel autoplay>
                    {car.carImages?.map((img) => (
                      <img
                        key={img.id}
                        alt={car.carModel?.name}
                        src={`http://localhost:8080/storage/car_images/${img.url}`}
                        style={{
                          width: "100%",
                          height: 200,
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ))}
                  </Carousel>
                </div>
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
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <StarFilled
                          key={index}
                          style={{
                            fontSize: 16,
                            marginRight: 4,
                            color: index < 4 ? "#faad14" : "#d9d9d9",
                          }}
                        />
                      ))}
                      <span style={{ marginLeft: 8, color: "#999" }}>
                        (4.5) 120 Reviews
                      </span>
                    </div>
                    <Divider style={{ margin: "12px 0" }} />
                    {renderFeatures(car).map((row, rowIndex) => (
                      <Row
                        key={rowIndex}
                        gutter={[16, 16]}
                        style={{ marginBottom: 6 }}
                      >
                        {row.map((item, colIndex) => (
                          <Col key={colIndex} span={8}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: 14,
                                color: "#555",
                              }}
                            >
                              <img
                                src={item.icon}
                                alt={item.text}
                                style={{ marginRight: 6, width: 20 }}
                              />
                              <span>{item.text}</span>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    ))}
                    <div
                      style={{
                        backgroundColor: "#F2F7F6",
                        padding: 10,
                        margin: "15px 0",
                        borderRadius: 4,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>
                        <EnvironmentOutlined style={{ marginRight: 4 }} />
                        {car?.location}
                      </span>
                      <div>
                        <span
                          style={{
                            color: "red",
                            fontSize: 18,
                            fontWeight: 700,
                          }}
                        >
                          ${car.price}
                        </span>
                        <span>/ Day </span>
                      </div>
                    </div>
                    <Link to={`/car/${car.id}`}>
                      <Button
                        className="btn-rent-now"
                        block
                        style={{
                          borderRadius: 8,
                          height: 40,
                          backgroundColor: "#201F1D",
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      >
                        <CalendarOutlined /> Rent Now
                      </Button>
                    </Link>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default CarList;
