import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="403"
      subTitle="Xin lỗi, bạn không có quyền truy cập trang này."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Về Trang Chủ
        </Button>
      }
    />
  );
}

export default ForbiddenPage;
