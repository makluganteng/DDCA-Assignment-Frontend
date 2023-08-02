import { Backdrop, Button, CircularProgress, Input } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useState } from "react";
import { addSubscriber } from "@/pages/api/hello";
import { Subscriber } from "@/schema/subscriber.schema";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClick = async () => {
    console.log(email);
    try {
      const data: Subscriber = {
        email: email,
      };
      const res = await addSubscriber(data);
      console.log(res);
      handleOpen();
    } catch (e) {
      alert("Something went wrong");
    }
  };
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
        <Input
          className="bg-white rounded p-[5px]"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <div className="bg-gray-100 mx-[500px] mt-[100px]">
              <div className="bg-white p-6  md:mx-auto ">
                <svg
                  viewBox="0 0 24 24"
                  className="text-green-600 w-16 h-16 mx-auto my-6"
                >
                  <path
                    fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                  ></path>
                </svg>
                <div className="text-center">
                  <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                    Added Subscription Done!
                  </h3>
                  <p className="text-gray-600 my-2">
                    Thank you for Subscribing.
                  </p>
                  <p> Have a great day! </p>
                  <div className="py-10 text-center">
                    <a
                      onClick={handleClose}
                      className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                    >
                      CLOSE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Backdrop>
        </div>
      </div>
    </div>
  );
};

export default Footer;
