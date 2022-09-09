import React, { useState } from "react";

import { useMedicareContext } from "../context/medicareContext/MedicareContext";
import { useAppContext } from "../context/appContext/AppContext";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DialogueBox from "../components/DialogueBox";

import { allSteps } from "../util/allSteps";
import { insurance } from "../util/medicareData";
// import Checkbox from '@mui/material/Checkbox';
// import checked from '@mui/material/checked';
// import handleChange from '@mui/material/handleChange';
import {
  Typography,
  Container,
  Grid,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ToggleButton,
  ToggleButtonGroup,
  FormGroup,
  Checkbox,
  FormControlLabel,
  // checked,
  // handleChange,
} from "@mui/material";
import { validEmail, validZip } from "../util/typeChecking";

import validator from "validator";
import { stateInitials } from "../util/autoData";

import "react-phone-number-input/style.css";

import Button from "@mui/material/Button";
import Disclaimer from "./Disclaimer";
import moment from "moment";
import { render } from "react-dom";
import axios from "axios";

const styles = {
  gridContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  generalContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  summaryContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  summaryTitleContainer: {
    width: "20%",
  },
  summaryDataContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  generalBtn: {
    width: "100%",
    height: "100%",
    maxHeight: 70,
    padding: "15px 0px",
    fontSize: { lg: 22, md: 18, sm: 18, xs: 15 },
    fontWeight: "bold",
    color: "white",
  },
  // generalBtnText: {
  //   fontSize: { lg: 22, md: 18, sm: 18, xs: 15 },
  //   fontWeight: "bold",
  //   color: "white",
  // },
  generalSingleBtn: {
    width: "100%",
    maxWidth: 400,
    height: "100%",
    maxHeight: 70,
    padding: "15px 0px",
    marginTop: 5,
    fontSize: { lg: 22, md: 18, sm: 18, xs: 15 },
    fontWeight: "bold",
  },
  yesSingleBtn: {
    width: "100%",
    maxWidth: 100,
    height: "100%",
    maxHeight: 70,
    padding: "15px 0px",
    marginTop: 5,
    fontSize: { lg: 22, md: 18, sm: 18, xs: 15 },
    fontWeight: "bold",
  },
  headerStyle: {
    fontSize: { lg: 48, md: 48, sm: 30, xs: 26 },
    fontWeight: "bold",
    textAlign: "center ",
    marginBottom: "25px",
    marginTop: "25px",
    color: "#000e31",
  },
  searchdiv: {
    width: "100%",
    height: 65,
    backgroundColor: "grey",
    marginBottom: "20px",
    boxShadow: 10,
  },
  subHeadingStyle: {
    fontSize: 30,

    textAlign: "center ",
  },
};

//step 4

