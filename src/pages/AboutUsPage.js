import React, { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion"
import { Button, Container, Grid, TextField, Typography } from "@mui/material"
import section1Img from "../assets/contact-us-img.jpg"
import { Box } from "@mui/system"
import { validEmail } from "../util/typeChecking"
import { RiTeamLine } from "react-icons/ri"
import { BsCartPlusFill } from "react-icons/bs"
import { BiMapPin } from "react-icons/bi"
import { FaHandshake } from "react-icons/fa"
import PartnerCard from "../components/PartnerCard"
import nosherwanImg from "../assets/nosherwan.jpeg"
import shahbazImg from "../assets/shahbaz.jpeg"
import noelImg from "../assets/noel.jpeg"

import { useAppContext } from "../context/appContext/AppContext"
import { LazyLoadImage } from "react-lazy-load-image-component"

const AboutUsPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const { postContactUs } = useAppContext()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function handleSubmit() {
    setError(false)
    setSuccess(false)
    if (
      name.length > 0 &&
      email.length > 0 &&
      phone.length > 0 &&
      message.length > 0
    ) {
      if (validEmail.test(email)) {
        setTimeout(() => {
          setSuccess(true)
          const contactObj = {
            name: name,
            email: email,
            phone: phone,
            message: message,
          }
          postContactUs(contactObj)
        }, 2000)
      } else {
        setError(true)
      }
    } else {
      setError(true)
    }
  }
  function formatPhoneNumber(value) {
    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return value

    // clean the input for any non-digit values.
    const phoneNumber = value.replace(/[^\d]/g, "")

    // phoneNumberLength is used to know when to apply our formatting for the phone number
    const phoneNumberLength = phoneNumber.length

    // we need to return the value with no formatting if its less then four digits
    // this is to avoid weird behavior that occurs if you  format the area code to early

    if (phoneNumberLength < 4) return phoneNumber

    // if phoneNumberLength is greater than 4 and less the 7 we start to return
    // the formatted number
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    }

    // finally, if the phoneNumberLength is greater then seven, we add the last
    // bit of formatting and return it.
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`
  }
  const handlePhoneInput = (e) => {
    // this is where we'll call our future formatPhoneNumber function that we haven't written yet.
    const formattedPhoneNumber = formatPhoneNumber(e.target.value)
    // we'll set the input value using our setInputValue
    setPhone(formattedPhoneNumber)
  }
  return (
    <div style={styles.mainContainer}>
      <div style={styles.section1}>
        <Container>
          <Grid container alignItems="center" justify="center">
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box style={styles.textContainer}>
                <Typography sx={styles.title}>
                  No one can surely predict the future. But we can protect it.
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <LazyLoadImage
                style={styles.section1image}
                src={section1Img}
                alt="Contact"
              />
              {/* <img
                style={styles.section1image}
                src={section1Img}
                alt="Contact"
              /> */}
            </Grid>
          </Grid>
        </Container>
      </div>
      <div style={styles.section2About}>
        <Container>
          <Typography sx={styles.heading}>
            About Advanced Insurance Online
          </Typography>
          <Grid container alignItems="center" justify="center">
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={styles.formBox}>
                <Typography sx={{ fontSize: 20, margin: "10px 0px" }}>
                  Drop us a message
                </Typography>
                <TextField
                  inputProps={{
                    underline: {
                      "&&&:before": {
                        borderBottom: "none",
                      },
                      "&&:after": {
                        borderBottom: "none",
                      },
                    },
                  }}
                  style={{
                    width: "100%",
                    maxWidth: "80%",

                    padding: 0,
                    border: "none",
                    marginBottom: 10,
                  }}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  inputProps={{
                    underline: {
                      "&&&:before": {
                        borderBottom: "none",
                      },
                      "&&:after": {
                        borderBottom: "none",
                      },
                    },
                  }}
                  style={{
                    width: "100%",
                    maxWidth: "80%",
                    padding: 0,
                    border: "none",
                    marginBottom: 10,
                  }}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  inputProps={{
                    underline: {
                      "&&&:before": {
                        borderBottom: "none",
                      },
                      "&&:after": {
                        borderBottom: "none",
                      },
                    },
                  }}
                  style={{
                    width: "100%",
                    maxWidth: "80%",
                    padding: 0,
                    border: "none",
                    marginBottom: 10,
                  }}
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  placeholder="(XXX) XXX-XXXX"
                  value={phone}
                  onChange={(e) => handlePhoneInput(e)}
                />
                <TextField
                  inputProps={{
                    underline: {
                      "&&&:before": {
                        borderBottom: "none",
                      },
                      "&&:after": {
                        borderBottom: "none",
                      },
                    },
                  }}
                  style={{
                    width: "100%",
                    maxWidth: "80%",
                    padding: 0,
                    border: "none",
                    marginBottom: 10,
                  }}
                  id="outlined-basic"
                  label="Message"
                  variant="outlined"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                {success ? (
                  <Typography style={styles.successText}>
                    Your message has been relayed! Thankyou for contacting
                  </Typography>
                ) : null}
                {error ? (
                  <Typography style={styles.errorText}>
                    Please fill the whole form with valid data
                  </Typography>
                ) : null}

                <Button
                  disabled={success ? true : false}
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ margin: "10px 0px", backgroundColor: "#000e31" }}
                >
                  Submit
                </Button>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box style={styles.textContainer}>
                <Typography sx={styles.paragraph}>
                  Advanced Insurance online is a leading insurance marketplace
                  serving the needs of insurance customers across all 50 states.
                </Typography>
                <Typography sx={styles.paragraph}>
                  Advanced Insurance online CEO &amp; PRESIDENT Noel Gary Beres
                  spent 30 years as a succesful insurance executive. He and Raja
                  Nosherwan Amjad Founder of Gakhar Telemarketing and Raja
                  Shahbaz CEO of Gakhar Telemarketing became directors of
                  Advanced Insurance Online on 1st February 2022. With a long
                  history in insurance and technology, our leaders have wed the
                  two industries to create a smart way to serve consumers,
                  businesses and insurance agents across the U.S.
                </Typography>
                <Typography sx={styles.paragraph}>
                  We are a technology company on a mission to simplify the
                  insurance- buying experience with a transparent
                  insurance-technology platform that matches shoppers with the
                  right insurance carrier products. We use our technology, our
                  licensed agents and our insurance expertise to make the entire
                  process simpler and more efficient for our users.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>

      <div style={styles.section4Mission}>
        <Container maxWidth="md" style={styles.generalColumnContainer}>
          <Typography sx={styles.subHeading}>Our Mission</Typography>
          <Typography sx={styles.centeredParagraph}>
            <span> “ </span>
            We are building a more efficient insurance marketplace, where
            consumers have the most satisfying experience finding superior
            insurance coverage at a great value. <span> ” </span>
          </Typography>
        </Container>
      </div>
      <div style={styles.section5Impact}>
        <Container maxWidth="md">
          <Typography sx={styles.subHeading}>Our Impact</Typography>
          <Grid container alignItems="center" justify="center" spacing={2}>
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box style={styles.cardContainer}>
                <RiTeamLine fontSize={120} color="#148a78" />
                <Box style={styles.cardTextContainer}>
                  <Typography sx={styles.CardText1}>250+</Typography>
                  <Typography sx={styles.CardText2}>
                    Advanced Insurance Employees
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box style={styles.cardContainer}>
                <BsCartPlusFill fontSize={120} color="#148a78" />
                <Box style={styles.cardTextContainer}>
                  <Typography sx={styles.CardText1}>15m+</Typography>
                  <Typography sx={styles.CardText2}>
                    Insurance shoppers for 2022
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box style={styles.cardContainer}>
                <BiMapPin fontSize={120} color="#148a78" />
                <Box style={styles.cardTextContainer}>
                  <Typography sx={styles.CardText1}>50 states</Typography>
                  <Typography sx={styles.CardText2}>
                    Where we offer insurance
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box style={styles.cardContainer}>
                <FaHandshake fontSize={120} color="#148a78" />
                <Box style={styles.cardTextContainer}>
                  <Typography sx={styles.CardText1}>6,500+</Typography>
                  <Typography sx={styles.CardText2}>
                    Insurance partners
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div style={styles.section6Partners}>
        <Container>
          <Grid container alignItems="center" justify="center" spacing={2}>
            <Grid
              item
              lg={4}
              md={4}
              sm={12}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PartnerCard
                img={nosherwanImg}
                title="RAJA NOSHERWAN AMJAD"
                desc="Director Web Traffic, SEO and Google Ad Words"
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              sm={12}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PartnerCard
                img={noelImg}
                title="NOEL GARY BERES"
                desc="C.E.O & President"
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              sm={12}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PartnerCard
                img={shahbazImg}
                title="RAJA SHAHBAZ ALI"
                desc="Director Programming and Development."
              />
            </Grid>
          </Grid>
        </Container>
      </div>
      <div style={styles.section7Team}></div>
    </div>
  )
}
const styles = {
  mainContainer: {
    width: "100%",
    height: "100%",
  },
  section1: { width: "100%", height: "100%" },
  section2About: { width: "100%", padding: "20px 0px" },

  section4Mission: {
    width: "100%",
  },
  section5Impact: { width: "100%" },
  section6Partners: { width: "100%", height: "100%", margin: "50px 0px" },
  section7Team: { width: "100%" },
  textContainer: {
    marginTop: 3,
    width: "fit-content",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  generalColumnContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "justify",
    textJustify: "distribute",
    textAlignLast: "left",
    wordSpacing: -1,
    color: "#000e31",
    fontWeight: "bolder",
    paddingLeft: "50px",
    paddingRight: "50px",
    paddingBottom: "10px",
    marginTop: 10,
    lineHeight: "70px",
    fontSize: { lg: 50, md: 50, sm: 45, xs: 30 },
  },
  formBox: {
    border: "1px solid black",
    height: "100%",
    width: "70%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: 10,
  },
  heading: {
    textAlign: "center",
    // textJustify: "distribute",
    // textAlignLast: "left",
    // wordSpacing: -3,
    color: "#1dd3f8",
    fontWeight: "bolder",

    marginTop: 10,
    marginBottom: 10,
    lineHeight: "70px",
    fontSize: { lg: 50, md: 50, sm: 45, xs: 30 },
  },
  subHeading: {
    textAlign: "center",
    color: "#1dd3f8",
    fontWeight: "bold",

    marginTop: 5,
    marginBottom: 5,

    fontSize: { lg: 30, md: 28, sm: 25, xs: 25 },
  },
  paragraph: {
    textAlign: "justify",
    textJustify: "distribute",
    textAlignLast: "left",
    // wordSpacing: -3,

    // textAlign: "center",
    color: "#000e31",
    fontSize: { lg: 18, md: 17, sm: 16, xs: 13 },
    marginTop: 1,
  },
  centeredParagraph: {
    textAlign: "center",
    color: "#000e31",
    fontSize: { lg: 18, md: 17, sm: 16, xs: 13 },
    marginTop: 5,
    marginBottom: 5,
  },
  text: {
    textAlign: "center",
    color: "#000e31",
    fontSize: { lg: 18, md: 17, sm: 16, xs: 13 },
    marginTop: 5,
  },
  successText: {
    textAlign: "center",
    color: "green",
    fontSize: { lg: 18, md: 17, sm: 16, xs: 13 },
    margin: "10px 0px",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: { lg: 18, md: 17, sm: 16, xs: 13 },
    margin: "10px 0px",
  },
  section1image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    // maxWidth: 300,
  },
  cardContainer: {
    width: "100%",
    height: "100%",
    minHeight: 200,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2fefe",
    padding: "50px",
  },
  cardTextContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: "20px",
  },
  CardText1: {
    fontSize: { lg: 47, md: 47, sm: 40, xs: 30 },
    fontFamily: "Raleway",
    fontWeight: "bold",
    color: "#000e31",
  },
  CardText2: {
    fontSize: { lg: 22, md: 22, sm: 20, xs: 18 },
    color: "#000e31",
  },
}

export default AboutUsPage
