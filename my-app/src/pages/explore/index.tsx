import VoucherCard from "@/components/Card";
import Header from "@/components/Header";
import { Body } from "@/components/SecondTitle";
import { GetCategory } from "@/schema/category.schema";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getCategory } from "../api/hello";

const Explore = () => {
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
    <div>
      <Header />
      <Body />
      <div className="px-[100px] py-[50px]">
        <div className="text-[2rem]">
          <h1 className="content">Explore all the Amazing GGS Gift Card</h1>
        </div>
        <div className="grid grid-cols-6 gap-4">
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
    </div>
  );
};

export default Explore;
