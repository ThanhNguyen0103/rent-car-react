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
