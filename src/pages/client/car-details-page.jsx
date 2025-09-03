import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Button,
  Tag,
  Carousel,
  Input,
  Form,
  Image,
  Breadcrumb,
  Space,
  Descriptions,
  Divider,
} from "antd";
import dayjs from "dayjs";
import {
  CarOutlined,
  CalendarOutlined,
  DollarOutlined,
  UserOutlined,
  DownloadOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import "../../style/global.css";
import breadcrumbleft from "../../assets/breadcrumbleft.png";
import breadcrumbright from "../../assets/breadcrumbright.png";
import { DatePicker } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { callGetCarById } from "../../service/service-api";
import { useUserContext } from "../../components/auth";

const { RangePicker } = DatePicker;
const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState();
  const { saveBooking } = useUserContext();

  useEffect(() => {
    handleGetCarById(id);
  }, []);
  const handleGetCarById = async () => {
    const res = await callGetCarById(id);
    if (res.data) {
      setCar(res.data);
    }
  };
  const [form] = Form.useForm();

  const handleBooking = (values) => {
    const bookingData = {
      ...values,
      car: car,
    };
    saveBooking(bookingData);
    navigate(`/checkout/${car.id}`);
  };
  const carouselRef = useRef(null);
  const goTo = (index) => {
    carouselRef.current.goTo(index);
  };
  return (
    <>
      <div
        style={{
          background: "#201F1D",
          marginTop: 64,
          padding: "64px 0",
          color: "white",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            content: '""', // với inline style thì content không cần
            background: `url(${breadcrumbleft}) no-repeat`,
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 393,
            height: 334,
            backgroundSize: "cover",
            zIndex: 0, // để nằm dưới text
          }}
        />
        <div
          style={{
            content: "",
            background: `url(${breadcrumbright}) no-repeat`,
            position: "absolute",
            bottom: 50,
            right: 130,
            width: 97,
            height: 102,
            backgroundSize: "cover",
          }}
        />
        <h1 style={{ color: "white", marginBottom: 16, textAlign: "center" }}>
          Rental Car Service
        </h1>

        <Breadcrumb
          separator={<span style={{ color: "white" }}>/</span>}
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
          items={[
            {
              title: (
                <Link to="/" style={{ color: "white" }}>
                  Home
                </Link>
              ),
            },
            {
              title: (
                <Link to="/cars" style={{ color: "white" }}>
                  Car
                </Link>
              ),
            },
            {
              title: (
                <span style={{ color: "orange" }}>{car?.carModel?.name}</span>
              ),
            },
          ]}
        />
      </div>
      <div
        style={{
          padding: "30px 0",
          background: "#ffffff",
          boxShadow: "0px 4px 24px rgba(225, 225, 225, 0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 110px",
          }}
        >
          <div>
            <h1>
              {car?.carModel?.brand.name} {car?.carModel?.name}
            </h1>
            <p style={{ fontSize: 16, margin: 4 }}>
              <UserOutlined /> {car?.capacity} seats
            </p>
            <div style={{ fontSize: 16, margin: 4 }}>
              <EnvironmentOutlined /> Location : {car?.location}
            </div>
            <span style={{ margin: 4 }}>
              <Space>
                <CalendarOutlined />
                {car?.available ? (
                  <Tag color="green">available</Tag>
                ) : (
                  <Tag color="red">Not Available</Tag>
                )}
              </Space>
            </span>
          </div>
          <Button
            style={{
              padding: 22,
              backgroundColor: "#127384",
              color: "#ffff",
              fontSize: 16,
            }}
          >
            <span>
              <Space>
                <DollarOutlined />
                {car?.price} / Day
              </Space>
            </span>
          </Button>
        </div>
      </div>
      <div style={{ margin: "54px 100px" }}>
        <Row gutter={[24, 24]}>
          <Col
            xs={24}
            md={16}
            style={{ backgroundColor: "#ffff", borderRadius: 10 }}
          >
            <Carousel ref={carouselRef} style={{ marginTop: 18 }} autoplay>
              {car?.carImages.map((img, index) => (
                <div key={index} style={{}}>
                  <img
                    src={`http://localhost:8080/storage/car_images/${img.url}`}
                    alt="car"
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                      borderRadius: 10,
                    }}
                  />
                </div>
              ))}
            </Carousel>

            <div style={{ margin: "8px 0", display: "flex", gap: 8 }}>
              {car?.carImages.map((img, index) => (
                <Image
                  key={index}
                  src={`http://localhost:8080/storage/car_images/${img.url}`}
                  width={260}
                  height={100}
                  style={{
                    cursor: "pointer",
                    borderRadius: 6,
                    objectFit: "cover",
                  }}
                  preview={false}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
            <Divider />
            <div>
              <h2 className="description-text">
                Car Description – {car?.carModel?.name}
              </h2>
              <div>
                <p
                  className="description-text"
                  style={{ marginTop: 10, padding: "0 10px 20px" }}
                >
                  The Hyundai Santa Fe 2.2 Diesel is a modern 7-seater SUV with
                  a strong and elegant design.
                  <br /> It is equipped with a fuel-efficient 2.2L diesel
                  engine, paired with a smooth automatic transmission, providing
                  a stable and comfortable driving experience. <br />
                  The Hyundai Santa Fe 2.2 Diesel is ideal for families,
                  long-distance travel, or business trips, offering reliable
                  performance, fuel efficiency, and a comfortable driving feel.
                  <br />
                  Additionally, the Santa Fe integrates advanced safety
                  technologies such as ABS brakes, hill-start assist, rearview
                  camera, and collision sensors, ensuring a safe journey for
                  your family and friends.
                </p>
              </div>
            </div>
          </Col>

          {/* Thông tin chi tiết + Form đặt xe */}
          <Col xs={24} md={8}>
            <div
              style={{
                backgroundColor: "#ffff",
                padding: 24,
                borderRadius: 12,
                marginBottom: 20,
                fontSize: 14,
              }}
            >
              <Descriptions
                title={
                  <h4 style={{ textAlign: "center" }}>
                    --Car Specifications --
                  </h4>
                }
                bordered
                size="middle"
                column={1}
                style={{ marginTop: 8 }}
              >
                <Descriptions.Item label="Brand">
                  {car?.carModel?.brand?.name || "Hyundai"}
                </Descriptions.Item>
                <Descriptions.Item label="Model">
                  {car?.carModel?.name || "Santa Fe 2.2 Diesel"}
                </Descriptions.Item>
                <Descriptions.Item label="Seats">
                  {car?.capacity} seats
                </Descriptions.Item>
                <Descriptions.Item label="Power">
                  {car?.engine || "2.2L Horse"}
                </Descriptions.Item>
                <Descriptions.Item label="Transmission">
                  {car?.transmission || "Manual"}
                </Descriptions.Item>
                <Descriptions.Item label="Fuel Type">
                  {car?.fuelType || "Diesel"}
                </Descriptions.Item>

                <Descriptions.Item label="Rental Fee">
                  ${car?.price} / Day
                </Descriptions.Item>
              </Descriptions>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleBooking}
              style={{
                backgroundColor: "#ffff",
                padding: 24,
                borderRadius: 12,
              }}
            >
              <Form.Item
                label="Pickup Location"
                name="pickupLocation"
                rules={[{ required: true, message: "Nhập nơi nhận xe!" }]}
              >
                <Input placeholder="45, 4th Avenue Mark Street USA" />
              </Form.Item>

              <Form.Item
                label="Dropoff Location"
                name="dropoffLocation"
                rules={[{ required: true, message: "Nhập nơi trả xe!" }]}
              >
                <Input placeholder="78, 10th street Laplace USA" />
              </Form.Item>

              <div style={{ display: "flex", gap: 8 }}>
                <Form.Item
                  name="startDate"
                  label="Start Date "
                  rules={[{ required: true, message: "Chọn ngày bắt đầu" }]}
                  getValueProps={(value) => ({
                    value: value ? dayjs(value) : "",
                  })}
                >
                  <DatePicker format="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item
                  name="endDate"
                  label="End Date "
                  rules={[
                    { required: true, message: "Chọn ngày kết thúc" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const start = getFieldValue("startDate");
                        if (!value || !start || dayjs(value).isAfter(start)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Ngày kết thúc phải sau ngày bắt đầu!")
                        );
                      },
                    }),
                  ]}
                  getValueProps={(value) => ({
                    value: value ? dayjs(value) : "",
                  })}
                >
                  <DatePicker format="DD/MM/YYYY HH:mm" />
                </Form.Item>
              </div>

              <Button
                className="custom-btn-login"
                htmlType="submit"
                block
                size="large"
              >
                Rent Now
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CarDetailsPage;
