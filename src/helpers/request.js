import axios from 'axios';

const responseFormatter = (status, data, error) => {
  return { status, data, error };
};

export const postReq = async (url, data) => {
  return await axios.post(url, data, {
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch(e => {
      if (e.response.data.length > 0) {
        return responseFormatter(false, null, e.response.data);
      } else {
        return responseFormatter(false, null, e.response.data);
      }
    });
};

export const getReq = async (url) => {
  return await axios.get(url,
    {
      headers:
      {
        Accept: 'application/json',
      },
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch(e => {
      if (e.response.data.length > 0) {
        return responseFormatter(false, null, e.response.data);
      } else {
        return responseFormatter(false, null, e.response.data);
      }
    });
};


