import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  message,
  Row,
  Spin,
} from "antd";
import dayjs from "dayjs";
import breadcrumbleft from "../../assets/breadcrumbleft.png";
import breadcrumbright from "../../assets/breadcrumbright.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { callCreateRental } from "../../service/service-api";
import { useState } from "react";
import Title from "antd/es/typography/Title";
import { useUserContext } from "../../components/auth";

const CheckoutPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { bookingValues, user, clearBooking } = useUserContext();
  const values = bookingValues;

  const navigate = useNavigate();

  const days =
    values && values.startDate && values.endDate
      ? Math.ceil(
          (new Date(values.endDate) - new Date(values.startDate)) /
            (1000 * 60 * 60 * 24)
        )
      : 1;
  const totalPrice = values?.car?.price * days;

  const onFinish = async (user) => {
    setLoading(true);
    let booking = {
      user,
      ...values,
      totalPrice,
    };
    const res = await handleCreateRental(booking);

    if (res && res.data) {
      setTimeout(() => {
        setLoading(false);
        clearBooking();
        navigate("/payment-confirmation", {
          state: { booking: res.data },
        });
      }, 2000);
      message.success("Đặt xe thành công!");
    } else {
      setLoading(false);
    }
  };

  const handleCreateRental = async (value) => {
    try {
      const res = await callCreateRental(value);
      return res;
    } catch (e) {
      console.error(e);
      message.error("Có lỗi khi tạo đơn đặt xe");
    }
  };

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255,255,255,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Spin size="large" tip="Đang xử lý..." />
        </div>
      )}
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
          Check Out
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
              title: <span style={{ color: "orange" }}>Check Out</span>,
            },
          ]}
        />
      </div>

      <div
        style={{
          background: "#ffff",
          borderRadius: 10,
          minHeight: "100vh",
          padding: "56px",
          margin: "56px 110px",
        }}
      >
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} lg={12}>
            <Card
              style={{ borderRadius: 16 }}
              title={<Title level={4}>Customer Details</Title>}
            >
              <Form
                layout="vertical"
                onFinish={onFinish}
                form={form}
                initialValues={user}
                style={{ padding: 18 }}
              >
                <Form.Item label="ID" name="id" hidden>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Name"
                  name="fullName"
                  rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                >
                  <Input placeholder="Nguyễn Văn A" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng nhập email" },
                    { type: "email", message: "Email không hợp lệ" },
                  ]}
                >
                  <Input placeholder="email@example.com" />
                </Form.Item>

                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                  ]}
                >
                  <Input placeholder="0123456789" />
                </Form.Item>

                <Divider />

                <Form.Item>
                  <Button
                    className="custom-btn-login"
                    htmlType="submit"
                    size="large"
                    block
                  >
                    Make Payment Now
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              style={{ borderRadius: 16 }}
              title={<Title level={5}>Booking Summary</Title>}
            >
              <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Models">
                  {values?.car?.carModel?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Pickup Location">
                  {values?.pickupLocation}
                </Descriptions.Item>
                <Descriptions.Item label="Dropoff Location">
                  {values?.dropoffLocation}
                </Descriptions.Item>
                <Descriptions.Item label="Start Date">
                  {values?.startDate
                    ? dayjs(values.startDate).format("DD/MM/YYYY HH:mm")
                    : ""}
                </Descriptions.Item>
                <Descriptions.Item label="Return Date">
                  {values?.endDate
                    ? dayjs(values.endDate).format("DD/MM/YYYY HH:mm")
                    : ""}
                </Descriptions.Item>
                <Descriptions.Item label="Price per Car">
                  <span>{values?.car?.price?.toLocaleString() || 0}</span>
                  {values && ` VND / ngày`}
                </Descriptions.Item>
                <Descriptions.Item label="Rental Days">
                  {days}
                </Descriptions.Item>
                <Descriptions.Item label="Subtotal">
                  <b>{totalPrice || 0} $</b>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CheckoutPage;
