import { useState } from "react";
import useInterval from "./useInterval";

function PerformanceTimerBased() {

  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount((c) => c + 1);
  }, 1000);

  return <>Timer is at {count}</>;
}

export default PerformanceTimerBased;
