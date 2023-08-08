import { Card } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";

interface VoucherCardProps {
  title: string;
  imageLink: string;
}

const VoucherCard = ({ title, imageLink }: VoucherCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(false);
  };

  return (
    <Card variant="outlined" className="handjet">
      <div className="w-[300px] h-[300px] relative">
        {/* Image */}
        <div
          className={`w-full h-full ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={imageLink}
            alt="steam"
            layout="fill"
            objectFit="cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>
      </div>

      <div className="flex justify-center items-center py-[10px]">
        {/* title */}
        <h1 className="text-[1.5rem] link link-underline-purple link-underline-black">
          {title}
        </h1>
      </div>
    </Card>
  );
};

export default VoucherCard;
