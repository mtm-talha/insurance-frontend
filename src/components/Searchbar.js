import { TextField } from "@mui/material"
import React from "react"

const Searchbar = () => {
  return (
    <div style={styles.searchdiv}>
      <TextField
        sx={{
          width: "100%",
          height: "100%",

          "& .MuiInputBase-input": {
            height: "100%",
            backgroundColor: "yellow",
            border: "none",
            outline: "none",
          },
          "& .MuiFilledInput-input": {
            height: "100%",
            backgroundColor: "pink",
            border: "none",
            outline: "none",
          },
          "&&&:before": {
            borderBottom: "none",
          },
          "&&:after": {
            borderBottom: "none",
          },
        }}
        id="filled-basic"
        label="Type here to search"
        variant="filled"
      />
    </div>
  )
}

const styles = {
  searchdiv: {
    width: "100%",
    height: 65,
    backgroundColor: "grey",
    marginBottom: "20px",
  },
}

export default Searchbar
