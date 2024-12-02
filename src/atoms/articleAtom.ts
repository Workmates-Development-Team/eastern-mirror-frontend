import { atom } from "recoil";

export const articleState = atom({
  key: "articleState",
  default: {
    articles: [],
    currentPage: 1,
    totalPages: 1,
  },
});
