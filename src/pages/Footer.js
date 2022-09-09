import React, { useEffect, useState } from "react"
import { Grid, Typography } from "@mui/material"

import { LazyLoadImage } from "react-lazy-load-image-component"
import { autoInsImages } from "../util/autoData"
import { lifeInsImages } from "../util/lifeData"
import { medicareInsImages } from "../util/medicareData"
import { useAppContext } from "../context/appContext/AppContext"
import {
  SET_MODULE_AUTO,
  SET_MODULE_LIFE,
  SET_MODULE_MEDICARE,
} from "../context/appContext/appActions"

const Footer = ({ footerText }) => {
  const [imagesToDisplay, setImagesToDisplay] = useState([])
  const { activeModule } = useAppContext()
  useEffect(() => {
    if (activeModule === SET_MODULE_AUTO) {
      setImagesToDisplay(autoInsImages)
    } else if (activeModule === SET_MODULE_LIFE) {
      setImagesToDisplay(lifeInsImages)
    } else if (activeModule === SET_MODULE_MEDICARE) {
      setImagesToDisplay(medicareInsImages)
    } else {
      setImagesToDisplay([])
    }
  }, [imagesToDisplay])

  // useEffect(() => {
  //   console.log("Images to display are", imagesToDisplay)
  // }, [imagesToDisplay])
  return (
    <div style={styles.footerContainer}>
      <div style={styles.footerHeadingContainer}>
        <Typography style={styles.footerHeading}>
          Insurance Carriers Include
        </Typography>
      </div>

      <Grid
        container
        direction={{ md: "row", lg: "row", sm: "column", xs: "column" }}
        alignItems="center"
        justify="center"
        columns={10}
        // style={{
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "center",
        //   alignItems: "center",
        // }}
      >
        {imagesToDisplay.map((img, key) => (
          <Grid key={key} item lg={2} md={2} sm={12} xs={12}>
            <LazyLoadImage
              style={{
                objectFit: "contain",
                width: "100%",
                minHeight: 100,
                maxWidth: 300,
                maxHeight: 120,
                backgroundColor: "white",
              }}
              src={img}
              alt="logo"
            />
            {/* <img
              style={{
                objectFit: "contain",
                width: "100%",
                minHeight: 100,
                maxWidth: 300,
                maxHeight: 120,
                backgroundColor: "white",
              }}
              src={img}
              alt="logo"
            /> */}
          </Grid>
        ))}
      </Grid>
      <Typography style={styles.footerText}>
        <a href="/privacy-policy" target="_blank" rel="noreferrer noopener">
          Privacy Policy
        </a>
        |
        {/* <a href="terms-of-use" target="_blank" rel="noopener noreferrer">
          Terms of Use
        </a> */}
        <a href="/terms-of-use" target="_blank" rel="noreferrer noopener">
          Terms of Use
        </a>
        |
        <a href="/ccpa-opt-out" target="_blank" rel="noreferrer noopener">
          Do not sell my personal information
        </a>
      </Typography>
      <Typography style={styles.footerText}>
        17501 Biscayne Boulevard, STE 540 Aventura, FL 33160
      </Typography>
    </div>
  )
}

const styles = {
  footerContainer: {
    margin: 0,
    marginTop: 40,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderTop: "1px solid blue",
  },
  footerHeadingContainer: {
    marginTop: "30px",
  },
  footerHeading: {
    textAlign: "center",
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 40,
  },
}

export default Footer
