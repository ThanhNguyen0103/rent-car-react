import React, { useEffect, useState } from "react";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  FilterOutlined,
  SearchOutlined,
  StarFilled,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Checkbox,
  Col,
  Divider,
  Input,
  Layout,
  List,
  message,
  Row,
} from "antd";

import carparts02 from "../../assets/car-parts-02.svg";
import carparts03 from "../../assets/car-parts-03.svg";
import carparts04 from "../../assets/car-parts-04.svg";
import carparts06 from "../../assets/car-parts-06.svg";
import carparts05 from "../../assets/car-parts-05.svg";
import carparts01 from "../../assets/car-parts-01.svg";
import breadcrumbleft from "../../assets/breadcrumbleft.png";
import breadcrumbright from "../../assets/breadcrumbright.png";
import {
  callGetCar,
  callGetCarBrand,
  callGetCarModel,
} from "../../service/service-api";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
const { Content, Sider } = Layout;
import { Collapse } from "antd";

const CarListPage = () => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 1,
    total: 0,
  });
  const [filters, setFilters] = useState({
    brands: [],
    Models: [],
    priceRange: [],
  });

  const [car, setCar] = useState();
  const [carModel, setCarModel] = useState();
  const [brands, setBrands] = useState();

  useEffect(() => {
    handleGetCar();
    handleGetCarModel();
    handleGetBrand();
  }, []);
  const handleGetBrand = async () => {
    try {
      const res = await callGetCarBrand();

      if (res && res.data) {
        setBrands(res.data.result);
      }
    } catch (error) {}
  };
  const handleGetCarModel = async () => {
    try {
      const res = await callGetCarModel();
      if (res && res.data) {
        setCarModel(res.data.result);
      }
    } catch (error) {}
  };
  const handleGetCar = async (page, size, queryExtra) => {
    setLoading(true);
    try {
      let query = {
        page,
        size,
        ...queryExtra,
      };
      const res = await callGetCar(query);
      if (res.data && res.data.result) {
        setCar(res.data.result);

        setPagination({
          current: res.data.meta.currentPage,
          pageSize: res.data.meta.pageSize,
          total: res.data.meta.total,
        });
      }
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleFilterChange = (change) => {
    setFilters((prev) => ({ ...prev, ...change }));
  };

  const handleSubmitFilter = async () => {
    const query = {
      brand: filters.brands,
      carModel: filters.Models,
      page: pagination.current,
      size: pagination.pageSize,
      price: filters.priceRange,
    };
    await handleGetCar(query.page, query.size, query);
  };
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

  const items = [
    {
      key: "1",
      label: <span className="filter-label">Car Brand</span>,
      children: (
        <Checkbox.Group
          value={filters.brands}
          style={{ display: "flex", flexDirection: "column", marginTop: 8 }}
          onChange={(values) => {
            handleFilterChange({ brands: values });
          }}
        >
          {brands?.slice(0, 5).map((item) => (
            <Checkbox key={item.name} value={item.name}>
              {item.name}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
    {
      key: "2",
      label: <span className="filter-label">Car Model</span>,
      children: (
        <Checkbox.Group
          value={filters.Models}
          onChange={(values) => {
            handleFilterChange({ carModel: values });
          }}
          style={{ display: "flex", flexDirection: "column", marginTop: 8 }}
        >
          {carModel?.slice(0, 5).map((item) => (
            <Checkbox key={item.name} value={item.name}>
              {item.name}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
    {
      key: "3",
      label: <span className="filter-label">Fuel Type</span>,
      children: (
        <Checkbox.Group
          onChange={(values) => {
            handleFilterChange({ fuleType: values });
          }}
          style={{ display: "flex", flexDirection: "column", marginTop: 8 }}
        >
          <Checkbox value="HYBRID">HYBRID</Checkbox>
          <Checkbox value="LPG">LPG</Checkbox>
          <Checkbox value="GASOLINE">GASOLINE</Checkbox>
          <Checkbox value="DIESEL">DIESEL</Checkbox>
          <Checkbox value="ELECTRIC">ELECTRIC</Checkbox>
        </Checkbox.Group>
      ),
    },
    {
      key: "4",
      label: <span className="filter-label">Price</span>,
      children: (
        <Checkbox.Group
          value={filters.priceRange}
          onChange={(values) => {
            handleFilterChange({ priceRange: values });
          }}
          style={{ display: "flex", flexDirection: "column", marginTop: 8 }}
        >
          <Checkbox value="0-45">Below $45</Checkbox>
          <Checkbox value="46-65">Between $45 and $65</Checkbox>
          <Checkbox value="66-110">Between $65 and $110</Checkbox>
          <Checkbox value="111-999">Above $110</Checkbox>
        </Checkbox.Group>
      ),
    },
  ];

  return (
    <Layout>
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
            content: '""',
            background: `url(${breadcrumbleft}) no-repeat`,
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 393,
            height: 334,
            backgroundSize: "cover",
            zIndex: 0,
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
          Car Listings
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
                <Link to="/" style={{ color: "white", fontSize: 16 }}>
                  Home
                </Link>
              ),
            },
            {
              title: (
                <Link to="/cars" style={{ color: "white", fontSize: 16 }}>
                  Listing
                </Link>
              ),
            },
            {
              title: (
                <span style={{ color: "orange", fontSize: 16 }}>
                  Car Listings
                </span>
              ),
            },
          ]}
        />
      </div>
      <div style={{ padding: "0 48px", margin: "64px 64px" }}>
        <Layout>
          <Sider
            width={280}
            style={{ padding: 20, backgroundColor: "#fff", borderRadius: 10 }}
          >
            <div style={{ marginBottom: 10 }}>
              <Input
                placeholder="Search ..."
                suffix={
                  <SearchOutlined
                    style={{ color: "#999" }}
                    onClick={handleSubmitFilter}
                  />
                }
                onPressEnter={handleSubmitFilter}
                allowClear
                onChange={(e) => {
                  handleFilterChange({
                    brands: e.target.value,
                    Models: e.target.value,
                  });
                }}
                style={{
                  marginTop: 8,
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 15,
                  fontFamily: "Poppins, sans-serif",
                  backgroundColor: "#F5F5F5",
                }}
              />
            </div>

            <Collapse
              ghost
              defaultActiveKey={["1"]}
              className="filter-collapse"
              expandIconPosition="end"
              items={items}
            />
            <Button
              className="custom-btn-login"
              size="large"
              style={{ width: "100%" }}
              onClick={() => {
                handleSubmitFilter();
              }}
            >
              <FilterOutlined /> Filter Results
            </Button>
            <Button
              size="large"
              style={{
                width: "100%",
                marginTop: 8,
                color: "red",
                border: "none",
              }}
              onClick={setFilters}
            >
              Reset Filter
            </Button>
          </Sider>
          <Content style={{ padding: "0 24px", backgroundColor: "#F2F7F6" }}>
            <section className="cars">
              <List
                loading={loading}
                grid={{ gutter: 24, column: 2 }}
                itemLayout="vertical"
                size="large"
                pagination={{
                  current: pagination.current,
                  pageSize: 6,
                  total: pagination.total,
                  onChange: (page, size) => handleGetCar(page, size),
                  style: { justifyContent: "center" },
                }}
                dataSource={car}
                renderItem={(item) => (
                  <List.Item key={item.id} style={{ padding: 0 }}>
                    <Card
                      className="card-car"
                      style={{
                        width: "100%",
                        padding: 16,
                        borderRadius: 20,
                        overflow: "hidden",
                      }}
                      cover={
                        <div style={{ borderRadius: 20, overflow: "hidden" }}>
                          <Carousel autoplay>
                            {item.carImages &&
                              item.carImages.length > 0 &&
                              item.carImages.map((img) => (
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
                            {item.carModel?.brand.name} {item.carModel?.name}
                          </span>
                        }
                        description={
                          <div>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
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
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                color: "#1890ff",
                                marginTop: 8,
                              }}
                            ></div>
                            <Divider style={{ margin: "12px 0" }} />

                            {renderFeatures(item).map((row, rowIndex) => (
                              <Row
                                key={rowIndex}
                                gutter={[16, 16]}
                                style={{ marginBottom: 6, padding: "0 4px" }}
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
                                <EnvironmentOutlined
                                  style={{ marginRight: 4 }}
                                />
                                {item?.location}
                              </span>
                              <div>
                                <span
                                  style={{
                                    color: "red",
                                    fontSize: 18,
                                    fontWeight: 700,
                                  }}
                                >
                                  ${item.price}
                                </span>
                                <span>/ Day </span>
                              </div>
                            </div>
                            <Link to={`/cars/${item.id}`}>
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
                  </List.Item>
                )}
              />
            </section>
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};

export default CarListPage;
