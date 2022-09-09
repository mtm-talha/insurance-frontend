import { Container, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { Box } from "@mui/system"
import React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { BsFacebook } from "react-icons/bs"
import { AiFillTwitterCircle } from "react-icons/ai"
import { SiTinder } from "react-icons/si"
import { TiSocialLinkedinCircular } from "react-icons/ti"
import { BsYoutube } from "react-icons/bs"
import { AiFillInstagram } from "react-icons/ai"
import { FaTiktok } from "react-icons/fa"
import blueLogo from "../assets/blue-logo.PNG"


const HomeFooter = () => {
  return (
    <div style={styles.container}>
      <Container sx={{ marginTop: 5 }}>
        <Grid container spacing={2}>
          <Grid item lg={4} sm={12} xs={12} md={12}>
            <Grid container spacing={2}>
              <Grid item lg={12} sm={12} xs={12} md={12}>
                <Box style={{ display: "flex", flexDirection: "row" }}>
                  <img
                    style={styles.logo}
                    src={blueLogo}
                    alt="Advanced Ins. Online"
                  />
                </Box>
              </Grid>
              <Grid item lg={12} sm={12} xs={12} md={6}>
                <Box style={styles.addressBox}>
                  <Typography style={styles.text}>
                    17501 Biscayne Boulevard, STE 540 Aventura, FL 33160
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={12} sm={12} xs={12} md={6}>
                <Box>
                  <Typography fontWeight="bold" color="#1DD3F8">
                    Call 24/7 for a free quote
                  </Typography>
                  <Typography style={styles.text}>844-658-4626</Typography>
                </Box>
              </Grid>
              <Grid item lg={12} sm={12} xs={12} md={6}>
                <Box>
                  <Typography fontWeight="bold" color="#1DD3F8">
                    Have Questions?
                  </Typography>
                  <Typography style={styles.text}>
                    info@advancedInsonline.com
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={12} sm={12} xs={12} md={6}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box sx={styles.iconContainer}>
                    <a
                      href="https://www.facebook.com/Advancedinsonline-103447958947719"
                      alt="fb_link"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <BsFacebook
                        style={{
                          fontSize: 27,
                          color: "#3955bc",
                        }}
                      />
                    </a>
                  </Box>
                  <Box sx={styles.iconContainer}>
                    <a
                      href="https://twitter.com/Advancedins_o"
                      alt="twitter_link"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <AiFillTwitterCircle
                        style={{
                          fontSize: 27,
                          color: "#1da1f2",
                        }}
                      />
                    </a>
                  </Box>
                  <Box sx={styles.iconContainer}>
                    {" "}
                    <SiTinder
                      style={{
                        fontSize: 27,
                        color: "#1da1f2",
                      }}
                    />
                  </Box>
                  <Box sx={styles.iconContainer}>
                    <TiSocialLinkedinCircular
                      style={{
                        fontSize: 27,
                        color: "#0077b5",
                      }}
                    />
                  </Box>
                  <Box sx={styles.iconContainer}>
                    <BsYoutube
                      style={{
                        fontSize: 27,
                        color: "#ff0000",
                      }}
                    />
                  </Box>
                  <Box sx={styles.iconContainer}>
                    <a
                      href="https://www.instagram.com/advancedinsonline/"
                      alt="instg_link"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <AiFillInstagram
                        style={{
                          fontSize: 27,
                          color: "#7b2dc3",
                        }}
                      />
                    </a>
                  </Box>
                  <Box sx={styles.iconContainer}>
                    <FaTiktok
                      style={{
                        fontSize: 27,
                        color: "#3955bc",
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8} sm={12} xs={12} md={12}>
            <Grid container>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Box sx={styles.colContainer}>
                  <Typography style={styles.subHeading}>
                    Company Information
                  </Typography>

                  <Link style={styles.links} to="/">
                    Home
                  </Link>
                  <Link style={styles.links} to="/about-us">
                    About Us
                  </Link>
                  {/* <Link style={styles.links} to="/contact-us">
                    Contact Us
                  </Link> */}
                  <Link style={styles.links} to="/privacy-policy">
                    Privacy Policy
                  </Link>
                  <Link style={styles.links} to="/ccpa-opt-out">
                    Do not sell my personal information
                  </Link>
                  <Link style={styles.links} to="/terms-of-use">
                    Terms of use
                  </Link>
                </Box>
                <Accordion sx={styles.colAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography style={styles.subHeadingAcc}>
                      Company Information
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails style={styles.accordionDetails}>
                    <Link style={styles.linksAcc} to="/">
                      Home
                    </Link>
                    <Link style={styles.linksAcc} to="/about-us">
                      About Us
                    </Link>
                    <Link style={styles.linksAcc} to="/contact-us">
                      Contact Us
                    </Link>
                    <Link style={styles.linksAcc} to="/privacy-policy">
                      Privacy Policy
                    </Link>
                    <Link style={styles.linksAcc} to="/ccpa-opt-out">
                      Do not sell my personal information
                    </Link>
                    <Link style={styles.linksAcc} to="/terms-of-use">
                      Terms of use
                    </Link>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Box sx={styles.colContainer}>
                  <Typography style={styles.subHeading}>
                    Insurance Quotes
                  </Typography>

                  <Link style={styles.links} to="/auto-insurance">
                    Auto Insurance
                  </Link>
                  <Link style={styles.links} to="/life-insurance">
                    Life Insurance
                  </Link>
                  <Link style={styles.links} to="/medicare">
                    Medicare
                  </Link>
                </Box>
                <Accordion sx={styles.colAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography style={styles.subHeadingAcc}>
                      Insurance Quotes
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails style={styles.accordionDetails}>
                    <Link style={styles.linksAcc} to="/auto-insurance">
                      Auto Insurance
                    </Link>
                    <Link style={styles.linksAcc} to="life-insurance">
                      Life Insurance
                    </Link>
                    <Link style={styles.linksAcc} to="/medicare">
                      Medicare
                    </Link>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box sx={styles.colContainer}>
                  <Typography style={styles.subHeading}>
                    Insurance in Your State
                  </Typography>
                  <Typography style={styles.text}>
                    AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME
                    MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI
                    SC SD TN TX UT VT VA WA WV WI WY
                  </Typography>
                </Box>
                <Accordion sx={styles.colAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography style={styles.subHeadingAcc}>
                      Insurance in Your State
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography style={styles.textAcc}>
                      AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA
                      ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR
                      PA RI SC SD TN TX UT VT VA WA WV WI WY
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Typography style={styles.credits}>
          © 2022 AdvancedInsonline.com LLC DBA Advanced Insurance designed and
          developed by{" "}
          <a
            href="https://www.instagram.com/forgeware_solutions/"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#1DD3F8",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Forgeware Solutions
          </a>
          . All rights reserved. Advanced Insurance Online is a digital
          insurance comparison engine, providing real-time rates and insurance
          services in all 50 states through its relationships with carrier and
          agency partners.
        </Typography>
      </Container>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: "#000e31",
    width: "100%",
  },
  logo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    maxWidth: 200,
  },
  iconContainer: {
    backgroundColor: "#000e31",

    borderRadius: 50,
    width: "fit-content",
    padding: "4px",
  },
  subHeading: {
    margin: "10px 0px",
    fontWeight: "bold",
    fontSize: 20,
    color: "#1DD3F8",
  },
  text: { color: "white" },
  addressBox: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 200,
    color: "white",
  },
  infoBoxContainer: {
    display: "flex",
    flexDirection: "column",
  },
  colContainer: {
    display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
    flexDirection: "column",
  },
  colAccordion: {
    display: { lg: "none", md: "none", sm: "block", xs: "block" },
    marginBottom: 2,
  },
  subHeadingAcc: {
    color: "black",
  },
  textAcc: {
    color: "black",
  },
  accordionDetails: {
    display: "flex",
    flexDirection: "column",
  },
  credits: {
    margin: "20px 0px",
    marginBottom: 0,
    textAlign: "center",
    color: "#26ac94",
  },
  links: {
    padding: "10px 0px",
    fontSize: 18,
    textDecoration: "none",
    color: "white",
  },
  linksAcc: {
    padding: "10px 0px",
    fontSize: 18,
    textDecoration: "none",
    color: "black",
  },
}

export default HomeFooter
