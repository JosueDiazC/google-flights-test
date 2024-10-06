import { Box, Button, Popover } from "@mui/material";
import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { useFormState } from "../../../state";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PassengerInput from "./PassengerInput";

export default function Passengers() {
  // MUI Popover
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // MUI Popover

  const [adults, children, infants] = useFormState(
    useShallow((state) => [state.adults, state.children, state.infants])
  );

  const total = adults + children + infants;

  return (
    <>
      <Button
        onClick={handleClick}
        variant="contained"
        startIcon={<PeopleAltIcon />}
      >
        {total}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 1 }}>
          <PassengerInput type="adults" />
          <PassengerInput type="children" />
          <PassengerInput type="infants" />
        </Box>
      </Popover>
    </>
  );
}
