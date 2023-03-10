import useTodos from "@/fetchers/useTodos";
import { Box, Checkbox, Chip, Typography } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { RadioButtonUnchecked, CheckCircle } from "@mui/icons-material";
import axios from "axios";

interface TodoItemType {
  completed: boolean;
  description: string;
  due_date: string;
  id: string;
  priority: string;
}

export default function ToDoTable({ email }: { email: string }) {
  const { list, mutate } = useTodos(email);

  const completeTodo = async (params: TodoItemType) => {
    const postBody = {
      todo_id: params.id,
      completed: true,
    };
    await axios.put(`/api/update-todo/${email}`, postBody);
    mutate();
  };
  const columns = [
    {
      field: "completed",
      headerName: "",
      maxWidth: 60,
      renderCell: (params: GridCellParams) => {
        const onClick = () => {
          completeTodo(params.row);
        };
        return (
          <Checkbox
            onClick={onClick}
            checked={params.row.completed === 1}
            icon={<RadioButtonUnchecked />}
            checkedIcon={<CheckCircle />}
          />
        );
      },
    },
    {
      field: "description",
      headerName: "",
      flex: 1,
      renderCell: (params: GridCellParams) => (
        <Typography
          variant="body2"
          sx={{
            textDecoration: params.row.completed ? "line-through" : "none",
          }}
        >
          {params.row.description}
        </Typography>
      ),
    },
    {
      field: "due_date",
      headerName: "Due Date",
      flex: 0.5,
      renderCell: (params: GridCellParams) => (
        <Typography variant="body2">
          {dayjs(params.row.due_date).format("MMMM DD, YYYY")}
        </Typography>
      ),
    },

    {
      field: "priority",
      headerName: "Priority",
      maxWidth: 150,
      renderCell: (params: GridCellParams) => {
        switch (params.row.priority) {
          case "low":
            return <Chip variant="outlined" color="info" label="low" />;
          case "med":
            return <Chip variant="outlined" color="warning" label="med" />;
          case "high":
            return <Chip variant="outlined" color="error" label="high" />;
        }
      },
    },
  ];

  return (
    <>
      <Box sx={{ my: 6 }}>
        <DataGrid
          autoHeight
          rows={list}
          columns={columns}
          getRowId={(row) => row.id}
          hideFooter
          disableSelectionOnClick
          disableColumnMenu
          sx={{
            border: "none",
            "& .MuiDataGrid-columnSeparator": { display: "none" },
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
            "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaders": {
              borderColor: "#0d1f2d20",
            },
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: "completed", sort: "asc" }],
            },
          }}
        />
      </Box>
    </>
  );
}
