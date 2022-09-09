import React, { useState, useEffect } from "react"

import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { validEmail, validZip } from "../util/typeChecking"
import { Box } from "@mui/system"
import { useAppContext } from "../context/appContext/AppContext"
import { SET_MODULE_HOMEPAGE } from "../context/appContext/appActions"

const DoNotSellPage = () => {
  const [fName, setFname] = useState("")
  const [fnameError, setFnameError] = useState("")
  const [lName, setLname] = useState("")
  const [lnameError, setLnameError] = useState("")
  const [address, setAddress] = useState("")
  const [addressError, setAddressError] = useState("")
  const [city, setCity] = useState("")
  const [cityError, setCityError] = useState("")
  const [state, setState] = useState("")
  const [stateError, setStateError] = useState("")
  const [zip, setZip] = useState("")
  const [zipError, setZipError] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [phone, setPhone] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [prefferedContact, setPreferredContact] = useState("Email")
  const [recieve, setRecieve] = useState("Email")
  const [access, setAccess] = useState("No")
  const [deleteInfo, setDeleteInfo] = useState("No")
  const [optOut, setOptout] = useState("No")
  const [authAgent, setAuthAgent] = useState("Yes")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { sendOptOut, setActiveModule } = useAppContext()

  useEffect(() => {
    window.scrollTo(0, 0)
    setActiveModule(SET_MODULE_HOMEPAGE)
  }, [])

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

  const handlePrefferedChange = (event) => {
    setPreferredContact(event.target.value)
  }
  const handleRecieveChange = (event) => {
    setRecieve(event.target.value)
  }
  function handleSubmit() {
    setFnameError("")
    setLnameError("")
    setAddressError("")
    setEmailError("")
    setZipError("")
    setCityError("")
    setStateError("")
    setPhoneError("")
    setError("")
    //(fName, lName, address, city, state, phone, email, zip)
    if (fName.length < 1) {
      setFnameError("This is a necessary field")
      setFname("")
    }

    if (lName.length < 1) {
      setLnameError("This is a necessary field")
      setLname("")
    }
    if (address.length < 1) {
      setAddressError("This is a necessary field")
      setAddress("")
    }
    if (city.length < 1) {
      setCityError("This is a necessary field")
      setCity("")
    }
    if (state.length < 1) {
      setStateError("This is a necessary field")
      setState("")
    }
    if (phone.length < 1) {
      setPhoneError("This is a necessary field")
      setPhone("")
    }
    if (email.length < 1) {
      setEmailError("This is a necessary field")
      setEmail("")
    }
    if (zip.length < 1) {
      setZipError("This is a necessary field")
      setZip("")
    }
    if (
      fName.length > 0 &&
      lName.length > 0 &&
      address.length > 0 &&
      city.length > 0 &&
      state.length > 0 &&
      phone.length > 0 &&
      email.length > 0 &&
      zip.length > 0
    ) {
      if (!validZip.test(zip)) {
        //("Zip not valid")
        setZip("")
        setZipError("Please enter valid Zip")
      }
      if (!validEmail.test(email)) {
        //("Please enter valid Email")
        setEmail("")
        setEmailError("Please enter valid Email")
      } else {
        //("ALL GOOD")
        sendOptOut({
          fName,
          lName,
          address,
          city,
          state,
          phone,
          email,
          zip,
          prefferedContact,
          access,
          optOut,
          authAgent,
        }).then((exec) => {
          if (exec) {
            //("Succesfully optouted")
            setSuccess("")

            setFname("")
            setLname("")
            setAddress("")
            setEmail("")
            setZip("")
            setCity("")
            setState("")
            setPhone("")
            setError("")
            setSuccess("Your Request has been submited!")
          } else {
            setError("")
            setError("There seems to be some problem. Please try again later.")
          }
        })
      }
    } else {
      setError("Please Fill out the Necessary Fields")
    }
  }

  return (
    <Container>
      <Typography style={styles.heading}>California Privacy Rights</Typography>
      <div>
        <p style={{ color: "red", fontWeight: "bold" }}>
          Under the California Consumer Privacy Act (“CCPA”), California
          residents have the right to access, delete, and opt-out from the sale
          of their Personal Information.
        </p>
        <p>
          To file your CCPA request, please complete the form at the bottom of
          this page or call us at{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>
            {" "}
            Phone number (8446584626)
          </span>{" "}
          On receipt of your request, we may request additional information if
          we are unable to verify your identity based on comparing the
          information you submit with information we retain in our files, or if
          we believe additional information is needed to verify your identity.
          If you request to receive the specific pieces of Personal Information
          in our files about you, we will send you and require you to return a
          signed declaration, under penalty of perjury, verifying your identity
          and request.
        </p>
        <p>
          If you file a request to access or delete your Personal Information,
          we have 45 days to respond to your request. We may also inform you
          that we need up to 45 additional days to respond and the reason we
          need additional time. If you opt-out of the sale of your Personal
          Information, we have 15 days to process your opt-out request.
        </p>
        <p>
          If you are an authorized agent of a requesting consumer, you must
          provide a written authorization from the consumer or a copy of a
          lawful power of attorney that permits you to submit the request on the
          consumer’s behalf. You may provide that written authorization to us
          via email at <a>opt-out@advancedInsonline.com</a> after submitting the
          request. We may contact you or the consumer on whose behalf you claim
          to act to verify your authorization.
        </p>
        <p>
          Additional information about how we collect, uses, and discloses
          Personal Information, and methods by which you may contact us with
          questions, can be found in our{" "}
          <a href="privacy-policy">Privacy Policy</a>. You may find the answer
          you are looking for faster by reviewing the{" "}
          <a href="privacy-policy">Privacy Policy</a> than by submitting a
          request and waiting for our response.
        </p>
      </div>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
            <Typography>
              First Name{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>*</span>
            </Typography>
            <div style={{ color: "red", fontWeight: "bold" }}>{fnameError}</div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
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
              style={{ width: "100%", padding: 0, border: "none" }}
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              value={fName}
              onChange={(e) => setFname(e.target.value)}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
            <Typography>
              Last Name{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>*</span>
            </Typography>
            <div style={{ color: "red", fontWeight: "bold" }}>{lnameError}</div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
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
              style={{ width: "100%", padding: 0, border: "none" }}
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              value={lName}
              onChange={(e) => setLname(e.target.value)}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
            <Typography>
              Address{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>*</span>
            </Typography>
            <div style={{ color: "red", fontWeight: "bold" }}>
              {addressError}
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
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
              style={{ width: "100%", padding: 0, border: "none" }}
              id="outlined-basic"
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography>
              City <span style={{ color: "red", fontWeight: "bold" }}>*</span>
            </Typography>
            <div style={{ color: "red", fontWeight: "bold" }}>{cityError}</div>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
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
              style={{ width: "100%", padding: 0, border: "none" }}
              id="outlined-basic"
              label="City"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
            <Typography>
              State <span style={{ color: "red", fontWeight: "bold" }}>*</span>
            </Typography>
            <div style={{ color: "red", fontWeight: "bold" }}>{stateError}</div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
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
              style={{ width: "100%", padding: 0, border: "none" }}
              id="outlined-basic"
              label="State"
              variant="outlined"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
            <Typography>
              Phone <span style={{ color: "red", fontWeight: "bold" }}>*</span>
            </Typography>
            <div style={{ color: "red", fontWeight: "bold" }}>{phoneError}</div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
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
              style={{ width: "100%", padding: 0, border: "none" }}
              id="outlined-basic"
              label="Phone"
              placeholder="(XXX) XXX-XXXX"
              variant="outlined"
              value={phone}
              onChange={(e) => handlePhoneInput(e)}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
            <Typography>
              Email <span style={{ color: "red", fontWeight: "bold" }}>*</span>
            </Typography>
            <div style={{ color: "red", fontWeight: "bold" }}>{emailError}</div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
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
              style={{ width: "100%", padding: 0, border: "none" }}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
            <Typography>
              Zip Code{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>*</span>
            </Typography>
            <div style={{ color: "red", fontWeight: "bold" }}>{zipError}</div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
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
              style={{ width: "100%", padding: 0, border: "none" }}
              id="outlined-basic"
              label="Zip"
              variant="outlined"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
            <Typography>
              What are your preferred contact methods for questions about your
              request?
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Preferred Method
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={prefferedContact}
                  onChange={handlePrefferedChange}
                >
                  <MenuItem value={"Email"}>Email</MenuItem>
                  <MenuItem value={"Phone"}>Phone</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
            <Typography>
              How do you want to receive the information you requested?
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Receiving Method
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={recieve}
                  onChange={handleRecieveChange}
                >
                  <MenuItem value={"Email"}>Email</MenuItem>
                  <MenuItem value={"Phone"}>Phone</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
            <Typography>
              Do you want access to your Personal Information?
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ minWidth: 120 }}>
              <Button
                variant={access === "Yes" ? "outlined" : "none"}
                value="Yes"
                onClick={() => setAccess("Yes")}
              >
                {" "}
                Yes
              </Button>
              <Button
                variant={access === "No" ? "outlined" : "none"}
                value="No"
                onClick={() => setAccess("No")}
              >
                {" "}
                No
              </Button>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
            <Typography>
              Do you want us to delete your Personal Information?
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ minWidth: 120 }}>
              <Button
                variant={deleteInfo === "Yes" ? "outlined" : "none"}
                value="Yes"
                onClick={() => setDeleteInfo("Yes")}
              >
                {" "}
                Yes
              </Button>
              <Button
                variant={deleteInfo === "No" ? "outlined" : "none"}
                value="No"
                onClick={() => setDeleteInfo("No")}
              >
                {" "}
                No
              </Button>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
            <Typography>
              Do you want to opt-out of the sale of your Personal Information?
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ minWidth: 120 }}>
              <Button
                variant={optOut === "Yes" ? "outlined" : "none"}
                value="Yes"
                onClick={() => setOptout("Yes")}
              >
                {" "}
                Yes
              </Button>
              <Button
                variant={optOut === "No" ? "outlined" : "none"}
                value="No"
                onClick={() => setOptout("No")}
              >
                {" "}
                No
              </Button>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {" "}
            <Typography>
              Are you submitting this request as an authorized agent for the
              above consumer?
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ minWidth: 120 }}>
              <Button
                variant={authAgent === "Yes" ? "outlined" : "none"}
                value="Yes"
                onClick={() => setAuthAgent("Yes")}
              >
                {" "}
                Yes
              </Button>
              <Button
                variant={authAgent === "No" ? "outlined" : "none"}
                value="No"
                onClick={() => setAuthAgent("No")}
              >
                {" "}
                No
              </Button>
            </Box>
          </Grid>
        </Grid>
        <div style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
          {error}
        </div>
        <div
          style={{ color: "green", fontWeight: "bold", textAlign: "center" }}
        >
          {success}
        </div>

        <Button
          disabled={success.length > 0 ? true : false}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Container>
    </Container>
  )
}
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 58,
    fontWeight: 900,
  },
  subHeading: {
    color: "#444",
    fontWeight: "700",
  },
  paragraph: {
    marginBottom: "1em",
    color: "#444",
  },
}

export default DoNotSellPage
