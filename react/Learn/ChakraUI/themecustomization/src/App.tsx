import "./App.css";
import { Button, useColorMode } from "@chakra-ui/react";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Button bgColor="brand.highlight" onClick={toggleColorMode}>
        {colorMode === "light" ? "Dark" : "Light"}
      </Button>
      <div className="card">
        <Button bgColor="brand.primary">primary</Button>
        <Button bgColor="brand.secondary">secondary</Button>
        <Button bgColor="brand.warning">warning</Button>
        <Button bgColor="brand.danger">danger</Button>
      </div>
    </>
  );
}

export default App;
