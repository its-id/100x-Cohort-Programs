import { createContext } from "react";

//let's us teleport the state from one component to another without having to pass it down as props.
export const CountContext = createContext(0);