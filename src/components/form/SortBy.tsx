import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useFormState } from "../../state";
import { useShallow } from "zustand/shallow";
import { SortBy as TSortBy } from "../../model";

export default function SortBy() {
  const [setForm, sortBy] = useFormState(
    useShallow((state) => [state.setForm, state.sortBy])
  );

  const handleChange = (event: SelectChangeEvent) => {
    const form = useFormState.getState();
    setForm({ ...form, sortBy: event.target.value as TSortBy });
  };

  return (
    <FormControl
      variant="standard"
      sx={{
        width: {
          xs: "100%",
          lg: "200px",
        },
      }}
    >
      <InputLabel id="cabinclass-select">Sort By</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sortBy}
        label="Cabin Class"
        onChange={handleChange}
      >
        <MenuItem value="best">Best</MenuItem>
        <MenuItem value="cheapest">Cheapest</MenuItem>
        <MenuItem value="fastest">Fastest</MenuItem>
        <MenuItem value="outbound_take_off_time">
          Outbound Take-off Time
        </MenuItem>
        <MenuItem value="outbound_landing_time">Outbound Landing Time</MenuItem>
        <MenuItem value="return_take_off_time">Return Take-off Time</MenuItem>
        <MenuItem value="return_landing_time">Return Landing Time</MenuItem>
        <MenuItem value="">None</MenuItem>
      </Select>
    </FormControl>
  );
}
