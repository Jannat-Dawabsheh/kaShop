import { createTheme } from "@mui/material";

const theme=(mode)=>createTheme({

      palette: {
        mode:mode,
        
      primary: {
      main: '#4fc4ca',
      contrastText: '#312d5f',

    },
    secondary: {
      main: '#312d5f',
    },
    mainColor: {
      main: '#4fc4ca',
      contrastText: '#312d5f',
    },

    darkColor: {
      main: '#312d5f',
      contrastText: '#fff',
    },
  },
})

export default theme