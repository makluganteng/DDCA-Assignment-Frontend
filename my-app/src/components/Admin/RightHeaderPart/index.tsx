import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const AdminRightHeaderPart = () => {
  const [token, setToken] = useState<string | null>("");
  const router = useRouter();
  const signOut = () => {
    sessionStorage.removeItem("token");
    router.push("/admin");
  };

  useEffect(() => {
    const tokenSet = sessionStorage.getItem("token");
    setToken(tokenSet);
  }, []);
  return (
    <div>
      <ul className="flex align-center text-[1.25rem]">
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
        <li className="mr-[10px] flex align-center">
          <div>
            <button onClick={() => router.push("/admin/deleteCategory")}>
              Delete Category
            </button>
          </div>
        </li>
        <li className="mr-[10px] flex align-center">
          <div>
            <button onClick={() => router.push("/admin/updateVoucher")}>
              Update Voucher
            </button>
          </div>
        </li>
        <li className="mr-[10px] flex align-center">
          <div>
            <button onClick={() => router.push("/admin/addCategory")}>
              Add Category
            </button>
          </div>
        </li>
        {!token && (
          <li>
            <a
              onClick={signOut}
              className="text-[white] handjet cursor-pointer"
            >
              Sign-out
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};
