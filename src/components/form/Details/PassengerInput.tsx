import { IconButton, Stack } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useFormState } from "../../../state";
import { useShallow } from "zustand/shallow";

interface Props {
  type: "adults" | "children" | "infants";
}

export default function PassengerInput({ type }: Props) {
  const [total, setForm] = useFormState(
    useShallow((state) => [state[type], state.setForm])
  );

  function handleChange(isAdding: boolean = true) {
    const form = useFormState.getState();
    setForm({ ...form, [type]: total + (isAdding ? 1 : -1) });
  }

  return (
    <Stack direction="row" sx={{ alignItems: "center" }}>
      <h4 style={{ textTransform: "capitalize", width: "100px" }}>{type}</h4>
      <IconButton
        aria-label="delete"
        onClick={() => handleChange(false)}
        disabled={total <= 0}
      >
        <RemoveIcon />
      </IconButton>
      <h4>{total}</h4>
      <IconButton aria-label="delete" onClick={() => handleChange(true)}>
        <AddIcon />
      </IconButton>
    </Stack>
  );
}
