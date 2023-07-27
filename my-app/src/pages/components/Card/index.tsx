import { Card } from "@mui/material";
import Image from "next/image";

interface VoucherCardProps {
  title: string;
  imageLink: string;
}

export const VoucherCard = ({ title, imageLink }: VoucherCardProps) => {
  return (
    <Card variant="outlined">
      <div>
        {/* Image */}
        <Image src={imageLink} alt="steam" width={193} height={244} />
      </div>
      <div className="flex justify-center align-center">
        {/* title */}
        <h1>{title}</h1>
      </div>
    </Card>
  );
};
