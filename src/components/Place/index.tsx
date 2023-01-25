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

const PhoneNumbersContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

interface IPlaceProps {
  place: Place;
}

const Place: React.FC<IPlaceProps> = ({ place }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const phoneNumbers = place.addresses?.[0]?.contacts
    ?.filter((contact) => contact.contact_type === 'phone')
    .map((contact) => contact.formatted_service_code);

  return (
    <StyledCard>
      <CardActionArea onClick={toggleExpanded}>
        <CardContent>
          <Typography variant="h5">{place.name}</Typography>

          <Typography variant="subtitle1" color="text.secondary">
            {place.address}
          </Typography>

          <PhoneNumbersContainer>
            {phoneNumbers.map((phoneNumber) => (
              <Typography variant="body2">{phoneNumber}</Typography>
            ))}
          </PhoneNumbersContainer>
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
