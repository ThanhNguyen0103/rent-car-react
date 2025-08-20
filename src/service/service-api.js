import instance from "./service-api-custom";

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
export const callGetUser = (query) => {
  return instance.get(`/api/v1/users?${query}`);
  // return instance.get(`/api/v1/users`);
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
  return instance.get(`/api/v1/cars?${query}`);
  // return instance.get(`/api/v1/users`);
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
  return instance.get(`/api/v1/car-models?${query}`);
  // return instance.get(`/api/v1/users`);
};
// export const callUpLoadFile = (formData) => {
//   return instance.post("/files/upload", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
// };
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
  // return instance.get(`/api/v1/users`);
};
