import React from "react"
import Alert from "@mui/material/Alert"

export default function BasicAlerts({ messageToShow }) {
  return <Alert severity="error">{messageToShow}</Alert>
}
