import "./App.css";
import { Button, useColorMode } from "@chakra-ui/react";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Button bg="brand.highlight" onClick={toggleColorMode}>
        {colorMode === "light" ? "Dark" : "Light"}
      </Button>
      <div className="card">
        <Button variant="primary">Primary</Button>
        <Button variant="primarySolid">Primary Outline</Button>
        <Button bg="brand.secondary">Secondary</Button>
        <Button bg="brand.warning">Warning</Button>
        <Button bg="brand.danger">Danger</Button>
      </div>
    </>
  );
}

export default App;
