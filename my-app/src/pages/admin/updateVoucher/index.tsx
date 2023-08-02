import { AdminHeader } from "@/components/Admin/Header";
import { getGifts, deleteGift, updateGift } from "@/pages/api/hello";
import CloseIcon from "@mui/icons-material/Close";
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
  Alert,
  Collapse,
  IconButton,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useRouter } from "next/router";
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
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const router = useRouter();

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

  const handleClickRows = (params: any) => {
    console.log(params);
    rows.find((item) => {
      if (item.id === params[0]) {
        setVoucherName(item.voucherName);
        setVoucherPrice(item.voucherPrice);
        setCategory(item.category);
        return;
      }
    });
  };

  const handleClick = async () => {
    console.log(selectedRows);
    if (!selectedRows) {
      console.log("No row selected");
      setOpen(true);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("voucherName", voucherName);
      formData.append("voucherPrice", voucherPrice.toString());
      formData.append("category", category);

      const res = await updateGift(selectedRows.id, formData);
      console.log(res);
      setOpen1(true);
    } catch (e) {
      setOpen2(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null || undefined) {
      router.push("/");
      return;
    }
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
          rowSelectionModel={selectionModel}
          onRowClick={(params) => {
            console.log(params.row);
            setSelectedRows(params.row);
          }}
          onRowSelectionModelChange={(params) => {
            // setSelectedRows(params);
            if (params.length > 1) {
              const selectionSet = new Set(selectionModel);
              const result = params.filter((s) => !selectionSet.has(s));
              handleClickRows(result);
            } else {
              handleClickRows(params);
            }
          }}
          pageSizeOptions={[5]}
          //   checkboxSelection
          //   disableRowSelectionOnClick
        />
      </div>
      <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[100px] rounded">
        <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[100px] text-[black] text-[30px]">
          <h1>Modify tools</h1>
        </div>
        <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[100px]">
          <label className="text-[black]">Voucher Name</label>
          <input
            className="border-[1px] border-[black] rounded p-[10px] text-[black]"
            value={voucherName}
            onChange={(e) => setVoucherName(e.target.value)}
          />
        </div>
        <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[100px]">
          <label className="text-[black]">Voucher Price</label>
          <input
            className="border-[1px] border-[black] rounded p-[10px] text-[black]"
            value={voucherPrice}
            onChange={(e) => setVoucherPrice(Number(e.target.value))}
          />
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
        <button
          className="bg-[#DDE6ED] text-white rounded p-[10px] m-[10px]"
          onClick={handleClick}
        >
          Update
        </button>
      </div>
      <div className="flex flex-col align-center justify-center pt-[10px] mx-[100px]">
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
            Please Choose 1 for Update
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
                  setOpen1(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Success Update
          </Alert>
        </Collapse>
        <Collapse in={open2}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen2(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Something Happen it fails
          </Alert>
        </Collapse>
      </div>
    </div>
  );
};

export default UpdateVoucher;
