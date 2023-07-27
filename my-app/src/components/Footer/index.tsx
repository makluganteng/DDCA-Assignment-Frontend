import { Input } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const Footer = () => {
  return (
    <div className="flex py-[60px] px-[100px] bg-[#EFE1D1]">
      <div className="pr-[20px]">
        <div>
          <h1 className="text-[1.125rem] text-[black]">Need help ?</h1>
        </div>
        <div className="bg-[#c0d603] p-[3px] rounded">
          <p>
            Contact us{" "}
            <span>
              <OpenInNewIcon />
            </span>
          </p>
        </div>
      </div>
      <div className="pr-[20px]">
        <h1 className="text-[1.125rem] text-[black]">Country</h1>
        <div className="bg-[#c0d603] p-[3px] rounded">
          <h2>Only Malaysia is Supported</h2>
        </div>
      </div>
      <div>
        <h1 className="text-[1.125rem] text-[black]">Stay Updated with Us</h1>
        <Input className="bg-white" placeholder="Enter your email" />
      </div>
    </div>
  );
};

export default Footer;
