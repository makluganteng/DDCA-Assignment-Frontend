import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { getUserByUsername, updateUser } from "../api/hello";
import { UserUpdate } from "@/schema/user.schema";
import { useRouter } from "next/router";
import { Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Profile = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (sessionStorage.getItem("customer_username")) {
          const user = sessionStorage.getItem("customer_username") as string;
          const res = await getUserByUsername(user);
          console.log(res.data.message);
          setEmail(res.data.message.email);
          setPassword(res.data.message.password);
          setUsername(res.data.message.username);
          return;
        }
      } catch (e) {
        alert("Something went wrong");
      }
    };
    if (
      !sessionStorage.getItem("customer_username") ||
      !sessionStorage.getItem("customer_token")
    ) {
      router.push("/");
    }
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      if (!username || !email || !password)
        return alert("Please fill in all the fields");
      const data: UserUpdate = {
        username,
        email,
        password,
      };
      const res = await updateUser(data);
      console.log(res.data.message);
      setOpen1(true);
    } catch (e) {
      setOpen(true);
    }
  };
  return (
    <div>
      <Header />
      <div className="flex flex-col align-center justify-center px-[100px]">
        <div className="flex flex-col align-center justify-center pt-[10px] mx-[400px] p-[20px] rounded mt-[50px] text-[white]">
          <h1 className="text-[30px]">Profile</h1>
        </div>
        <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[400px] p-[20px] rounded mt-[50px] text-[black]">
          <div className="flex justify-start align-center">
            <div className="rounded-full border-[4px] border-[#fff] bg-[purple] h-[48px] w-[48px] text-white text-center flex justify-center align-center relative bottom-[30px]">
              <p className="mt-[5px]">1</p>
            </div>
            <h1 className="mt-[5px] ml-[10px] text-center text-[1.50rem]">
              {" "}
              Email
            </h1>
          </div>

          <div className="mt-[10px] flex flex-col">
            <input
              className="border-[1px] border-[black] rounded p-[10px] text-[black]"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <p>
              This is the Email that is used for sending your bought voucher :3
            </p>
          </div>
        </div>
        <div className="flex flex-col align-center justify-center bg-white pt-[5px] mx-[400px] p-[20px] rounded mt-[50px] text-[black]">
          <div className="flex justify-start align-center">
            <div className="rounded-full border-[4px] border-[#fff] bg-[purple] h-[48px] w-[48px] text-white text-center flex justify-center align-center relative bottom-[30px]">
              <p className="mt-[5px]">2</p>
            </div>
            <h1 className="mt-[5px] ml-[10px] text-center text-[1.50rem]">
              {" "}
              Password
            </h1>
          </div>

          <div className="mt-[10px] flex flex-col">
            <input
              className="border-[1px] border-[black] rounded p-[10px] text-[black]"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <p>
              This is the Email that is used for sending your bought voucher :3
            </p>
          </div>
        </div>
        <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[400px] p-[20px] rounded mt-[50px] text-[black]">
          <div className="flex justify-start align-center">
            <div className="rounded-full border-[4px] border-[#fff] bg-[purple] h-[48px] w-[48px] text-white text-center flex justify-center align-center relative bottom-[30px]">
              <p className="mt-[5px]">1</p>
            </div>
            <h1 className="mt-[5px] ml-[10px] text-center text-[1.50rem]">
              {" "}
              username
            </h1>
          </div>

          <div className="mt-[10px] flex flex-col">
            <p className="handjet text-[30px] pl-[50px]">
              {username} is your username :3 (FOREVER)
            </p>
          </div>
        </div>
        <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[400px] p-[20px] rounded mt-[30px] text-[black]">
          <button
            className="bg-[purple] text-white rounded p-[10px] w-[100%] mt-[10px] mb-[20px]"
            onClick={handleUpdate}
          >
            {" "}
            Save{" "}
          </button>
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
export default Profile;
