import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Input } from "@mui/material";
import { useState } from "react";

export const RightHeaderPart = () => {
  const [state, setState] = useState(false);
  return (
    <div>
      <ul className="flex align-center">
        <li className="mr-[10px] flex align-center">
          <div>
            {state && <Input className="text-white" />}
            <button onClick={() => setState(!state)}>
              <SearchIcon />
            </button>
          </div>
        </li>
        <li className="mr-[10px] flex align-center">
          <div>
            <button>
              <HomeIcon />
            </button>
          </div>
        </li>
        <li>
          <Button className="text-[white] handjet">Login</Button>
        </li>
      </ul>
    </div>
  );
};
