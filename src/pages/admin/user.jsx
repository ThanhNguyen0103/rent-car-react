import { message } from "antd";
import {
  callCreateUser,
  callDeleteUser,
  callGetUser,
  callGetUserById,
  callUpdateUser,
} from "../../service/service-api";
import { useState } from "react";

import UserTable from "../../components/admin/user-table";

export const UserPage = () => {
  const [data, setData] = useState();
  const handleUpdateUser = async (value) => {
    const res = await callUpdateUser(value);
    if (res.data) {
      message.success("Cập nhật user thành công");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };
  const handleGetUser = async (params, sort, filter) => {
    let page = params.current;
    let size = params.pageSize;
    let sortField = Object.keys(sort)[0];
    let sortOrder = "";

    if (sortField === "fullName") {
      sortOrder =
        sort[sortField] === "ascend"
          ? "&sort=fullName,asc"
          : "&sort=fullName,desc";
    }
    if (sortField === "createdAt") {
      sortOrder =
        sort[sortField] === "ascend"
          ? "&sort=createdAt,asc"
          : "&sort=createdAt,desc";
    }

    let query = `page=${page}&size=${size}${sortOrder}`;

    const res = await callGetUser(query);
    if (res.data && res.data.result) {
      setData(res.data.result);
    }
    return res.data;
  };
  const handleDeleteUser = async (id) => {
    const res = await callDeleteUser(id);
    message.success("Xóa user thành công ");
  };
  const handleCreateUser = async (value) => {
    const res = await callCreateUser(value);
    if (res.data) {
      message.success("tạo user thành công");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };
  const handleGetUserById = async (id) => {
    const res = await callGetUserById(id);
    console.log(res.data);
  };

  return (
    <UserTable
      // data={data}
      handleUpdateUser={handleUpdateUser}
      handleDeleteUser={handleDeleteUser}
      handleGetUser={handleGetUser}
      handleCreateUser={handleCreateUser}
      handleGetUserById={handleGetUserById}
    />
  );
};
