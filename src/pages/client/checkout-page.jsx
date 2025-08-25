import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  Row,
} from "antd";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const { values } = location.state || {}; // lấy thông tin booking truyền kèm
  console.log(values);
  return (
    <>
      <div
        style={{
          marginTop: 80,
          padding: 24,
          maxWidth: 1100,
          marginInline: "auto",
        }}
      >
        <Row gutter={24}>
          {/* LEFT: thông tin xe + form khách hàng */}
          <Col span={16}>
            <Card
              title="Thông tin xe"
              bordered={false}
              style={{ marginBottom: 24 }}
            >
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Tên xe">
                  {values?.car.name}
                </Descriptions.Item>
                <Descriptions.Item label="Hãng">
                  {values?.car.brand}
                </Descriptions.Item>
                <Descriptions.Item label="Giá thuê/ngày">
                  {values?.car.price.toLocaleString()} VND
                </Descriptions.Item>
                <Descriptions.Item label="Địa điểm">
                  {values?.car.location}
                </Descriptions.Item>
                {values && (
                  <>
                    <Descriptions.Item label="Ngày nhận xe">
                      {values.pickupLocation}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày trả xe">
                      {values.dropoffLocation}
                    </Descriptions.Item>
                  </>
                )}
              </Descriptions>
            </Card>

            <Card title="Thông tin khách hàng" bordered={false}>
              <Form layout="vertical" onFinish={{}}>
                <Form.Item
                  label="Họ tên"
                  name="fullName"
                  rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                >
                  <Input placeholder="Nguyễn Văn A" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Vui lòng nhập email" }]}
                >
                  <Input type="email" placeholder="example@email.com" />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                  ]}
                >
                  <Input placeholder="0123 456 789" />
                </Form.Item>

                <Divider />

                <Button type="primary" htmlType="submit" size="large" block>
                  Xác nhận đặt xe
                </Button>
              </Form>
            </Card>
          </Col>

          {/* RIGHT: Order Summary */}
          <Col span={8}>
            <Card title="Tóm tắt đơn hàng" bordered={false}>
              <p>
                <strong>Xe:</strong> {values?.car.name}
              </p>
              <p>
                <strong>Số ngày thuê:</strong> 1 ngày
              </p>
              <p>
                <strong>Giá/ngày:</strong> {values?.car.price.toLocaleString()}
                VND
              </p>
              <Divider />
              <h2 style={{ textAlign: "right" }}>
                Tổng cộng: {values?.car.price.toLocaleString()} VND
              </h2>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CheckoutPage;
