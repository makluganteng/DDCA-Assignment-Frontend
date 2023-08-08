import { AdminHeader } from "@/components/Admin/Header";
import { deleteCategory, getCategory } from "@/pages/api/hello";
import { Collapse, Alert, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

const DeleteCategory = () => {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any>();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const router = useRouter();

  const getCategories = async () => {
    setColumns([
      { field: "id", headerName: "ID", width: 70 },
      { field: "categoryName", headerName: "Category Name", width: 130 },
    ]);

    const res = await getCategory();
    console.log(res);
    res.data.message.map((item: any) => {
      console.log(item.category_name);
      setRows((prev) => [
        ...prev,
        {
          id: item.id,
          categoryName: item.category_name,
        },
      ]);
    });
  };

  const handleClick = async () => {
    try {
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
      console.log(selectedRows[0]);
      const result = await deleteCategory(selectedRows[0]);
      setOpen1(true);
      router.reload();
    } catch (e) {
      setOpen2(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null || undefined) {
      router.push("/");
      return;
    }
    getCategories();
  }, []);

  return (
    <div className="handjet">
      <AdminHeader />
      <div className="flex flex-col align-center justify-center px-[100px]">
        <h1 className="text-[30px]">Delete Category</h1>
      </div>
      <div className="flex flex-col align-center justify-center bg-white pt-[10px] mx-[100px] text-[black]">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
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
            Delete Failed
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
            Success Delete
          </Alert>
        </Collapse>
      </div>
    </div>
  );
};

export default DeleteCategory;
