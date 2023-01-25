import { useEffect, useState } from 'react';
import PlacesPanel from './components/PlacesPanel';
import { getPlaceById } from './services/api';

const placeIds = ['GXvPAor1ifNfpF0U5PTG0w', 'ohGSnJtMIC5nPfYRi_HTAg'];

function App() {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    console.log('fetching');

    Promise.all(placeIds.map(getPlaceById)).then((placesResponse) => {
      setPlaces(placesResponse.filter((place) => !!place) as Place[]);
    });
  }, []);
  console.log(places);

  return <PlacesPanel places={places} />;
}

export default App;
