import React, { useContext, useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import { useAutoContext } from "../context/autoContext/AutoContext"
import { useAppContext } from "../context/appContext/AppContext"
import DialogueBox from "../components/DialogueBox"
import { allSteps } from "../util/allSteps"

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
// import LinkToSteps from "./LinkToallSteps"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import { carArr, insurance } from "../util/autoData"
import validator from "validator"
import { stateInitials } from "../util/autoData"

import "react-phone-number-input/style.css"

import Button from "@mui/material/Button"
import { validEmail, validZip } from "../util/typeChecking"
import Disclaimer from "./Disclaimer"
import moment from "moment"

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
}

//step 8
export const AutoAccident = () => {
  //set the step to 9 and goto drunk

  const { nextStep } = useAppContext()
  const { setDriver1Accident, setDriver2Accident, secondDriverAdded } =
    useAutoContext()

  function handleClick(buttonClicked) {
    if (secondDriverAdded === true) {
      if (buttonClicked === true) {
        setDriver2Accident(true)
        nextStep(allSteps.duiStep)
      } else {
        setDriver2Accident(false)
        nextStep(allSteps.duiStep)
      }
    } else {
      if (buttonClicked === true) {
        setDriver1Accident(true)
        nextStep(allSteps.duiStep)
      } else {
        setDriver1Accident(false)
        nextStep(allSteps.duiStep)
      }
    }
  }

  return (
    <Container>
      {secondDriverAdded ? (
        <Typography sx={styles.subHeadingStyle}>Second Driver:</Typography>
      ) : null}
      <Typography sx={styles.headerStyle}>
        Any at-fault Accidents in the Last 3 years?
      </Typography>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button
            sx={styles.generalBtn}
            value={true}
            variant="contained"
            onClick={(e) => {
              handleClick(true)
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
              handleClick(false)
            }}
          >
            No
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
//step 9
export const AutoDUI = () => {
  //set the step to 6 and goto name

  const { nextStep } = useAppContext()
  const { setDriver1Drunk, setDriver2Drunk, secondDriverAdded } =
    useAutoContext()

  function handleClick(buttonClicked) {
    if (secondDriverAdded === true) {
      if (buttonClicked === true) {
        setDriver2Drunk(true)
        nextStep(allSteps.nameStep)
      } else {
        setDriver2Drunk(false)
        nextStep(allSteps.nameStep)
      }
    } else {
      if (buttonClicked === true) {
        setDriver1Drunk(true)
        nextStep(allSteps.nameStep)
      } else {
        setDriver1Drunk(false)
        nextStep(allSteps.nameStep)
      }
    }
  }
  return (
    <Container>
      {secondDriverAdded ? (
        <Typography sx={styles.subHeadingStyle}>Second Driver:</Typography>
      ) : null}
      <Typography sx={styles.headerStyle}>DUI in the Last 3 years?</Typography>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button
            sx={styles.generalBtn}
            value={true}
            variant="contained"
            onClick={(e) => {
              handleClick(true)
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
              handleClick(false)
            }}
          >
            No
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
//step 10
export const AutoHomeOwner = () => {
  //set the step to 2 and goto dob
  const { nextStep } = useAppContext()
  const { setIsHomeOwner } = useAutoContext()
  function handleClick(buttonClicked) {
    if (buttonClicked == true) {
      setIsHomeOwner(true)
      nextStep(allSteps.dobStep)
    } else {
      setIsHomeOwner(false)
      nextStep(allSteps.dobStep)
    }
  }
  return (
    <Container>
      <Typography sx={styles.headerStyle}>Are you the Home Owner?</Typography>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button
            sx={styles.generalBtn}
            value={true}
            variant="contained"
            onClick={(e) => {
              handleClick(true)
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
              handleClick(false)
            }}
          >
            No
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
//step 11
export const AutoInsured = () => {
  //If ensured then set the step to 15 and goto AutoPrevInsureName else set the step to 10 and goto homeowner
  const { nextStep, setTotalSteps } = useAppContext()
  const { setIsInsured } = useAutoContext()
  function handleClick(buttonClicked) {
    if (buttonClicked == true) {
      setTotalSteps(2)
      setIsInsured(true)
      nextStep(allSteps.prevInsureNameStep)
    } else {
      setIsInsured(false)
      nextStep(allSteps.homeOwnerStep)
    }
  }
  return (
    <Container>
      <Typography sx={styles.headerStyle}>
        Are you currently Insured?
      </Typography>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button
            sx={styles.generalBtn}
            value={true}
            variant="contained"
            onClick={(e) => {
              handleClick(true)
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
              handleClick(false)
            }}
          >
            No
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
//step 12
export const AutoMake = () => {
  //set the step to 14 and goto model

  const [searchedItem, setSearchedItem] = useState("")

  const { nextStep } = useAppContext()
  const { setCar1Make, car1_make, secondCarAdded, setCar2Make } =
    useAutoContext()

  // function handleClick(buttonClicked) {
  //   //("The Clicked button is ", buttonClicked)
  //   setCar1Make(buttonClicked)

  //   nextStep(allSteps.modelStep)
  // }
  function handleClick(buttonClicked) {
    if (secondCarAdded) {
      setCar2Make(buttonClicked)
      nextStep(allSteps.modelStep)
    } else {
      setCar1Make(buttonClicked)
      nextStep(allSteps.modelStep)
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
        <div style={{ marginBottom: 25 }}>
          {secondCarAdded ? (
            <Typography style={styles.subHeadingStyle}>
              Second Vehicle:
            </Typography>
          ) : null}
          <Typography sx={styles.headerStyle}>Select Vehicle Make</Typography>
        </div>
      </div>
      <Container>
        <Box sx={styles.searchdiv}>
          <TextField
            InputProps={{ disableUnderline: true }}
            onChange={(event) => setSearchedItem(event.target.value)}
            sx={{
              width: "100%",
              // height: "100%",

              "& .MuiInputBase-input": {
                // height: "100%",

                border: "none",
                outline: "none",
              },
              "& .MuiFilledInput-input": {
                // height: "100%",
                backgroundColor: "white",
                border: "none",
                outline: "none",
              },
              // "&&&:before": {
              //   borderBottom: "none",
              //   outline: "none",
              // },
              // "&&:after": {
              //   borderBottom: "none",
              //   outline: "none",
              // },
            }}
            id="filled-basic"
            label="Type here to search"
            variant="filled"
          />
        </Box>
      </Container>

      <Container sx={styles.gridContainer}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          justify="center"
        >
          {carArr
            .filter((makeNmodel) => {
              if (searchedItem === "") {
                //if query is empty

                return makeNmodel
              } else if (
                Object.keys(makeNmodel)[0]
                  .toLowerCase()
                  .includes(searchedItem.toLowerCase())
              ) {
                //returns filtered array
                return makeNmodel
              }
            })
            .map((item, key) => {
              return (
                <Grid key={key} item lg={6} sm={6} xs={12} md={6}>
                  <Button
                    sx={styles.generalBtn}
                    value={Object.keys(item)}
                    variant="contained"
                    onClick={(e) => {
                      handleClick(e.target.value)
                    }}
                  >
                    {Object.keys(item)}
                  </Button>
                </Grid>
              )
            })}
          {/* <Grid item lg={2} sm={4} xs={4} md={2}>
        <LinkToSteps textToDisplay={2001} stepNumber={allSteps.makeStep} />
      </Grid> */}
        </Grid>
      </Container>
    </Container>
  )
}
//step 13
export const AutoMilitary = () => {
  //set the step to 1 and goto address
  const { nextStep } = useAppContext()
  const { setIsArmy } = useAutoContext()

  function handleClick(buttonClicked) {
    if (buttonClicked == true) {
      setIsArmy(true)
      nextStep(allSteps.addressStep)
    } else {
      setIsArmy(false)
      nextStep(allSteps.addressStep)
    }
  }
  return (
    <Container>
      <Typography sx={styles.headerStyle}>
        Have You or Anyone in Your Family Served in the Military?
      </Typography>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button
            sx={styles.generalBtn}
            value={true}
            variant="contained"
            onClick={(e) => {
              handleClick(true)
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
              handleClick(false)
            }}
          >
            No
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
//step 14
export const AutoModel = () => {
  //set the step to 17 and goto repeatVehicle
  const { car1_make, car2_make, setCar1Model, setCar2Model, secondCarAdded } =
    useAutoContext()
  const { nextStep } = useAppContext()
  const [searchedItem, setSearchedItem] = useState("")
  const [car_make_to_check, set_car_make_to_check] = useState(null)
  const [customModel, setCustomModel] = useState("")

  useEffect(() => {
    if (secondCarAdded) {
      set_car_make_to_check(car2_make)
    } else {
      set_car_make_to_check(car1_make)
    }
  }, [])

  // function handleClick(buttonClicked) {
  //   //("The Clicked button is ", buttonClicked)
  //   setCar1Model(buttonClicked)
  //   nextStep(allSteps.repeatVehicleStep)
  // }
  function handleClick(buttonClicked) {
    if (secondCarAdded) {
      setCar2Model(buttonClicked)
      nextStep(allSteps.currentInsuredStep)
    } else {
      setCar1Model(buttonClicked)
      nextStep(allSteps.repeatVehicleStep)
    }
  }
  function handleClickCustom() {
    if (secondCarAdded) {
      setCar2Model(customModel)
      nextStep(allSteps.currentInsuredStep)
    } else {
      setCar1Model(customModel)
      nextStep(allSteps.repeatVehicleStep)
    }
  }
  return (
    <Container>
      {secondCarAdded ? (
        <Typography sx={styles.subHeadingStyle}>Second Vehicle:</Typography>
      ) : null}
      <Typography sx={styles.headerStyle}>Select Vehicle Model</Typography>
      <Container>
        <Box sx={styles.searchdiv}>
          <TextField
            InputProps={{ disableUnderline: true }}
            onChange={(event) => setSearchedItem(event.target.value)}
            sx={{
              width: "100%",

              "& .MuiInputBase-input": {
                // height: "100%",
                // backgroundColor: "yellow",
                border: "none",
                outline: "none",
              },
              "& .MuiFilledInput-input": {
                height: "100%",
                backgroundColor: "white",
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
            label="Type here to search"
            variant="filled"
          />
        </Box>
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
            {" "}
            <Typography style={{ width: "100%", textAlign: "center" }}>
              Cant Find your Model? Type it here and continue
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
              onChange={(event) => setCustomModel(event.target.value)}
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
              label="Enter your Model"
              variant="filled"
            />
            <Button style={{ width: "20%" }} onClick={handleClickCustom}>
              Continue
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {carArr
            ?.filter(
              (make) => Object.keys(make).toString() === car_make_to_check
            )
            .map((foundMake, key) => {
              return foundMake[car_make_to_check]
                .filter((model) => {
                  if (model === "") {
                    return model
                  }
                  if (
                    model.toLowerCase().includes(searchedItem.toLowerCase())
                  ) {
                    return model
                  }
                })
                .map((model, key) => (
                  <Grid key={key} item lg={6} sm={6} xs={12} md={6}>
                    <Button
                      sx={styles.generalBtn}
                      value={model}
                      variant="contained"
                      onClick={(e) => {
                        handleClick(e.target.value)
                      }}
                    >
                      {model}
                    </Button>
                  </Grid>
                ))
            })}
        </Grid>
      </Container>
    </Container>
  )
}
//step 15
export const AutoPrevInsureName = () => {
  // step to 18 and goto AutoTimeWithComp
  const { nextStep, setTotalSteps } = useAppContext()
  const { setInsuranceName } = useAutoContext()
  const [customName, setCustomName] = useState("")
  function handleClick(buttonClicked) {
    setInsuranceName(buttonClicked)
    nextStep(allSteps.prevInsureTimeStep)
  }
  function handleClickCustom() {
    setInsuranceName(customName)
    nextStep(allSteps.prevInsureTimeStep)
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
                    handleClick(e.target.value)
                  }}
                >
                  {item}
                </Button>
              </Grid>
            )
          })}
          {/* <Grid item lg={2} sm={4} xs={4} md={2}>
          <LinkToSteps textToDisplay={2001} stepNumber={allSteps.makeStep} />
        </Grid> */}
        </Grid>
      </Container>
    </Container>
  )
}
//step 16
export const AutoRepeatDriver = () => {
  //if repeat then goto 2 (DOB) else goto 13 (Military)
  const { nextStep, setTotalSteps } = useAppContext()
  const { setSecondDriverAdded } = useAutoContext()
  function handleClick(buttonClicked) {
    if (buttonClicked == true) {
      setTotalSteps(6)
      setSecondDriverAdded(true)
      nextStep(allSteps.dobStep)
    } else {
      setSecondDriverAdded(false)
      nextStep(allSteps.militaryStep)
    }
  }
  return (
    <Container>
      <Typography sx={styles.headerStyle}>Add Second Driver?</Typography>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button
            sx={styles.generalBtn}
            value={true}
            variant="contained"
            onClick={(e) => {
              handleClick(true)
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
              handleClick(false)
            }}
          >
            No
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
//step 17
export const AutoRepeatVehicle = () => {
  //If yes then set the state to 19 goto address else set the state to 11 goto autoCurrentInsured

  const { nextStep, setTotalSteps } = useAppContext()
  const { setSecondCarAdded } = useAutoContext()

  function handleClick(buttonClicked) {
    if (buttonClicked == true) {
      setTotalSteps(3)
      setSecondCarAdded(true)
      nextStep(allSteps.yearStep)
    } else {
      setSecondCarAdded(false)
      nextStep(allSteps.currentInsuredStep)
    }
  }
  return (
    <Container sx={styles.generalContainer}>
      <Typography sx={styles.headerStyle}>
        Add Second Vehicle? (Save up to 25%)
      </Typography>
      <Grid
        container
        style={{ margin: "30px 0px" }}
        spacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button
            sx={styles.generalBtn}
            value={true}
            variant="contained"
            onClick={(e) => {
              handleClick(true)
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
              handleClick(false)
            }}
          >
            No
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
//step 18
export const AutoTimeWithComp = () => {
  //set the step to 10 and goto home owner

  const { nextStep } = useAppContext()
  const { setInsuranceTime, insurance_name } = useAutoContext()

  const timeWithComp = [
    "Less than a Year",
    "1-2 years",
    "2-3 years",
    "3-5 years",
    "5+ years",
  ]

  function handleClick(buttonClicked) {
    setInsuranceTime(buttonClicked)
    nextStep(allSteps.homeOwnerStep)
  }
  return (
    <Container>
      <Typography sx={styles.headerStyle}>
        How Long have You Been Insured with {insurance_name} ?
      </Typography>
      <Container>
        <Grid
          container
          spacing={2}
          columns={12}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {timeWithComp.map((item, key) => {
            return (
              <Grid key={key} item lg={6} sm={6} xs={12} md={6}>
                <Button
                  sx={styles.generalBtn}
                  value={item}
                  variant="contained"
                  onClick={(e) => {
                    handleClick(e.target.value)
                  }}
                >
                  {item}
                </Button>
              </Grid>
            )
          })}
          {/* <Grid item lg={2} sm={4} xs={4} md={2}>
          <LinkToSteps textToDisplay={2001} stepNumber={allSteps.makeStep} />
        </Grid> */}
        </Grid>
      </Container>
    </Container>
  )
}
//step 19
export const AutoYear = () => {
  //set the step to 12 and goto make

  //("The Next Step is :", allSteps.makeStep)
  // let i = [
  //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  //   22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  // ]
  let i = [...Array(40).keys()]
  let count = 2023
  const { nextStep } = useAppContext()
  const { setCar1Year, setCar2Year, secondCarAdded } = useAutoContext()

  function handleClick(event) {
    event.preventDefault()
    //("The Clicked button is ", event.target.value)
    if (secondCarAdded === true) {
      setCar2Year(event.target.value)
      nextStep(allSteps.makeStep)
    } else {
      setCar1Year(event.target.value)
      nextStep(allSteps.makeStep)
    }
  }
  return (
    <Container>
      {secondCarAdded ? (
        <Typography sx={styles.subHeadingStyle}>Second Vehicle:</Typography>
      ) : (
        <Typography sx={styles.subHeadingStyle}>Lets Get Started!</Typography>
      )}

      <Typography sx={styles.headerStyle}>Select Vehicle Year</Typography>

      <Container>
        <Grid
          container
          spacing={2}
          columns={16}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {i.map((item, key) => {
            count--

            return (
              <Grid key={key} item lg={2} sm={4} xs={5} md={2}>
                <Button
                  sx={styles.generalBtn}
                  value={count}
                  variant="contained"
                  // onClick={(e) => {
                  //   handleClick(e)
                  // }}
                  onClick={handleClick}
                >
                  {count}
                </Button>
              </Grid>
            )
          })}
          {/* <Grid item lg={2} sm={4} xs={4} md={2}>
            <LinkToSteps textToDisplay={2001} stepNumber={allSteps.makeStep} />
          </Grid> */}
        </Grid>
      </Container>
    </Container>
  )
}

//step 1
export const Address = () => {
  const { nextStep } = useAppContext()
  const [address, setAddresss] = useState("")
  const [city, setCity] = useState("")
  const [zip, setZip] = useState("")
  const [unit, setUnit] = useState("")
  const [stateInitial, setStateInitial] = useState("")
  const [error, setError] = useState("")

  const [addressError, setAdError] = useState("")
  const [cityError, setCityError] = useState("")
  const [unitError, setUnitError] = useState("")
  const [stateError, setStateError] = useState("")
  const [zipError, setZipError] = useState("")

  const { setAddress } = useAutoContext()

  function handleClick(buttonClicked) {
    setError("")
    setAdError("")
    setCityError("")
    setStateError("")
    setZipError("")
    setUnitError("")
    if (address.length < 1) {
      setAdError("This is a necessary field")
      setAddress("")
    }

    if (unit.length < 1) {
      setUnitError("This is a necessary field")
      setUnit("")
    }
    if (city.length < 1) {
      setCityError("This is a necessary field")
      setCity("")
    }
    if (stateInitial === null || stateInitial.length === 0) {
      setStateError("This is a necessary field")
      //("State is null ", stateInitial)
      setStateInitial("")
    }
    if (zip.length < 1) {
      setZipError("This is a necessary field")
      setZip("")
    }
    // //("The Clicked button is ", buttonClicked)
    const complete_address =
      address + "," + unit + "," + city + "," + stateInitial + "," + zip

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
        setZipError("Please Enter Valid Zip")
        setZip("")
      } else {
        setAddress(complete_address, unit, city, stateInitial, zip)
        nextStep(allSteps.emailStep)
      }
    } else {
      //("Fileds Missing")

      setError("All Fields are Necessary")
    }
  }
  //
  return (
    <Container sx={styles.generalContainer}>
      <Typography sx={styles.headerStyle}>What is your Address?</Typography>
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
                {stateInitials.map((item) => (
                  <MenuItem key={item.toString()} value={item}>
                    {item.toString()}
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
            variant="outlined"
            placeholder="XXXXX or XXXXX-XXXX"
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
        Continue
      </Button>
    </Container>
  )
}
//step 2
export const Dob = () => {
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [error, setError] = useState(null)

  const { nextStep } = useAppContext()

  const { setDriver1DOB, setDriver2DOB, secondDriverAdded } = useAutoContext()

  function handleClick(buttonClicked) {
    setError("")
    //("Date function")

    if (day.length === 0 || month.length === 0 || year.length === 0) {
      setError("Some data maybe missing!")
      //("Some data maybe missing!", day, month, year)
    } else {
      const joined_date =
        year.toString() + "-" + month.toString() + "-" + day.toString()
      //("Joined date is", joined_date)
      if (validator.isDate(joined_date)) {
        const joined_date =
          year.toString() + "-" + month.toString() + "-" + day.toString()

        //("Complete Date is ,", joined_date)

        var diff = moment(joined_date).diff(moment(), "milliseconds")
        var duration = moment.duration(diff)
        var age = duration.asDays() * -1

        //("Age in days", age)
        if (age < 8035.335) {
          //("Under age")
          setError("Driver is Under 22 and Not Eligible for Insurance")
        }
        if (age > 29219.4) {
          //("Over age")
          setError("Driver is Over 80 and Not Eligible for Insurance")
        }
        if (age > 8035.335 && age < 29219.4) {
          //("acceptable")
          postAndGo(joined_date)
        }

        //22 years=8035.335 days
        //80 years=29219.4 days
      } else {
        setError("Enter Valid Date!")
      }
    }

    function postAndGo(date) {
      //("Recieved Error value in Post and go", error)

      if (secondDriverAdded === true) {
        setDriver2DOB(date)
        nextStep(allSteps.genderStep)
      } else {
        setDriver1DOB(date)
        nextStep(allSteps.genderStep)
      }
    }
  }

  // nextStep(allSteps.prevInsureTimeStep)

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {secondDriverAdded ? (
        <Typography sx={styles.subHeadingStyle}>Second Driver:</Typography>
      ) : null}

      <Typography sx={styles.headerStyle}>
        What is your Date of Birth?
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
            setDay(e.target.value)
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
            setMonth(e.target.value)
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
      <Button
        sx={styles.generalSingleBtn}
        variant="contained"
        onClick={handleClick}
      >
        Continue
      </Button>
    </Container>
  )
}
//step 3
export const Email = () => {
  const { nextStep } = useAppContext()
  const [email, setEmaill] = useState("")
  const { setEmail } = useAutoContext()
  const [error, setError] = useState(null)

  function handleClick() {
    if (email.length === 0) {
      setError("This is a necessary field")
      setEmaill("")
    } else if (!validEmail.test(email)) {
      setError("Please enter a valid email")
      setEmaill("")
    } else {
      setEmail(email)
      nextStep(allSteps.phoneStep)
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
        <Typography sx={styles.headerStyle}>What is your Email?</Typography>
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
  )
}
//step 4
export const Gender = () => {
  const { nextStep } = useAppContext()
  const { setDriver1Gender, setDriver2Gender, secondDriverAdded } =
    useAutoContext()

  function handleClick(buttonClicked) {
    //("The Clicked button is ", buttonClicked)
    if (secondDriverAdded === true) {
      if (buttonClicked === "Male") {
        setDriver2Gender("Male")
        nextStep(allSteps.marriedStep)
      } else {
        setDriver2Gender("Female")
        nextStep(allSteps.marriedStep)
      }
    } else {
      if (buttonClicked === "Male") {
        setDriver1Gender("Male")
        nextStep(allSteps.marriedStep)
      } else {
        setDriver1Gender("Female")
        nextStep(allSteps.marriedStep)
      }
    }
  }

  return (
    <Container>
      {secondDriverAdded ? (
        <Typography sx={styles.subHeadingStyle}>Second Driver:</Typography>
      ) : null}
      <Typography sx={styles.headerStyle}>What is your Gender?</Typography>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button
            sx={styles.generalBtn}
            value={true}
            variant="contained"
            onClick={(e) => {
              handleClick("Female")
            }}
          >
            Female
          </Button>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button
            sx={styles.generalBtn}
            value={false}
            variant="contained"
            onClick={(e) => {
              handleClick("Male")
            }}
          >
            Male
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
//step 5
export const Married = () => {
  const { nextStep } = useAppContext()
  const { setDriver1Married, setDriver2Married, secondDriverAdded } =
    useAutoContext()

  function handleClick(buttonClicked) {
    //("The Clicked button is ", buttonClicked)
    if (secondDriverAdded === true) {
      if (buttonClicked === true) {
        setDriver2Married(true)
        nextStep(allSteps.accidentStep)
      } else {
        setDriver2Married(false)
        nextStep(allSteps.accidentStep)
      }
    } else {
      if (buttonClicked === true) {
        setDriver1Married(true)
        nextStep(allSteps.accidentStep)
      } else {
        setDriver1Married(false)
        nextStep(allSteps.accidentStep)
      }
    }
  }
  return (
    <Container>
      {secondDriverAdded ? (
        <Typography sx={styles.subHeadingStyle}>Second Driver:</Typography>
      ) : null}
      <Typography sx={styles.headerStyle}>Are you Married?</Typography>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button
            sx={styles.generalBtn}
            value={true}
            variant="contained"
            onClick={(e) => {
              handleClick(true)
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
              handleClick(false)
            }}
          >
            No
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
//step 6
export const Name = () => {
  const { nextStep } = useAppContext()
  const { setDriver1Name, setDriver2Name, secondDriverAdded } = useAutoContext()
  const [error, setError] = useState(null)

  const [fName, setFname] = useState("")
  const [lName, setLname] = useState("")

  function handleClick(buttonClicked) {
    if (fName.length === 0 || lName.length === 0) {
      //("Some Data may be missing")
      setError("Some Data may be missing")
      setFname("")
      setLname("")
    }
    // else if (!validName.test(fName + " " + lName)) {
    //   setError("Please Enter Valid Name")
    //   setFname("")
    //   setLname("")
    // }
    else {
      const complete_name = fName + " " + lName
      //("The Name is ", complete_name)
      if (secondDriverAdded === true) {
        setDriver2Name(fName, lName)
        nextStep(allSteps.militaryStep)
      } else {
        setDriver1Name(fName, lName)
        nextStep(allSteps.repeatDriverStep)
      }
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
        {secondDriverAdded ? (
          <Typography sx={styles.subHeadingStyle}>Second Driver:</Typography>
        ) : null}
        <Typography sx={styles.headerStyle}>What is your Name?</Typography>
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
          Continue
        </Button>
      </div>
    </Container>
  )
}
//step 7
export const Phone = () => {
  const { nextStep } = useAppContext()
  const { setPhone, driver1_name, car1_year, car1_make, car1_model } =
    useAutoContext()
  const [pno, setPno] = useState("")
  const [error, setError] = useState(null)

  function handleClick() {
    if (pno.length === 0) {
      setError("This is a necessary field")
      setPno("")
    } else {
      //("The phone is ", pno)
      const formattedPhoneNumber = formatPhoneNumber(pno)
      setPhone(formattedPhoneNumber)
      nextStep(allSteps.summaryStep)
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
  const handleInput = (e) => {
    // this is where we'll call our future formatPhoneNumber function that we haven't written yet.
    const formattedPhoneNumber = formatPhoneNumber(e.target.value)
    // we'll set the input value using our setInputValue
    setPno(formattedPhoneNumber)
  }

  return (
    <Container>
      <Typography fontWeight="bold" sx={styles.subHeadingStyle}>
        Last Step {driver1_name}
      </Typography>
      <Typography sx={styles.subHeadingStyle}>
        Rates for your {car1_year} {car1_make} {car1_model} are ready!
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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
          style={{ padding: 0, border: "none" }}
          id="outlined-basic"
          label="Phone"
          placeholder="(XXX) XXX-XXXX"
          variant="outlined"
          value={pno}
          onChange={(e) => handleInput(e)}
        />

        <div style={{ color: "red" }}>{error}</div>

        <Button
          sx={styles.generalSingleBtn}
          variant="contained"
          onClick={handleClick}
        >
          Continue
        </Button>

        <Disclaimer />
      </div>
    </Container>
  )
}

export const AutoInsuranceSummary = () => {
  // const { setJornayaID, setClientIP } = useAppContext()
  const navigate = useNavigate()
  const { setReadyToPost, setIsEditing, nextStep } = useAppContext()
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
    driver2_name,
    driver2_fname,
    driver2_lname,
    is_army,
    address,
    email,
    phone,
    secondDriverAdded,
    secondCarAdded,
    runServices,
  } = useAutoContext()
  const [failed, setFailed] = useState(false)

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
      Name: driver1_fname + " " + driver1_lname,
      DOB: driver1_DOB,
      Gender: driver1_gender,
      Married: driver1_married ? "Yes" : "No",
      AtFaultAccident: driver1_accident ? "Yes" : "No",
      DUI: driver1_drunk ? "Yes" : "No",
    },
    Driver2: {
      Name: driver2_fname + " " + driver2_lname,
      DOB: driver2_DOB,
      Gender: driver2_gender,
      Married: driver2_married ? "Yes" : "No",
      AtFaultAccident: driver2_accident ? "Yes" : "No",
      DUI: driver2_drunk ? "Yes" : "No",
    },
    Insured: is_insured ? "Yes" : "No",
    InsuranceName: insurance_name,
    InsuranceTime: insurance_time,
    HomeOwner: is_homeOwner ? "Yes" : "No",
    Address: address,
    Email: email,
    Phone: phone,
  }
  //("The Summary Object is", summaryData)

  function handlePostToDB() {
    runServices().then((servicesExec) => {
      //("Did Services run?", servicesExec)
      if (servicesExec === true) {
        setReadyToPost(true)
        navigate("/get-auto-quotes")
      }
      if (servicesExec === false) {
        //(servicesExec)
        setFailed(true)

        //("Did Services run is false", servicesExec)
      }
    })
  }
  function handleEditClick(step) {
    //("Edit clicked for", step)
    setIsEditing(true)
    nextStep(step)
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
          {driver1_name}, Your Quotes are Almost Ready!
        </Typography>
        <div style={{ color: "red" }}></div>
          <div style={{ display:'none'}}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked={true} />}
            label="Are you sure to contiue"
          />
          <label for="leadid_tcpa_disclosure">
          <input
            id="leadid_tcpa_disclosure"
            type="hidden"
            checked="checked"
            value="true"
          />
         
         {driver1_name}, By clicking *Continue", I provide my express
          written consent to receive monitored or recorded phone sales calls and
          text messages from SaveToday, PolicySavings, and our Auto
          Insurance marketing.partners regarding products and services including
          Auto 
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
        </FormGroup>
          </div>

        <Button
          variant="contained"
          sx={styles.generalSingleBtn}
          onClick={handlePostToDB}
        >
          {" "}
          Continue & Get Quotes
        </Button>
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
                <Typography>Vehicle</Typography>
              </Box>
              <Box sx={styles.summaryDataContainer}>
                <Button onClick={() => handleEditClick(allSteps.yearStep)}>
                  Edit
                </Button>
                <Typography>
                  {car1_year + " " + car1_make + " " + car1_model}
                </Typography>
              </Box>
            </Box>
            <Box sx={styles.summaryContainer}>
              <Box sx={styles.summaryTitleContainer}>
                <Typography>Name</Typography>
              </Box>
              <Box sx={styles.summaryDataContainer}>
                <Button onClick={() => handleEditClick(allSteps.nameStep)}>
                  Edit
                </Button>
                <Typography>{driver1_name}</Typography>
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
                <Typography>{driver1_DOB}</Typography>
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
                <Typography>{driver1_gender}</Typography>
              </Box>
            </Box>
            <Box sx={styles.summaryContainer}>
              <Box sx={styles.summaryTitleContainer}>
                <Typography>Married</Typography>
              </Box>
              <Box sx={styles.summaryDataContainer}>
                <Button onClick={() => handleEditClick(allSteps.marriedStep)}>
                  Edit
                </Button>
                <Typography>{summaryData.Driver1.Married}</Typography>
              </Box>
            </Box>
            <Box sx={styles.summaryContainer}>
              <Box sx={styles.summaryTitleContainer}>
                <Typography>Accident</Typography>
              </Box>
              <Box sx={styles.summaryDataContainer}>
                <Button onClick={() => handleEditClick(allSteps.accidentStep)}>
                  Edit
                </Button>
                <Typography>{summaryData.Driver1.AtFaultAccident}</Typography>
              </Box>
            </Box>
            <Box sx={styles.summaryContainer}>
              <Box sx={styles.summaryTitleContainer}>
                <Typography>DUI</Typography>
              </Box>
              <Box sx={styles.summaryDataContainer}>
                <Button onClick={() => handleEditClick(allSteps.duiStep)}>
                  Edit
                </Button>
                <Typography>{summaryData.Driver1.DUI}</Typography>
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
            <Box sx={styles.summaryContainer}>
              <Box sx={styles.summaryTitleContainer}>
                <Typography>Home Owner</Typography>
              </Box>
              <Box sx={styles.summaryDataContainer}>
                <Button onClick={() => handleEditClick(allSteps.homeOwnerStep)}>
                  Edit
                </Button>
                <Typography>{summaryData.HomeOwner}</Typography>
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
          </AccordionDetails>
        </Accordion>
      </div>

      {/* {summaryData.map((item, key) => {
   //(item)
   return <Typography>{item}</Typography>
 })} */}
    </Container>
  )
}
