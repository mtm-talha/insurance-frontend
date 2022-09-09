import React, { useEffect } from "react"

import { useNavigate } from "react-router-dom"

import { useLifeContext } from "../context/lifeContext/LifeContext"
import { useAppContext } from "../context/appContext/AppContext"

import { Typography, Container, Button } from "@mui/material"

const LifeQuotesPage = () => {
  const navigate = useNavigate()
  const { addLifeClient } = useAppContext()
  const {
    DOB,
    gender,
    name,
    fname,
    lname,
    address,
    unit,
    city,
    stateInitial,
    zip,
    email,
    phone,
    height,
    weight,
    is_tobacco,
    is_health_condition,
    health_condition,
    coverage_time,
    coverage_amount,
    is_married,
    clientIP,
    jornayaID,
    is_insured,
    insurance_name,
    // runServices,
  } = useLifeContext()
  useEffect(() => {
    //("Life QuotesPage Rendered")
    //(
    //   "About to post:",
    //   DOB,
    //   gender,
    //   name,
    //   address,
    //   unit,
    //   city,
    //   stateInitial,
    //   zip,
    //   email,
    //   phone,
    //   height,
    //   weight,
    //   is_tobacco,
    //   is_health_condition,
    //   health_condition,
    //   coverage_time,
    //   coverage_amount,
    //   is_married,
    //   clientIP,
    //   jornayaID,
    //   is_insured,
    //   insurance_name
    // )
    addLifeClient(
      DOB,
      gender,
      name,
      fname,
      lname,
      address,
      unit,
      city,
      stateInitial,
      zip,
      email,
      phone,
      height,
      weight,
      is_tobacco,
      is_health_condition,
      health_condition,
      coverage_time,
      coverage_amount,
      is_married,
      clientIP,
      jornayaID,
      is_insured,
      insurance_name
    )

    return () => {}
  }, [])
  function handleClick() {
    navigate("/")
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Container style={styles.pageContainer}>
      <Typography sx={styles.title}>Congratulations,{name} !</Typography>

      <Typography sx={styles.subTitle}>
        You will be contacted shortly and provided with Life Insurance Quotes
      </Typography>
      <Button
        variant="contained"
        sx={styles.returnButton}
        onClick={handleClick}
      >
        Back to Home
      </Button>
    </Container>
  )
}
const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    paddingLeft: "50px",
    paddingRight: "50px",
    paddingBottom: "10px",
    fontSize: { lg: 48, md: 30, sm: 30, xs: 25 },
    color: "#000e31",
  },
  subTitle: {
    textAlign: "center",
    // fontWeight: "bold",
    paddingLeft: "50px",
    paddingRight: "50px",
    paddingBottom: "10px",
    fontSize: { lg: 30, md: 30, sm: 25, xs: 20 },
    color: "#000e31",
  },
  tagline: {},
  returnButton: {
    minWidth: 97,
    width: "100%",
    minHeight: 70,
    maxWidth: 300,
    height: "100%",
    fontWeight: "bold",
    fontSize: { lg: 30, md: 30, sm: 25, xs: 20 },
    backgroundColor: "#000e31",
    color: "white",
    margin: "25px 0px",
  },
}

export default LifeQuotesPage
