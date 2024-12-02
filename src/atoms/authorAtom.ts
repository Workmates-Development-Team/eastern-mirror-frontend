import { atom } from "recoil";

export const authorState = atom({
  key: "authorState",
  default: [
    {
      _id: "",
      name: "",
      email: "",
      username: "",
      avatar: "",
    },
  ],
});
