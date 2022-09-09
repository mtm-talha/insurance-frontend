import * as React from "react"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import { Grid, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"

const options = ["Auto Insurance", "Medicare", "Life Insurance"]

export default function CustomDropdown() {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => {}, [])

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`)
  }
  const handleBtnClick = () => {
    //("Button Clicked for get quotes")
    switch (selectedIndex) {
      default: {
        //("Button Clicked for goto default")
        navigate("./auto-insurance")
        break
      }
      case 0: {
        //("Button Clicked for goto auto")
        navigate("./auto-insurance")
        break
      }
      case 1: {
        //("Button Clicked for goto medicare")
        navigate("./medicare")
        break
      }
      case 2: {
        //("Button Clicked for goto life")
        navigate("./life-insurance")
        break
      }
    }
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  return (
    <Grid
      container
      sx={{ marginBottom: 30 }}
      spacing={2}
      style={{ width: "100%" }}
    >
      <Grid item lg={4} sm={4} xs={12} md={4}>
        <ButtonGroup
          variant="contained"
          ref={anchorRef}
          aria-label="split button"
          sx={{
            width: "100%",
            height: 60,
            backgroundColor: "#000e31",
          }}
        >
          <Button
            sx={{
              width: "80%",
              backgroundColor: "#000e31",
              "&:hover": {
                backgroundColor: "white",
                color: "#000e31",
              },
            }}
            onClick={handleClick}
          >
            {options[selectedIndex]}
          </Button>
          <Button
            sx={{
              width: "20%",
              backgroundColor: "#000e31",
              "&:hover": {
                backgroundColor: "white",
                color: "#000e31",
              },
            }}
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          style={{
            zIndex: 11,
            maxWidth: "500px",
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
                width: "100%",
              }}
            >
              <Paper style={{ width: "100%" }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" style={{ width: "100%" }}>
                    {options.map((option, index) => (
                      <MenuItem
                        style={{ width: "100%" }}
                        key={option}
                        // disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
      <Grid item lg={4} sm={4} xs={12} md={4}>
        <TextField
          sx={{
            width: "100%",

            "& .MuiInputBase-input": {
              height: 60,
              margin: 0,
              padding: 0,
              backgroundColor: "white",
            },
          }}
          id="filled-basic"
          label="Zip Code"
          variant="filled"
        />
      </Grid>
      <Grid item lg={4} sm={4} xs={12} md={4}>
        <Button
          sx={{
            width: "100%",
            height: 60,
            backgroundColor: "#000e31",
            "&:hover": {
              backgroundColor: "white",
              color: "#000e31",
            },
          }}
          variant="contained"
          onClick={handleBtnClick}
        >
          Get Quotes
        </Button>
      </Grid>
    </Grid>
  )
}
