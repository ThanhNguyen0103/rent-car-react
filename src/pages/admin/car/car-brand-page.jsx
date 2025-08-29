import { message } from "antd";
import CarBrandTable from "../../../components/admin/car-brand-table";
import {
  callCreateCarBrand,
  callDeleteCarBrand,
  callGetCarBrand,
  callGetCarBrandById,
  callUpdateCarBrand,
} from "../../../service/service-api";
const CarBrandPage = () => {
  const handleGetCarBrand = async (params, sort, filter) => {
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
    const res = await callGetCarBrand(query);
    return res.data;
  };
  const handleUpdateCarBrand = async (value) => {
    const res = await callUpdateCarBrand(value);
    if (res.data) {
      message.success("Cập nhật hãng thành công");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };
  const handleCreateCarBrand = async (value) => {
    const res = await callCreateCarBrand(value);

    if (res.data) {
      message.success("tạo mới hãng xe thành công");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };
  const handleDeleteCarBrand = async (id) => {
    const res = await callDeleteCarBrand(id);
    if (res) {
      message.success("Xóa hãng thành công ");
    }
  };
  const handleGetCarBrandById = async (id) => {
    const res = await callGetCarBrandById(id);
    return res;
  };

  return (
    <CarBrandTable
      handleUpdateCarBrand={handleUpdateCarBrand}
      handleDeleteCarBrand={handleDeleteCarBrand}
      handleCreateCarBrand={handleCreateCarBrand}
      handleGetCarBrandById={handleGetCarBrandById}
      handleGetCarBrand={handleGetCarBrand}
    />
  );
};
export default CarBrandPage;
