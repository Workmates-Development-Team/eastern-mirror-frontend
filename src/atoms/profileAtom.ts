import { atom } from "recoil";

export const profileState = atom({
  key: "profileState",
  default: {
    id: "",
    name: "",
    email: "",
    isDeleted: false,
    isActive: true,
    createdAt: "",
    updatedAt: "",
    userType: "",
    phoneNumber: ""
  },
});
