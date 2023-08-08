import Header from "@/components/Header";
import { login } from "@/pages/api/hello";
import { UserLogin } from "@/schema/user.schema";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const LoginUser = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const router = useRouter();

  const handleClick = async () => {
    if (username === "" || password === "") {
      alert("Please enter username and password");
      return;
    }
    const data: UserLogin = {
      username,
      password,
    };

    //login
    try {
      const res = await login(data);
      if (res.status === 200) {
        console.log(res.data.token);
        sessionStorage.setItem("customer_token", res.data.token);
        sessionStorage.setItem("customer_username", username);
        setOpen1(true);
        router.push("/");
      } else {
        setOpen(true);
      }
    } catch (err) {
      setOpen(true);
    }
  };

  const handleRegister = () => {
    router.push("/user/register");
  };

  useEffect(() => {
    const token = sessionStorage.getItem("customer_token");
    if (token) {
      router.push("/");
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[400px] p-[20px] rounded mt-[50px] text-[black]">
        <div>
          <h1 className="text-[40px]">User Login</h1>
        </div>
        <div>
          <div className="flex flex-col">
            <h1>Username</h1>
            <input
              className="border-[1px] border-[black] rounded p-[10px] text-[black]"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <h1>Password</h1>
            <input
              type="password"
              className="border-[1px] border-[black] rounded p-[10px] text-[black]"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center align-center">
            <button
              className="bg-[#DDE6ED] text-black rounded p-[10px] mt-[10px]"
              onClick={handleClick}
            >
              Login
            </button>
          </div>
          <div className="flex flex-col justify-center align-center">
            <button
              className="bg-[#DDE6ED] text-black rounded p-[10px] mt-[10px]"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
          <Collapse in={open}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Login Failed
            </Alert>
          </Collapse>
          <Collapse in={open1}>
            <Alert
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Login Success
            </Alert>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
