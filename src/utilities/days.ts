const dayOrders: (keyof typeof Day)[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

function getIsOpen(
  date: Date,
  openingHourStart: string,
  openingHourEnd: string
): boolean {
  const currentHour = date.getHours();
  const currentMinute = date.getMinutes();

  const openingHourSplit = openingHourStart.split(':');
  const endHourSplit = openingHourEnd.split(':');

  const startHour = parseInt(openingHourSplit[0]);
  const startMinute = parseInt(openingHourSplit[1]);

  const endHour = parseInt(endHourSplit[0]);
  const endMinute = parseInt(endHourSplit[1]);

  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  const currentMinutes = currentHour * 60 + currentMinute;

  return startMinutes <= currentMinutes && endMinutes > currentMinutes;
}

function getIsNextOpeningHours(date: Date, openingHourStart: string): boolean {
  const currentHour = date.getHours();
  const currentMinute = date.getMinutes();

  const openingHourSplit = openingHourStart.split(':');

  const startHour = parseInt(openingHourSplit[0]);
  const startMinute = parseInt(openingHourSplit[1]);

  const startMinutes = startHour * 60 + startMinute;

  const currentMinutes = currentHour * 60 + currentMinute;

  return startMinutes > currentMinutes;
}

export { dayOrders, getIsOpen, getIsNextOpeningHours };
