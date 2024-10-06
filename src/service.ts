import { API, HEADERS } from "./constants";
import { AirPort, ApiResult, FlightParams, Flights } from "./model";

export async function searchAirport(
  query: string
): Promise<ApiResult<AirPort[]>> {
  const response = await fetch(`${API}/searchAirport?query=${query}`, {
    method: "GET",
    headers: HEADERS,
  });
  const data = await response.json();
  return data;
}

export async function searchFlights(
  query: FlightParams
): Promise<ApiResult<Flights>> {
  const params = searchFlightParams(query);
  const url = new URL(`${API}/searchFlights`);
  url.search = params.toString();

  const response = await fetch(url, {
    method: "GET",
    headers: HEADERS,
  });
  const data = await response.json();
  return data;
}

function searchFlightParams(query: FlightParams) {
  const params = new URLSearchParams();

  params.set("originSkyId", query.from.skyId);
  params.set("destinationSkyId", query.to.skyId);
  params.set("originEntityId", query.from.entityId);
  params.set("destinationEntityId", query.to.entityId);
  params.set("date", query.date);
  params.set("returnDate", query.returnDate);
  params.set("cabinClass", query.cabinClass);
  if (query.adults > 0) params.set("adults", query.adults.toString());
  if (query.children > 0) params.set("childrens", query.children.toString());
  if (query.infants > 0) params.set("infants", query.infants.toString());

  params.set("sortBy", query.sortBy);

  return params;
}
