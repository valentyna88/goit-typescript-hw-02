import axios from 'axios';
import { ApiResponse } from './apiTypes';

const API_KEY = 'qSg347jVb1hWhhBVkTz2gPP9EKim76v11DHuIY7tt8M';
axios.defaults.baseURL = 'https://api.unsplash.com/';

const fetchImages = async (
  query: string,
  page: number
): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>('/search/photos', {
    params: {
      query,
      page,
      per_page: 20,
      orientation: 'landscape',
      client_id: API_KEY,
    },
  });

  return response.data;
};

export default fetchImages;
