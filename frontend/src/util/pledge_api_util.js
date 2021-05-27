import axios from "axios";

export const getPledges = () => {
  return axios.get("/api/pledges");
};

export const getPledge = (pledgeId) => {
  return axios.get(`/api/pledges/${pledgeId}`);
}

export const getUserPledges = (userId) => {
  return axios.get(`/api/pledges/user/${userId}`);
};

export const createPledge = (pledge) => {
  return axios.post(`/api/pledges/`, pledge);
};

export const updatePledge = (pledge) => {
  return axios.patch(`/api/pledges/${pledge.id}`, pledge);
};

export const deletePledge = (pledgeId) => {
  return axios.delete(`/api/pledges/${pledgeId}`);
};

export const patchPledge = ({ pledgeId, ...rest }) => {
  return axios.patch(`/api/pledges/${pledgeId}`, rest);
};

export const followPledge = (pledgeId) => {
  return axios.post(`/api/pledges/follow/${pledgeId}`);
}