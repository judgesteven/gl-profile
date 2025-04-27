import { useEffect, useState } from 'react';
import { getAvailableMissions } from '../services/gamelayerApi';
import { Mission } from '../types/gamelayer';

const PLAYER_ID = 'MmVmnDPMQRQj9wQRSrCEMdnpE212';

export const Missions = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await getAvailableMissions(PLAYER_ID);
        console.log('Raw missions response:', response);
        
        if (response && response.missions) {
          // Log the missions object structure
          console.log('Missions object:', response.missions);
          console.log('Missions object type:', typeof response.missions);
          console.log('Missions object keys:', Object.keys(response.missions));
          
          // Convert missions object to array
          const missionsArray = Object.entries(response.missions).map(([id, mission]) => {
            console.log('Processing mission:', id, mission);
            return {
              ...mission,
              id
            };
          });
          
          console.log('Converted missions array:', missionsArray);
          
          // Sort missions by priority
          const sortedMissions = missionsArray.sort((a, b) => a.priority - b.priority);
          console.log('Sorted missions:', sortedMissions);
          
          setMissions(sortedMissions);
        } else {
          console.log('No missions available in response:', response);
          setMissions([]);
        }
      } catch (err) {
        console.error('Error in fetchMissions:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="missions-card">
          <div className="loading-skeleton" style={{ width: '100%', height: '200px' }} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="missions-card">
          <div className="missions-header">
            <h2 style={{ color: 'red', textAlign: 'center' }}>Error</h2>
            <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!missions || missions.length === 0) {
    return (
      <div className="container">
        <div className="missions-card">
          <p style={{ textAlign: 'center', color: '#86868B' }}>No missions available at the moment</p>
        </div>
      </div>
    );
  }

  // Filter missions by priority
  const priority1Missions = missions.filter(mission => mission.priority === 1);
  const priority2Missions = missions.filter(mission => mission.priority === 2);

  console.log('Priority 1 missions:', priority1Missions);
  console.log('Priority 2 missions:', priority2Missions);

  return (
    <div className="container">
      <div className="missions-card">
        <div className="missions-list">
          {priority1Missions.map((mission) => (
            <div key={mission.id} className="mission-item" data-priority={mission.priority}>
              <div className="mission-image">
                <img src={mission.imgUrl} alt={mission.name} />
                <span className="category-badge">{mission.category || 'General'}</span>
              </div>
              <div className="mission-content">
                <h3>{mission.name}</h3>
                <p>{mission.description}</p>
                <div className="mission-rewards">
                  <span className="points-badge">
                    {mission.reward?.points || 0} Points
                  </span>
                  <span className="credits-badge">
                    {mission.reward?.credits || 0} Credits
                  </span>
                </div>
                <div className="mission-meta">
                  <span className="mission-time">
                    {mission.active?.to ? (
                      <span 
                        className={`clock-icon ${(() => {
                          const daysRemaining = Math.ceil((new Date(mission.active.to).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                          if (daysRemaining <= 7) return 'clock-red';
                          if (daysRemaining <= 14) return 'clock-amber';
                          return 'clock-green';
                        })()}`}
                        title={`Expires in ${Math.ceil((new Date(mission.active.to).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    ) : (
                      mission.timeToComplete > 0 ? `${mission.timeToComplete} min` : 'No time limit'
                    )}
                  </span>
                </div>
                {mission.objective && (
                  <button className="mission-objective-button">
                    {mission.objective.name}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="priority-2-container">
          {priority2Missions.map((mission) => (
            <div key={mission.id} className="mission-item" data-priority={mission.priority}>
              <div className="mission-image">
                <img src={mission.imgUrl} alt={mission.name} />
                <span className="category-badge">{mission.category || 'General'}</span>
              </div>
              <div className="mission-content">
                <h3>{mission.name}</h3>
                <p title={mission.description}>
                  {mission.description.length > 100 
                    ? `${mission.description.substring(0, 100)}...` 
                    : mission.description}
                </p>
                <div className="mission-rewards">
                  <span className="points-badge">
                    {mission.reward?.points || 0} Points
                  </span>
                  <span className="credits-badge">
                    {mission.reward?.credits || 0} Credits
                  </span>
                </div>
                <div className="mission-meta">
                  <span className="mission-time">
                    {mission.active?.to ? (
                      <span 
                        className={`clock-icon ${(() => {
                          const daysRemaining = Math.ceil((new Date(mission.active.to).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                          if (daysRemaining <= 7) return 'clock-red';
                          if (daysRemaining <= 14) return 'clock-amber';
                          return 'clock-green';
                        })()}`}
                        title={`Expires in ${Math.ceil((new Date(mission.active.to).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    ) : (
                      mission.timeToComplete > 0 ? `${mission.timeToComplete} min` : 'No time limit'
                    )}
                  </span>
                </div>
                {mission.objective && (
                  <button className="mission-objective-button">
                    {mission.objective.name}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 