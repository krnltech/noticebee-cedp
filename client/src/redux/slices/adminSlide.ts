import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AdminLocal } from "../../utils/interface/Admin.interface";
import type { RootState } from "../store";
import { getCurrentUser } from "../../api/auth.api";

interface AdminSliceState {
  admin: AdminLocal;
  isAuthenticated: boolean;
  error: "";
}

const checkLogin = (user: AdminLocal) => {
  let check = Object.keys(user).length === 0 && user.constructor === Object;
  return !check;
};

const initialState: AdminSliceState = {
  isAuthenticated: checkLogin(getCurrentUser()),
  admin: getCurrentUser(),
  error: "",
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCurrentUser: (state, { payload }) => {
      state.admin = payload;
      state.isAuthenticated = checkLogin(payload);
    },
  },
});

export const { setCurrentUser } = adminSlice.actions;

export const selectAdmin = (state: RootState) => state.admins;

export default adminSlice.reducer;
