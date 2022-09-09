import React, { useEffect, useState } from "react"
import { Container, Grid, Typography, Box } from "@mui/material"
import blueLogo from "../assets/blue-logo.PNG"
import CircularProgress from "@mui/material/CircularProgress"
import ProductCard from "../components/ProductCard"
import Section2Component from "../components/Section2Component"
// import carImg from "../assets/car.png"
// import commercialImg from "../assets/comercial.png"

// import healthImg from "../assets/health.png"
import Section3Component from "../components/Section3Component"
import { IoCarSportSharp } from "react-icons/io5"
import { FaHandHoldingMedical } from "react-icons/fa"
import { FaHeartbeat } from "react-icons/fa"

// import Section4Component from "../components/Section4Component"
import HomeBodyBottom from "../components/HomeBodyBottom"

import { useAppContext } from "../context/appContext/AppContext"
import { SET_MODULE_HOMEPAGE } from "../context/appContext/appActions"
import { Link } from "react-router-dom"

import { motion } from "framer-motion/dist/framer-motion"
const HomePage = () => {
  const [showGetStarted, setShowGetStarted] = useState(false)
  const [placeholder, setPlaceholder] = React.useState("")

  const { step, setActiveModule, clearAppStates, setGetStarted, getStarted } =
    useAppContext()

  const string = "Welcome to Advanced Insurance Online",
    index = React.useRef(0)
  React.useEffect(() => {
    function tick() {
      setPlaceholder((prev) => prev + string[index.current])
      index.current++
    }
    if (index.current < string.length) {
      let addChar = setInterval(tick, 40)
      return () => clearInterval(addChar)
    } else {
      setShowGetStarted(true)
      setTimeout(() => {
        //("Setting session started to true")
        window.sessionStorage.setItem("getStarted", true)
        setGetStarted(true)
      }, 800)
    }
  }, [placeholder])

  useEffect(() => {
    clearAppStates()
    setActiveModule(SET_MODULE_HOMEPAGE)
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {getStarted ? (
        <motion.div
          style={styles.homepageContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Container style={styles.homepageUpperContainer}>
            <Container>
              <Typography sx={styles.title}>
                The Smart and Easy Way <br /> to Shop for Insurance.
              </Typography>
            </Container>
            <Container>
              <Typography variant="h4" sx={styles.tagline}>
                Get Started Below, It's Free!
              </Typography>
            </Container>
            <Container style={{ maxWidth: 800 }}>
              <Grid
                container
                // spacing={2}

                direction={{ md: "row", lg: "row", sm: "column", xs: "column" }}
                alignItems="center"
                justify="center"
              >
                <Grid
                  item
                  lg={4}
                  sm={4}
                  xs={12}
                  md={4}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link style={styles.link} className="m-3" to="auto-insurance">
                    <ProductCard title="Auto">
                      <IoCarSportSharp fontSize={100} color="#148a78" />
                    </ProductCard>
                  </Link>
                </Grid>
                <Grid
                  item
                  lg={4}
                  sm={4}
                  xs={12}
                  md={4}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link style={styles.link} className="m-3" to="life-insurance">
                    <ProductCard title="Life">
                      <FaHeartbeat fontSize={100} color="#148a78" />
                    </ProductCard>
                  </Link>
                </Grid>

                <Grid
                  item
                  lg={4}
                  sm={4}
                  xs={12}
                  md={4}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link style={styles.link} className="m-3" to="medicare">
                    <ProductCard title="Medicare">
                      <FaHandHoldingMedical fontSize={100} color="#148a78" />
                    </ProductCard>
                  </Link>
                </Grid>
              </Grid>
            </Container>
          </Container>
          <Section2Component />
          <Section3Component />
          <HomeBodyBottom />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={styles.landingContainer}
        >
          {/* <Random text="Welcome to Advanced Ins. Online" />
          <Wave text="Welcome to Advanced Ins. Online" /> */}
          <Container
            maxWidth="lg"
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography style={styles.landingHeading}>
                {placeholder}
              </Typography>
              {showGetStarted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={styles.logo}
                    src={blueLogo}
                    alt="Advanced Ins. Online"
                  />

                  <CircularProgress style={styles.spinnerStyle} />
                </motion.div>
              ) : null}
            </Box>
          </Container>
        </motion.div>
      )}
    </>
  )
}

const styles = {
  landingContainer: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#000e31",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  landingHeading: {
    fontSize: 50,
    color: "white",
    textAlign: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    maxWidth: 300,
  },
  spinnerStyle: {
    color: "white",
  },
  homepageContainer: {
    margin: 0,
    padding: 0,
    width: "100%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  homepageUpperContainer: {
    margin: 0,
    padding: 0,
    display: "flex",
    marginBottom: 100,

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: "#000e31",
    fontWeight: "bolder",
    paddingLeft: "50px",
    paddingRight: "50px",
    paddingBottom: "10px",
    marginTop: 10,
    lineHeight: { lg: "70px", md: "70px", sm: "70px", xs: "50px" },
    fontSize: { lg: 60, md: 50, sm: 45, xs: 30 },
    textShadow: "1px 1px 5px #148a78",
  },
  tagline: {
    color: "#000e31",
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: "70px",
    paddingLeft: "50px",
    paddingRight: "50px",
    paddingBottom: "10px",
    fontSize: { lg: 30, md: 30, sm: 25, xs: 20 },
  },
  link: {
    textDecoration: "none",
  },
}

export default HomePage
