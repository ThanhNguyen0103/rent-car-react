import { message, notification } from "antd";
import CarTable from "../../../components/admin/car-table";
import {
  callCreateCar,
  callDeleteCar,
  callGetCar,
  callGetCarById,
  callUpdateCar,
} from "../../../service/service-api";

const CarPage = () => {
  const handleGetCar = async (params, sort, filter) => {
    let page = params.current;
    let size = params.pageSize;
    let sortField = Object.keys(sort)[0];
    let sortOrder = "";
    // if (sortField === "fullName") {
    //   sortOrder =
    //     sort[sortField] === "ascend"
    //       ? "&sort=fullName,asc"
    //       : "&sort=fullName,desc";
    // }
    // if (sortField === "createdAt") {
    //   sortOrder =
    //     sort[sortField] === "ascend"
    //       ? "&sort=createdAt,asc"
    //       : "&sort=createdAt,desc";
    // }

    // let query = `page=${page}&size=${size}${sortOrder}`;

    let query = `page=${page}&size=${size}`;
    const res = await callGetCar(query);
    return res.data;
  };
  const handleUpdateCar = async (value) => {
    const res = await callUpdateCar(value);
    if (res.data) {
      message.success("Cập nhật xe thành công");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };
  const handleCreateCar = async (value) => {
    const res = await callCreateCar(value);

    if (res.data) {
      message.success("tạo mới xe thành công");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };
  const handleDeleteCar = async (id) => {
    const res = await callDeleteCar(id);
    if (res) {
      message.success("Xóa xe thành công ");
    }
  };
  const handleGetCarById = async (id) => {
    const res = await callGetCarById(id);
    return res;
  };

  return (
    <>
      <CarTable
        handleUpdateCar={handleUpdateCar}
        handleDeleteCar={handleDeleteCar}
        handleGetCar={handleGetCar}
        handleCreateCar={handleCreateCar}
        handleGetCarById={handleGetCarById}
      />
    </>
  );
};
export default CarPage;
