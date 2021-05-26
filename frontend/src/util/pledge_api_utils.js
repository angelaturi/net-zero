import axios from 'axios'

export const patchPledge = ({ id, ...rest }) => {
    return axios.patch(`/api/pledges/${id}`, rest)
}

export const createPledge = (data) => {
  return axios.post(`/api/pledges`, data);
};