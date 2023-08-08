import { useEffect, useState } from "react";
import VoucherCard from "../Card";
import { getCategory } from "@/pages/api/hello";
import { GetCategory } from "@/schema/category.schema";
import { useRouter } from "next/router";

const data = [
  {
    title: "Steam",
    imageLink: "/images",
  },
  {
    title: "Steam",
    imageLink: "/images",
  },
  {
    title: "Steam",
    imageLink: "/images",
  },
  {
    title: "Steam",
    imageLink: "/images",
  },
  {
    title: "Steam",
    imageLink: "/images",
  },
  {
    title: "Steam",
    imageLink: "/images",
  },
  {
    title: "Steam",
    imageLink: "/images",
  },
  {
    title: "Steam",
    imageLink: "/images",
  },
  {
    title: "Steam",
    imageLink: "/images",
  },
  {
    title: "Steam",
    imageLink: "/images",
  },
  {
    title: "Steam",
    imageLink: "/images",
  },
  {
    title: "Steam",
    imageLink: "/images",
  },
];

const MainContent = () => {
  const [category, setCategory] = useState<GetCategory[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getCategory();
      setCategory(res.data.message);
    };
    fetchData();
  }, []);
  return (
    <div className="px-[100px] py-[50px]">
      <div className="text-[2rem]">
        <h1 className="content">Save more with Amazing GGS</h1>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {category ? (
          category.map((item: GetCategory, key) => (
            <div
              key={key}
              className="p-[2px] cursor-pointer"
              onClick={() => {
                router.push(`/voucher/${item.id}`);
              }}
            >
              <VoucherCard
                title={item.category_name}
                imageLink={item.category_image_url}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MainContent;
