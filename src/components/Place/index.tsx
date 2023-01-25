import styled from '@emotion/styled';
import { ExpandMoreRounded } from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  Link,
  Typography,
} from '@mui/material';

import { useState } from 'react';
import OpeningHours from '../OpeningHours';

const StyledCard = styled(Card)`
  margin: 10px 20px;
  min-width: 400px;
`;

const StyledCardActions = styled(CardActions)`
  justify-content: flex-end;
  padding: 0px;
`;

const PhoneNumbersContainer = styled.div`
  padding: 5px 0px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const ExpandMoreButton = styled(IconButton)<{ expanded: boolean }>`
  transform: ${({ expanded }) =>
    expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

interface IPlaceProps {
  place: Place;
}

const Place: React.FC<IPlaceProps> = ({ place }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const phoneNumbers = place.addresses?.[0]?.contacts
    ?.filter((contact) => contact.contact_type === 'phone')
    ?.map((contact) => contact.formatted_service_code);

  const urlContact = place.addresses?.[0]?.contacts?.filter(
    (contact) => contact.contact_type === 'url'
  )?.[0];

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5">{place.name}</Typography>

        <Typography variant="subtitle1" color="text.secondary">
          {place.address}
        </Typography>

        <Link variant="subtitle2" href={urlContact.url}>
          {urlContact.formatted_service_code}
        </Link>

        <StyledCardActions disableSpacing>
          <ExpandMoreButton onClick={toggleExpanded} expanded={expanded}>
            <ExpandMoreRounded />
          </ExpandMoreButton>
        </StyledCardActions>
      </CardContent>

      <Collapse in={expanded} timeout="auto">
        <Divider variant="middle" />

        <CardContent>
          <Typography variant="h6">Contact</Typography>

          <PhoneNumbersContainer>
            {phoneNumbers.map((phoneNumber) => (
              <Typography variant="body1">{phoneNumber}</Typography>
            ))}
          </PhoneNumbersContainer>

          <Typography variant="h6">Opening Hours</Typography>

          <OpeningHours place={place} />
        </CardContent>
      </Collapse>
    </StyledCard>
  );
};

export default Place;
