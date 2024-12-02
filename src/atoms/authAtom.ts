import { atom, useSetRecoilState } from "recoil";
import { useEffect } from "react";

export const authState = atom({
  key: "authState",
  default: {
    isAuthenticated: false,
    token: "", // Initial default value without accessing sessionStorage
  },
});

