import React, { useEffect, useState } from "react";
import { Table, Tag, Card, Spin, message, Breadcrumb } from "antd";
import dayjs from "dayjs";
import { callGetRentalByUserId } from "../../service/service-api";
import { useUserContext } from "../../components/auth";
import { Link } from "react-router-dom";
import breadcrumbleft from "../../assets/breadcrumbleft.png";
import breadcrumbright from "../../assets/breadcrumbright.png";
const RentalHistoryPage = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const res = await callGetRentalByUserId(user.id);

        setRentals(res.data.result);
      } catch (err) {
        message.error("Không tải được lịch sử thuê xe!");
      } finally {
        setLoading(false);
      }
    };
    fetchRentals();
  }, []);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Car",
      dataIndex: "car",
      key: "car",
      render: (car) => `${car.carModel.name} `,
    },
    {
      title: "Booking Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Return Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `${price} $`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue";
        let label = status;
        if (status === "RESERVED") {
          color = "green";
          label = "RESERVED";
        }
        if (status === "PENDING") {
          label = "Đang chờ";
        }
        if (status === "COMPLETED") {
          color = "green";
          label = "COMPLETED";
        }
        if (status === "CANCELED") {
          color = "red";
          label = "CANCELED";
        }
        if (status === "ONGOING") {
          color = "orange";
          label = "ĐONGOING ";
        }
        return <Tag color={color}>{label}</Tag>;
      },
    },
  ];

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
          History Rental
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
              title: <span style={{ color: "orange" }}>History</span>,
            },
          ]}
        />
      </div>
      <Card
        title={
          <h3 style={{ textAlign: "center", width: "100%", marginTop: 20 }}>
            Rental History
          </h3>
        }
        className="shadow-md rounded-xl"
      >
        {loading ? (
          <Spin />
        ) : (
          <Table
            dataSource={rentals}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            bordered
            style={{ padding: 20 }}
          />
        )}
      </Card>
    </>
  );
};
export default RentalHistoryPage;
