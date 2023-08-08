import { AdminHeader } from "@/components/Admin/Header";
import ImageUploader from "@/components/ImageDrop";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import { postCategory } from "@/pages/api/hello";

const AddCategory = () => {
  const [category, setCategory] = useState<string>("");
  const [categoryFile, setCategoryFile] = useState<File>();

  const handleCategoryChange = (file: File) => {
    setCategoryFile(file);
  };

  const submitCategory = async () => {
    const formData = new FormData();
    if (!categoryFile) {
      alert("Please input the category cover");
      return;
    }
    formData.append("category", category);
    formData.append("categoryFile", categoryFile);
    const res = await postCategory(formData);
    console.log(res);
    if (res.status === 200) {
      alert("Category added");
      setCategoryFile(undefined);
      setCategory("");
    } else {
      alert("Category is not added");
    }
  };
  return (
    <div className="handjet">
      <AdminHeader />
      <div className="flex flex-col align-center justify-center px-[100px]">
        <div>
          <h1 className="text-[30px]">Add Voucher</h1>
        </div>
        <div className="flex flex-col align-center justify-center bg-white px-[10px] rounded">
          <div>
            <h1 className="pb-[10px] text-[1.25rem] text-[black]">
              Create new category
            </h1>
            <TextField
              fullWidth
              id="filled-basic"
              label="New Category"
              variant="filled"
              onChange={(e) => setCategory(e.target.value)}
            />
            <h1>Input the Catgeory Cover</h1>
            <div className="flex flex-col align-center justify-center bg-white pt-[10px]">
              {!categoryFile && (
                <div>
                  <ImageUploader onImageChange={handleCategoryChange} />
                </div>
              )}
              {categoryFile && (
                <div className="flex justify-center align-center">
                  <Image
                    src={URL.createObjectURL(categoryFile)}
                    alt="Selected Image"
                    width={300}
                    height={300}
                  />
                </div>
              )}
            </div>
          </div>
          <Button onClick={submitCategory}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
