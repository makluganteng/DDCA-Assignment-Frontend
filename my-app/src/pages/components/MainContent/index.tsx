import { VoucherCard } from "../Card";

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

export const MainContent = () => {
  return (
    <div className="px-[100px] py-[50px]">
      <div className="text-[2rem]">
        <h1 className="content">Save more with Amazing GGS</h1>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {data.map((item, key) => (
          <div key={key} className="p-[2px]">
            <VoucherCard title={item.title} imageLink={item.imageLink} />
          </div>
        ))}
      </div>
    </div>
  );
};
