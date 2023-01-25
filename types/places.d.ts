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

type Address = {
  contacts: {
    _class: string;
    contact_type: 'url' | 'phone';
    service_code: string;
    formatted_service_code: string;
    preferred: booolean;
    url?: string;
    phone_number?: string;
    id: string;
  }[];
};

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
  addresses: Address[];
}

declare interface Place {
  id: string;
  name: ApiPlace['displayed_what'];
  address: ApiPlace['displayed_where'];
  openingHours: {
    days: {
      [key in keyof typeof Day]: OpeningHours[];
    };
  };
  addresses: ApiPlace['addresses'];
}
