import { Image } from '../types';

export interface ApiResponse {
  results: Image[];
  total_pages: number;
}
