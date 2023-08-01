import { AdminHeader } from "@/components/Admin/Header";
import { deleteGift, getGifts } from "@/pages/api/hello";
import { Alert, Collapse, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const DeleteVoucher = () => {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any>();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const getVouchers = async () => {
    setColumns([
      { field: "id", headerName: "ID", width: 70 },
      { field: "voucherName", headerName: "Voucher Name", width: 130 },
      { field: "voucherPrice", headerName: "Voucher Price", width: 130 },
      { field: "category", headerName: "Category", width: 130 },
    ]);
    const res = await getGifts();
    console.log(res);
    res.data.message.map((item: any) => {
      setRows((prev) => [
        ...prev,
        {
          id: item.id,
          voucherName: item.gift_card_name,
          voucherPrice: item.gift_card_price,
          category: item.category_name,
        },
      ]);
    });
  };

  const handleClick = async () => {
    console.log(selectedRows);
    if (!selectedRows || selectedRows.length === 0) {
      console.log("No row selected");
      setOpen(true);
      return;
    }
    rows.find((item) => {
      if (item.id === selectedRows[0]) {
        console.log(item);
      }
    });
    const result = await deleteGift(selectedRows[0]);
    console.log(result);
    setOpen1(true);
  };

  useEffect(() => {
    getVouchers();
  }, []);

  return (
    <div className="handjet">
      <AdminHeader />
      <div className="flex flex-col align-center justify-center px-[100px]">
        <h1 className="text-[30px]">Delete Voucher</h1>
      </div>
      <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[100px]">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          onRowClick={(params) => {
            console.log(params.row);
            setSelectedRows(params.row);
          }}
          onRowSelectionModelChange={(params) => {
            setSelectedRows(params);
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
      <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[100px]">
        <button
          className="bg-[#F0386B] text-white rounded p-[10px] m-[10px]"
          onClick={handleClick}
        >
          Delete
        </button>
      </div>
      <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[100px]">
        <Collapse in={open}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Please Choose 1 for Deletion
          </Alert>
        </Collapse>
        <Collapse in={open1}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Success Delete
          </Alert>
        </Collapse>
      </div>
    </div>
  );
};

export default DeleteVoucher;
