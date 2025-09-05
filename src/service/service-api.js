import instance from "./service-api-custom";
import qs from "qs";
// module user
export const callCreateUser = (value) => {
  return instance.post("/api/v1/users", value);
};
export const callUpdateUser = (value) => {
  return instance.put("/api/v1/users", value);
};
export const callDeleteUser = (id) => {
  return instance.delete(`/api/v1/users/${id}`);
};
export const callGetUserById = (id) => {
  return instance.get(`/api/v1/users/${id}`);
};
export const callGetRentalByUserId = (id) => {
  return instance.get(`/api/v1/user/${id}/rentals`);
};
export const callGetUser = (query) => {
  return instance.get(`/api/v1/users`, {
    params: query,
  });
};
// --- module car
export const callCreateCar = (formData) => {
  return instance.post("/api/v1/cars", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const callUpdateCar = (formData) => {
  return instance.put("/api/v1/cars", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const callDeleteCar = (id) => {
  return instance.delete(`/api/v1/cars/${id}`);
};
export const callGetCarById = (id) => {
  return instance.get(`/api/v1/cars/${id}`);
};
export const callGetCar = (query) => {
  return instance.get(`/api/v1/cars`, {
    params: query,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "comma" }),
  });
};
// module car-model
export const callCreateCarModel = (value) => {
  return instance.post("/api/v1/car-models", value);
};
export const callUpdateCarModel = (value) => {
  return instance.put("/api/v1/car-models", value);
};
export const callDeleteCarModel = (id) => {
  return instance.delete(`/api/v1/car-models/${id}`);
};
export const callGetCarModelById = (id) => {
  return instance.get(`/api/v1/car-models/${id}`);
};
export const callGetCarModel = (query) => {
  return instance.get(`/api/v1/car-models`, {
    params: query,
  });
};

// --- module brands
export const callCreateCarBrand = (value) => {
  return instance.post("/api/v1/brands", value);
};
export const callUpdateCarBrand = (value) => {
  return instance.put("/api/v1/brands", value);
};
export const callDeleteCarBrand = (id) => {
  return instance.delete(`/api/v1/brands/${id}`);
};
export const callGetCarBrandById = (id) => {
  return instance.get(`/api/v1/brands/${id}`);
};
export const callGetCarBrand = (query) => {
  return instance.get(`/api/v1/brands?${query}`);
};
// --------- module rental
export const callCreateRental = (value) => {
  return instance.post("/api/v1/rentals", value);
};
export const callUpdateRental = (value) => {
  return instance.put("/api/v1/rentals", value);
};
export const callDeleteRental = (id) => {
  return instance.delete(`/api/v1/rentals/${id}`);
};
export const callGetRentalById = (id) => {
  return instance.get(`/api/v1/rentals/${id}`);
};
export const callGetRental = (query) => {
  return instance.get(`/api/v1/rentals`, {
    params: query,
  });
};
// ------ module auth
export const callApiLogin = (value) => {
  return instance.post("/api/v1/auth/login", value);
};
export const callGetAccount = () => {
  return instance.get("/api/v1/auth/account");
};
export const callGetRefreshToken = () => {
  return instance.get("/api/v1/auth/refresh");
};
export const callGetLogout = () => {
  return instance.get("/api/v1/auth/logout");
};
export const callRegister = (value) => {
  return instance.post("/api/v1/auth/register", value);
};
