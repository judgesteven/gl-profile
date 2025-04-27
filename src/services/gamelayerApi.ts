import axios from 'axios';
import { Player, TeamResponse, MissionResponse, Mission } from '../types/gamelayer';

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

export const getAvailableMissions = async (playerId: string): Promise<MissionResponse> => {
  try {
    // First get the player data to ensure we have the correct player ID
    const playerData = await getPlayer(playerId);
    console.log('Player data for missions:', playerData);
    
    // Then get the missions using the correct endpoint structure
    const response = await axios.get(`${API_BASE_URL}/missions?player-id=${playerId}&account=${ACCOUNT_NAME}`, { 
      headers,
      validateStatus: (status) => status < 500
    });
    
    console.log('Raw missions API response:', response);
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
    
    if (response.status === 401) {
      throw new Error('Unauthorized: Please check your API key');
    }
    
    // Handle 404 case gracefully
    if (response.status === 404) {
      console.log('No missions found for player:', playerId);
      return {
        player: { id: playerId, name: playerData.name },
        missions: {}
      };
    }
    
    // Check if the response has the expected structure
    if (!response.data || !Array.isArray(response.data)) {
      console.error('Invalid response data structure:', response.data);
      return {
        player: { id: playerId, name: playerData.name },
        missions: {}
      };
    }
    
    // Convert array to object with mission IDs as keys
    const missionsObject = response.data.reduce((acc, mission) => {
      acc[mission.id] = mission;
      return acc;
    }, {} as { [key: string]: Mission });
    
    console.log('Converted missions object:', missionsObject);
    
    // Return the full response including player data
    return {
      player: { id: playerId, name: playerData.name },
      missions: missionsObject
    };
  } catch (error) {
    console.error('Error fetching missions:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Unauthorized: Please check your API key');
      }
      if (error.response?.status === 404) {
        console.log('No missions found for player:', playerId);
        return {
          player: { id: playerId, name: '' },
          missions: {}
        };
      }
      throw new Error(`API Error: ${error.message}`);
    }
    throw error;
  }
}; 