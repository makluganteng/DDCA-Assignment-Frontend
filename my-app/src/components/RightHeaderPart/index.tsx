import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Input } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const RightHeaderPart = () => {
  const [state, setState] = useState(false);
  const [search, setSearch] = useState("");
  const [token, setToken] = useState<string | null>("");
  const router = useRouter();

  const handleClick = () => {
    router.push(`/voucher/${search}`);
  };

  const handleLogin = () => {
    router.push("/user/login");
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("customer_token");
    sessionStorage.removeItem("customer_username");
    router.push("/user/login");
  };

  useEffect(() => {
    const tokenSet = sessionStorage.getItem("customer_token");
    setToken(tokenSet);
  }, []);
  return (
    <div>
      <ul className="flex align-center text-[1.25rem]">
        <li className="mr-[10px] flex align-center">
          <div>
            {state && (
              <Input
                className="text-white"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleClick();
                  }
                }}
              />
            )}
            <button
              onClick={() => setState(!state)}
              className="link link-underline link-underline-black"
            >
              <SearchIcon />
            </button>
          </div>
        </li>
        <li className="mr-[10px] flex align-center">
          <div>
            <button
              onClick={() => router.push("/")}
              className="link link-underline link-underline-black"
            >
              <HomeIcon />
            </button>
          </div>
        </li>
        <li className="mr-[10px] flex align-center">
          <a
            onClick={() => router.push("/explore")}
            className="text-[white] handjet link link-underline link-underline-black"
          >
            Explore
          </a>
        </li>
        {!token && (
          <li>
            <a
              onClick={handleLogin}
              className="text-[white] handjet link link-underline link-underline-black"
            >
              Login
            </a>
          </li>
        )}
        {token && (
          <li className="mr-[5px]">
            <a
              className="text-[white] handjet link link-underline link-underline-black"
              onClick={() => router.push("/profile")}
            >
              Profile
            </a>
          </li>
        )}
        {token && (
          <li>
            <a
              onClick={handleSignOut}
              className="text-[white] handjet cursor-pointer link link-underline link-underline-black"
            >
              Sign Out
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default RightHeaderPart;
