import { Button, MenuItem, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { UserType } from "@/lib/types";
import axios from "axios";
import useTodos from "@/fetchers/useTodos";

interface ToDoFormType {
  user: UserType;
}

const validationSchema = yup.object().shape({
  description: yup.string().required("Required"),
  priority: yup.string().required("Required"),
  due_date: yup.string().required("Required"),
});

export default function ToDoForm({ user }: ToDoFormType) {
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const { mutate } = useTodos(user.email);
  const formik = useFormik({
    initialValues: {
      description: "",
      priority: "",
      due_date: "",
    },
    validationSchema,
    onSubmit: async (values, onSubmitProps) => {
      const postBody = {
        ...values,
        completed: true,
      };
      await axios.post(`/api/create-todo/${user.email}`, postBody);
      mutate();
      onSubmitProps.resetForm();
      setDateValue(null);
    },
  });
  return (
    <>
      <Typography variant="h1" sx={{ mb: 3 }}>
        {user.name}'s To-do List
      </Typography>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", alignItems: "center" }}
      >
        <TextField
          type="text"
          name="description"
          id="description"
          label="New to-do item"
          onChange={formik.handleChange}
          value={formik.values.description}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          sx={{ mr: 2 }}
        />
        <DatePicker
          label="Due date"
          value={dateValue}
          onChange={(newValue) => {
            setDateValue(newValue);
            formik.setFieldValue(
              "due_date",
              dayjs(newValue).format("MM-DD-YYYY")
            );
          }}
          disablePast
          renderInput={(params) => (
            <TextField
              {...params}
              error={formik.touched.due_date && Boolean(formik.errors.due_date)}
              helperText={formik.touched.due_date && formik.errors.due_date}
              sx={{ mr: 2 }}
            />
          )}
        />
        <TextField
          select
          type="text"
          name="priority"
          id="priority"
          label="Priority"
          onChange={formik.handleChange}
          value={formik.values.priority}
          sx={{ width: "200px", mr: 2 }}
          error={formik.touched.priority && Boolean(formik.errors.priority)}
          helperText={formik.touched.priority && formik.errors.priority}
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="med">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
        <Button
          size="large"
          variant="contained"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Add
        </Button>
      </form>
    </>
  );
}
