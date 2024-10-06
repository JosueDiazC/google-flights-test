import { Stack } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormState } from "../../state";
import dayjs from "dayjs";
import { useShallow } from "zustand/shallow";

export default function Times() {
  const [setForm, goDate, returnDate] = useFormState(
    // Use shallow to avoid rerender issues
    useShallow((state) => [state.setForm, state.date, state.returnDate])
  );

  function updateDate(newDate: dayjs.Dayjs, type: "date" | "returnDate") {
    const form = useFormState.getState();
    setForm({ ...form, [type]: newDate.format("YYYY-MM-DD") });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          width: {
            lg: "50%",
            xs: "100%",
          },
        }}
        spacing={2}
      >
        <DatePicker
          sx={{
            width: {
              xs: "100%",
              sm: "50%",
            },
          }}
          label="Date"
          value={goDate ? dayjs(goDate) : undefined}
          onChange={(date) => updateDate(date!, "date")}
          minDate={dayjs()}
        />
        <DatePicker
          sx={{
            width: {
              xs: "100%",
              sm: "50%",
            },
          }}
          label="Return"
          value={returnDate ? dayjs(returnDate) : undefined}
          onChange={(date) => updateDate(date!, "returnDate")}
          minDate={dayjs(goDate)}
        />
      </Stack>
    </LocalizationProvider>
  );
}
