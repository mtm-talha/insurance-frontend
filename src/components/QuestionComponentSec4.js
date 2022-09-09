import React from "react"
import { Box, Typography } from "@mui/material"

const QuestionComponentSec4 = ({ heading, desc }) => {
  return (
    <Box>
      <Typography variant="h6">{heading}</Typography>
      <Typography variant="body">{desc}</Typography>
    </Box>
  )
}

export default QuestionComponentSec4
