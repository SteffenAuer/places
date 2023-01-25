import axiosLib from 'axios';

const axios = axiosLib.create({
  baseURL: 'http://localhost/api/',
  timeout: 1000,
});

export async function getPlaceById(id: string): Promise<Place | null> {
  try {
    const response = (await axios.get<ApiPlace>(`/places/${id}`)).data;

    const days = Object.entries(response.opening_hours.days).reduce(
      (acc, [dayName, hours]) => {
        return { ...acc, [dayName]: hours };
      },
      {} as { [key in keyof typeof Day]: OpeningHours[] }
    );

    const place: Place = {
      id: response.local_entry_id,
      name: response.displayed_what,
      address: response.displayed_where,
      openingHours: { days },
    };

    return place;
  } catch {
    return null;
  }
}
