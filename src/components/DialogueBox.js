import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import { useNavigate } from "react-router-dom"

export default function ResponsiveDialog() {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  const handleClose = () => {
    // setOpen(false)
    navigate("/")
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={true}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Service not available!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            We are really sorry for the inconvienience but this service is only
            available for US citizens!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Acknowledged
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
