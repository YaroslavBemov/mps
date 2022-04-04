import { useContext } from "react"
import { Context } from "../index"

export const useStore = () => useContext(Context)
