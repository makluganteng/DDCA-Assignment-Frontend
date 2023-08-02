import VoucherCard from "@/components/Card";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { buyVoucher, getVoucher, getVoucherByCategory } from "../api/hello";
import { GetVoucher } from "@/schema/voucher.schema";

const payment = [
  {
    title: "Touch nGo",
    price: "RM 10",
  },
  {
    title: "Touch nGo",
    price: "RM 10",
  },
  {
    title: "Touch nGo",
    price: "RM 10",
  },
  {
    title: "Touch nGo",
    price: "RM 10",
  },
];

const Voucher = () => {
  const [voucher, setVoucher] = useState<GetVoucher[]>([]);
  const [email, setEmail] = useState<string>();
  const [currentVoucher, setCurrentVoucher] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [voucherName, setVoucherName] = useState<string>();
  const [voucherId, setVoucherId] = useState<number>();

  const router = useRouter();

  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        if (!router.query.id && !router.query.id) return;
        if (Number.isNaN(Number(router.query.id))) {
          const res = await getVoucherByCategory(router.query.id as string);
          console.log(res.data.message);
          setVoucher(res.data.message);
          return;
        }
        const res = await getVoucher(router.query.id as string);
        console.log(res.data.message);
        setVoucher(res.data.message);
        return;
      } catch (e) {
        alert("Something went wrong");
      }
    };
    fetchVoucher();
  }, [router.query.id]);

  const handleHold = (key: number) => {
    setCurrentVoucher(key);
    console.log(key);
    const result = voucher.find((item) => item.id === key);
    if (!result) return;
    setPrice(result?.gift_card_price);
    setVoucherName(result?.gift_card_name);
    setVoucherId(result?.id);
  };

  const handleBuy = async () => {
    try {
      console.log(email, voucherName, voucherId);
      if (!email || !voucherName || !voucherId) return;
      const data = {
        email: email,
        voucherName: voucherName,
        voucherId: voucherId,
      };
      const res = await buyVoucher(data);
      console.log(res.data.message);
      router.push("/success");
    } catch (e) {
      console.log(e);
      alert("Something went wrong");
    }
  };
  return (
    <div className="handjet">
      <Header />
      {voucher ? (
        <div>
          <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[400px] p-[20px] rounded mt-[50px] text-[black]">
            <div className="flex justify-start align-center">
              <div className="rounded-full border-[4px] border-[#fff] bg-[purple] h-[48px] w-[48px] text-white text-center flex justify-center align-center relative bottom-[30px]">
                <p className="mt-[5px]">1</p>
              </div>
              <h1 className="mt-[5px] ml-[10px] text-center text-[1.50rem]">
                {" "}
                Enter your email
              </h1>
            </div>

            <div className="mt-[10px] flex flex-col">
              <input
                className="border-[1px] border-[black] rounded p-[10px] text-[black]"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p>
                Enter your email here so that the code can be send to your email
                :3
              </p>
            </div>
          </div>
          <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[400px] p-[20px] rounded mt-[30px] text-[black]">
            <div className="flex justify-start align-center">
              <div className="rounded-full border-[4px] border-[#fff] bg-[purple] h-[48px] w-[48px] text-white text-center flex justify-center align-center relative bottom-[30px]">
                <p className="mt-[5px]">2</p>
              </div>
              <h1 className="mt-[5px] ml-[10px] text-center text-[1.50rem]">
                {" "}
                Select Your Voucher
              </h1>
            </div>
            <div>
              <div className="grid grid-cols-6 gap-4">
                {voucher ? (
                  voucher.map((item: GetVoucher, key) => (
                    <div
                      key={key}
                      className="p-[2px]"
                      onClick={() => {
                        handleHold(item.id);
                      }}
                    >
                      <VoucherCard
                        title={item.gift_card_name}
                        imageLink={item.gift_card_image_url}
                      />
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[400px] p-[20px] rounded mt-[30px] text-[black]">
            <div className="flex justify-start align-center">
              <div className="rounded-full border-[4px] border-[#fff] bg-[purple] h-[48px] w-[48px] text-white text-center flex justify-center align-center relative bottom-[30px]">
                <p className="mt-[5px]">3</p>
              </div>
              <h1 className="mt-[5px] ml-[10px] text-center text-[1.50rem]">
                {" "}
                Choose Your Payment
              </h1>
            </div>
            <div>
              {payment ? (
                payment.map((item, key) => (
                  <div
                    key={key}
                    className="flex justify-between align-center bg-white pt-[10px] p-[20px] rounded my-[5px] text-[black] border-[1px] border-[black]"
                  >
                    <div>
                      <h1 className="mr-[20px]">{item.title}</h1>
                    </div>
                    <div>
                      <p className="ml-[20px]">RM {price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[400px] p-[20px] rounded mt-[30px] text-[black]">
            <button
              className="bg-[purple] text-white rounded p-[10px] w-[100%] mt-[10px]"
              onClick={handleBuy}
            >
              {" "}
              Buy Now{" "}
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Voucher;
