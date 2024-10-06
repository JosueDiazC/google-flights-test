import { create } from "zustand";
import { ApiResult, FlightParams, Flights } from "./model";
import { useQuery } from "@tanstack/react-query";
import { searchFlights } from "./service";

interface FormState extends FlightParams {
  isCleared: boolean;
  setCleared: (cleared: boolean) => void;
  setForm: (form: FlightParams) => void;
  clearForm: () => void;
}

export const useFormState = create<FormState>((set) => ({
  isCleared: true,
  from: {
    value: "",
    skyId: "",
    entityId: "",
  },
  to: {
    value: "",
    skyId: "",
    entityId: "",
  },
  date: "",
  returnDate: "",
  cabinClass: "economy",
  adults: 1,
  children: 0,
  infants: 0,
  sortBy: "best",
  setCleared: (cleared: boolean) => set({ isCleared: cleared }),
  setForm: (form) => set(form),
  clearForm: () =>
    set({
      from: {
        value: "",
        skyId: "",
        entityId: "",
      },
      to: {
        value: "",
        skyId: "",
        entityId: "",
      },
      date: "",
      returnDate: "",
      cabinClass: "economy",
      adults: 1,
      children: 0,
      infants: 0,
      sortBy: "best",
    }),
}));

export const useFlights = () =>
  useQuery<ApiResult<Flights>>({
    queryKey: ["flights"],
    queryFn: () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { isCleared, setCleared, setForm, clearForm, ...rest } =
        useFormState.getState();
      return searchFlights(rest);
    },
    enabled: false,
  });
