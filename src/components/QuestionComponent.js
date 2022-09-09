import React from "react"
import { Box, Typography } from "@mui/material"

const QuestionComponent = ({ heading, desc }) => {
  return (
    <Box>
      <Typography sx={styles.question}>{heading}</Typography>
      <Typography sx={styles.answer}>{desc}</Typography>
    </Box>
  )
}

const styles = {
  question: {
    fontSize: { lg: 20, md: 18, sm: 16, xs: 16 },
    fontWeight: "bold",
    lineHeight: 2,
    color: "#000e31",
  },
  answer: {
    fontSize: { lg: 17, md: 15, sm: 14, xs: 14 },
    color: "#000e31",
  },
}

export default QuestionComponent
