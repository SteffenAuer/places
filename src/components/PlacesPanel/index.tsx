import styled from '@emotion/styled';
import Place from '../Place';

const Panel = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

interface PanelProps {
  places: Place[];
}

const PlacesPanel: React.FC<PanelProps> = ({ places }) => {
  return (
    <Panel>
      {places.map((place) => (
        <Place place={place} key={place.id} />
      ))}
    </Panel>
  );
};

export default PlacesPanel;
