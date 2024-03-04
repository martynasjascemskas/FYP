import { Outlet } from "react-router";
//import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
