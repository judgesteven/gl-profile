export interface Level {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  ordinal: number;
}

export interface Player {
  tags: string[];
  category: string;
  imgUrl: string;
  isAvailable: boolean;
  points: number;
  credits: number;
  team: string;
  level: Level;
  player: string;
  name: string;
  createdOn: string;
}

export interface TeamData {
  description: string;
  imgUrl: string;
  category: string;
  tags: string[];
  isAvailable: boolean;
  points: number;
  credits: number;
  level: Level;
  id: string;
  name: string;
  account: string;
  createdOn: string;
}

export interface TeamResponse {
  team: TeamData;
} 