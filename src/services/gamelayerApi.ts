import axios from 'axios';
import { Player, TeamResponse } from '../types/gamelayer';

const API_BASE_URL = 'https://api.gamelayer.co/api/v0';
const API_KEY = '4cb261227289f22693e1c8e634fa99cf';
const ACCOUNT_NAME = 'new-account-content';

// Try different header formats
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': API_KEY,
  'x-api-key': API_KEY,
  'Authorization': `Bearer ${API_KEY}`,
  'X-API-Key': API_KEY
};

export const getPlayer = async (playerId: string): Promise<Player> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/players/${playerId}?account=${ACCOUNT_NAME}`, { 
      headers,
      validateStatus: (status) => status < 500
    });
    
    console.log('Raw player response:', response);
    
    if (response.status === 401) {
      throw new Error('Unauthorized: Please check your API key');
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Unauthorized: Please check your API key');
      }
      throw new Error(`API Error: ${error.message}`);
    }
    throw error;
  }
};

export const getTeam = async (teamId: string): Promise<TeamResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teams/${teamId}?account=${ACCOUNT_NAME}`, { 
      headers,
      validateStatus: (status) => status < 500
    });
    
    console.log('Raw team response:', response);
    
    if (response.status === 401) {
      throw new Error('Unauthorized: Please check your API key');
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Unauthorized: Please check your API key');
      }
      throw new Error(`API Error: ${error.message}`);
    }
    throw error;
  }
}; 