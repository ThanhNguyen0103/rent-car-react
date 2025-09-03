import {
  callCreateCarModel,
  callDeleteCarModel,
  callGetCarModel,
  callGetCarModelById,
  callUpdateCarModel,
} from "../../../service/service-api";
import CarModelTable from "../../../components/admin/car-model-table";
import { message, notification } from "antd";

const CarModelPage = () => {
  const handleGetCarModel = async (params, sort, filter) => {
    let page = params.current;
    let size = params.pageSize;
    let sortField = Object.keys(sort)[0];
    let sortOrder = "";

    let query = `page=${page}&size=${size}`;
    const res = await callGetCarModel(query);
    console.log(res);
    return res.data;
  };
  const handleUpdateCarModel = async (value) => {
    const res = await callUpdateCarModel(value);
    if (res.data) {
      message.success("Cập nhật xe thành công");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };
  const handleCreateCarModel = async (value) => {
    const res = await callCreateCarModel(value);

    if (res.data) {
      message.success("tạo mới xe thành công");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };
  const handleDeleteCarModel = async (id) => {
    const res = await callDeleteCarModel(id);
    if (res) {
      message.success("Xóa xe thành công ");
    }
  };
  const handleGetCarModelById = async (id) => {
    const res = await callGetCarModelById(id);
    return res;
  };

  return (
    <>
      <CarModelTable
        handleUpdateCarModel={handleUpdateCarModel}
        handleDeleteCarModel={handleDeleteCarModel}
        handleCreateCarModel={handleCreateCarModel}
        handleGetCarModelById={handleGetCarModelById}
        handleGetCarModel={handleGetCarModel}
      />
    </>
  );
};
export default CarModelPage;
