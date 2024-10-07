/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResult<T = any> {
  status: boolean;
  timestamp: number;
  sessionId?: string;
  data: T;
}

interface Presentation {
  title: string;
  subtitle: string;
}

export interface AirPort extends AirPortId {
  presentation: Presentation;
}

interface AirPortId {
  value: string;
  skyId: string;
  entityId: string;
}

export interface FlightParams {
  from: AirPortId;
  to: AirPortId;
  date: string;
  returnDate: string;
  cabinClass: CabinClass;
  adults: number;
  children: number;
  infants: number;
  sortBy: SortBy;
}

export type CabinClass =
  | "economy"
  | "business"
  | "premium_economy"
  | "first"
  | "";

export type SortBy =
  | "best"
  | "price_high"
  | "price_low"
  | "fastest"
  | "outbound_take_off_time"
  | "outbound_landing_time"
  | "return_take_off_time"
  | "return_landing_time"
  | "";

export interface ItineraryProps {
  id: string;
  image: string;
  company: any[];
  startTime: string;
  endTime: string;
  totalTime: number;
  origin: string;
  destination: string;
  stops: Segment[];
  price: Price;
}

// searchFlights response from Api docs
export interface Flights {
  context: Context;
  itineraries: Itinerary[];
  messages: any[];
  filterStats: FilterStats;
  flightsSessionId: string;
  destinationImageUrl: string;
}

export interface Context {
  status: string;
  sessionId: string;
  totalResults: number;
}

export interface Itinerary {
  id: string;
  price: Price;
  legs: Leg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: FarePolicy;
  fareAttributes: FareAttributes;
  tags?: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
  eco?: Eco;
}

export interface Price {
  raw: number;
  formatted: string;
  pricingOptionId: string;
}

export interface Leg {
  id: string;
  origin: Origin;
  destination: Destination;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: Carriers;
  segments: Segment[];
}

export interface Origin {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  country: string;
  isHighlighted: boolean;
}

export interface Destination {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  country: string;
  isHighlighted: boolean;
}

export interface Carriers {
  marketing: Marketing[];
  operating?: Operating[];
  operationType: string;
}

export interface Marketing {
  id: number;
  logoUrl: string;
  name: string;
}

export interface Operating {
  id: number;
  logoUrl: string;
  name: string;
}

export interface Segment {
  id: string;
  origin: Origin2;
  destination: Destination2;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: MarketingCarrier;
  operatingCarrier: OperatingCarrier;
}

export interface Origin2 {
  flightPlaceId: string;
  displayCode: string;
  parent: Parent;
  name: string;
  type: string;
  country: string;
}

export interface Parent {
  flightPlaceId: string;
  displayCode: string;
  name: string;
  type: string;
}

export interface Destination2 {
  flightPlaceId: string;
  displayCode: string;
  parent: Parent2;
  name: string;
  type: string;
  country: string;
}

export interface Parent2 {
  flightPlaceId: string;
  displayCode: string;
  name: string;
  type: string;
}

export interface MarketingCarrier {
  id: number;
  name: string;
  alternateId: string;
  allianceId: number;
  displayCode: string;
}

export interface OperatingCarrier {
  id: number;
  name: string;
  alternateId: string;
  allianceId: number;
  displayCode: string;
}

export interface FarePolicy {
  isChangeAllowed: boolean;
  isPartiallyChangeable: boolean;
  isCancellationAllowed: boolean;
  isPartiallyRefundable: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FareAttributes {}

export interface Eco {
  ecoContenderDelta: number;
}

export interface FilterStats {
  duration: Duration;
  airports: Airport[];
  carriers: Carrier[];
  stopPrices: StopPrices;
}

export interface Duration {
  min: number;
  max: number;
  multiCityMin: number;
  multiCityMax: number;
}

export interface Airport {
  city: string;
  airports: Airport2[];
}

export interface Airport2 {
  id: string;
  entityId: string;
  name: string;
}

export interface Carrier {
  id: number;
  logoUrl: string;
  name: string;
}

export interface StopPrices {
  direct: Direct;
  one: One;
  twoOrMore: TwoOrMore;
}

export interface Direct {
  isPresent: boolean;
}

export interface One {
  isPresent: boolean;
  formattedPrice: string;
}

export interface TwoOrMore {
  isPresent: boolean;
}
