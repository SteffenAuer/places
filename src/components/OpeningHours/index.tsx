import styled from '@emotion/styled';
import { Typography } from '@mui/material';

import startCase from 'lodash/startCase';
import { useMemo } from 'react';
import { dayOrders } from '../../utilities/days';

export interface OpeningHoursWeek {
  startDay: number;
  endDay: number;
  hours: OpeningHours[];
}

interface IOpeningHoursProps {
  place: Place;
}

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
    const openingHoursDays: OpeningHoursWeek[] = [];

    for (let day = 0; day < dayOrders.length; day++) {
      const placeOpeningHours: OpeningHours[] | undefined =
        place.openingHours.days?.[dayOrders[day]];

      const daysToAppend = openingHoursDays.find(({ hours, endDay }) => {
        return (
          endDay === day - 1 &&
          hours.length === (placeOpeningHours?.length ?? 0) &&
          hours.every((openingHours) =>
            placeOpeningHours.some(
              ({ start, end }) =>
                start === openingHours.start && end === openingHours.end
            )
          )
        );
      });

      if (daysToAppend) {
        daysToAppend.endDay++;
      } else {
        openingHoursDays.push({
          startDay: day,
          endDay: day,
          hours: placeOpeningHours ?? [],
        });
      }
    }

    return openingHoursDays;
  }, [place.openingHours.days]);

  return (
    <>
      {openingHours.map(({ startDay, endDay, hours }, index) => (
        <DayOpeningHoursContainer key={startDay + endDay + index}>
          <Typography variant="body1">
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
              hours.map((opening, index) => (
                <Typography key={startDay + endDay + index} variant="body1">
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
