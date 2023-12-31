import Header from "@/components/Header";
import { adminLogin } from "../api/hello";
import { useState } from "react";
import { AdminLogin } from "@/schema/admin.schema";
import { useRouter } from "next/router";
import { Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const router = useRouter();

  const handleClick = async () => {
    if (!username || !password) {
      alert("Please fill all the fields");
      return;
    }
    const data: AdminLogin = {
      username,
      password,
    };
    try {
      const result = await adminLogin(data);
      if (!result) {
        setOpen(true);
      }
      console.log(result.data.message);
      localStorage.setItem("token", result.data.message);
      setOpen1(true);
      router.push("/admin/addVoucher");
    } catch (e) {
      setOpen(true);
    }
  };
  return (
    <div>
      <Header />
      <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[400px] p-[20px] rounded mt-[50px] text-[black]">
        <div>
          <h1 className="text-[40px]">Admin Login</h1>
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
          <div className="flex flex-col justify-center align-center pb-[10px]">
            <button
              className="bg-[#DDE6ED] text-black rounded p-[10px] mt-[10px]"
              onClick={handleClick}
            >
              Login
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

export default Admin;
