import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { GITHUB_API_BASE_URL } from '../../../../config/urls';

export const getReposHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      // Dynamic params and queries after '?' are stored in req.query
      const { username, per_page } = req.query;
      if (!username) {
        return res.status(400).send({
          status: 'error',
          data: {},
          message: 'username dynamic parameter missing!'
        });
      }
      const usernameString = username as string;
      const url = `${GITHUB_API_BASE_URL}/users/${usernameString}/repos${ per_page ? `?per_page=${per_page}` : '' }`;
      const axiosResponse = await axios.get(url);
      return res.status(200).send({
        status: 'success',
        data: axiosResponse.data,
        message: 'User repositories have been successfully sent!'
      });
    }else {
      return res.status(501).send({
        status: 'error',
        data: {},
        message: 'Methot not implemented!'
      });
    }
  } catch(e) {
    return res.status(500).send({
      status: 'error',
      data: {},
      message: 'Internal error!'
    });
  }

}

export default getReposHandler;

