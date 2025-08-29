import React, { useState } from "react";
import { Card, Row, Col, Select, InputNumber, Button, Table } from "antd";

const { Option } = Select;

const CarListPage = () => {
  // hard-coded data
  const initialCars = [
    { id: 1, brand: "Toyota", model: "Camry", price: 200, status: "AVAILABLE" },
    { id: 2, brand: "Honda", model: "Civic", price: 180, status: "AVAILABLE" },
    {
      id: 3,
      brand: "Ford",
      model: "Ranger",
      price: 250,
      status: "NOT_AVAILABLE",
    },
    { id: 4, brand: "Mazda", model: "CX-5", price: 220, status: "AVAILABLE" },
  ];

  const [cars, setCars] = useState(initialCars);
  const [brand, setBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  // filter function
  const handleFilter = () => {
    const filtered = initialCars.filter((car) => {
      const matchBrand = brand ? car.brand === brand : true;
      const matchMin = minPrice != null ? car.price >= minPrice : true;
      const matchMax = maxPrice != null ? car.price <= maxPrice : true;
      return matchBrand && matchMin && matchMax;
    });
    setCars(filtered);
  };

  const columns = [
    {
      title: "Hãng",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Mẫu xe",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Giá / ngày",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VNĐ`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (status === "AVAILABLE" ? "Còn xe" : "Hết xe"),
    },
  ];

  return (
    <Card
      title={<div className="text-center">Danh sách xe</div>}
      className="shadow-md rounded-xl"
    >
      {/* Filter section */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Select
            placeholder="Chọn hãng xe"
            style={{ width: 150 }}
            allowClear
            onChange={(value) => setBrand(value)}
          >
            <Option value="Toyota">Toyota</Option>
            <Option value="Honda">Honda</Option>
            <Option value="Ford">Ford</Option>
            <Option value="Mazda">Mazda</Option>
          </Select>
        </Col>
        <Col>
          <InputNumber
            placeholder="Giá thấp nhất"
            min={0}
            onChange={(value) => setMinPrice(value)}
          />
        </Col>
        <Col>
          <InputNumber
            placeholder="Giá cao nhất"
            min={0}
            onChange={(value) => setMaxPrice(value)}
          />
        </Col>
        <Col>
          <Button type="primary" onClick={handleFilter}>
            Lọc
          </Button>
        </Col>
      </Row>

      {/* Table */}
      <Table
        dataSource={cars}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default CarListPage;
