import api from "../api";

const getAllEmployees = () => {
  return api.get(`employees`);
};

const createEmployee = (emp) => {
  return api.post(`/employees`, emp);
};

const updateEmployee = (id, emp) => {
  return api.put(`/employees/${id}`, emp);
};

const deleteEmployee = (id) => {
  return api.delete(`/employees/${id}`);
};

export { getAllEmployees, createEmployee, updateEmployee, deleteEmployee };
