import { AdminHeader } from "@/components/Admin/Header";
import Dropdown from "@/components/Dropdown";
import ImageUploader from "@/components/ImageDrop";
import { getCategory, postData } from "@/pages/api/hello";
import { GetCategory } from "@/schema/category.schema";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import axios from "axios";
import exp from "constants";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddVoucher = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [categoryFile, setCategoryFile] = useState<File>();
  const [state, setState] = useState([true, false]);
  const [category, setCategory] = useState("");
  const [option, setOption] = useState<GetCategory[]>([]);
  const [voucherName, setVoucherName] = useState("");
  const [voucherPrice, setVoucherPrice] = useState(0);
  const router = useRouter();
  const handleImageChange = (file: File) => {
    setImageFile(file);
  };

  const clearImage = () => {
    setImageFile(undefined);
  };

  const handleCategoryChange = (file: File) => {
    setCategoryFile(file);
  };

  const clearCategory = () => {
    setCategoryFile(undefined);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState([state[1], state[0]]);
  };

  const handleSelect = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const submitVoucher = async () => {
    console.log("Submit Voucher", {
      imageFile,
      voucherName,
      voucherPrice,
      category,
    });
    const formData = new FormData();
    if (!imageFile) {
      alert("No image file selected");
      return;
    }
    if (!categoryFile) {
      formData.append("image", imageFile);
      formData.append("voucherName", voucherName);
      formData.append("voucherPrice", voucherPrice.toString());
      formData.append("category", category);
      if (formData.get("image") === null) {
        alert("No image file selected");
        return;
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      try {
        const result = await postData(formData);
        console.log("Result", result);
        alert("Success");
        return;
      } catch (e) {
        alert("Error");
      }
    } else {
      formData.append("image", imageFile);
      formData.append("image", categoryFile);
      formData.append("voucherName", voucherName);
      formData.append("voucherPrice", voucherPrice.toString());
      formData.append("category", category);
      console.log("Form Data", formData);
      if (formData.get("image") === null) {
        alert("No image file selected");
        return;
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      try {
        const result = await postData(formData);
        console.log("Result", result);
        alert("Success");
        return;
      } catch (e) {
        alert("Error");
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null || undefined) {
      router.push("/");
    }
    const fetchCategory = async () => {
      try {
        const res = await getCategory();
        setOption(res.data.message);
      } catch (e) {
        console.log(e);
        throw new Error("Error");
      }
    };
    fetchCategory();
  }, []);
  return (
    <div className="handjet">
      <AdminHeader />
      <div className="flex flex-col align-center justify-center px-[100px]">
        <div>
          <h1 className="text-[30px]">Add Voucher</h1>
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
                  <p className="rounded bg-[#DDE6ED] p-[3px] my-[10px]">
                    File Name: {imageFile.name}
                  </p>
                  <p className="rounded bg-[#DDE6ED] p-[3px] my-[10px]">
                    File Size: {imageFile.size} bytes
                  </p>
                  <p className="rounded bg-[#DDE6ED] p-[3px] my-[10px]">
                    File Type: {imageFile.type}
                  </p>
                </div>
                <div className="py-[30px] border-2 border-gray-300 mx-[100px]">
                  <div className="text-[black] px-[50px]">
                    <div className="flex align-center">
                      <h1 className="text-[1.3rem]">Voucher Name</h1>
                    </div>
                    <div className="flex justify-center align-center mt-[20px]">
                      <TextField
                        onChange={(e) => {
                          setVoucherName(e.target.value);
                        }}
                        fullWidth
                        id="filled-basic"
                        label="Voucher Name"
                        variant="filled"
                      />
                    </div>
                  </div>

                  <div className="text-[black] px-[50px]">
                    <div className="flex align-center mt-[20px]">
                      <h1 className="text-[1.3rem]">Voucher Price</h1>
                    </div>
                    <div className="flex justify-center align-center mt-[20px]">
                      <TextField
                        fullWidth
                        id="filled-basic"
                        label="Voucher Price"
                        variant="filled"
                        type="number"
                        onChange={(e) => {
                          setVoucherPrice(parseInt(e.target.value));
                        }}
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      />
                    </div>
                  </div>

                  <div className="text-[black] px-[50px]">
                    <div className="flex align-center mt-[20px]">
                      <h1 className="text-[1.3rem]">Voucher Category</h1>
                    </div>
                    <div className="flex align-center mt-[20px] flex-col">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state[0]}
                              onChange={(e) => handleChange(e)}
                            />
                          }
                          label="Existing Games/Voucher"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state[1]}
                              onChange={(e) => handleChange(e)}
                            />
                          }
                          label="New Games/Voucher"
                        />
                      </FormGroup>
                      {state[0] ? (
                        <div>
                          <h1 className="pb-[30px]">
                            Choose the existing games / voucher
                          </h1>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Existing Games/Voucher
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={category}
                              label="Age"
                              onChange={(e) => handleSelect(e)}
                            >
                              {option.map((option: GetCategory, key) => (
                                <MenuItem
                                  key={key}
                                  value={option.category_name}
                                >
                                  {option.category_name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      ) : (
                        <div>
                          <h1 className="pb-[30px]">Create new category</h1>
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
                                <ImageUploader
                                  onImageChange={handleCategoryChange}
                                />
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
                      )}

                      <Button onClick={submitVoucher}>Submit</Button>
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
