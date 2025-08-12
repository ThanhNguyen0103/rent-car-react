import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import { Button, Divider, Dropdown, Space, Tag } from "antd";
import React, { useRef } from "react";
export const waitTimePromise = async (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export const waitTime = async (time = 100) => {
  await waitTimePromise(time);
};

const Dashboard = () => {
  return <div>dashboard</div>;
};

export default Dashboard;
