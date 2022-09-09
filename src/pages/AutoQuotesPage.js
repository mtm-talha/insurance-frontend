import React, { useEffect } from "react"
import { useAutoContext } from "../context/autoContext/AutoContext"
import { useAppContext } from "../context/appContext/AppContext"
import { useNavigate } from "react-router-dom"

import { Typography, Container, Button } from "@mui/material"

const AutoQuotesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const navigate = useNavigate()
  const {
    car1_year,
    car1_make,
    car1_model,
    car2_year,
    car2_make,
    car2_model,
    is_insured,
    insurance_name,
    insurance_time,
    is_homeOwner,
    driver1_DOB,
    driver1_gender,
    driver1_married,
    driver1_accident,
    driver1_drunk,
    driver1_name,
    driver1_fname,
    driver1_lname,
    driver2_DOB,
    driver2_gender,
    driver2_married,
    driver2_accident,
    driver2_drunk,
    driver2_fname,
    driver2_lname,
    is_army,
    address,
    unit,
    city,
    stateInitial,
    zip,
    email,
    phone,
    secondDriverAdded,
    secondCarAdded,
    jornayaID,
    clientIP,
  } = useAutoContext()
  const { addAutoClient } = useAppContext()
  useEffect(() => {
    const summaryData = {
      Vehicle1: {
        Year: car1_year,
        Make: car1_make,
        Model: car1_model,
      },
      Vehicle2: {
        Year: car2_year,
        Make: car2_make,
        Model: car2_model,
      },
      Driver1: {
        Fname: driver1_fname,
        Lname: driver1_lname,
        DOB: driver1_DOB,
        Gender: driver1_gender,
        Married: driver1_married ? "Yes" : "No",
        AtFaultAccident: driver1_accident ? "Yes" : "No",
        DUI: driver1_drunk ? "Yes" : "No",
      },
      Driver2: {
        Fname: driver2_fname,
        Lname: driver2_lname,
        DOB: driver2_DOB,
        Gender: driver2_gender,
        Married: driver2_married ? "Yes" : "No",
        AtFaultAccident: driver2_accident ? "Yes" : "No",
        DUI: driver2_drunk ? "Yes" : "No",
      },
      Insured: is_insured ? "Yes" : "No",
      InsuranceName: insurance_name,
      InsuranceTime: insurance_time,
      HomeOwner: is_homeOwner,
      Address: address,
      Unit: unit,
      City: city,
      StateInitial: stateInitial,
      Zip: zip,
      Email: email,
      Phone: phone,
      is_army: is_army,
      secondDriverAdded: secondDriverAdded,
      secondCarAdded: secondCarAdded,
      jornayaID: jornayaID,
      clientIP: clientIP,
    }
    //("Auto QuotesPage Rendered")
    //("About to post:", summaryData)
    addAutoClient(summaryData)

    return () => {}
  }, [])

  function handleClick() {
    navigate("/")
  }

  return (
    <Container style={styles.pageContainer}>
      <Typography sx={styles.title}>
        Congratulations,{driver1_name} !
      </Typography>

      <Typography sx={styles.subTitle}>
        You will be contacted shortly and provided with Auto Insurance Quotes
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

export default AutoQuotesPage
