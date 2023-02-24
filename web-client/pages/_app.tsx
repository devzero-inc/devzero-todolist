import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProvider } from "@mui/material/styles";
import { Alert, CssBaseline, Snackbar } from "@mui/material";
import theme from "@/lib/theme";
import { useState } from "react";
import axios from "axios";

export default function App({ Component, pageProps }: AppProps) {
  const [apiError, setApiError] = useState(null);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setApiError(null);
  };
  axios.interceptors.response.use(undefined, (error) => {
    setApiError(error.response.statusText);
    return Promise.reject(error);
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        <Snackbar
          open={apiError !== null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={7000}
          onClose={handleClose}
        >
          <Alert variant="filled" severity="error">
            {apiError}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
