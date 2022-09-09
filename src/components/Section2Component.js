import React from "react"
import QuestionComponent from "../components/QuestionComponent"
import { Container, Grid, Typography, Box } from "@mui/material"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import carImg from "../assets/car.png"
const Section2Component = () => {
  return (
    <div style={styles.container}>
      <Container>
        <Typography className="m-5" sx={styles.title}>
          Compare Insurance Quotes in Minutes
        </Typography>
        <Grid
          container
          // direction={{ md: "row", lg: "row", sm: "column", xs: "column" }}
          alignItems="center"
          justify="center"
          spacing={2}
        >
          <Grid item lg={6} sm={12} xs={12} md={6}>
            <Box sx={styles.imgContainer}>
              <LazyLoadImage
                alt="compare quotes"
                src={carImg}
                style={styles.image}
                effect="blur"
              />
              {/* <img src={carImg} style={styles.image} alt="asdas" /> */}
            </Box>
          </Grid>
          <Grid item lg={6} sm={12} xs={12} md={6}>
            <Box sx={styles.qaBox}>
              <Typography sx={styles.subTitle}>How it Works</Typography>
              <QuestionComponent
                heading="1. Answer Questions"
                desc="We’ll ask you quick questions about yourself and the insurance coverage you want."
              />
              <QuestionComponent
                heading="2. Compare Rates"
                desc="We’ll sort through over 200 insurance companies and find the best rates available in your area. We’ll even check for discounts. "
              />
              <QuestionComponent
                heading="3. Find Coverage"
                desc="Review the offers and find the coverage that is right for you. The best part is that it’s 100% free and only takes a few minutes."
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: "#f2fefe",
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: { lg: 60, md: 50, sm: 45, xs: 29 },
    fontWeight: "bold",
    color: "#000e31",
  },
  subTitle: {
    fontSize: { lg: 30, md: 22, sm: 22, xs: 22 },
    fontWeight: "bold",
    color: "#148a78",
  },
  qaBox: {
    width: { lg: 404, md: 404, sm: 550 },
    height: { lg: 582, md: 582, sm: 380 },
    // marginLeft: 30,
  },
  imgContainer: {
    // width: { lg: 404, md: 404, sm: 300, xs: 404 },
    // height:
    width: "100%",
    height: "100%",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    // height: "100%",

    // maxWidth: "652px",
    // maxHeight: "504px",
  },
}
export default Section2Component
