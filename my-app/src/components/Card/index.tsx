import { Card } from "@mui/material";
import Image from "next/image";

interface VoucherCardProps {
  title: string;
  imageLink: string;
}

const VoucherCard = ({ title, imageLink }: VoucherCardProps) => {
  return (
    <Card variant="outlined">
      <div className="object-cover overflow-hidden w-[300px] h-[300px]">
        {/* Image */}
        <Image src={imageLink} alt="steam" width={300} height={300} />
      </div>
      <div className="flex justify-center align-center">
        {/* title */}
        <h1>{title}</h1>
      </div>
    </Card>
  );
};

export default VoucherCard;
