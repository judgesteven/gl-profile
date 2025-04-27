export interface Level {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  ordinal: number;
}

export interface Event {
  id: string;
  name: string;
  description: string;
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  points: number;
  credits: number;
  isAvailable: boolean;
  category: string;
  tags: string[];
  createdOn: string;
  priority: number;
  timeToComplete: number;
  timeToRestart: number;
  objective: Event;
  reward?: {
    points: number;
    credits: number;
  };
  active?: {
    to: string;
  };
}

export interface MissionResponse {
  player: {
    id: string;
    name: string;
  };
  missions: {
    [key: string]: Mission;
  };
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