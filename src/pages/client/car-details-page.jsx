import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Rate,
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
import breadcrumbleft from "../../assets/breadcrumbleft.png";
import breadcrumbright from "../../assets/breadcrumbright.png";
import { DatePicker } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { callGetCarById } from "../../service/service-api";

const { RangePicker } = DatePicker;
const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState();

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
    console.log("Form booking:", values);
    const bookingData = {
      ...values,
      car: car,
      // carName: car?.name,
      // price: car?.price,
    };
    navigate(`/checkout/${car.id}`, { state: { values: bookingData } });
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
        {" "}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 110px",
          }}
        >
          <div>
            <h1>{car?.carModel?.name}</h1>
            <p style={{ fontSize: 16, margin: 4 }}>
              <UserOutlined /> {car?.capacity} chỗ
            </p>
            <div style={{ fontSize: 16, margin: 4 }}>
              <EnvironmentOutlined /> Vị trí : Quận 7 , Hồ Chí Minh
            </div>
            <p style={{ margin: 4 }}>
              <Space>
                <CalendarOutlined />
                {car?.available ? (
                  <Tag color="green">Còn xe</Tag>
                ) : (
                  <Tag color="red">Hết xe</Tag>
                )}
              </Space>
            </p>
          </div>
          <Button
            style={{
              padding: 22,
              backgroundColor: "#127384",
              color: "#ffff",
              fontSize: 16,
            }}
          >
            <p>
              <Space>
                <DollarOutlined />
                <b>{car?.price.toLocaleString("vi-VN")} đ / ngày</b>
              </Space>
            </p>
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
              <h2>Mô tả xe – {car?.carModel?.name}</h2>
              <div>
                <p style={{ marginTop: 10, fontSize: 16 }}>
                  Mô tả xe – Hyundai Santa Fe 2.2 Diesel Hyundai Santa Fe 2.2
                  Diesel là mẫu SUV 7 chỗ hiện đại, mang thiết kế mạnh mẽ và
                  sang trọng.
                  <br />
                  Xe được trang bị động cơ dầu 2.2L tiết kiệm nhiên liệu, kết
                  hợp hộp số tự động mượt mà, cho cảm giác lái ổn định cả.
                  Hyundai Santa Fe 2.2 Diesel Hyundai Santa Fe 2.2 Diesel là mẫu
                  SUV 7 chỗ hiện đại, mang thiết kế mạnh mẽ và sang trọng. Xe
                  được trang bị động cơ dầu 2.2L tiết kiệm nhiên liệu, kết hợp
                  hộp số tự động mượt mà, cho cảm giác lái ổn định cả.
                  <br />
                  Xe phù hợp cho gia đình, đi du lịch đường dài hoặc công tác
                  với khả năng vận hành ổn định, tiết kiệm và cảm giác lái thoải
                  mái.
                  <br />
                  Bên cạnh đó, Santa Fe còn tích hợp các công nghệ an toàn tiên
                  tiến như phanh ABS, hỗ trợ khởi hành ngang dốc, camera lùi và
                  cảm biến va chạm, đảm bảo hành trình an toàn cho gia đình và
                  bạn bè.
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
                    -- Thông số kỹ thuật --
                  </h4>
                }
                bordered
                size="middle"
                column={1}
                style={{ marginTop: 8 }}
              >
                <Descriptions.Item label="Hãng xe">
                  {car?.carModel?.brand?.name || "Hyundai"}
                </Descriptions.Item>
                <Descriptions.Item label="Model">
                  {car?.carModel?.name || "Santa Fe 2.2 Diesel"}
                </Descriptions.Item>
                <Descriptions.Item label="Số chỗ ngồi">
                  {car?.capacity} chỗ
                </Descriptions.Item>
                <Descriptions.Item label="Động cơ">
                  {car?.engine || "2.2L Diesel"}
                </Descriptions.Item>
                <Descriptions.Item label="Hộp số">
                  {car?.transmission || "Tự động"}
                </Descriptions.Item>
                <Descriptions.Item label="Nhiên liệu">
                  {car?.fuelType || "Diesel"}
                </Descriptions.Item>
                <Descriptions.Item label="Màu sắc">
                  {car?.color || "Trắng"}
                </Descriptions.Item>
                <Descriptions.Item label="Giá thuê">
                  {car?.price?.toLocaleString("vi-VN")} đ / ngày
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
                label="Địa điểm nhận xe"
                name="pickupLocation"
                rules={[{ required: true, message: "Nhập nơi nhận xe!" }]}
              >
                <Input placeholder="45, 4th Avenue Mark Street USA" />
              </Form.Item>

              <Form.Item
                label="Địa điểm trả xe"
                name="dropoffLocation"
                rules={[{ required: true, message: "Nhập nơi trả xe!" }]}
              >
                <Input placeholder="78, 10th street Laplace USA" />
              </Form.Item>

              <div style={{ display: "flex", gap: 8 }}>
                <Form.Item
                  name="startDate"
                  label="Chọn ngày bắt đầu "
                  rules={[{ required: true, message: "Chọn ngày bắt đầu" }]}
                  getValueProps={(value) => ({
                    value: value ? dayjs(value) : "",
                  })}
                >
                  <DatePicker format="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item
                  name="endDate"
                  label="Chọn ngày kết thúc "
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
                  <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
              </div>

              <Button type="primary" htmlType="submit" block size="large">
                Đặt xe
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CarDetailsPage;
