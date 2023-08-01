import { AdminHeader } from "@/components/Admin/Header";
import { getGifts, deleteGift } from "@/pages/api/hello";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

const UpdateVoucher = () => {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [state, setState] = useState([true, false]);
  const [rows, setRows] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any>();
  const [category, setCategory] = useState("");
  const [voucherName, setVoucherName] = useState("");
  const [voucherPrice, setVoucherPrice] = useState(0);
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState([state[1], state[0]]);
  };

  const handleSelect = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  // const handleClick = async () => {
  //   console.log(selectedRows);
  //   if (!selectedRows || selectedRows.length === 0) {
  //     console.log("No row selected");
  //     setOpen(true);
  //     return;
  //   }
  //   rows.find((item) => {
  //     if (item.id === selectedRows[0]) {
  //       console.log(item);
  //     }
  //   });
  //   const result = await deleteGift(selectedRows[0]);
  //   console.log(result);
  //   setOpen1(true);
  // };

  useEffect(() => {
    getVouchers();
  }, []);

  return (
    <div className="handjet">
      <AdminHeader />
      <div className="flex flex-col align-center justify-center px-[100px]">
        <h1 className="text-[30px] handjet">Update Voucher</h1>
      </div>
      <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[100px] p-[20px] rounded mb-[10px]">
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
      <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[100px] rounded">
        <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[100px] text-[black] text-[30px]">
          <h1>Modify tools</h1>
        </div>
        <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[100px]">
          <label className="text-[black]">Voucher Name</label>
          <input className="border-[1px] border-[black] rounded p-[10px]" />
        </div>
        <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[100px]">
          <label className="text-[black]">Voucher Price</label>
          <input className="border-[1px] border-[black] rounded p-[10px]" />
        </div>
        <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[100px]">
          <label className="text-[black]">Category</label>
          <FormGroup className="text-[black]">
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
              <h1 className="pb-[30px]">Choose the existing games / voucher</h1>
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
                  {options.map((option, key) => (
                    <MenuItem key={key} value={option}>
                      {option}
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
              />
            </div>
          )}
        </div>
        <button className="bg-[#DDE6ED] text-white rounded p-[10px] m-[10px]">
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateVoucher;
