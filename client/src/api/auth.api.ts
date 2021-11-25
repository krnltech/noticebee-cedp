import axios from "../utils/axios.base";
import { AxiosResponse } from "axios";
import { LoginResponse } from "../utils/interface/Axios.interface";
import { setCurrentUser } from "../redux/slices/adminSlide";
import jwt_decode, { JwtPayload } from "jwt-decode";

type LoginType = {
  email: string;
  password: string;
};

export const getCurrentUser = () => {
  let token = localStorage.getItem("noticebee-cedp-admin");
  if (token) {
    let admin = jwt_decode<JwtPayload>(token);
    return admin;
  } else {
    return {};
  }
};

export const loginAdmin = async (
  { email, password }: LoginType,
  dispatch: any
) => {
  //   setLoading(true);
  try {
    const { data }: AxiosResponse<LoginResponse> = await axios.post(
      "/api/admin/login",
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

      dispatch(setCurrentUser(getCurrentUser()));
    }
  } catch (error: any) {}
  //   setLoading(true);
};
