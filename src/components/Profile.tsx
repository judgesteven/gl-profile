import { useEffect, useState } from 'react';
import { getPlayer, getTeam } from '../services/gamelayerApi';
import { Player, TeamData } from '../types/gamelayer';

const PLAYER_ID = 'MmVmnDPMQRQj9wQRSrCEMdnpE212';

export const Profile = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [team, setTeam] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playerData = await getPlayer(PLAYER_ID);
        console.log('Player data:', JSON.stringify(playerData, null, 2));
        setPlayer(playerData);
        
        if (playerData.team) {
          const teamResponse = await getTeam(playerData.team);
          console.log('Team data:', JSON.stringify(teamResponse, null, 2));
          setTeam(teamResponse.team);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="loading-skeleton" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
            <div className="loading-skeleton" style={{ width: '200px', height: '24px' }} />
            <div className="loading-skeleton" style={{ width: '100px', height: '20px' }} />
          </div>
          <div className="stats-container">
            <div className="loading-skeleton" style={{ width: '80px', height: '80px' }} />
            <div className="loading-skeleton" style={{ width: '80px', height: '80px' }} />
            <div className="loading-skeleton" style={{ width: '80px', height: '80px' }} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="profile-card">
          <div className="profile-header">
            <h2 style={{ color: 'red', textAlign: 'center' }}>Error</h2>
            <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!player) {
    return null;
  }

  return (
    <div className="container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-container">
            <img
              src={player.imgUrl}
              alt={player.name}
              className="profile-avatar"
            />
            <div className="level-badge" title={`75% to Level ${player.level.ordinal + 1}`}>
              <svg className="level-badge-ring" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#8A2BE2"
                  strokeWidth="2"
                  strokeDasharray="75, 100"
                />
              </svg>
              <span className="level-number">{player.level.ordinal}</span>
            </div>
          </div>
          
          <div className="profile-info">
            <h1 className="profile-name">{player.name}</h1>
            
            {team && (
              <div className="team-name">
                <span>{team.name}</span>
                <img src={team.imgUrl} alt={team.name} className="team-logo" />
              </div>
            )}

            <div className="badges-container">
              <span className="points-badge">
                {player.points} Points
              </span>
              <span className="credits-badge">
                {player.credits} Credits
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 