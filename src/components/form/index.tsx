import {
  Alert,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
} from "@mui/material";
import Times from "./Times";
import AirPorts from "./AirPorts";
import Details from "./Details";
import { useFlights, useFormState } from "../../state";
import SortBy from "./SortBy";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export default function Form() {
  const [error, setError] = useState("");

  const setCleared = useFormState((state) => state.setCleared);

  const { refetch, isFetching } = useFlights();

  function submit() {
    const { from, to, date, returnDate, adults } = useFormState.getState();

    const isError =
      adults < 1 ||
      date === "" ||
      returnDate === "" ||
      from.skyId === "" ||
      from.entityId === "" ||
      to.skyId === "" ||
      to.entityId === "";

    if (!isError) {
      refetch();
      setCleared(false);
      setError("");
      return;
    }

    setError("Please fill all the fields");
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Details />
          <Stack
            direction={{ xs: "column", md: "row" }}
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <AirPorts />
            <Times />
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ width: "100%", justifyContent: "flex-end" }}
        >
          {error && <Alert severity="error">{error}</Alert>}
          <SortBy />
          <LoadingButton
            onClick={submit}
            variant="contained"
            endIcon={<SearchIcon />}
            loading={isFetching}
            loadingPosition="end"
          >
            Search
          </LoadingButton>
        </Stack>
      </CardActions>
    </Card>
  );
}
