import React from "react"

import { Container, Grid, Typography, Box } from "@mui/material"
import insuranceImg from "../assets/insurance-home.jpg"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
const Section3Component = () => {
  return (
    <div style={styles.container}>
      <Container>
        <Grid
          container
          // direction={{ md: "row", lg: "row", sm: "column", xs: "column" }}

          alignItems="center"
          justify="center"
          spacing={2}
        >
          <Grid item lg={6} sm={12} xs={12} md={6}>
            <Box sx={styles.leftBox}>
              <Typography sx={styles.title}>
                Smarter Insurance Shopping Built by People & Powered by
                Technology.
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={6} sm={12} xs={12} md={6}>
            <Box sx={styles.imgContainer}>
              <LazyLoadImage
                alt="Insurance"
                src={insuranceImg}
                style={styles.image}
                effect="blur"
              />
              {/* <img src={insuranceImg} style={styles.image} alt="Insurance " /> */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

const styles = {
  container: {
    margin: "50px 0px",
    backgroundColor: "white",
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: { lg: 40, md: 45, sm: 45, xs: 29 },
    fontWeight: "bold",
    // color: "#000e31",
    color: "#148a78",
  },

  leftBox: {
    // width: { lg: 404, md: 404, sm: 550 },
    // height: { lg: 582, md: 582, sm: 380 },
    width: "100%",
    height: "100%",
    // marginLeft: 30,
  },
  imgContainer: {
    // width: { lg: 404, md: 404, sm: 300, xs: 404 },
    // height:
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    // height: "100%",
    maWidth: "100%",
    // maxWidth: "652px",
    // maxHeight: "504px",
  },
}
export default Section3Component
