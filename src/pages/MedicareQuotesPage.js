import React, { useEffect } from "react"

import { useNavigate } from "react-router-dom"

import { Typography, Container, Button } from "@mui/material"

import { useMedicareContext } from "../context/medicareContext/MedicareContext"
import { useAppContext } from "../context/appContext/AppContext"
import Zoom from "@mui/material/Zoom"
const MedicareQuotesPage = () => {
  const navigate = useNavigate()
  const {
    is_insured,
    insurance_name,
    insurancePrivateSecondary,
    clientIP,
    jornayaID,
    DOB,
    gender,
    name,
    fname,
    lname,
    address,
    email,
    phone,
    stateInitial,
    zip,
    city,
    unit,
  } = useMedicareContext()
  const { addMedicareClient } = useAppContext()

  useEffect(() => {
    //("Medicare QuotesPage Rendered")
    //(
    //   "About to post:",
    //   DOB,
    //   clientIP,
    //   jornayaID,
    //   gender,
    //   name,
    //   address,
    //   unit,
    //   stateInitial,
    //   zip,
    //   email,
    //   phone,
    //   is_insured,
    //   insurance_name,
    //   insurancePrivateSecondary,
    //   city
    // )
    //("City is", city)
    addMedicareClient(
      DOB,
      gender,
      name,
      fname,
      lname,
      is_insured,
      insurance_name,
      insurancePrivateSecondary,
      address,
      unit,
      stateInitial,
      zip,
      email,
      phone,
      clientIP,
      jornayaID,
      city
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
      <Zoom in={true}>
        <Typography sx={styles.title}>Congratulations,{name} !</Typography>
      </Zoom>

      <Typography sx={styles.subTitle}>
        You will be contacted shortly and provided with Medicare Insurance
        Quotes
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
export default MedicareQuotesPage