export const Address = () => {
  const { nextStep } = useAppContext();
  const [address, setAddresss] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [unit, setUnit] = useState("");
  const [stateInitial, setStateInitial] = useState("");
  const [error, setError] = useState("");

  const [addressError, setAdError] = useState("");
  const [cityError, setCityError] = useState("");
  const [unitError, setUnitError] = useState("");
  const [stateError, setStateError] = useState("");
  const [zipError, setZipError] = useState("");

  const { setAddress } = useMedicareContext();

  function handleClick(buttonClicked) {
    setError("");
    setAdError("");
    setCityError("");
    setStateError("");
    setZipError("");
    setUnitError("");
    if (address.length < 1) {
      setAdError("This is a necessary field");
      setAddress("");
    }

    if (unit.length < 1) {
      setUnitError("This is a necessary field");
      setUnit("");
    }
    if (city.length < 1) {
      setCityError("This is a necessary field");
      setCity("");
    }
    if (stateInitial === null || stateInitial.length == 0) {
      setStateError("This is a necessary field");
      //("State is null ", stateInitial)
      setStateInitial("");
    }
    if (zip.length < 1) {
      setZipError("This is a necessary field");
      setZip("");
    }
    // //("The Clicked button is ", buttonClicked)
    const complete_address =
      address + "," + unit + "," + city + "," + stateInitial + "," + zip;

    //(complete_address)

    if (
      address.length !== 0 &&
      unit.length !== 0 &&
      city.length !== 0 &&
      stateInitial !== null &&
      zip.length !== 0
    ) {
      // if (!validCity.test(city)) {
      //   //("City not valid")
      //   setCity("")
      //   setError("Please enter valid city")
      // }
      if (!validZip.test(zip)) {
        //("Zip not valid")
        setZipError("Please Enter Valid Zip");
        setZip("");
      } else {
        setAddress(complete_address, unit, city, stateInitial, zip);
        nextStep(allSteps.emailStep);
      }
    } else {
      //("Fileds Missing")

      setError("All Fields are Necessary");
    }
  }

  //
  return (
    <Container sx={styles.generalContainer}>
      <Typography variant="h3" textAlign="center">
        What is your Address?
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm={12} md={8} lg={8} xs={12}>
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
            onChange={(e) => setAddresss(e.target.value)}
          />
          <div style={{ color: "red" }}>{addressError}</div>
        </Grid>
        <Grid item sm={12} md={4} lg={4} xs={12}>
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
            label="Unit"
            variant="outlined"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
          <div style={{ color: "red" }}>{unitError}</div>
        </Grid>
        <Grid item lg={12} sm={12} xs={12} md={12}>
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
          <div style={{ color: "red" }}>{cityError}</div>
        </Grid>
        <Grid item lg={6} sm={6} xs={12} md={6}>
          <Box sx={{ width: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={stateInitial}
                label="State"
                onChange={(e) => setStateInitial(e.target.value)}
              >
                {stateInitials.map((item, key) => (
                  <MenuItem key={key} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <div style={{ color: "red" }}>{stateError}</div>
        </Grid>
        <Grid item lg={6} sm={6} xs={12} md={6}>
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
            label="ZIP"
            placeholder="XXXXX or XXXXX-XXXX"
            variant="outlined"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <div style={{ color: "red" }}>{zipError}</div>
        </Grid>
      </Grid>
      <div style={{ color: "red" }}>{error}</div>

      <Button
        sx={styles.generalSingleBtn}
        variant="contained"
        onClick={handleClick}
      >
        Ok
      </Button>
    </Container>
  );
};
//step 1

export const Dob = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [eligibleDob, setEligibleDob] = useState(true);
  const [error, setError] = useState(null);
  const [dayFilled, setDayFilled] = useState(false);
  const [monthFilled, setMonthFilled] = useState(false);

  const { nextStep } = useAppContext();

  const { setDOB } = useMedicareContext();

  function handleClick(buttonClicked) {
    setError("");
    //("Date function")

    if (day.length === 0 || month.length === 0 || year.length === 0) {
      setError("Some data maybe missing!");
      //("Some data maybe missing!", day, month, year)
    } else {
      const joined_date =
        year.toString() + "-" + month.toString() + "-" + day.toString();
      //("Joined date is", joined_date)
      if (validator.isDate(joined_date)) {
        const joined_date =
          year.toString() + "-" + month.toString() + "-" + day.toString();

        //("Complete Date is ,", joined_date)

        var diff = moment(joined_date).diff(moment(), "milliseconds");
        var duration = moment.duration(diff);
        var age = duration.asDays() * -1;

        //("Age in days", age)
        if (age < 21914.55) {
          //("Under age")
          setError(
            "Unfortunately, you do not meet the minimum age requirement of 60 years!"
          );
        }
        if (age > 36524.25) {
          //("Over age")
          setError(
            "Unfortunately, you do not meet the maximum age requirement of 100 years!"
          );
        }
        if (age > 21914.55 && age < 36524.25) {
          //("acceptable")
          postAndGo(joined_date);
        }

        //60 years=21,914.55 days
        //100 years=36,524.25 days
      } else {
        setError("Enter Valid Date!");
      }
    }

    function postAndGo(date) {
      //("Recieved Error value in Post and go", error)

      setDOB(date);
      nextStep(allSteps.currentInsuredStep);
    }
  }

  // nextStep(allSteps.prevInsureTimeStep)

  return (
    <Container sx={styles.generalContainer}>
      <Typography variant="h3" textAlign="center">
        What is your Date of Birth?
      </Typography>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "25px 0px",
        }}
      >
        <TextField
          inputProps={{
            style: {
              textAlign: "center",
            },
            maxLength: 2,
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
            padding: 0,
            border: "none",
            maxWidth: "100px",
          }}
          id="outlined-basic"
          label="DD"
          variant="outlined"
          value={day}
          onChange={(e) => {
            // if (e.target.value.length(2)) {
            //   setDayFilled(true)
            // }
            setDay(e.target.value);
          }}
        />
        <TextField
          inputProps={{
            style: {
              textAlign: "center",
            },
            maxLength: 2,
            underline: {
              "&&&:before": {
                borderBottom: "none",
              },
              "&&:after": {
                borderBottom: "none",
              },
            },
            fontWeight: "bold",
          }}
          style={{
            width: "100%",
            padding: 0,
            border: "none",
            fontWeight: "bold",
            maxWidth: "100px",
          }}
          id="outlined-basic"
          label="MM"
          variant="outlined"
          value={month}
          onChange={(e) => {
            // if (e.target.value.length(2)) {
            //   setMonthFilled(true)
            // }
            setMonth(e.target.value);
          }}
        />
        <TextField
          inputProps={{
            style: {
              textAlign: "center",
            },
            maxLength: 4,
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
            padding: 0,
            border: "none",
            maxWidth: "100px",
          }}
          id="outlined-basic"
          label="YYYY"
          variant="outlined"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div style={{ color: "red" }}>{error}</div>
      {/* {eligibleDob ? null : (
        <div>
          <Link to="health-insurance">Yes</Link>
          <Link to="/">No</Link>
        </div>
      )} */}
      <Button
        sx={styles.generalSingleBtn}
        variant="contained"
        onClick={handleClick}
      >
        Continue
      </Button>
    </Container>
  );
};
//step 5
export const Email = () => {
  const { nextStep } = useAppContext();
  const [email, setEmaill] = useState("");
  const { setEmail } = useMedicareContext();
  const [error, setError] = useState(null);

  function handleClick() {
    if (email.length === 0) {
      setError("This is a necessary field");
      setEmaill("");
    } else if (!validEmail.test(email)) {
      setError("Please enter a valid email");
      setEmaill("");
    } else {
      setEmail(email);
      nextStep(allSteps.phoneStep);
    }
  }
  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center "
          marginBottom="25px"
        >
          What is your Email?
        </Typography>
        {/* <Box>
        <DatePicker onChange={onChange} value={value} />
      </Box>

      <LinkToSteps
        textToDisplay={"Continue"}
        stepNumber={allSteps.genderStep}
      /> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            inputProps={{
              style: {
                textAlign: "center",
              },
              underline: {
                "&&&:before": {
                  borderBottom: "none",
                },
                "&&:after": {
                  borderBottom: "none",
                },
              },
            }}
            // style={{ width: 46, padding: 0, border: "none" }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmaill(e.target.value)}
          />
        </div>
        <div style={{ color: "red" }}>{error}</div>
        <Button
          sx={styles.generalSingleBtn}
          variant="contained"
          onClick={handleClick}
        >
          Continue
        </Button>
      </div>
    </Container>
  );
};
//step 2
export const Gender = () => {
  const { nextStep } = useAppContext();
  const { setGender } = useMedicareContext();

  function handleClick(buttonClicked) {
    //("The Clicked button is ", buttonClicked)

    if (buttonClicked == "Male") {
      setGender("Male");
      nextStep(allSteps.nameStep);
    } else {
      setGender("Female");
      nextStep(allSteps.nameStep);
    }
  }

  return (
    <Container>
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center "
        marginBottom="25px"
      >
        What is your Gender?
      </Typography>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Button
            sx={styles.generalBtn}
            value={true}
            variant="contained"
            onClick={(e) => {
              handleClick("Female");
            }}
          >
            Female
          </Button>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Button
            sx={styles.generalBtn}
            value={false}
            variant="contained"
            onClick={(e) => {
              handleClick("Male");
            }}
          >
            Male
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
export const MedicareInsured = () => {
  //If ensured then set the step to 15 and goto AutoPrevInsureName else set the step to 10 and goto homeowner
  const { nextStep, setTotalSteps } = useAppContext();
  const { setIsInsured } = useMedicareContext();
  function handleClick(buttonClicked) {
    //("The Clicked button is ", buttonClicked)
    if (buttonClicked == true) {
      setIsInsured(true);
      nextStep(allSteps.insuranceType);
    } else {
      setIsInsured(false);
      nextStep(allSteps.insuranceType);
    }
  }
  return (
    <Container>
      <Typography sx={styles.headerStyle}>
        Are you covered with medicare Part A - Part B?
      </Typography>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button
            sx={styles.generalBtn}
            value={true}
            variant="contained"
            onClick={(e) => {
              handleClick(true);
            }}
          >
            Yes
          </Button>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button
            sx={styles.generalBtn}
            value={false}
            variant="contained"
            onClick={(e) => {
              handleClick(false);
            }}
          >
            No
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
export const MedicareInsuranceType = () => {
  //If ensured then set the step to 15 and goto AutoPrevInsureName else set the step to 10 and goto homeowner
  const { nextStep, setTotalSteps } = useAppContext();
  const { setInsurancePS } = useMedicareContext();
  function handleClick(buttonClicked) {
    //("The Clicked button is ", buttonClicked)
    if (buttonClicked === true) {
      setTotalSteps(1);
      setInsurancePS(true);
      nextStep(allSteps.prevInsureNameStep);
    } else {
      setInsurancePS(false);
      nextStep(allSteps.genderStep);
    }
  }
  return (
    <Container>
      <Typography sx={styles.headerStyle}>
        Do you have Secondary or Private Insurance?
      </Typography>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button
            sx={styles.generalBtn}
            value={true}
            variant="contained"
            onClick={(e) => {
              handleClick(true);
            }}
          >
            Yes
          </Button>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button
            sx={styles.generalBtn}
            value={false}
            variant="contained"
            onClick={(e) => {
              handleClick(false);
            }}
          >
            No
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
export const MedicarePrevInsureName = () => {
  const { nextStep, setTotalSteps } = useAppContext();
  const { setInsuranceName } = useMedicareContext();
  const [customName, setCustomName] = useState("");
  function handleClick(buttonClicked) {
    //("The Clicked button is ", buttonClicked)

    setInsuranceName(buttonClicked);
    nextStep(allSteps.genderStep);
  }
  function handleClickCustom() {
    //("The Custom Name  is ", customName)

    setInsuranceName(customName);
    nextStep(allSteps.genderStep);
  }
  return (
    <Container>
      <Typography sx={styles.headerStyle}>
        What Company are you insured with?
      </Typography>

      <Container>
        <Grid
          container
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            margin: "20px 0px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography style={{ width: "100%", textAlign: "center" }}>
              Cant Find your Insurance? Type it here and continue
            </Typography>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              flexDirection: {
                sm: "row",
                lg: "row",
                md: "row",
                xs: "column",
              },
              width: "100%",
              margin: "20px 0px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              InputProps={{ disableUnderline: true }}
              onChange={(event) => setCustomName(event.target.value)}
              sx={{
                width: "80%",

                "& .MuiInputBase-input": {
                  // height: "100%",
                  // backgroundColor: "yellow",
                  border: "none",
                  outline: "none",
                },
                "& .MuiFilledInput-input": {
                  height: "100%",
                  // backgroundColor: "white",
                  border: "none",
                  outline: "none",
                },
                "&&&:before": {
                  borderBottom: "none",
                },
                "&&:after": {
                  borderBottom: "none",
                },
              }}
              id="filled-basic"
              label="Enter your Insurance Company Name"
              variant="filled"
            />
            <Button style={{ width: "20%" }} onClick={handleClickCustom}>
              Continue
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          columns={12}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {insurance.map((item, key) => {
            return (
              <Grid key={key} item lg={6} sm={6} xs={12} md={6}>
                <Button
                  sx={styles.generalBtn}
                  value={item}
                  variant="contained"
                  onClick={(e) => {
                    handleClick(e.target.value);
                  }}
                >
                  {item}
                </Button>
              </Grid>
            );
          })}
          {/* <Grid item lg={2} sm={4} xs={4} md={2}>
          <LinkToSteps textToDisplay={2001} stepNumber={allSteps.makeStep} />
        </Grid> */}
        </Grid>
      </Container>
    </Container>
  );
};

//step 3
export const Name = () => {
  const { nextStep } = useAppContext();
  const { setName } = useMedicareContext();

  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");

  // function handleClick(buttonClicked) {
  //   const complete_name = fName + " " + lName
  //   //("The Name is ", complete_name)

  //   setName(complete_name)
  //   nextStep(allSteps.addressStep)
  // }
  const [error, setError] = useState(null);
  function handleClick(buttonClicked) {
    if (fName.length === 0 || lName.length === 0) {
      //("Some Data may be missing")
      setError("Some Data may be missing");
      setFname("");
      setLname("");
    }
    // else if (!validName.test(fName + " " + lName)) {
    //   setError("Please Enter Valid Name")
    //   setFname("")
    //   setLname("")
    // }
    else {
      const complete_name = fName + " " + lName;
      //("The Name is ", complete_name)
      setName(fName, lName);
      nextStep(allSteps.addressStep);
    }
  }

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center "
          marginBottom="25px"
        >
          What is your Name?
        </Typography>
        {/* <Box>
          <DatePicker onChange={onChange} value={value} />
        </Box>

        <LinkToSteps
          textToDisplay={"Continue"}
          stepNumber={allSteps.genderStep}
        /> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "25px 0px",
          }}
        >
          <TextField
            inputProps={{
              style: {
                textAlign: "center",
              },
              underline: {
                "&&&:before": {
                  borderBottom: "none",
                },
                "&&:after": {
                  borderBottom: "none",
                },
              },
            }}
            style={{ marginBottom: 15 }}
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            value={fName}
            onChange={(e) => setFname(e.target.value)}
          />
          <TextField
            inputProps={{
              style: {
                textAlign: "center",
              },
              underline: {
                "&&&:before": {
                  borderBottom: "none",
                },
                "&&:after": {
                  borderBottom: "none",
                },
              },
            }}
            // style={{ width: 52, padding: 0, border: "none" }}
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            value={lName}
            onChange={(e) => setLname(e.target.value)}
          />
        </div>
        <div style={{ color: "red" }}>{error}</div>
        <Button
          sx={styles.generalSingleBtn}
          variant="contained"
          onClick={handleClick}
        >
          Ok
        </Button>
      </div>
    </Container>
  );
};
//step 6
export const Phone = () => {
  const { nextStep } = useAppContext();
  const { setPhone, name } = useMedicareContext();
  const [pno, setPno] = useState("");
  const [error, setError] = useState(null);

  // function handleClick(buttonClicked) {
  //   //("The phone is ", pno)
  //   setPhone(pno)
  //   nextStep(allSteps.summaryStep)
  // }
  function handleClick() {
    if (pno.length === 0) {
      setError("This is a necessary field");
      setPno("");
    } else {
      //("The phone is ", pno)
      const formattedPhoneNumber = formatPhoneNumber(pno);
      setPhone(formattedPhoneNumber);
      nextStep(allSteps.summaryStep);
    }
  }
  function formatPhoneNumber(value) {
    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return value;

    // clean the input for any non-digit values.
    const phoneNumber = value.replace(/[^\d]/g, "");

    // phoneNumberLength is used to know when to apply our formatting for the phone number
    const phoneNumberLength = phoneNumber.length;

    // we need to return the value with no formatting if its less then four digits
    // this is to avoid weird behavior that occurs if you  format the area code to early

    if (phoneNumberLength < 4) return phoneNumber;

    // if phoneNumberLength is greater than 4 and less the 7 we start to return
    // the formatted number
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    // finally, if the phoneNumberLength is greater then seven, we add the last
    // bit of formatting and return it.
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }
  const handleInput = (e) => {
    // this is where we'll call our future formatPhoneNumber function that we haven't written yet.
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    // we'll set the input value using our setInputValue
    setPno(formattedPhoneNumber);
  };
  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography fontWeight="bold" sx={styles.subHeadingStyle}>
          Last Step {name}
        </Typography>

        <Typography sx={styles.headerStyle}>
          What is your Phone number?
        </Typography>
        {/* <Box>
          <DatePicker onChange={onChange} value={value} />
        </Box>

        <LinkToSteps
          textToDisplay={"Continue"}
          stepNumber={allSteps.genderStep}
        /> */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <TextField
            inputProps={{
              style: {
                textAlign: "center",
              },
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
            value={pno}
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div style={{ color: "red" }}>{error}</div>
        <Button
          sx={styles.generalSingleBtn}
          variant="contained"
          onClick={handleClick}
        >
          Ok
        </Button>
        <Disclaimer />
      </div>
    </Container>
  );
};

function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');
}
export const MedicareInsuranceSummary = () => {
  const {
    address,
    email,
    phone,
    DOB,
    gender,
    name,
    runServices,
    stateInitial,
    is_insured,
    insurance_name,
    insurancePrivateSecondary,
    city,
    fname,
    lname,
    jornayaID,
    zip,
    unit
  } = useMedicareContext();
  const navigate = useNavigate();
  const { setReadyToPost, setIsEditing, nextStep } = useAppContext();
  const [failed, setFailed] = useState(false);

  const summaryData = {
    DOB: DOB,
    Address: address,
    Gender: gender,
    Email: email,
    Phone: phone,
    Name: name,
    Insured: is_insured ? "Yes" : "No",
    insurancePrivateSecondary: insurancePrivateSecondary ? "Yes" : "No",
    InsuranceName: insurance_name,
  };

   function handlePostToDB() {
    //  console.log(window?.LeadiD?.token)
    const data = {
      dob: DOB,
      gender: gender,
      fname: fname,
      lname: lname,
      address: address,
      unit: unit,
      city: city,
      stateInitial: stateInitial,
      is_insured: is_insured,
      insurance_name: insurance_name,
      insurancePrivateSecondary: insurancePrivateSecondary,
      zip: zip,
      email: email,
      phone: phone,
      jornayaID: jornayaID == undefined ? window?.LeadiD?.token : jornayaID,
      addedOn: `${moment().format("ddd, ll")} `,
    }

    const queryString = objToQueryString({
      api_key:'d0ab445b569d2095f3fab336aa993209',
      product_id:'2',
      phone:data.phone.replaceAll('(','').replaceAll(')','').replaceAll('-',''),
      dob_day:moment(data.dob).day(),
      dob_month:moment(data.dob).month(),
      dob_year:moment(data.dob).year(),
      subaff:'12',
      audience_id:'300178',
      // test:'false',
      email:data.email,
      UniversalLeadID:data.jornayaID?.replaceAll('-',''),
      state:stateInitial,
      zip:data.zip,
    });
    
    const queryString1 = objToQueryString({
      api_key:'d0ab445b569d2095f3fab336aa993209',
      audience_id:'300178',
      email:data.email,
      firstname:data.fname,
      lastname:data.lname,
      zip:data.zip,
      city:data.city,
      state:stateInitial,
      address1:data.address,
      phone:data.phone.replaceAll('(','').replaceAll(')','').replaceAll('-',''),
      dob_day:moment(data.dob).day(),
      dob_month:moment(data.dob).month(),
      dob_year:moment(data.dob).year(),
      subaff:'12',
      });
      console.log(stateInitial);
    // console.log(`https://advanceinsurace.herokuapp.com/posting/bid-ping?${queryString}`);
    axios.get(`https://dry-dusk-82099.herokuapp.com/posting/bid-ping?${queryString}`) .then(response => {
      // console.log(response.data,"get circle"+' asd '+`https://dry-dusk-82099.herokuapp.com/posting/post-jv-signup?ping_id=${response.data.ping_id}&${queryString1}`)
   setTimeout(() => {
    axios.get(`https://dry-dusk-82099.herokuapp.com/posting/post-jv-signup?ping_id=${response.data.ping_id}&${queryString1}`) .then(response => {
      // console.log(response.data,"get circle")
      alert(JSON.stringify( response.data))
       
      }
    ).catch(error => console.log(error));
   }, 1000);
      
      
      }
    ).catch(error => console.log(error));

    runServices().then( async (servicesExec) => {
      

    //   // ("Did Services run?", servicesExec)
      if (servicesExec === true) {
        setReadyToPost(true);
        navigate("/get-medicare-quotes");
      }
      if (servicesExec === false) {
        //(servicesExec)
        setFailed(true);

        //("Did Services run is false", servicesExec)
      }
    });

  // console.log(`http://www.winning.today/posting/bid-ping?${queryString}`);
  //  fetch(`http://www.winning.today/posting/bid-ping?${queryString}`
  //       ,requestOptions
  //         // headers: {
  //         //     'Access-Control-Allow-Origin': '*',
  //         //     'Content-Type': 'application/json',
  //         //     "Cookie": "AWSALB=hERWsfYjVwsQooxwbjDlxKy0FCn4KurzfJ1OESRRAVHeuEKvuIpj5ZkyGzRkXhwZMX/oPoKj+yPvkcu+1H5BsRxcRuA80l/89KoBadTz58JquBgqHhdCmBZRS0GM; PHPSESSID=37qu0e8pccjvg8s1vbvrl18gi1"
  //         // },
  //     )
  //        .then(response => response.text())
  //        .then(result => console.log(result))
  //       .catch(error => console.log('error', error));14046666943
      // var config = {
      //   method: 'get',
      //   url: 'http://www.winning.today/posting/bid-ping?api_key=d0ab445b569d2095f3fab336aa993209&phone=15417543013&dob_day=11&dob_month=1&dob_year=1954&subaff=12&audience_id=300178&test=true&email=rajanosha1@gmail.com&UniversalLeadID=XKZB4C45-5XCR-2Q3S-WMLG-7KFROS1PMKZQ\n&state=us&zip=4600',
      //   headers: { 
      //     'Access-Control-Allow-Origin': '*', 
      //     'api_key': 'd0ab445b569d2095f3fab336aa993209',
      //     'Cookie': 'AWSALB=G+/8AamqQ6MGE442bKbmr+3F7WuB0tQdVHnZ/LZBFUghtUl1qpfO5XDHY6DsglEDF5LsV4aZBsZLHntsF/bbg3E+sBW39skFDO1+mpwbcMif8692swIOe3u+2Tqs; PHPSESSID=37qu0e8pccjvg8s1vbvrl18gi1',
      //     "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json"
      //   }
      // };
      
      // const headers = {
      //   "Content-Type": "application/json",
      //   Authorization: 'd0ab445b569d2095f3fab336aa993209',
      // };
    

      // axios.get(`http://www.winning.today/posting/bid-ping?${queryString}`, { headers }) .then(response => {
      //   console.log(response,"get circle")
        
      //   }
      // ).catch(error => console.log(error));

      // fetch("https://api.greatschools.org/search/schools?key=***********&state=CA&q=cupertino&levelCode=elementary-schools&limit=1",{ 
      //   method: 'GET',
      //   headers : new Headers ({
      //     'Accept:'application/xml',
      //     'content-type': 'application/x-www-form-urlencoded',
      //     'Access-Control-Allow-Origin': '*',
      //     'Access-Control-Allow-Methods': 'GET, POST, PUT',
      //     'Access-Control-Allow-Headers': 'Content-Type',  
      //   }),
      //   mode:'no-cors'
      //   })
      //   .then(response => {
      //     return response.text()
      //   })
      //   .then(xml => {
      //     console.log("xml", xml)
      //   })

    //   var xhr = new XMLHttpRequest();
    // var json_obj, status = false;
    // xhr.open("GET", `http://www.winning.today/posting/bid-ping?${queryString}`, true);

    // xhr.setRequestHeader("Access-Control-Request-Method","get")
    // xhr.setRequestHeader("Access-Control-Allow-Origin","*")
    
    
    // xhr.onload = function (e) {
    //   if (xhr.readyState === 4) {
    //     if (xhr.status === 200) {
    //       var json_obj = JSON.parse(xhr.responseText);
    //       status = true;
    //      console.log(json_obj)
    //     } else {
    //       console.error(xhr.statusText);
    //     }
    //   }
    // }.bind(this);
    // xhr.onerror = function (e) {
    //   console.error(xhr.statusText);
    // };
    // xhr.send(null); 
// console.log(requestOptions,"Access-Control-Allow-Origin")
    // runServices().then( async (servicesExec) => {
      

      //("Did Services run?", servicesExec)
      // if (servicesExec === true) {
      //   setReadyToPost(true);
      //   navigate("/get-medicare-quotes");
      // }
      // if (servicesExec === false) {
      //   //(servicesExec)
      //   setFailed(true);

      //   //("Did Services run is false", servicesExec)
      // }
    // });
  }
  function handleEditClick(step) {
    //("Edit clicked for", step)
    setIsEditing(true);
    nextStep(step);
  }

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography sx={styles.headerStyle}>
          {summaryData.Name}, Your Quotes are Almost Ready!
        </Typography>
        <label>
         
          {summaryData.Name}, By clicking *Continue", I provide my express
          written consent to receive monitored or recorded phone sales calls and
          text messages from SaveToday, PolicySavings, and our Medicare
          Insurance marketing.partners regarding products and services including
          Medicare Supplement, Medicare Advantage, and Prescription Drug Plans
          on the landline or mobile number I provided even if I am on a federal
          or State do not call registry. I confirm that the phone number set
          forth above is accurate and I am the regular user of the phone. I
          understand these calls may be generated using an autodialer and may
          contain pre-recorded and artificial voice messages and that consenting
          is not required to receive a quote or speak with an agent and that I
          can revoke my consent at any time by any reasonable means. To receive
          a quote without providing consent, please call (866) 410- 0895 (TTY:
          711) For SMS message campaigns: Text STOP to stop and HELP for help.
          Msg and data rates may apply. Periodic messages; max. 30 / month.
         
        </label>
        <div style={{ color: "red" }}></div>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked={true} />}
            label="Are you sure to contiue"
          />
          <div style={{ display:'none'}}>
          <label for="leadid_tcpa_disclosure">
          <input
            id="leadid_tcpa_disclosure"
            type="hidden"
            checked="checked"
            value="true"
          />
         
          {summaryData.Name}, By clicking *Continue", I provide my express
          written consent to receive monitored or recorded phone sales calls and
          text messages from SaveToday, PolicySavings, and our Medicare
          Insurance marketing.partners regarding products and services including
          Medicare Supplement, Medicare Advantage, and Prescription Drug Plans
          on the landline or mobile number I provided even if I am on a federal
          or State do not call registry. I confirm that the phone number set
          forth above is accurate and I am the regular user of the phone. I
          understand these calls may be generated using an autodialer and may
          contain pre-recorded and artificial voice messages and that consenting
          is not required to receive a quote or speak with an agent and that I
          can revoke my consent at any time by any reasonable means. To receive
          a quote without providing consent, please call (866) 410- 0895 (TTY:
          711) For SMS message campaigns: Text STOP to stop and HELP for help.
          Msg and data rates may apply. Periodic messages; max. 30 / month.
         
        </label>
          </div>
        </FormGroup>

        {/* <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    /> */}

        <Button
          variant="contained"
          sx={styles.generalSingleBtn}
          onClick={handlePostToDB}
        >
          Continue & Get Quotes
        </Button>
        <br></br>
        {failed ? <DialogueBox /> : null}

        <Accordion sx={{ width: "90%" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Review Your Profile</Typography>
          </AccordionSummary>
          <AccordionDetails
          // sx={{
          //   display: "flex",
          //   flexDirection: "column",
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
          >
            <Box sx={styles.summaryContainer}>
              <Box sx={styles.summaryTitleContainer}>
                <Typography>Name</Typography>
              </Box>
              <Box sx={styles.summaryDataContainer}>
                <Button onClick={() => handleEditClick(allSteps.nameStep)}>
                  Edit
                </Button>
                <Typography>{summaryData.Name}</Typography>
              </Box>
            </Box>
            <Box sx={styles.summaryContainer}>
              <Box sx={styles.summaryTitleContainer}>
                <Typography>Birthday</Typography>
              </Box>
              <Box sx={styles.summaryDataContainer}>
                <Button onClick={() => handleEditClick(allSteps.dobStep)}>
                  Edit
                </Button>
                <Typography>{summaryData.DOB}</Typography>
              </Box>
            </Box>
            <Box sx={styles.summaryContainer}>
              <Box sx={styles.summaryTitleContainer}>
                <Typography>Gender</Typography>
              </Box>
              <Box sx={styles.summaryDataContainer}>
                <Button onClick={() => handleEditClick(allSteps.genderStep)}>
                  Edit
                </Button>
                <Typography>{summaryData.Gender}</Typography>
              </Box>
            </Box>

            <Box sx={styles.summaryContainer}>
              <Box sx={styles.summaryTitleContainer}>
                <Typography>Email</Typography>
              </Box>
              <Box sx={styles.summaryDataContainer}>
                <Button onClick={() => handleEditClick(allSteps.emailStep)}>
                  Edit
                </Button>
                <Typography>{summaryData.Email}</Typography>
              </Box>
            </Box>
            <Box sx={styles.summaryContainer}>
              <Box sx={styles.summaryTitleContainer}>
                <Typography>Address</Typography>
              </Box>
              <Box sx={styles.summaryDataContainer}>
                <Button onClick={() => handleEditClick(allSteps.addressStep)}>
                  Edit
                </Button>
                <Typography>{summaryData.Address}</Typography>
              </Box>
            </Box>
            <Box sx={styles.summaryContainer}>
              <Box sx={styles.summaryTitleContainer}>
                <Typography>Phone</Typography>
              </Box>
              <Box sx={styles.summaryDataContainer}>
                <Button onClick={() => handleEditClick(allSteps.phoneStep)}>
                  Edit
                </Button>
                <Typography>{summaryData.Phone}</Typography>
              </Box>
            </Box>
            <Box sx={styles.summaryContainer}>
              <Box sx={styles.summaryTitleContainer}>
                <Typography>Insured</Typography>
              </Box>
              <Box sx={styles.summaryDataContainer}>
                <Button
                  onClick={() => handleEditClick(allSteps.currentInsuredStep)}
                >
                  Edit
                </Button>
                <Typography>{summaryData.Insured}</Typography>
              </Box>
            </Box>
            {is_insured ? (
              <Box sx={styles.summaryContainer}>
                <Box sx={styles.summaryTitleContainer}>
                  <Typography>Insurance Name</Typography>
                </Box>
                <Box sx={styles.summaryDataContainer}>
                  <Button
                    onClick={() => handleEditClick(allSteps.prevInsureNameStep)}
                  >
                    Edit
                  </Button>
                  <Typography>{summaryData.InsuranceName}</Typography>
                </Box>
              </Box>
            ) : null}
          </AccordionDetails>
        </Accordion>
      </div>
    </Container>
  );
};
