import { Button } from "@mui/material";
import { useRouter } from "next/router";

export const AdminRightHeaderPart = () => {
  const router = useRouter();
  return (
    <div>
      <ul className="flex align-center">
        <li className="mr-[10px] flex align-center">
          <div>
            <button onClick={() => router.push("/admin/addVoucher")}>
              Add Voucher
            </button>
          </div>
        </li>
        <li className="mr-[10px] flex align-center">
          <div>
            <button onClick={() => router.push("/admin/deleteVoucher")}>
              Delete Voucher
            </button>
          </div>
        </li>
        <li>
          <Button className="text-[white] handjet">Sign-out</Button>
        </li>
      </ul>
    </div>
  );
};
