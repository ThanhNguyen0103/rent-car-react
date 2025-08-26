import { Breadcrumb, Button, Card, Descriptions, Result } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

import breadcrumbleft from "../../assets/breadcrumbleft.png";
import breadcrumbright from "../../assets/breadcrumbright.png";
const ComfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {}; // lấy thông tin booking truyền kèm
  console.log(booking);

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
          Payment Confirmation
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
                <span style={{ color: "orange" }}> Payment Confirmation</span>
              ),
            },
          ]}
        />
      </div>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f5f5",
          padding: 16,
        }}
      >
        <Card style={{ maxWidth: 600, width: "100%", borderRadius: 16 }}>
          <Result
            status="success"
            title="Đặt hàng thành công!"
            subTitle={`Cảm ơn bạn đã sử dụng dịch vụ. Đơn hàng #RC-${booking.id} đã được xác nhận.`}
          />

          <Descriptions
            title="Chi tiết giao dịch"
            bordered
            column={1}
            size="middle"
            style={{ marginBottom: 24 }}
          >
            <Descriptions.Item label="Mã đơn hàng">
              #RC - {booking.id}
            </Descriptions.Item>
            <Descriptions.Item label="Số tiền">
              {booking.totalPrice.toLocaleString("vi-VN")} VND
            </Descriptions.Item>
            <Descriptions.Item label="Phương thức thanh toán">
              Cash
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian">
              {booking.createdAt.toLocaleString("vi-VN")}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {booking.status}
            </Descriptions.Item>
          </Descriptions>

          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <Button type="primary" onClick={() => navigate("/")}>
              Về trang chủ
            </Button>
            <Button onClick={() => navigate("/orders")}>
              Đơn hàng của tôi
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};
export default ComfirmPage;
