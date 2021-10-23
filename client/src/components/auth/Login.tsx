import { TextField } from "@mui/material";
import { FC } from "react";

const Login: FC = () => {
  return (
    <div>
      <TextField
        label="Username / Email"
        helperText="enter yout username or email to login"
        variant="filled"
      />
    </div>
  );
};

export default Login;
