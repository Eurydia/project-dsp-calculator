import { useState } from "react";
import { Container } from "@mui/material";
import { Facility } from "./FacilityAutocomplete/data";
import FacilityAutocomplete from "./FacilityAutocomplete";
import RecipeAutocomplete from "./RecipeAutocomplete";

function App() {
  const [value, setValue] = useState<null | Facility>(null);

  return (
    <Container maxWidth="lg">
      <FacilityAutocomplete value={value} onChange={setValue} />
      <RecipeAutocomplete />
    </Container>
  );
}

export default App;
