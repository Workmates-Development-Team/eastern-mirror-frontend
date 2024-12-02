import { atom } from "recoil";

export const homeState = atom({
  key: "homeState",
  default: {
    top: [],
    currentPage: 1,
    totalPages: 1,
  },
});
