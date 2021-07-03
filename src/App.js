import { useEffect, useState } from 'react';

const LAUNCHES_QUERY = `
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

export default function App() {
  const launches = useLaunches();

  return (
    <div>
      <h1>SpaceX Launches</h1>
      <ul>
        {launches.map((launch) => (
          <li key={launch.id}>{launch.mission_name}</li>
        ))}
      </ul>
    </div>
  );
}

function useLaunches() {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    fetch(`https://api.spacex.land/graphql/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: LAUNCHES_QUERY }),
    })
      .then((response) => response.json())
      .then((data) => setLaunches(data.data.launchesPast));
  }, []);

  return launches;
}
