import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBox = ({ onFinish }) => {
  return (
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
                name="location"
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
  );
};

export default SearchBox;
