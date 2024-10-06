import { Autocomplete, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { searchAirport } from "../../service";
import { AirPort } from "../../model";
import { useDebouncedCallback } from "use-debounce";
import { useFormState } from "../../state";
import { useShallow } from "zustand/shallow";

interface Props {
  type: "from" | "to";
}

export default function AirportSelect({ type }: Props) {
  const [options, setOptions] = useState<AirPort[]>([]);
  const [enabled, setEnabled] = useState(false);

  const { setForm, from, to } = useFormState(
    useShallow((state) => ({
      setForm: state.setForm,
      from: state.from,
      to: state.to,
    }))
  );

  const { mutate, isPending } = useMutation({
    mutationFn: (query: string) => searchAirport(query),
    onSuccess: (data) => {
      setOptions(data.data);
    },
  });

  function search(query: string) {
    if (query.length < 2) {
      return;
    }

    if (!enabled) {
      setEnabled(true);
    }

    setOptions([]);
    mutate(query);
  }

  const debounced = useDebouncedCallback(search, 500);

  return (
    <Autocomplete
      sx={{ width: "100%" }}
      options={options.map((option) => option.presentation.title)}
      renderInput={(params) => <TextField {...params} label={type} />}
      onInputChange={(_, value) => debounced(value)}
      loading={isPending}
      value={type === "from" ? from.value : to.value}
      onChange={(_, value) => {
        const currentForm = useFormState.getState();
        if (value) {
          setForm({
            ...currentForm,
            [type]: {
              ...options.find((option) => option.presentation.title === value),
              value: value,
            },
          });
          return;
        }

        setOptions([]);
        setForm(currentForm);
      }}
    />
  );
}
