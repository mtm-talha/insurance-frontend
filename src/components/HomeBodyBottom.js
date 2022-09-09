import React from "react"
import {
  Container,
  Typography,
} from "@mui/material"


import { GiNotebook } from "react-icons/gi"

import CustomDropdown from "./CustomDropdown"

const HomeBodyBottom = () => {
  return (
    <div style={styles.container}>
      <Container sx={styles.textContainer}>
        {/* <img
          src={lifeImg}
          alt="Body Bottom"
          style={{ maxWidth: "118px", maxHeight: "79px" }}
        /> */}
        {/* <GrDocumentPerformance fontSize={100} /> */}
        {/* <FaWpforms fontSize={100} /> */}
        <GiNotebook fontSize={100} />

        <div>
          <Typography sx={styles.heading}>
            Compare Insurance Quotes Instantly.
          </Typography>
          <Typography sx={styles.text}>
            Enter your zip code, answer a few questions, and compare insurance
            quotes online in less than 3 min.
          </Typography>
        </div>
      </Container>
      <Container maxWidth="sm">
        <CustomDropdown />
      </Container>
    </div>
  )
}
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#f4f2f2",
    backgroundColor: "#f2fefe",
    width: "100%",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: "100px",
    paddingBottom: "40px",
    width: { lg: 970, md: 750, sm: 550 },
    height: { lg: 294, md: 300, sm: 300 },
  },
  heading: {
    fontSize: { lg: 40, md: 40, sm: 30, xs: 24 },
    fontWeight: "bold",
    textAlign: "center",
    color: "#000e31",
  },
  text: {
    fontSize: { lg: 20, md: 18, sm: 18, xs: 16 },
    textAlign: "center",
    color: "#000e31",
  },
  zipBox: {
    width: { lg: 970, md: 750, sm: 550, xs: 404 },

    // height: { lg: 294, md: 300, sm: 300, xs: 300 },
  },
}

export default HomeBodyBottom
