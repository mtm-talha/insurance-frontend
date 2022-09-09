import React, { createContext, useContext, useReducer } from "react"

import axios from "axios"
import { lifeReducer } from "./lifeReducer"
// import { allSteps } from "../../util/allSteps"

import {
  SET_ADDRESS,
  SET_EMAIL,
  SET_PHONE,
  SET_DOB,
  SET_GENDER,
  SET_NAME,
  SET_MARRIED,
  SET_HEIGHT,
  SET_WEIGHT,
  SET_TOBACCO,
  SET_IS_HEALTH_CONDITION,
  SET_HEALTH_CONDITION,
  SET_COVERAGE_TIME,
  SET_COVERAGE_AMOUNT,
  SET_JORNAYA_LIFE,
  SET_CLIENT_LIFE,
  SET_IS_INSURED,
  SET_INSURANCE_NAME,
} from "./lifeActions"

export const LifeContext = createContext()
const initialState = {
  DOB: null,
  gender: null,
  name: null,
  fname: null,
  lname: null,
  is_married: null,
  address: null,
  email: null,
  phone: null,
  height: null,
  weight: null,
  is_tobacco: null,
  is_health_condition: null,
  health_condition: [],
  coverage_time: null,
  coverage_amount: null,
  jornayaID: null,
  clientIP: null,
  stateInitial: null,
  zip: null,
  city: null,
  unit: null,
  is_insured: null,
  insurance_name: null,
}
export const useLifeContext = () => useContext(LifeContext)

export default function LifeContextProvider({ children }) {
  const [state, dispatch] = useReducer(lifeReducer, initialState)

  function setJornayaLife(id) {
    //("Sending dispatch for  setJornayaMedicare", id)
    dispatch({
      type: SET_JORNAYA_LIFE,
      payload: id,
    })
  }
  function setClientLife(ip) {
    //("Sending dispatch for  setJornayaMedicare", ip)
    dispatch({
      type: SET_CLIENT_LIFE,
      payload: ip,
    })
  }

  function setDOB(dob) {
    dispatch({
      type: SET_DOB,
      payload: dob,
    })
  }

  function setGender(gender) {
    dispatch({
      type: SET_GENDER,
      payload: gender,
    })
  }

  function setName(fname, lname) {
    dispatch({
      type: SET_NAME,
      payload: { fname, lname },
    })
  }
  function setMarried(isMarried) {
    dispatch({
      type: SET_MARRIED,
      payload: isMarried,
    })
  }

  function setAddress(address, unit, city, stateInitial, zip) {
    dispatch({
      type: SET_ADDRESS,
      payload: { address, unit, city, stateInitial, zip },
    })
  }
  function setEmail(email) {
    dispatch({
      type: SET_EMAIL,
      payload: email,
    })
  }
  function setPhone(phone) {
    dispatch({
      type: SET_PHONE,
      payload: phone,
    })
  }
  function setHeight(height) {
    dispatch({
      type: SET_HEIGHT,
      payload: height,
    })
  }
  function setWeight(weight) {
    dispatch({
      type: SET_WEIGHT,
      payload: weight,
    })
  }
  function setIsTobacco(isTobacco) {
    dispatch({
      type: SET_TOBACCO,
      payload: isTobacco,
    })
  }
  function setIsHealthCondition(isHealthCondition) {
    dispatch({
      type: SET_IS_HEALTH_CONDITION,
      payload: isHealthCondition,
    })
  }
  function setHealthCondition(healthCondition) {
    dispatch({
      type: SET_HEALTH_CONDITION,
      payload: healthCondition,
    })
  }
  function setCoverageTime(coverageTime) {
    dispatch({
      type: SET_COVERAGE_TIME,
      payload: coverageTime,
    })
  }
  function setCoverageAmount(coverageAmount) {
    dispatch({
      type: SET_COVERAGE_AMOUNT,
      payload: coverageAmount,
    })
  }
  function runServices() {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    let firstPart = ""
    let secondPart = ""
    let thirdPart = ""
    let fourthPart = ""
    let fifthPart = ""
    let combined = ""

    for (let i = 0; i <= 7; i++) {
      firstPart += characters.charAt(Math.floor(Math.random() * 36))
    }
    for (let i = 0; i <= 3; i++) {
      secondPart += characters.charAt(Math.floor(Math.random() * 36))
    }
    for (let i = 0; i <= 3; i++) {
      thirdPart += characters.charAt(Math.floor(Math.random() * 36))
    }
    for (let i = 0; i <= 3; i++) {
      fourthPart += characters.charAt(Math.floor(Math.random() * 36))
    }
    for (let i = 0; i <= 11; i++) {
      fifthPart += characters.charAt(Math.floor(Math.random() * 36))
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
      fifthPart

      const script = document.createElement('script');
      script.id = 'LeadiDscript_campaign';
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.crossorigin = 'anonymous';
      script.src = `https://create.lidstatic.com/campaign/9c55aa3a-cce3-9e18-de5d-188014425fe3.js?snippet_version=2`;
      document.body.appendChild(script);
    return axios
      .get(
        "https://api.ipify.org?format=json"
      )
      .then((res) => {
        //("Country is", res.data.location.country)
        // if (res.data.location.country === "US") {
          if (res.data.ip) {
        setClientLife(res.data.ip)

          setJornayaLife(window?.LeadiD?.token)

          return true
        } else {
          //(
          //   "User not from USA, user is from",
          //   res.data.location.country
          // )
          return false
        }
      })
      .catch((err) => {
        return err
        //("This Error occured while getting IP,", err)
      })
  }
  function setIsInsured(insured) {
    //("Sending dispatch for IS INSURED? ", insured)
    dispatch({
      type: SET_IS_INSURED,
      payload: insured,
    })
  }
  function setInsuranceName(insurance_name) {
    dispatch({
      type: SET_INSURANCE_NAME,
      payload: insurance_name,
    })
  }

  // function setUser() {}

  const value = {
    setDOB,
    setGender,
    setName,
    setAddress,
    setEmail,
    setPhone,
    setHeight,
    setWeight,
    setIsTobacco,
    setIsHealthCondition,
    setHealthCondition,
    setCoverageTime,
    setCoverageAmount,
    setMarried,
    setJornayaLife,
    setClientLife,
    runServices,
    is_insured: state.is_insured,
    setIsInsured,
    insurance_name: state.insurance_name,
    setInsuranceName,
    clientIP: state.clientIP,
    jornayaID: state.jornayaID,
    DOB: state.DOB,
    gender: state.gender,
    name: state.name,
    fname: state.fname,
    lname: state.lname,
    address: state.address,
    email: state.email,
    phone: state.phone,
    height: state.height,
    weight: state.weight,
    is_tobacco: state.is_tobacco,
    is_health_condition: state.is_health_condition,
    health_condition: state.health_condition,
    coverage_time: state.coverage_time,
    coverage_amount: state.coverage_amount,
    is_married: state.is_married,
    stateInitial: state.stateInitial,
    zip: state.zip,
    city: state.city,
    unit: state.unit,
  }
  return <LifeContext.Provider value={value}>{children}</LifeContext.Provider>
}
