import { FC, useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { loginAdmin } from "../api/auth.api";
import { selectAdmin } from "../redux/slices/adminSlide";

type FormData = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(selectAdmin);
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    setLoading(true);
    loginAdmin({ email, password }, dispatch);
    setLoading(false);
  };
  return (
    <>
      {isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <Paper sx={{ padding: 3, maxWidth: "400px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" spacing={2}>
              <TextField
                label="Email"
                helperText="enter your email to login"
                variant="filled"
                type="email"
                {...register("email", { required: true })}
              />
              <TextField
                label="Password"
                helperText="enter your password to login"
                variant="filled"
                type="password"
                {...register("password", { required: true })}
              />
              <Button disabled={loading} type="submit">
                Login
              </Button>
            </Stack>
          </form>
        </Paper>
      )}
    </>
  );
  // }
};

export default Login;
