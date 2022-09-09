import React,{useEffect} from "react"

import AppContextProvider from "./context/appContext/AppContext"
import AppRouter from "./router/AppRouter"
// import { ThemeProvider, createTheme } from "@mui/material/styles"
function App() {
  return (
    <AppContextProvider>
      <AppRouter />
    </AppContextProvider>
  )
}
// const THEME = createTheme({
//   typography: {
//     fontFamily: [
//       "dosis",
//       "sans-serif",
//       "Nunito",
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//     ].join(","),
//   },
// })

export default App
