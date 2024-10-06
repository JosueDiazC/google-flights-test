import { Stack } from "@mui/material";
import CabinClass from "./CabinClass";
import Passengers from "./Passengers";

export default function Details() {
  return (
    <Stack direction="row" spacing={2}>
      <CabinClass />
      <Passengers />
    </Stack>
  );
}
