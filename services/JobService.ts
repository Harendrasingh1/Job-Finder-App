import { ApiResponse } from '@/types/job';

const BASE_URL = 'https://testapi.getlokalapp.com/common/jobs';

export const fetchJobs = async (page: number): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${BASE_URL}?page=${page}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching jobs: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    throw error;
  }
};