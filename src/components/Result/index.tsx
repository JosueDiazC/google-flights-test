import {
  Alert,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import Itinerary from "./Itinerary";
import { useFlights, useFormState } from "../../state";
import { getItineraryProps } from "./utilts";

export default function Result() {
  const isCleared = useFormState((state) => state.isCleared);

  const { data, isError, isFetching } = useFlights();

  if (isCleared) return null;

  if (isFetching)
    return (
      <Stack spacing={1}>
        <Skeleton variant="rounded" width="100%" height={70} />
        <Skeleton variant="rounded" width="100%" height={70} />
        <Skeleton variant="rounded" width="100%" height={70} />
        <Skeleton variant="rounded" width="100%" height={70} />
      </Stack>
    );

  if (isError) return <Alert severity="error">Unknown Error, try again</Alert>;

  if (!data) return null;

  if (data.status === false)
    return <Alert severity="error">Unknown Error, try again</Alert>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {data.data.itineraries.map((itinerary) => (
            <Itinerary key={itinerary.id} {...getItineraryProps(itinerary)} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
