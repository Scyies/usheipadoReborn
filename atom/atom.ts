import { atom } from "recoil";
import { v4 } from "uuid"

export const diasSelectState = atom<string>({
  key: v4(),
  default: ""
})

export const userId = atom<string>({
  key: v4(),
  default: ""
})