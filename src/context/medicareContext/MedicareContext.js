import React, { createContext, useContext, useReducer, useEffect } from "react";

import { medicareReducer } from "./medicareReducer";
// import { allSteps } from "../../util/allSteps"
import axios from "axios";

import {
  SET_ADDRESS,
  SET_EMAIL,
  SET_PHONE,
  SET_DOB,
  SET_GENDER,
  SET_NAME,
  SET_JORNAYA_MEDICARE,
  SET_CLIENT_MEDICARE,
  SET_IS_INSURED,
  SET_INSURANCE_NAME,
  SET_INSURANCE_PS,
} from "./medicareActions";

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
} from "@mui/material"
import { useAppContext } from "../appContext/AppContext";

export const MedicareContext = createContext();
const initialState = {
  DOB: null,
  gender: null,
  is_insured: null,
  insurancePrivateSecondary: null,
  insurance_name: null,
  name: null,
  fname: null,
  lname: null,
  address: null,
  email: null,
  phone: null,
  jornayaID: null,
  clientIP: null,
  zip: null,
  city: null,
  unit: null,
};
export const useMedicareContext = () => useContext(MedicareContext);

export default function MedicareContextProvider({ children }) {
  // const { clientIP, jornayaID } = useAppContext()
  const [state, dispatch] = useReducer(medicareReducer, initialState);

  useEffect(() => {
    //("The State in Medicare Context is ", state)
  }, [state]);

  function setJornayaMedicare(id) {
    //("Sending dispatch for  setJornayaMedicare", id)
    dispatch({
      type: SET_JORNAYA_MEDICARE,
      payload: id,
    });
  }

  function setClientMedicare(ip) {
    //("Sending dispatch for  setJornayaMedicare", ip)
    dispatch({
      type: SET_CLIENT_MEDICARE,
      payload: ip,
    });
  }

  function runServices() {
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
     

    return axios
      .get("https://api.ipify.org?format=json")
      .then((res) => {
        //("Country is", res.data.location.country)
        if (res.data.ip) {
          setClientMedicare(res.data.ip);
         setJornayaMedicare(window?.LeadiD?.token);

          return true;
        } else {
          //(
          //   "User not from USA, user is from",
          //   res.data.location.country
          // )
          return false;
        }
      })
      .catch((err) => {
        return err;
        //("This Error occured while getting IP,", err)
      });

    // return axios
    //   .get(
    //     "https://geo.ipify.org/api/v2/country?apiKey=at_h14bZJsy6pqVmHSR6S0R0Rkx4AuQx"
    //   )
    //   .then((res) => {
    //     //("Country is", res.data.location.country)
    //     if (res.data.location.country === "US") {
    //       setClientMedicare(res.data.ip)

    //       setJornayaMedicare(combined)

    //       return true
    //     } else {
    //       //(
    //       //   "User not from USA, user is from",
    //       //   res.data.location.country
    //       // )
    //       return false
    //     }
    //   })
    //   .catch((err) => {
    //     return err
    //     //("This Error occured while getting IP,", err)
    //   })
  }

  function setDOB(dob) {
    dispatch({
      type: SET_DOB,
      payload: dob,
    });
  }

  function setGender(gender) {
    dispatch({
      type: SET_GENDER,
      payload: gender,
    });
  }
  function setIsInsured(insured) {
    //("Sending dispatch for IS INSURED? ", insured)
    dispatch({
      type: SET_IS_INSURED,
      payload: insured,
    });
  }
  function setInsurancePS(insurance_ps) {
    dispatch({
      type: SET_INSURANCE_PS,
      payload: insurance_ps,
    });
  }
  function setInsuranceName(insurance_name) {
    dispatch({
      type: SET_INSURANCE_NAME,
      payload: insurance_name,
    });
  }

  function setName(fname, lname) {
    dispatch({
      type: SET_NAME,
      payload: { fname, lname },
    });
  }

  function setAddress(address, unit, city, stateInitial, zip) {
    dispatch({
      type: SET_ADDRESS,
      payload: { address, unit, city, stateInitial, zip },
    });
  }
  function setEmail(email) {
    dispatch({
      type: SET_EMAIL,
      payload: email,
    });
  }
  function setPhone(phone) {
    dispatch({
      type: SET_PHONE,
      payload: phone,
    });
  }

  // function setUser() {}

  const value = {
    setDOB,
    setGender,
    setName,
    setAddress,
    setEmail,
    setPhone,
    setJornayaMedicare,
    setClientMedicare,
    runServices,
    setIsInsured,
    setInsurancePS,
    setInsuranceName,
    is_insured: state.is_insured,
    insurance_name: state.insurance_name,
    insurancePrivateSecondary: state.insurancePrivateSecondary,
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
    stateInitial: state.stateInitial,
    zip: state.zip,
    city: state.city,
    unit: state.unit,
  };

  
  return (
    <MedicareContext.Provider value={value}>
      {children}
      
          </MedicareContext.Provider>
  );
}
