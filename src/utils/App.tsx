/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "style/theme";
import Router from "./navigation/router";

/*****************************************************************************
 * App
 *****************************************************************************/

export default function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log("LOAD WEB");
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}
