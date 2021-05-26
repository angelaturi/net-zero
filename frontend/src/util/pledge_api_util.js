import axios from "axios";

export const getPledges = () => {
  return axios.get("/api/pledges");
};

export const getPledge = (id) => {
  return axios.get(`/api/pledges/${id}`);
}

export const getUserPledges = (id) => {
  return axios.get(`/api/pledges/user/${id}`);
};

export const createPledge = (data) => {
  return axios.post(`/api/pledges/`, data);
};

export const updatePledge = (data) => {
  return axios.patch(`/api/pledges/${data.id}`, data);
};

export const deletePledge = (id) => {
  return axios.delete(`/api/pledges/${id}`);
};
