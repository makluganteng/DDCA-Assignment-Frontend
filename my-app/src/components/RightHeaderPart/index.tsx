import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Input } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const RightHeaderPart = () => {
  const [state, setState] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleClick = () => {
    router.push(`/voucher/${search}`);
  };
  return (
    <div>
      <ul className="flex align-center">
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
            <button onClick={() => setState(!state)}>
              <SearchIcon />
            </button>
          </div>
        </li>
        <li className="mr-[10px] flex align-center">
          <div>
            <button onClick={() => router.push("/")}>
              <HomeIcon />
            </button>
          </div>
        </li>
        {/* <li>
          <Button className="text-[white] handjet">Login</Button>
        </li> */}
      </ul>
    </div>
  );
};

export default RightHeaderPart;
