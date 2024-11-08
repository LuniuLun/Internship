import { useState, useMemo } from "react";
import BigList from "./components/BigList";

function App() {
  const [count, setCount] = useState(0);

  // const memoizedBigList = useMemo(() => <BigList />, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      {/* {memoizedBigList} */}
      <BigList />
    </div>
  );
}

export default App;
