import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { AdminLocal } from "../../utils/interface/Admin.interface";
import { getCurrentUser } from "../../utils/services/auth.service";
import type { RootState } from "../store";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { LoginResponse } from "../../utils/interface/Axios.interface";
import { setMessage } from "./messageSlice";

interface AdminSliceState {
  admin: AdminLocal;
  isAuthenticated: boolean;
}

type LoginType = {
  email: string;
  password: string;
};

const admin = jwt_decode<JwtPayload>(
  localStorage.getItem("noticebee-cedp-admin") || ""
);

// const initialState = user
//   ? { isLoggedIn: true, user }
//   : { isLoggedIn: false, user: null };
const initialState: AdminSliceState = {
  isAuthenticated: admin !== null,
  admin: admin,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginType, thunkAPI) => {
    try {
      const { data }: AxiosResponse<LoginResponse> = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email,
          password,
        }
      );

      if (data.accessToken) {
        localStorage.setItem(
          "noticebee-cedp-admin",
          JSON.stringify(data.accessToken)
        );
        let admin = jwt_decode<JwtPayload>(data.accessToken);
        console.log(data);
        return admin;
      }
      // dispatch(setCurrentUser());
      //   return data.message;
    } catch (error: any) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //   thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
      //   return error.message;
    }
    // try {
    //   const data = await AuthService.login(username, password);
    //   return { user: data };
    // } catch (error) {
    //   const message =
    //     (error.response &&
    //       error.response.data &&
    //       error.response.data.message) ||
    //     error.message ||
    //     error.toString();
    //   thunkAPI.dispatch(setMessage(message));
    //   return thunkAPI.rejectWithValue();
    // }
  }
);

export const logout = createAsyncThunk("auth/logout", () => {
  localStorage.removeItem("noticebee-cedp-admin");
});

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    // setCurrentUser: (state) => {
    //   state.admin = getCurrentUser();
    //   state.isAuthenticated = getCurrentUser() !== null;
    // },
    // removeCurrentUser: (state) => {
    //   state.admin = {};
    //   state.isAuthenticated = getCurrentUser() !== null;
    // },
    // checkCurrentuser: (state) => {
    //   if (getCurrentUser()) {
    //     state.admin = getCurrentUser();
    //     state.isAuthenticated = getCurrentUser() !== null;
    //   } else {
    //     state.admin = {};
    //     state.isAuthenticated = getCurrentUser() !== null;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isAuthenticated = true;
      //   state.admin = payload;
      console.log(payload);
    });
    builder.addCase(login.rejected, (state, { error }) => {
      // state.errors = error.message || "";
      state.isAuthenticated = false;
      state.admin = {};
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.admin = {};
    });
  },
  //   extraReducers: {
  //     [register.fulfilled]: (state, action) => {
  //       state.isLoggedIn = false;
  //     },
  //     [register.rejected]: (state, action) => {
  //       state.isLoggedIn = false;
  //     },
  //     [login.fulfilled]: (state, action) => {
  //       state.isLoggedIn = true;
  //       state.user = action.payload.user;
  //     },
  //     [login.rejected]: (state, action) => {
  //       state.isLoggedIn = false;
  //       state.user = null;
  //     },
  //     [logout.fulfilled]: (state, action) => {
  //       state.isLoggedIn = false;
  //       state.user = null;
  //     },
  //   },
});

export const {
  //   setCurrentUser,
  // removeCurrentUser, checkCurrentuser
} = adminSlice.actions;

export const selectAdmin = (state: RootState) => state.admins;

export default adminSlice.reducer;
