import Header from "@/components/Header";
import { adminLogin } from "../api/hello";
import { useState } from "react";
import { AdminLogin } from "@/schema/admin.schema";
import { useRouter } from "next/router";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleClick = async () => {
    const data: AdminLogin = {
      username,
      password,
    };
    const result = await adminLogin(data);

    if (!result) {
      alert("Login Failed");
    }
    console.log(result.data.message);
    localStorage.setItem("token", result.data.message);
    alert("Login Success");
    router.push("/admin/addVoucher");
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
        </div>
      </div>
    </div>
  );
};

export default Admin;
