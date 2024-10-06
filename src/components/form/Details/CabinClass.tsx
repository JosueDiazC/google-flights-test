import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { CabinClass as TCabinClass } from "../../../model";
import { useShallow } from "zustand/shallow";
import { useFormState } from "../../../state";

export default function CabinClass() {
  const [setForm, cabinClass] = useFormState(
    useShallow((state) => [state.setForm, state.cabinClass])
  );

  const handleChange = (event: SelectChangeEvent) => {
    const form = useFormState.getState();
    setForm({ ...form, cabinClass: event.target.value as TCabinClass });
  };

  return (
    <FormControl variant="standard" sx={{ width: "200px" }}>
      <InputLabel id="cabinclass-select">Cabin Class</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={cabinClass}
        label="Cabin Class"
        onChange={handleChange}
      >
        <MenuItem value="economy">Economy</MenuItem>
        <MenuItem value="business">Business</MenuItem>
        <MenuItem value="first">First</MenuItem>
        <MenuItem value="premium">Premium</MenuItem>
        <MenuItem value="premium_economy">Premium Economy</MenuItem>
      </Select>
    </FormControl>
  );
}
