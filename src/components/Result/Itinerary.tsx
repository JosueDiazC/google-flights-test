import { Stack, TableCell, TableRow } from "@mui/material";
import { ItineraryProps } from "../../model";
import { renderDuration, renderTIme } from "./utilts";

export default function Itinerary({
  id,
  image,
  company,
  startTime,
  endTime,
  totalTime,
  origin,
  destination,
  stops,
  price,
}: ItineraryProps) {
  const hasStops = stops.length > 0;

  return (
    <TableRow key={id}>
      <TableCell>
        <Stack direction="row" sx={{ paddingLeft: "20px" }}>
          <img
            className="itinerary__info-logo"
            src={image}
            alt="company logo"
          />
          <Stack spacing="3px">
            <span className="itinerary__info-header">
              {renderTIme(startTime)} - {renderTIme(endTime)}
            </span>
            <span className="itinerary__info-text">{company}</span>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack>
          <span className="itinerary__info-header">
            {renderDuration(totalTime)}
          </span>
          <span className="itinerary__info-text">
            {origin} - {destination}
          </span>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack>
          <span className="itinerary__info-header">
            {hasStops ? `${stops.length} stop(s)` : "No stops"}
          </span>
          <span className="itinerary__info-text">
            {hasStops &&
              stops.map((stop) => stop.destination.flightPlaceId).join(", ")}
          </span>
        </Stack>
      </TableCell>
      <TableCell>
        <span className="itinerary__info-price">{price.formatted}</span>
      </TableCell>
    </TableRow>
  );
}
