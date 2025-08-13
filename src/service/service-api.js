import instance from "./service-api-custom";

// module user
export const callCreateUser = (name, address, description, age) => {
  return instance.post("/api/v1/users", { name, address, age, description });
};
export const callUpdateUser = (id, name, address, description, age) => {
  return instance.put("/api/v1/users", { id, name, address, age, description });
};
export const callDeleteUser = (id) => {
  return instance.delete(`/api/v1/users/${id}`);
};
export const callGetUserById = (id) => {
  return instance.get(`/api/v1/users/${id}`);
};
export const callGetUser = (query) => {
  return instance.get(`/api/v1/users?${query}`);
};
