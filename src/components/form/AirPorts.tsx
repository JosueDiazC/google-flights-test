import { IconButton, Stack } from "@mui/material";
import AirportSelect from "./AirportSelect";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import { useFormState } from "../../state";

export default function AirPorts() {
  const setForm = useFormState((state) => state.setForm);

  function reversePath() {
    const form = useFormState.getState();
    setForm({ ...form, from: form.to, to: form.from });
  }

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        width: {
          lg: "50%",
          xs: "100%",
        },
      }}
    >
      <AirportSelect type="from" />
      <IconButton aria-label="reverse path" onClick={reversePath}>
        <FlipCameraAndroidIcon />
      </IconButton>
      <AirportSelect type="to" />
    </Stack>
  );
}
