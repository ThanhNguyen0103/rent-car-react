import { Card, Col, Row } from "antd";

const Dashboard = () => {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Tổng số Users">// todo</Card>
      </Col>
      <Col span={8}>
        <Card title="Tổng số Rentals">//todo</Card>
      </Col>
      <Col span={8}>
        <Card title="Tổng số Enrollments">//todo</Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
