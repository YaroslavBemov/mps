import { useContext } from "react";
import { RootStoreContext } from "../index";

export const useStore = () => useContext(RootStoreContext);
