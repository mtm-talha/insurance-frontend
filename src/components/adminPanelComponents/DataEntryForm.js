import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { Box } from "@mui/system";

import JornayaComponent from '../JornayaComponent';
import validator from "validator";
import { stateInitials } from "../../util/autoData";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebase";
import moment from "moment";
const AutoForm = () => {
  const [car1Year, setCar1Year] = useState("");
  const [car1Make, setCar1Make] = useState("");
  const [car1Model, setCar1Model] = useState("");
  const [car2Year, setCar2Year] = useState("");

  const [car2Make, setCar2Make] = useState("");
  const [car2Model, setCar2Model] = useState("");
  const [driver1Fname, setDriver1Fname] = useState("");
  const [driver1Lname, setDriver1Lname] = useState("");
  const [driver1DOBday, setdriver1DOBday] = useState("");
  const [driver1DOBmonth, setdriver1DOBmonth] = useState("");
  const [driver1DOByear, setdriver1DOByear] = useState("");
  const [driver1DUI, setDriver1DUI] = useState(false);
  const [driver1Married, setDriver1Married] = useState(false);
  const [driver1Accident, setDriver1Accident] = useState(false);
  const [driver1Gender, setDriver1Gender] = useState(true);
  const [driver2Fname, setDriver2Fname] = useState("");
  const [driver2Lname, setDriver2Lname] = useState("");
  const [driver2DOBday, setdriver2DOBday] = useState("");
  const [driver2DOBmonth, setdriver2DOBmonth] = useState("");
  const [driver2DOByear, setdriver2DOByear] = useState("");
  const [driver2DUI, setDriver2DUI] = useState(false);
  const [driver2Married, setDriver2Married] = useState(false);
  const [driver2Accident, setDriver2Accident] = useState(false);
  const [driver2Gender, setDriver2Gender] = useState(true);
  const [secondCarAdded, setSecondCarAdded] = useState(false);
  const [secondDriverAdded, setSecondDriverAdded] = useState(false);
  const [insured, setInsured] = useState(false);
  const [insuranceName, setInsuranceName] = useState("");
  const [insuranceTime, setInsuranceTime] = useState("");
  const [homeOwner, setHomeOwner] = useState(false);
  const [isArmy, setIsArmy] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [clientIP, setClientIP] = useState("");
  const [stateInitial, setStateInitial] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const [firstCarError, setFirstCarError] = useState(false);
  const [secondCarError, setSecondCarError] = useState(false);
  const [firstDriverError, setFirstDriverError] = useState(false);
  const [secondDriverError, setSecondDriverError] = useState(false);
  const [insuranceError, setInsuranceError] = useState(false);
  const [clientError, setClientError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [submitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCarAdded = (event, carAddedChange) => {
    setSecondCarAdded(carAddedChange);
  };
  const handleDriverAdded = (event, driverAddedChange) => {
    setSecondDriverAdded(driverAddedChange);
  };
  const handleDriver1DUI = (event, driver1DUI) => {
    setDriver1DUI(driver1DUI);
  };
  const handleDriver1Married = (event, driver1Married) => {
    setDriver1Married(driver1Married);
  };
  const handleDriver1Accident = (event, driver1Accident) => {
    setDriver1Accident(driver1Accident);
  };
  const handleDriver2DUI = (event, driver2DUI) => {
    setDriver2DUI(driver2DUI);
  };
  const handleDriver2Married = (event, driver2Married) => {
    setDriver2Married(driver2Married);
  };
  const handleDriver2Accident = (event, driver2Accident) => {
    setDriver2Accident(driver2Accident);
  };
  const driver1GenderHandle = (event, driver1Gender) => {
    setDriver1Gender(driver1Gender);
  };
  const driver2GenderHandle = (event, driver2Gender) => {
    setDriver2Gender(driver2Gender);
  };
  const handleInsured = (event, insured) => {
    setInsured(insured);
  };
  const handleArmy = (event, army) => {
    setIsArmy(army);
  };
  const handleHomeOwner = (event, home) => {
    setHomeOwner(home);
  };
  const handleSubmit = async () => {
    setFirstCarError(false);
    setSecondCarError(false);
    setFirstDriverError(false);
    setSecondDriverError(false);
    setInsuranceError(false);
    setClientError(false);
    setPhoneError(false);
    setEmailError(false);
    setSubmitted(false);
    setFormMessage("");
    if (
      car1Year.length === 0 ||
      car1Make.length === 0 ||
      car1Model.length === 0
    ) {
      setFirstCarError(true);
    }
    if (secondCarAdded) {
      if (
        car2Year.length === 0 ||
        car2Make.length === 0 ||
        car2Model.length === 0
      ) {
        setSecondCarError(true);
      }
    }

    if (
      driver1Fname.length === 0 ||
      driver1Lname.length === 0 ||
      driver1DOBday.length === 0 ||
      driver1DOBmonth.length === 0 ||
      driver1DOByear.length === 0
    ) {
      setFirstDriverError(true);
    }
    if (secondDriverAdded) {
      if (
        driver2Fname.length === 0 ||
        driver2Lname.length === 0 ||
        driver2DOBday.length === 0 ||
        driver2DOBmonth.length === 0 ||
        driver2DOByear.length === 0
      ) {
        setSecondDriverError(true);
      }
    }

    if (insured) {
      if (insuranceName.length === 0 || insuranceTime.length === 0) {
        setInsuranceError(true);
      }
    }

    if (clientIP.length === 0) {
      setClientError(true);
    }
    if (phone.length === 0) {
      setPhoneError(true);
    }
    if (email.length === 0) {
      setEmailError(true);
    }

    if (
      car1Year.length === 0 ||
      car1Make.length === 0 ||
      car1Model.length === 0 ||
      driver1Fname.length === 0 ||
      driver1Lname.length === 0 ||
      driver1DOBday.length === 0 ||
      driver1DOBmonth.length === 0 ||
      driver1DOByear.length === 0 ||
      clientIP.length === 0 ||
      phone.length === 0 ||
      email.length === 0
    ) {
      //("Error Exists");
      return;
    } else {
      //(firstCarError, "error is fc");
      setIsSubmitting(true);
      setFormMessage("Submitting,Please wait...");
      let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

      let firstPart = "";
      let secondPart = "";
      let thirdPart = "";
      let fourthPart = "";
      let fifthPart = "";
      let combined = "";

      for (let i = 0; i <= 7; i++) {
        firstPart += characters.charAt(Math.floor(Math.random() * 36));
      }
      for (let i = 0; i <= 3; i++) {
        secondPart += characters.charAt(Math.floor(Math.random() * 36));
      }
      for (let i = 0; i <= 3; i++) {
        thirdPart += characters.charAt(Math.floor(Math.random() * 36));
      }
      for (let i = 0; i <= 3; i++) {
        fourthPart += characters.charAt(Math.floor(Math.random() * 36));
      }
      for (let i = 0; i <= 11; i++) {
        fifthPart += characters.charAt(Math.floor(Math.random() * 36));
      }
      combined =
        firstPart +
        "-" +
        secondPart +
        "-" +
        thirdPart +
        "-" +
        fourthPart +
        "-" +
        fifthPart;

      const summaryData = {
        Vehicle1: {
          Year: car1Year,
          Make: car1Make,
          Model: car1Model,
        },
        Vehicle2: {
          Year: car2Year,
          Make: car2Make,
          Model: car2Model,
        },
        Driver1: {
          Fname: driver1Fname,
          Lname: driver1Lname,
          DOB: driver1DOBday + "-" + driver1DOBmonth + "-" + driver1DOByear,
          Gender: driver1Gender ? "Male" : "Female",
          Married: driver1Married ? "Yes" : "No",
          AtFaultAccident: driver1Accident ? "Yes" : "No",
          DUI: driver1DUI ? "Yes" : "No",
        },
        Driver2: {
          Fname: driver2Fname,
          Lname: driver2Lname,
          DOB: driver2DOBday + "-" + driver2DOBmonth + "-" + driver2DOByear,
          Gender: driver2Gender ? "Male" : "Female",
          Married: driver2Married ? "Yes" : "No",
          AtFaultAccident: driver2Accident ? "Yes" : "No",
          DUI: driver2DUI ? "Yes" : "No",
        },
        Insured: insured ? "Yes" : "No",
        InsuranceName: insuranceName,
        InsuranceTime: insuranceTime,
        HomeOwner: homeOwner ? "Yes" : "No",
        Address: address,
        Email: email,
        Phone: phone,
        clientIP: clientIP,
        jornayaID: combined,
        City: city,
        StateInitial: stateInitial,
        Zip: zip,
        is_army: isArmy,
        secondDriverAdded: secondDriverAdded ? "Yes" : "No",
        secondCarAdded: secondCarAdded ? "Yes" : "No",
      };
      //("Submit func");
      //(summaryData);

      await addDoc(collection(db, "autoClients"), {
        clientIP: summaryData.clientIP,
        jornayaID: summaryData.jornayaID,
        homeOwner: summaryData.HomeOwner,
        address: summaryData.Address,
        city: summaryData.City,
        stateInitial: summaryData.StateInitial,
        zip: summaryData.Zip,
        email: summaryData.Email,
        is_army: summaryData.is_army,
        phone: summaryData.Phone,
        secondDriverAdded: summaryData.secondDriverAdded,
        secondCarAdded: summaryData.secondCarAdded,
        firstDriver: summaryData.Driver1,
        secondDriver: summaryData.Driver2,
        firstVehicle: summaryData.Vehicle1,
        secondVehicle: summaryData.Vehicle2,
        insured: summaryData.Insured,
        insuranceName: summaryData.InsuranceName,
        insuranceTime: summaryData.InsuranceTime,
        createdAt: Timestamp.now(),
        addedOn: `${moment().format("ddd, ll")} `,
      })
        .then(async (classRef) => {
          //("User Collection ref is", classRef);
          //("Added Client in Firestore Auto", classRef);
          setIsSubmitting(false);
          setFormMessage("Client Added Successfully");

          setFirstCarError(false);
          setSecondCarError(false);
          setFirstDriverError(false);
          setSecondDriverError(false);
          setInsuranceError(false);
          setClientError(false);
          setPhoneError(false);
          setEmailError(false);
          setSubmitted(true);

          setCar1Year("");
          setCar1Make("");
          setCar1Model("");
          setCar2Year("");
          setCar2Make("");
          setCar2Model("");
          setDriver1Fname("");
          setDriver1Lname("");
          setdriver1DOBday("");
          setdriver1DOBmonth("");
          setdriver1DOByear("");
          setDriver1DUI(false);
          setDriver1Married(false);
          setDriver1Accident(false);
          setDriver1Gender(true);
          setDriver2Fname("");
          setDriver2Lname("");
          setdriver2DOBday("");
          setdriver2DOBmonth("");
          setdriver2DOByear("");
          setDriver2DUI(false);
          setDriver2Married(false);
          setDriver2Accident(false);
          setDriver2Gender("");
          setSecondCarAdded(false);
          setSecondDriverAdded(false);
          setInsured(false);
          setInsuranceName("");
          setInsuranceTime("");
          setHomeOwner(false);
          setIsArmy(false);
          setPhone("");
          setAddress("");
          setCity("");
          setClientIP("");
          setStateInitial("");
          setEmail("");
          setZip("");
        })

        .catch((err) => {
          setFormMessage("Error Adding Client to Database");
          //("Error Adding Client to Auto collection:", err);
          return false;
        });
    }
  };

  return (
    <Paper>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>First Car </Typography>
          <Typography style={{ color: "red" }}>
            {firstCarError ? "Please Fill this section" : null}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
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
              border: "none",
              maxWidth: "200px",
            }}
            id="outlined-basic"
            label="Year"
            variant="outlined"
            value={car1Year}
            onChange={(e) => {
              // if (e.target.value.length(2)) {
              //   setDayFilled(true)
              // }
              setCar1Year(e.target.value);
            }}
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
            style={{
              width: "100%",
              border: "none",
            }}
            id="outlined-basic"
            label="Make"
            variant="outlined"
            value={car1Make}
            onChange={(e) => {
              // if (e.target.value.length(2)) {
              //   setDayFilled(true)
              // }
              setCar1Make(e.target.value);
            }}
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
            style={{
              width: "100%",
              border: "none",
            }}
            id="outlined-basic"
            label="Model"
            variant="outlined"
            value={car1Model}
            onChange={(e) => {
              // if (e.target.value.length(2)) {
              //   setDayFilled(true)
              // }
              setCar1Model(e.target.value);
            }}
          />
        </AccordionDetails>
      </Accordion>
      <Box style={styles.horizontalRow}>
        <Typography style={styles.subHeading}>Add Second Car</Typography>
        <ToggleButtonGroup
          color="primary"
          value={secondCarAdded}
          exclusive
          onChange={handleCarAdded}
        >
          <ToggleButton value={true}>Yes</ToggleButton>
          <ToggleButton value={false}>No</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {secondCarAdded ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Second Car</Typography>
            <Typography style={{ color: "red" }}>
              {secondCarError ? "Please Fill this section" : null}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
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
                border: "none",
                maxWidth: "200px",
              }}
              id="outlined-basic"
              label="Year"
              variant="outlined"
              value={car2Year}
              onChange={(e) => {
                // if (e.target.value.length(2)) {
                //   setDayFilled(true)
                // }
                setCar2Year(e.target.value);
              }}
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
              style={{
                width: "100%",
                border: "none",
              }}
              id="outlined-basic"
              label="Make"
              variant="outlined"
              value={car2Make}
              onChange={(e) => {
                // if (e.target.value.length(2)) {
                //   setDayFilled(true)
                // }
                setCar2Make(e.target.value);
              }}
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
              style={{
                width: "100%",
                border: "none",
              }}
              id="outlined-basic"
              label="Model"
              variant="outlined"
              value={car2Model}
              onChange={(e) => {
                // if (e.target.value.length(2)) {
                //   setDayFilled(true)
                // }
                setCar2Model(e.target.value);
              }}
            />
          </AccordionDetails>
        </Accordion>
      ) : null}

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>First Driver</Typography>
          <Typography style={{ color: "red" }}>
            {firstDriverError ? "Please Fill this section" : null}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box style={styles.horizontalRow}>
            <Typography style={styles.subHeading}>Name</Typography>
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
              style={{
                width: "100%",
                border: "none",
                maxWidth: "200px",
              }}
              id="outlined-basic"
              label="FName"
              variant="outlined"
              value={driver1Fname}
              onChange={(e) => {
                // if (e.target.value.length(2)) {
                //   setDayFilled(true)
                // }
                setDriver1Fname(e.target.value);
              }}
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
              style={{
                width: "100%",
                border: "none",
                maxWidth: "200px",
              }}
              id="outlined-basic"
              label="LName"
              variant="outlined"
              value={driver1Lname}
              onChange={(e) => {
                // if (e.target.value.length(2)) {
                //   setDayFilled(true)
                // }
                setDriver1Lname(e.target.value);
              }}
            />
          </Box>
          <Box style={styles.horizontalRow}>
            <Typography style={styles.subHeading}>DOB</Typography>
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
                border: "none",
                maxWidth: "200px",
              }}
              id="outlined-basic"
              label="DD"
              variant="outlined"
              value={driver1DOBday}
              onChange={(e) => {
                // if (e.target.value.length(2)) {
                //   setDayFilled(true)
                // }
                setdriver1DOBday(e.target.value);
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
              }}
              style={{
                width: "100%",
                border: "none",
                maxWidth: "200px",
              }}
              id="outlined-basic"
              label="MM"
              variant="outlined"
              value={driver1DOBmonth}
              onChange={(e) => {
                // if (e.target.value.length(2)) {
                //   setDayFilled(true)
                // }
                setdriver1DOBmonth(e.target.value);
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
                border: "none",
                maxWidth: "200px",
              }}
              id="outlined-basic"
              label="YYYY"
              variant="outlined"
              value={driver1DOByear}
              onChange={(e) => {
                // if (e.target.value.length(2)) {
                //   setDayFilled(true)
                // }
                setdriver1DOByear(e.target.value);
              }}
            />
          </Box>
          <Box style={styles.horizontalRow}>
            <Typography style={styles.subHeading}>Gender</Typography>
            <ToggleButtonGroup
              color="primary"
              value={driver1Gender}
              exclusive
              onChange={driver1GenderHandle}
            >
              <ToggleButton value={true}>Male</ToggleButton>
              <ToggleButton value={false}>Female</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box style={styles.horizontalRow}>
            <Typography style={styles.subHeading}>DUI</Typography>
            <ToggleButtonGroup
              color="primary"
              value={driver1DUI}
              exclusive
              onChange={handleDriver1DUI}
            >
              <ToggleButton value={true}>Yes</ToggleButton>
              <ToggleButton value={false}>No</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box style={styles.horizontalRow}>
            <Typography style={styles.subHeading}>Married</Typography>
            <ToggleButtonGroup
              color="primary"
              value={driver1Married}
              exclusive
              onChange={handleDriver1Married}
            >
              <ToggleButton value={true}>Yes</ToggleButton>
              <ToggleButton value={false}>No</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box style={styles.horizontalRow}>
            <Typography style={styles.subHeading}>At Fault Accident</Typography>
            <ToggleButtonGroup
              color="primary"
              value={driver1Accident}
              exclusive
              onChange={handleDriver1Accident}
            >
              <ToggleButton value={true}>Yes</ToggleButton>
              <ToggleButton value={false}>No</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Box style={styles.horizontalRow}>
        <Typography style={styles.subHeading}>Add Second Driver</Typography>

        <ToggleButtonGroup
          color="primary"
          value={secondDriverAdded}
          exclusive
          onChange={handleDriverAdded}
        >
          <ToggleButton value={true}>Yes</ToggleButton>
          <ToggleButton value={false}>No</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {secondDriverAdded ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Second Driver</Typography>
            <Typography style={{ color: "red" }}>
              {secondDriverError ? "Please Fill this section" : null}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box style={styles.horizontalRow}>
              <Typography style={styles.subHeading}>Name</Typography>
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
                style={{
                  width: "100%",
                  border: "none",
                  maxWidth: "200px",
                }}
                id="outlined-basic"
                label="FName"
                variant="outlined"
                value={driver2Fname}
                onChange={(e) => {
                  // if (e.target.value.length(2)) {
                  //   setDayFilled(true)
                  // }
                  setDriver2Fname(e.target.value);
                }}
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
                style={{
                  width: "100%",
                  border: "none",
                  maxWidth: "200px",
                }}
                id="outlined-basic"
                label="LName"
                variant="outlined"
                value={driver2Lname}
                onChange={(e) => {
                  // if (e.target.value.length(2)) {
                  //   setDayFilled(true)
                  // }
                  setDriver2Lname(e.target.value);
                }}
              />
            </Box>

            <Box style={styles.horizontalRow}>
              <Typography style={styles.subHeading}>DOB</Typography>
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
                  border: "none",
                  maxWidth: "200px",
                }}
                id="outlined-basic"
                label="DD"
                variant="outlined"
                value={driver2DOBday}
                onChange={(e) => {
                  // if (e.target.value.length(2)) {
                  //   setDayFilled(true)
                  // }
                  setdriver2DOBday(e.target.value);
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
                }}
                style={{
                  width: "100%",
                  border: "none",
                  maxWidth: "200px",
                }}
                id="outlined-basic"
                label="MM"
                variant="outlined"
                value={driver2DOBmonth}
                onChange={(e) => {
                  // if (e.target.value.length(2)) {
                  //   setDayFilled(true)
                  // }
                  setdriver2DOBmonth(e.target.value);
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
                  border: "none",
                  maxWidth: "200px",
                }}
                id="outlined-basic"
                label="YYYY"
                variant="outlined"
                value={driver2DOByear}
                onChange={(e) => {
                  // if (e.target.value.length(2)) {
                  //   setDayFilled(true)
                  // }
                  setdriver2DOByear(e.target.value);
                }}
              />
            </Box>
            <Box style={styles.horizontalRow}>
              <Typography style={styles.subHeading}>Gender</Typography>
              <ToggleButtonGroup
                color="primary"
                value={driver2Gender}
                exclusive
                onChange={driver2GenderHandle}
              >
                <ToggleButton value={true}>Male</ToggleButton>
                <ToggleButton value={false}>Female</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box style={styles.horizontalRow}>
              <Typography style={styles.subHeading}>DUI</Typography>
              <ToggleButtonGroup
                color="primary"
                value={driver2DUI}
                exclusive
                onChange={handleDriver2DUI}
              >
                <ToggleButton value={true}>Yes</ToggleButton>
                <ToggleButton value={false}>No</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box style={styles.horizontalRow}>
              <Typography style={styles.subHeading}>Married</Typography>
              <ToggleButtonGroup
                color="primary"
                value={driver2Married}
                exclusive
                onChange={handleDriver2Married}
              >
                <ToggleButton value={true}>Yes</ToggleButton>
                <ToggleButton value={false}>No</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box style={styles.horizontalRow}>
              <Typography style={styles.subHeading}>
                At Fault Accident
              </Typography>
              <ToggleButtonGroup
                color="primary"
                value={driver2Accident}
                exclusive
                onChange={handleDriver2Accident}
              >
                <ToggleButton value={true}>Yes</ToggleButton>
                <ToggleButton value={false}>No</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </AccordionDetails>
        </Accordion>
      ) : null}

      <Box style={styles.horizontalRow}>
        <Typography style={styles.subHeading}>Address</Typography>
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
          style={{
            width: "100%",
            border: "none",
          }}
          id="outlined-basic"
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => {
            // if (e.target.value.length(2)) {
            //   setDayFilled(true)
            // }
            setAddress(e.target.value);
          }}
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
          style={{
            width: "100%",
            border: "none",
            maxWidth: "200px",
          }}
          id="outlined-basic"
          label="City"
          variant="outlined"
          value={city}
          onChange={(e) => {
            // if (e.target.value.length(2)) {
            //   setDayFilled(true)
            // }
            setCity(e.target.value);
          }}
        />
      </Box>
      <Box>
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
          style={{
            width: "100%",
            border: "none",
            maxWidth: "200px",
            marginLeft: "150px",
          }}
          id="outlined-basic"
          label="Zip"
          variant="outlined"
          value={zip}
          onChange={(e) => {
            // if (e.target.value.length(2)) {
            //   setDayFilled(true)
            // }
            setZip(e.target.value);
          }}
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
          style={{
            width: "100%",
            border: "none",
            maxWidth: "200px",
          }}
          id="outlined-basic"
          label="State"
          variant="outlined"
          value={stateInitial}
          onChange={(e) => {
            // if (e.target.value.length(2)) {
            //   setDayFilled(true)
            // }
            setStateInitial(e.target.value);
          }}
        />
      </Box>
      <Box style={styles.horizontalRow}>
        <Typography style={styles.subHeading}>Insured</Typography>
        <ToggleButtonGroup
          color="primary"
          value={insured}
          exclusive
          onChange={handleInsured}
        >
          <ToggleButton value={true}>Yes</ToggleButton>
          <ToggleButton value={false}>No</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {insured ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Insurance Information</Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{
              display: "flex",
              flexDirection: "row",
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
              style={{
                width: "100%",
                border: "none",
              }}
              id="outlined-basic"
              label="Insurance Name"
              variant="outlined"
              value={insuranceName}
              onChange={(e) => {
                // if (e.target.value.length(2)) {
                //   setDayFilled(true)
                // }
                setInsuranceName(e.target.value);
              }}
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
              style={{
                width: "100%",
                border: "none",
                maxWidth: "200px",
              }}
              id="outlined-basic"
              label="Insurance Time"
              variant="outlined"
              value={insuranceTime}
              onChange={(e) => {
                // if (e.target.value.length(2)) {
                //   setDayFilled(true)
                // }
                setInsuranceTime(e.target.value);
              }}
            />
          </AccordionDetails>
        </Accordion>
      ) : null}
      <Box style={styles.horizontalRow}>
        <Typography style={styles.subHeading}>Home Owner</Typography>
        <ToggleButtonGroup
          color="primary"
          value={homeOwner}
          exclusive
          onChange={handleHomeOwner}
        >
          <ToggleButton value={true}>Yes</ToggleButton>
          <ToggleButton value={false}>No</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box style={styles.horizontalRow}>
        <Typography style={styles.subHeading}>Army Affiliation</Typography>
        <ToggleButtonGroup
          color="primary"
          value={isArmy}
          exclusive
          onChange={handleArmy}
        >
          <ToggleButton value={true}>Yes</ToggleButton>
          <ToggleButton value={false}>No</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box style={styles.horizontalRow}>
        <Typography style={styles.subHeading}>Client IP</Typography>
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
          style={{
            width: "100%",
            maxWidth: "200px",
            border: "none",
          }}
          id="outlined-basic"
          label="Client IP"
          variant="outlined"
          value={clientIP}
          onChange={(e) => {
            // if (e.target.value.length(2)) {
            //   setDayFilled(true)
            // }
            setClientIP(e.target.value);
          }}
        />
      </Box>
      <Box style={styles.horizontalRow}>
        <Typography style={styles.subHeading}>Phone</Typography>

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
          style={{
            width: "100%",
            border: "none",
            maxWidth: "200px",
          }}
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          value={phone}
          onChange={(e) => {
            // if (e.target.value.length(2)) {
            //   setDayFilled(true)
            // }
            setPhone(e.target.value);
          }}
        />
      </Box>
      <Box style={styles.horizontalRow}>
        <Typography style={styles.subHeading}>Email</Typography>

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
          style={{
            width: "100%",
            border: "none",
            maxWidth: "200px",
          }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            // if (e.target.value.length(2)) {
            //   setDayFilled(true)
            // }
            setEmail(e.target.value);
          }}
        />
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography style={{ color: "green" }}>{formMessage}</Typography>

        {submitting === false ? (
          <Button
            onClick={handleSubmit}
            style={{ color: submitting ? "green" : "red" }}
          >
            Submit
          </Button>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Paper>
  );
};
const MediForm = () => {

  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [dobday, setdobday] = useState("");
  const [dobmonth, setdobmonth] = useState("");
  const [dobyear, setdobyear] = useState("");
  const [gender, setgender] = useState(true);
  const [insured, setInsured] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [clientIP, setClientIP] = useState("");
  const [stateInitial, setStateInitial] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [medicareClientError, setmedicareClientError] = useState(false);
  const [insuranceError, setInsuranceError] = useState(false);
  const [clientError, setClientError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [ idJ,setIdJ] = useState('')
  const [submitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const genderHandle = (event, gender) => {
    setgender(gender);
  };

  const onGetLeadId = () =>{
    console.log('get lead id')
  }

  const handleInsured = (event, insured) => {
    setInsured(insured);
  };
  const handleSubmit = async () => {
    setmedicareClientError(false);
    setInsuranceError(false);
    setClientError(false);
    setPhoneError(false);
    setEmailError(false);
    setSubmitted(false);
    setFormMessage("");

    if (
      fname.length === 0 ||
      lname.length === 0 ||
      dobday.length === 0 ||
      dobmonth.length === 0 ||
      dobyear.length === 0
    ) {
      setmedicareClientError(true);
    }
   

    if (clientIP.length === 0) {
      setClientError(true);
    }
    if (phone.length === 0) {
      setPhoneError(true);
    }
    if (email.length === 0) {
      setEmailError(true);
    }

    if (
    
      fname.length === 0 ||
      lname.length === 0 ||
      dobday.length === 0 ||
      dobmonth.length === 0 ||
      dobyear.length === 0 ||
      clientIP.length === 0 ||
      phone.length === 0 ||
      email.length === 0
    ) {
      //("Error Exists");
      return;
    } else {
     
      setIsSubmitting(true);
      setFormMessage("Submitting,Please wait...");
      let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

      let firstPart = "";
      let secondPart = "";
      let thirdPart = "";
      let fourthPart = "";
      let fifthPart = "";
      let combined = "";

      for (let i = 0; i <= 7; i++) {
        firstPart += characters.charAt(Math.floor(Math.random() * 36));
      }
      for (let i = 0; i <= 3; i++) {
        secondPart += characters.charAt(Math.floor(Math.random() * 36));
      }
      for (let i = 0; i <= 3; i++) {
        thirdPart += characters.charAt(Math.floor(Math.random() * 36));
      }
      for (let i = 0; i <= 3; i++) {
        fourthPart += characters.charAt(Math.floor(Math.random() * 36));
      }
      for (let i = 0; i <= 11; i++) {
        fifthPart += characters.charAt(Math.floor(Math.random() * 36));
      }
      combined =
        firstPart +
        "-" +
        secondPart +
        "-" +
        thirdPart +
        "-" +
        fourthPart +
        "-" +
        fifthPart;

        const script = document.createElement('script');
        script.id = 'LeadiDscript_campaign';
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        script.crossorigin = 'anonymous';
        script.src = `https://create.lidstatic.com/campaign/5df7b9c8-4101-af29-b00d-ba3fb2493d5d.js?snippet_version=2`;
        document.body.appendChild(script);
        
        setTimeout( async() => {
            const summaryData = {
            fname: fname,
          lname: lname,
          dob: dobday + "-" + dobmonth + "-" + dobyear,
          gender: gender ? "Male" : "Female",
          Insured: insured ? "Yes" : "No",
          Address: address,
          Email: email,
          Phone: phone,
          clientIP: clientIP,
          jornayaID: window?.LeadiD?.token,
          City: city,
          StateInitial: stateInitial,
          Zip: zip,
      };
    
      //("Submit func");
      //(summaryData);
// console.log(summaryData);


var myHeaders = new Headers();
myHeaders.append("Cookie", "AWSALB=2RMcPx/frIrsMf03cR8NHAI4uKX/PZIyQeNbsA4zNv/vCIXd5WPvZ7A0ajbTUSMhRftBPN9CQHU5bbrP6b5JPqFA3+95dujRqSa4jCJU1d/wBWyUX9bUJPEmLX9o; PHPSESSID=37qu0e8pccjvg8s1vbvrl18gi1");

const data = {
  fname: summaryData.fname,
  lname: summaryData.lname,
  gender: summaryData.gender,
  phone: summaryData.Phone,
  dob: summaryData.dob,
  dobD:dobday ,
  dobM :dobmonth ,
  dobY: dobyear,
  clientIP: summaryData.clientIP,
  jornayaID: summaryData.jornayaID,
  address: summaryData.Address,
  city: summaryData.City,
  stateInitial: summaryData.StateInitial,
  zip: summaryData.Zip,
  email: summaryData.Email,
  insured: summaryData.Insured,
  createdAt: Timestamp.now(),
  addedOn: `${moment().format("ddd, ll")} `}
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`http://www.winning.today/posting/bid-ping?
api_key=d0ab445b569d2095f3fab336aa993209&
email=${data.email}&
zip=${data.zip}&
state=${data.stateInitial}&
phone=${data.phone}&
&dob_day=${data.dob}&
dob_month=${data.dob}&
dob_year=${data.dobY}&
subaff=1&
audience_id=300178`, requestOptions)
  .then(response => response.text())
  .then(result => {
	var myHeaders = new Headers();
	myHeaders.append("Cookie", "AWSALB=T3XUKQH8gtXSM9XqsRTevJUk9XzLxkfZixnXBudImFzn7dACPvd7TgKGKMOr7MTpT3ck5OVA5HzseHyTCdp+qhIrSbm4k5A/xQrBEmsmuCL9RWKvqi9NdQ4JToed; PHPSESSID=37qu0e8pccjvg8s1vbvrl18gi1");
	
	var requestOptions = {
	  method: 'GET',
	  headers: myHeaders,
	  redirect: 'follow'
	};
	
	fetch(`http://www.winning.today/posting/post-jv-signup?
  api_key=d0ab445b569d2095f3fab336aa993209&
email=${data.email}&
firstname=${data.fname}&
lastname=${data.lname}&
zip=${data.zip}&
city=${data.city}&
state=${data.stateInitial}&
address1=${data.address}&
phone=${data.phone}&
&dob_day=${data.dob}&
dob_month=${data.dob}&
dob_year=${data.dobY}&
subaff=11&
audience_id=300178&
ping_id:${result.data.ping_id}`, requestOptions)
	  .then(response => response.text())
	  .then(result =>  window.alert(`${result}`))
	  .catch(error =>  window.alert(`${error}`));
  }
	
	
	)
  .catch(error =>  window.alert(`${error}`));

      await addDoc(collection(db, "medicareClients"), {
        fname: summaryData.fname,
        lname: summaryData.lname,
        gender: summaryData.gender,
        phone: summaryData.Phone,
        dob: summaryData.dob,
        clientIP: summaryData.clientIP,
        jornayaID: summaryData.jornayaID,
        address: summaryData.Address,
        city: summaryData.City,
        stateInitial: summaryData.StateInitial,
        zip: summaryData.Zip,
        email: summaryData.Email,
        insured: summaryData.Insured,
        createdAt: Timestamp.now(),
        addedOn: `${moment().format("ddd, ll")} `,
      })
        .then(async (classRef) => {
          setIsSubmitting(false);
          setFormMessage("Client Added Successfully");
          setmedicareClientError(false);
          setInsuranceError(false);
          setClientError(false);
          setPhoneError(false);
          setEmailError(false);
          setSubmitted(true);
          setfname("");
          setlname("");
          setdobday("");
          setdobmonth("");
          setdobyear("");
          setgender(true);
          setInsured(false);
          setPhone("");
          setAddress("");
          setCity("");
          setClientIP("");
          setStateInitial("");
          setEmail("");
          setZip("");
        })
        .catch((err) => {
          setFormMessage("Error Adding Client to Database");
          //("Error Adding Client to Auto collection:", err);
          return false;
        });
      }, 500);
    }
  };
  
  // (function() {
  //   var s = document.createElement('script');
  //   s.id = 'LeadiDscript_campaign';
  //   s.type = 'text/javascript';
  //   s.async = true;
  //   s.src = '//create.lidstatic.com/campaign/5df7b9c8-4101-af29-b00d-ba3fb2493d5d.js?snippet_version=2';
  //   var LeadiDscript = document.getElementById('LeadiDscript');
  //   LeadiDscript.parentNode.insertBefore(s, LeadiDscript);
  //   })();
    // <TextField
    //        name="universal_leadid"
    //         style={{ width: "100%", padding: 0, border: "none" }}
    //         id="leadid_token"
    //         label="Address"
    //         variant="outlined"
    //         value=""
    //         type='hidden'
    //       />

  return (
    <Paper>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Client</Typography>
          <Typography style={{ color: "red" }}>
            {medicareClientError ? "Please Fill this section" : null}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box style={styles.horizontalRow}>
            <Typography style={styles.subHeading}>Name</Typography>
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
              style={{
                width: "100%",
                border: "none",
                maxWidth: "200px",
              }}
              id="outlined-basic"
              label="FName"
              variant="outlined"
              value={fname}
              onChange={(e) => {
                setfname(e.target.value);
              }}
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
              style={{
                width: "100%",
                border: "none",
                maxWidth: "200px",
              }}
              id="outlined-basic"
              label="LName"
              variant="outlined"
              value={lname}
              onChange={(e) => {
                setlname(e.target.value);
              }}
            />
          </Box>
          <Box style={styles.horizontalRow}>
            <Typography style={styles.subHeading}>dob</Typography>
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
                border: "none",
                maxWidth: "200px",
              }}
              id="outlined-basic"
              label="DD"
              variant="outlined"
              value={dobday}
              onChange={(e) => {
                // if (e.target.value.length(2)) {
                //   setDayFilled(true)
                // }
                setdobday(e.target.value);
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
              }}
              style={{
                width: "100%",
                border: "none",
                maxWidth: "200px",
              }}
              id="outlined-basic"
              label="MM"
              variant="outlined"
              value={dobmonth}
              onChange={(e) => {
                // if (e.target.value.length(2)) {
                //   setDayFilled(true)
                // }
                setdobmonth(e.target.value);
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
                border: "none",
                maxWidth: "200px",
              }}
              id="outlined-basic"
              label="YYYY"
              variant="outlined"
              value={dobyear}
              onChange={(e) => {
                // if (e.target.value.length(2)) {
                //   setDayFilled(true)
                // }
                setdobyear(e.target.value);
              }}
            />
          </Box>
          <Box style={styles.horizontalRow}>
            <Typography style={styles.subHeading}>gender</Typography>
            <ToggleButtonGroup
              color="primary"
              value={gender}
              exclusive
              onChange={genderHandle}
            >
              <ToggleButton value={true}>Male</ToggleButton>
              <ToggleButton value={false}>Female</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </AccordionDetails>
      </Accordion>
     

      <Box style={styles.horizontalRow}>
        <Typography style={styles.subHeading}>Address</Typography>
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
          style={{
            width: "100%",
            border: "none",
          }}
          id="outlined-basic"
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => {
            // if (e.target.value.length(2)) {
            //   setDayFilled(true)
            // }
            setAddress(e.target.value);
          }}
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
          style={{
            width: "100%",
            border: "none",
            maxWidth: "200px",
          }}
          id="outlined-basic"
          label="City"
          variant="outlined"
          value={city}
          onChange={(e) => {
            // if (e.target.value.length(2)) {
            //   setDayFilled(true)
            // }
            setCity(e.target.value);
          }}
        />
      </Box>
      <Box>
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
          style={{
            width: "100%",
            border: "none",
            maxWidth: "200px",
            marginLeft: "150px",
          }}
          id="outlined-basic"
          label="Zip"
          variant="outlined"
          value={zip}
          onChange={(e) => {
            // if (e.target.value.length(2)) {
            //   setDayFilled(true)
            // }
            setZip(e.target.value);
          }}
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
          style={{
            width: "100%",
            border: "none",
            maxWidth: "200px",
          }}
          id="outlined-basic"
          label="State"
          variant="outlined"
          value={stateInitial}
          onChange={(e) => {
            // if (e.target.value.length(2)) {
            //   setDayFilled(true)
            // }
            setStateInitial(e.target.value);
          }}
        />
      </Box>
      <Box style={styles.horizontalRow}>
        <Typography style={styles.subHeading}>Are you covered with Medicare</Typography>
        <ToggleButtonGroup
          color="primary"
          value={insured}
          exclusive
          onChange={handleInsured}
        >
          <ToggleButton value={true}>Yes</ToggleButton>
          <ToggleButton value={false}>No</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      <Box style={styles.horizontalRow}>
        <Typography style={styles.subHeading}>Client IP</Typography>
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
          style={{
            width: "100%",
            maxWidth: "200px",
            border: "none",
          }}
          id="outlined-basic"
          label="Client IP"
          variant="outlined"
          value={clientIP}
          onChange={(e) => {
            // if (e.target.value.length(2)) {
            //   setDayFilled(true)
            // }
            setClientIP(e.target.value);
          }}
        />
      </Box>
      <Box style={styles.horizontalRow}>
        <Typography style={styles.subHeading}>Phone</Typography>

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
          style={{
            width: "100%",
            border: "none",
            maxWidth: "200px",
          }}
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          value={phone}
          onChange={(e) => {
            // if (e.target.value.length(2)) {
            //   setDayFilled(true)
            // }
            setPhone(e.target.value);
          }}
        />
      </Box>
      <Box style={styles.horizontalRow}>
        <Typography style={styles.subHeading}>Email</Typography>

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
          style={{
            width: "100%",
            border: "none",
            maxWidth: "200px",
          }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            // if (e.target.value.length(2)) {
            //   setDayFilled(true)
            // }
            setEmail(e.target.value);
          }}
        />
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
       {/* { idJ && <JornayaComponent
       jornayaToken={idJ}
        onGetUniversalLeadId={(props)=>{console.log("Munem",props)}}
        />} */}
        <Typography style={{ color: "green" }}>{formMessage}</Typography>


        {submitting === false ? (
          <Button
            onClick={handleSubmit}
            style={{ color: submitting ? "green" : "red" }}
          >
            Submit
          </Button>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Paper>
  );
        };

const LifeForm = () => {
  return <Paper>Life Form</Paper>;
};

const DataEntryForm = () => {
  const [alignment, setAlignment] = React.useState("auto");

  const handleChange = (event, newAlignment) => {
    //("New form is", newAlignment);
    setAlignment(newAlignment);
  };
  return (
    <div>
      
      <Box style={styles.typeBox}>
        <Typography style={styles.subHeading}>Select Form Type</Typography>

        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="auto">Auto</ToggleButton>
          <ToggleButton value="life">Life</ToggleButton>
          <ToggleButton value="medicare">Medicare's</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {alignment === "auto" ? (
        <AutoForm />
      ) : alignment === "life" ? (
        <LifeForm />
      ) : alignment === "medicare" ? (
        <MediForm />
      ) : null}
    </div>
  );
};

const styles = {
  typeBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  horizontalRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: "20px 0px",
  },
  verticalRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  subHeading: {
    marginRight: "20px",
    marginLeft: "15px",
    minWidth: "115px",
  },
};

export default DataEntryForm;
