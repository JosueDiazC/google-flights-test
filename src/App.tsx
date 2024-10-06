import { Container, Stack } from "@mui/material";
import Form from "./components/form";
import Result from "./components/Result";
import "./index.css";

function App() {
  return (
    <Container maxWidth="lg" sx={{ p: 0 }}>
      <Stack spacing={2}>
        <h1>Responsive Google Flight</h1>
        <Form />
        <Result />
      </Stack>
    </Container>
  );
}

export default App;
