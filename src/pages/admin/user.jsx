import { Button, Form, Input, message, Modal, Space, Table, Tag } from "antd";
import {
  callDeleteUser,
  callGetUser,
  callGetUserById,
  callUpdateUser,
} from "../../service/service-api";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UserTable from "../../components/admin/user-table";

export const UserPage = () => {
  const [data, setData] = useState();
  const [reload, setReload] = useState(false);
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
    setReload((prev) => !prev);
  };
  const handleGetUser = async (params, sort, filter) => {
    let page = params.current;
    let size = params.pageSize;

    // let sortField = Object.keys(sort)[0];
    // let sortOrder = sort[sortField] === "ascend" ? "asc" : "desc";
    // console.log(sortOrder);

    const query = `page=${page}&size=${size}`;
    const res = await callGetUser(query);
    if (res.data && res.data.result) {
      setData(res.data.result);
    }
    return res.data;
  };
  const handleDeleteUser = async (id) => {
    const res = await callDeleteUser(id);
    message.success("Xóa user thành công ");
    setReload((prev) => !prev);
  };

  return (
    <UserTable
      data={data}
      handleUpdateUser={handleUpdateUser}
      handleDeleteUser={handleDeleteUser}
      handleGetUser={handleGetUser}
      setReload={setReload}
    />
  );
};
