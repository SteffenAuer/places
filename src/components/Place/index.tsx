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

import { useMemo, useState } from 'react';
import {
  dayOrders,
  getIsNextOpeningHours,
  getIsOpen,
} from '../../utilities/days';
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

const HeaderContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
  justify-content: space-between;
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

  const [isOpen, openString] = useMemo(() => {
    // const date = new Date(2023, 0, 30, 14, 35);
    const date = new Date();
    const currentDay = date.getDay();

    const currentDayStr = dayOrders?.[(currentDay + 6) % 7] ?? 'monday';

    const openingHours = place.openingHours.days[currentDayStr];

    const isOpenHours = openingHours?.find((openingHour) =>
      getIsOpen(date, openingHour.start, openingHour.end)
    );

    console.log(isOpenHours);

    let openString = '';
    if (!!isOpenHours) {
      openString = `Closes at ${isOpenHours.end}`;
    } else {
      let nextOpeningHours,
        dayCounter = 0;

      nextOpeningHours = openingHours?.find((currentDayOpeningHours) =>
        getIsNextOpeningHours(date, currentDayOpeningHours.start)
      );

      if (!nextOpeningHours) {
        for (let i = 0; i < 6; i++) {
          const nextDayStr = dayOrders?.[(currentDay + i + 1) % 7] ?? 'monday';
          nextOpeningHours = place.openingHours.days[nextDayStr]?.[0];

          if (nextOpeningHours) {
            dayCounter = i + 1;
            break;
          }
        }
      }

      if (!nextOpeningHours) {
        openString = 'Permanently Closed';
      } else {
        const dayString =
          dayCounter > 0
            ? `in ${dayCounter} day${dayCounter === 1 ? '' : 's'}`
            : '';
        openString = `Opens ${dayString} at ${nextOpeningHours.start}`;
      }
    }

    return [!!isOpenHours, openString];
  }, [place.openingHours]);

  return (
    <StyledCard>
      <CardContent>
        <HeaderContainer>
          <Typography variant="h5">{place.name}</Typography>
          <Typography variant="body1" color={isOpen ? 'green' : 'red'}>
            {openString}
          </Typography>
        </HeaderContainer>

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
              <Typography variant="body1" key={phoneNumber}>
                {phoneNumber}
              </Typography>
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
