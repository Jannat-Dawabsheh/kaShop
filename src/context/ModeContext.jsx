import { createContext, useState } from "react";
import theme from "../theme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from '@emotion/react';

export const ModeContext=createContext(null);

const ModeContextProvider=({children})=>{
   const[mode,setMode]=useState('light');
   const currentTheme=theme(mode);
   const toggleTheme=()=>{
      setMode((prev)=>prev=='light'?'dark':'light')
   }
   return <ModeContext.Provider value={{mode,toggleTheme}}>
    <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>,
    
   </ModeContext.Provider>
}
export default ModeContextProvider;