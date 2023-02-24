import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-date-pickers/themeAugmentation";

const theme = createTheme({
  palette: {
    primary: {
      main: "#546A7B",
    },
    text: {
      primary: "#0D1F2D",
    },
  },
  typography: {
    fontFamily: ["Quicksand", '"Helvetica Neue"', "Arial", "sans-serif"].join(
      ","
    ),
    h1: {
      fontSize: "56px",
      fontWeight: 600,
    },
    h2: {
      fontSize: "48px",
      fontWeight: 600,
    },
    body1: {
      fontWeight: 500,
    },
    body2: {
      fontWeight: 500,
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          fontWeight: "bold",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        sizeLarge: {
          fontSize: "16px",
          fontWeight: "bold",
          padding: "12px 28px",
          borderRadius: "28px",
        },
      },
    },
  },
});

export default theme;
