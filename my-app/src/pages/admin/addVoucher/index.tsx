import { AdminHeader } from "@/components/Admin/Header";
import ImageUploader from "@/components/ImageDrop";
import { Button, Input } from "@mui/material";
import exp from "constants";
import Image from "next/image";
import { useState } from "react";

const AddVoucher = () => {
  const [imageFile, setImageFile] = useState<File>();

  const handleImageChange = (file: File) => {
    setImageFile(file);
  };

  const clearImage = () => {
    setImageFile(undefined);
  };
  return (
    <div>
      <AdminHeader />
      <div className="flex flex-col align-center justify-center px-[100px]">
        <div>
          <h1>Add Voucher</h1>
        </div>
        <div className="flex flex-col align-center justify-center bg-white pt-[10px]">
          {!imageFile && <ImageUploader onImageChange={handleImageChange} />}
          {imageFile && (
            <div className="flex flex-col justify-center align-center">
              <h2>Selected Image:</h2>
              <div className="flex flex-col justify-center align-center">
                <div className="flex justify-center align-center">
                  <Image
                    src={URL.createObjectURL(imageFile)}
                    alt="Selected Image"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="grid place-items-center text-[black]">
                  <p>File Name: {imageFile.name}</p>
                  <p>File Size: {imageFile.size} bytes</p>
                  <p>File Type: {imageFile.type}</p>
                  <div>
                    <div>
                      <h1>Voucher Name</h1>
                      <Input />
                    </div>
                    <div>
                      <h1>Voucher Price</h1>
                      <Input />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Button
            onClick={() => {
              clearImage();
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddVoucher;
