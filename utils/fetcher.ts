import axios from 'axios';

const fetcher = async (url: string) => {
  const axiosResponse = await axios.get(url);
  return axiosResponse.data;
};

export default fetcher;
