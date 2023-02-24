import { Button, Grid, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export default function EmailPrompt({
  setUser,
}: {
  setUser: (arg0: any) => void;
}) {
  const formik1 = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await axios.post("/api/create-user", values).then((res) => {
        setUser(res.data);
      });
    },
  });
  const formik2 = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      await axios.get(`/api/get-user/${values.email}`).then((res) => {
        setUser(res.data);
      });
    },
  });
  return (
    <Grid container spacing={8}>
      <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Start a new list
        </Typography>
        <form
          onSubmit={formik1.handleSubmit}
          style={{ maxWidth: "500px", margin: "0 auto" }}
        >
          <TextField
            name="name"
            id="name"
            type="text"
            label="Name"
            fullWidth
            onChange={formik1.handleChange}
            error={formik1.touched.name && Boolean(formik1.errors.name)}
            helperText={formik1.touched.name && formik1.errors.name}
            value={formik1.values.name}
            sx={{ mb: 2 }}
          />
          <TextField
            name="email"
            id="email"
            type="email"
            label="Email"
            fullWidth
            onChange={formik1.handleChange}
            error={formik1.touched.email && Boolean(formik1.errors.email)}
            helperText={formik1.touched.email && formik1.errors.email}
            value={formik1.values.email}
            sx={{ mb: 2 }}
          />
          <Button type="submit" size="large" variant="contained" sx={{ mb: 4 }}>
            Submit
          </Button>
        </form>
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Find my list
        </Typography>
        <form
          onSubmit={formik2.handleSubmit}
          style={{ maxWidth: "500px", margin: "0 auto" }}
        >
          <TextField
            name="email"
            id="email"
            type="email"
            label="Email"
            fullWidth
            onChange={formik2.handleChange}
            error={formik2.touched.email && Boolean(formik2.errors.email)}
            helperText={formik2.touched.email && formik2.errors.email}
            value={formik2.values.email}
            sx={{ mb: 2 }}
          />
          <Button type="submit" size="large" variant="contained" sx={{ mt: 9 }}>
            Find
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}
