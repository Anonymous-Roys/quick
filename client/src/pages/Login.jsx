import { Button, TextField } from "@mui/material";
import loginImage from "../../assets/undraw_login_re_4vu2 1.png";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className="md:bg-[#336BFD] flex h-[100vh] bg-white justify-center">
      <div className="hidden p-1 md:p-16 md:flex md:w-[50%] items-center">
        <img src={loginImage} alt="Login Image" />
      </div>
      <div className="bg-white md:w-[50%] rounded-l-3xl p-16 flex flex-col justify-center items-center">
        <h1 className="text-[#153B9B] lg:text-4xl font-bold mb-4 text-2xl">
          Client Report Login
        </h1>
        <div>
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
          <p className="font-semibold">Sign In to continue</p>
        </div>
        <div className="w-full">
          <form
            action=""
            className="flex flex-col justify-center w-full gap-8 mt-6"
          >
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
            />

            <p className="text-right mt-[-25px]">
              New to Sextortion Shield?{" "}
              <NavLink href="/register" className="underline">
                Sign Up
              </NavLink>
            </p>
            <Button
              variant="contained"
              color="primary"
              href="/"
              sx={{ padding: "12px" }}
            >
              Sign In
            </Button>
            <p className="mt-[-25px]">Forgot Password?</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
