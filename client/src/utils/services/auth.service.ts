import axios, { AxiosResponse } from "axios";
import { LoginResponse } from "../interface/Axios.interface";
import jwt_decode, { JwtPayload } from "jwt-decode";
import // removeCurrentUser,
// setCurrentUser,
"../../redux/slices/adminSlide";

export const login = async (email: string, password: string) => {
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
    }
    console.log(data);
    // dispatch(setCurrentUser());
    return data.message;
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
};

export const logout = () => async (dispatch: any) => {
  return localStorage.removeItem("noticebee-cedp-admin");
  // return dispatch(removeCurrentUser());
};

export const getCurrentUser = () => {
  let token = localStorage.getItem("noticebee-cedp-admin") || "";
  const user = jwt_decode<JwtPayload>(token) || null;

  return user;
};

// console.log(getCurrentUser());
