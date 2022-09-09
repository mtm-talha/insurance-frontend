import React, { useState, useEffect } from "react"
import "react-step-progress-bar/styles.css"

import { ProgressBar, Step } from "react-step-progress-bar"
import { useAppContext } from "../context/appContext/AppContext"
import { Box, Container, Typography } from "@mui/material"

const ProgressBarCustom = () => {
  const { totalSteps, historyStack } = useAppContext()
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    // //(
    //   "Progress bar:",
    //   "totalSteps:",
    //   totalSteps,
    //   "elapsed:",
    //   historyStack.length
    // )
    const localPercent = (historyStack.length / totalSteps) * 100
    setPercent(localPercent)
  }, [totalSteps, historyStack])

  return (
    <Box sx={{ width: "100%", backgroundColor: "white" }}>
      <Container sx={styles.container}>
        <Typography sx={styles.text}>
          Compare Insurance Rates in your Area
        </Typography>
        <Box sx={{ boxShadow: 10, width: "95%", borderRadius: 5 }}>
          <ProgressBar
            width="100%"
            height="30px"
            // text={percent + "%"}
            percent={percent}
            style={styles.progressBar}
            filledBackground="linear-gradient(to right, #fff, #000e31)"
          >
            <Step transition="scale">
              {({ accomplished }) => (
                <Typography
                  sx={{
                    color: accomplished ? "#1DD3F8" : "red",
                    fontWeight: "bold",
                    fontSize: { lg: 20, md: 20, sm: 18, xs: 16 },
                  }}
                >
                  0%
                </Typography>
              )}
            </Step>
            <Step transition="scale">
              {/* {({ accomplished }) => (
          <img
            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
            width="30"
            src="https://orig00.deviantart.net/493a/f/2017/095/5/4/raichu_icon_by_pokemonshuffle_icons-db4ryym.png"
            alt="stepper-icon"
          />
        )} */}

              {({ accomplished }) => (
                <Typography
                  sx={{
                    color: accomplished ? "#1DD3F8" : "red",
                    fontWeight: "bold",
                    fontSize: { lg: 20, md: 20, sm: 18, xs: 16 },
                  }}
                >
                  25%
                </Typography>
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <Typography
                  sx={{
                    color: accomplished ? "#1DD3F8" : "red",
                    fontWeight: "bold",
                    fontSize: { lg: 20, md: 20, sm: 18, xs: 16 },
                  }}
                >
                  50%
                </Typography>
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <Typography
                  sx={{
                    color: accomplished ? "#1DD3F8" : "red",
                    fontWeight: "bold",
                    fontSize: { lg: 20, md: 20, sm: 18, xs: 16 },
                  }}
                >
                  75%
                </Typography>
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <Typography
                  sx={{
                    color: accomplished ? "#1DD3F8" : "red",
                    fontWeight: "bold",
                    fontSize: { lg: 20, md: 20, sm: 18, xs: 16 },
                  }}
                >
                  100%
                </Typography>
              )}
            </Step>
          </ProgressBar>
        </Box>
      </Container>
    </Box>
  )
}
const styles = {
  container: {
    width: "100%",
    height: 120,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  progressBar: {
    fontSize: 40,
  },
  checkpointText: {},
  text: {
    fontSize: { lg: 30, md: 20, sm: 22, xs: 16 },
    fontWeight: "bold",
    color: "#000e31",
  },
}

export default ProgressBarCustom
