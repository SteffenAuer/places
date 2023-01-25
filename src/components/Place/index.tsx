import styled from '@emotion/styled';
import {
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Divider,
  Typography,
} from '@mui/material';

import { useState } from 'react';
import OpeningHours from '../OpeningHours';

const StyledCard = styled(Card)`
  margin: 0px 20px;
  min-width: 400px;
`;

interface IPlaceProps {
  place: Place;
}

const Place: React.FC<IPlaceProps> = ({ place }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <StyledCard>
      <CardActionArea onClick={toggleExpanded}>
        <CardContent>
          <Typography variant="h5">{place.name}</Typography>

          <Typography variant="body1" color="text.secondary">
            {place.address}
          </Typography>
        </CardContent>

        <Collapse in={expanded} timeout="auto">
          <Divider variant="middle" />

          <CardContent>
            <Typography variant="h6">Opening Hours</Typography>

            <OpeningHours place={place} />
          </CardContent>
        </Collapse>
      </CardActionArea>
    </StyledCard>
  );
};

export default Place;
