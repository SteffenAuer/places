enum Day {
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
}

declare interface OpeningHours {
  start: string;
  end: string;
}

type OpenType = 'Open' | 'CLOSED';

declare interface ApiPlace {
  displayed_what: string;
  displayed_where: string;
  local_entry_id: string;
  opening_hours: {
    days: {
      [key in
        | 'monday'
        | 'tuesday'
        | 'wednesday'
        | 'thursday'
        | 'friday'
        | 'saturday'
        | 'sunday']: { start: string; end: string; type: OpenType }[];
    };
    closed_on_holidays: boolean;
    open_by_arrangement: boolean;
  };
}

declare interface Place {
  id: string;
  name: string;
  address: string;
  openingHours: {
    days: {
      [key in keyof typeof Day]: OpeningHours[];
    };
  };
}
