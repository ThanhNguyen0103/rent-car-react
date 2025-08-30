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
    const { current, pageSize, ...rest } = params;

    const query = {
      page: current,
      size: pageSize,
      ...rest,
      sort: sort
        ? Object.keys(sort)
            .map((key) => `${key},${sort[key] === "ascend" ? "asc" : "desc"}`)
            .join("") // &
        : undefined,
    };

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
    return res;
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
