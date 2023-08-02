import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import RightHeaderPart from "../RightHeaderPart";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between align-center p-[20px] bg-[#6242fc]">
      <div className="flex align-center">
        <div
          className="mr-[10px] font-extrabold handjet text-[30px] cursor-pointer"
          onClick={() => router.push("/")}
        >
          <p>
            <span>
              <VideogameAssetIcon />
            </span>{" "}
            Amazing GGS
          </p>
        </div>
        <div className="handjet flex align-center">
          <p>The fastest way to buy and get giftcard worldwide</p>
        </div>
      </div>
      <RightHeaderPart />
    </div>
  );
};

export default Header;
