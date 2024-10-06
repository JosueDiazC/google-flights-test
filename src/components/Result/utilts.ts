import { MULTI_AIRLINES_LOGO_URL } from "../../constants";
import { Itinerary, ItineraryProps, Segment } from "../../model";

export function getItineraryProps(itinerary: Itinerary): ItineraryProps {
  const hasStops = itinerary.legs[0].stopCount > 0;

  const isFullyOperated =
    itinerary.legs[0].carriers.operationType == "fully_operated";

  const hasOperating = itinerary.legs[0].carriers.operating != undefined;

  const marketingCarrierLogoUrl =
    itinerary.legs[0].carriers.marketing[0].logoUrl;

  const operatingCarrierLogoUrl = hasOperating
    ? itinerary.legs[0].carriers.operating![0].logoUrl
    : "";

  const finalLogo = marketingCarrierLogoUrl || operatingCarrierLogoUrl;

  const segments = itinerary.legs[0].segments;

  const hasDifferentCarriers = hasStops
    ? hasDifferentCarrierSegments(segments)
    : false;

  const company = itinerary.legs[0].carriers.marketing[0];

  return {
    id: itinerary.id,
    startTime: itinerary.legs[0].departure,
    endTime: itinerary.legs[0].arrival,
    image: hasDifferentCarriers
      ? MULTI_AIRLINES_LOGO_URL
      : isFullyOperated
      ? finalLogo
      : marketingCarrierLogoUrl,
    company: hasDifferentCarriers ? getCompanyNames(segments) : [company.name],
    totalTime: itinerary.legs[0].durationInMinutes,
    origin: itinerary.legs[0].origin.id,
    destination: itinerary.legs[0].destination.id,
    stops: segments,
    price: itinerary.price,
  };
}

function hasDifferentCarrierSegments(segments: Segment[]): boolean {
  const firstSegment = segments[0];
  const lastSegment = segments[segments.length - 1];

  return (
    firstSegment.marketingCarrier.id !== lastSegment.marketingCarrier.id ||
    firstSegment.operatingCarrier.id !== lastSegment.operatingCarrier.id
  );
}

export function getCompanyNames(segments: Segment[]): string[] {
  const companyNames: string[] = segments.map((segment) => {
    return segment.marketingCarrier.name || segment.operatingCarrier.name;
  });

  return companyNames;
}

export function renderDuration(duration: number): string {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
}

export function renderTIme(time: string): string {
  const date: Date = new Date(time);
  let hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  const ampm: string = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr: string = minutes < 10 ? "0" + minutes : minutes.toString();

  return `${hours}:${minutesStr} ${ampm}`;
}
