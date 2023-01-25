import styled from '@emotion/styled';
import { Typography } from '@mui/material';

import startCase from 'lodash/startCase';
import { useMemo } from 'react';

export interface OpeningHoursWeek {
  startDay: number;
  endDay: number;
  hours: OpeningHours[];
}

interface IOpeningHoursProps {
  place: Place;
}

const dayOrders: (keyof typeof Day)[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const DayOpeningHoursContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 5px 0px;
`;

const DayTimesContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const OpeningHours: React.FC<IOpeningHoursProps> = ({ place }) => {
  const openingHours: OpeningHoursWeek[] = useMemo(() => {
    const hours: OpeningHoursWeek[] = [];

    for (let day = 0; day < dayOrders.length; day++) {
      const placeOpeningHours: OpeningHours[] | undefined =
        place.openingHours.days?.[dayOrders[day]];

      const hoursToAppend = hours.find(({ hours, endDay }) => {
        return (
          endDay === day - 1 &&
          hours.length > 0 &&
          hours.every(
            (openingHours, i) =>
              placeOpeningHours?.[i]?.start === openingHours.start &&
              placeOpeningHours?.[i]?.end === openingHours.end
          )
        );
      });

      if (hoursToAppend) {
        hoursToAppend.endDay++;
      } else {
        hours.push({
          startDay: day,
          endDay: day,
          hours: placeOpeningHours ?? [],
        });
      }
    }

    return hours;
  }, [place.openingHours.days]);

  return (
    <>
      {openingHours.map(({ startDay, endDay, hours }) => (
        <DayOpeningHoursContainer>
          <Typography variant="body1" key={startDay + endDay}>
            {Array.from(new Set([startDay, endDay]))
              .map((day) => startCase(dayOrders[day]))
              .join(' – ')}
          </Typography>

          <DayTimesContainer>
            {hours.length === 0 ? (
              <Typography key={startDay + endDay} variant="body1">
                Closed
              </Typography>
            ) : (
              hours.map((opening) => (
                <Typography key={startDay + endDay} variant="body1">
                  {opening.start} – {opening.end}
                </Typography>
              ))
            )}
          </DayTimesContainer>
        </DayOpeningHoursContainer>
      ))}
    </>
  );
};

export default OpeningHours;