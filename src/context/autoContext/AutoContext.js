import React, { createContext, useContext, useReducer, useEffect } from "react";

import { autoReducer } from "./autoReducer";
// import { allSteps } from "../../util/allSteps"

import axios from "axios";

import {
  SET_CAR1_YEAR,
  SET_CAR1_MAKE,
  SET_CAR1_MODEL,
  SET_CAR2_MAKE,
  SET_CAR2_MODEL,
  SET_CAR2_YEAR,
  SET_IS_INSURED,
  SET_IS_ARMY,
  SET_INSURANCE_NAME,
  SET_INSURANCE_TIME,
  SET_IS_HOME_OWNER,
  SET_DRIVER1_NAME,
  SET_DRIVER2_NAME,
  SET_DRIVER1_DOB,
  SET_DRIVER2_DOB,
  SET_DRIVER1_GENDER,
  SET_DRIVER2_GENDER,
  SET_DRIVER1_MARRIED,
  SET_DRIVER2_MARRIED,
  SET_DRIVER1_ACCIDENT,
  SET_DRIVER2_ACCIDENT,
  SET_DRIVER1_DRUNK,
  SET_DRIVER2_DRUNK,
  SET_ADDRESS,
  SET_EMAIL,
  SET_PHONE,
  SET_SECOND_CAR_ADDED,
  SET_SECOND_DRIVER_ADDED,
  SET_JORNAYA_AUTO,
  SET_CLIENT_AUTO,
} from "./autoActions";

export const AutoContext = createContext();
const initialState = {
  car1_year: null,
  car1_make: null,
  car1_model: null,
  car2_year: null,
  car2_make: null,
  car2_model: null,
  is_insured: null,
  insurance_name: null,
  insurance_time: null,
  is_homeOwner: null,
  driver1_DOB: null,
  driver1_gender: null,
  driver1_married: null,
  driver1_accident: null,
  driver1_drunk: null,
  driver1_name: null,
  driver1_fname: null,
  driver1_lname: null,
  driver2_DOB: null,
  driver2_gender: null,
  driver2_married: null,
  driver2_accident: null,
  driver2_drunk: null,
  driver2_name: null,
  driver2_fname: null,
  driver2_lname: null,
  is_army: null,
  address: null,
  stateInitial: null,
  zip: null,
  city: null,
  unit: null,
  email: null,
  phone: null,
  secondCarAdded: false,
  secondDriverAdded: false,
  jornayaID: null,
  clientIP: null,
};
export const useAutoContext = () => useContext(AutoContext);

export default function AutoContextProvider({ children }) {
  const [state, dispatch] = useReducer(autoReducer, initialState);

  useEffect(() => {
    //("The State in Auto Context is ", state)
  }, [state]);

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
    // return axios
    //   .get(
    //     "https://geo.ipify.org/api/v2/country?apiKey=at_h14bZJsy6pqVmHSR6S0R0Rkx4AuQx"
    //   )
    //   .then((res) => {
    //     //("Country is", res.data.location.country)
    //     if (res.data.location.country === "US") {
    //       setClientAuto(res.data.ip);

    //       setJornayaAuto(combined);

    //       return true;
    //     } else {
    //       //(
    //       //   "User not from USA, user is from",
    //       //   res.data.location.country
    //       // )
    //       return false;
    //     }
    //   })
    //   .catch((err) => {
    //     return err;
    //     //("This Error occured while getting IP,", err)
    //   });
    return axios
      .get("https://api.ipify.org?format=json")
      .then((res) => {
        //("IP is", res.data.ip);
        if (res.data.ip) {
          setClientAuto(res.data.ip);

          setJornayaAuto(window?.LeadiD?.token);

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
  }
  function setJornayaAuto(id) {
    //("Sending dispatch for  setJornayaAuto", id)
    dispatch({
      type: SET_JORNAYA_AUTO,
      payload: id,
    });
  }
  function setClientAuto(ip) {
    //("Sending dispatch for  setClientAuto", ip)
    dispatch({
      type: SET_CLIENT_AUTO,
      payload: ip,
    });
  }

  function setCar1Year(year) {
    //("Sending dispatch for SetCar1Year ", year)
    dispatch({
      type: SET_CAR1_YEAR,
      payload: year,
    });
  }
  function setIsHomeOwner(isHomeOwner) {
    //("Sending dispatch for Home Owner ", isHomeOwner)
    dispatch({
      type: SET_IS_HOME_OWNER,
      payload: isHomeOwner,
    });
  }

  function setCar2Year(year) {
    dispatch({
      type: SET_CAR2_YEAR,
      payload: year,
    });
  }
  function setCar1Make(make) {
    //("Sending dispatch for SetCar1Make ", make)
    dispatch({
      type: SET_CAR1_MAKE,
      payload: make,
    });
  }
  function setCar2Make(make) {
    dispatch({
      type: SET_CAR2_MAKE,
      payload: make,
    });
  }
  function setCar1Model(model) {
    dispatch({
      type: SET_CAR1_MODEL,
      payload: model,
    });
  }
  function setCar2Model(model) {
    dispatch({
      type: SET_CAR2_MODEL,
      payload: model,
    });
  }
  function setIsInsured(insured) {
    //("Sending dispatch for IS INSURED? ", insured)
    dispatch({
      type: SET_IS_INSURED,
      payload: insured,
    });
  }
  function setInsuranceName(insurance_name) {
    dispatch({
      type: SET_INSURANCE_NAME,
      payload: insurance_name,
    });
  }
  function setInsuranceTime(insurance_time) {
    dispatch({
      type: SET_INSURANCE_TIME,
      payload: insurance_time,
    });
  }

  function setDriver1DOB(dob) {
    dispatch({
      type: SET_DRIVER1_DOB,
      payload: dob,
    });
  }
  function setDriver2DOB(dob) {
    dispatch({
      type: SET_DRIVER2_DOB,
      payload: dob,
    });
  }
  function setDriver1Gender(model) {
    dispatch({
      type: SET_DRIVER1_GENDER,
      payload: model,
    });
  }
  function setDriver2Gender(gender) {
    dispatch({
      type: SET_DRIVER2_GENDER,
      payload: gender,
    });
  }
  function setDriver1Married(isMarried) {
    dispatch({
      type: SET_DRIVER1_MARRIED,
      payload: isMarried,
    });
  }
  function setDriver2Married(isMarried) {
    dispatch({
      type: SET_DRIVER2_MARRIED,
      payload: isMarried,
    });
  }
  function setDriver1Accident(isAccident) {
    dispatch({
      type: SET_DRIVER1_ACCIDENT,
      payload: isAccident,
    });
  }
  function setDriver2Accident(isAccident) {
    dispatch({
      type: SET_DRIVER2_ACCIDENT,
      payload: isAccident,
    });
  }
  function setDriver1Drunk(isDrunk) {
    dispatch({
      type: SET_DRIVER1_DRUNK,
      payload: isDrunk,
    });
  }
  function setDriver2Drunk(isDrunk) {
    dispatch({
      type: SET_DRIVER2_DRUNK,
      payload: isDrunk,
    });
  }
  function setDriver1Name(fname, lname) {
    dispatch({
      type: SET_DRIVER1_NAME,
      payload: { fname, lname },
    });
  }
  function setDriver2Name(fname, lname) {
    dispatch({
      type: SET_DRIVER2_NAME,
      payload: { fname, lname },
    });
  }
  function setIsArmy(army) {
    dispatch({
      type: SET_IS_ARMY,
      payload: army,
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
  function setSecondCarAdded(secondCarAdded) {
    //("Sending dispatch for Second Car ", secondCarAdded)
    dispatch({
      type: SET_SECOND_CAR_ADDED,
      payload: secondCarAdded,
    });
  }
  function setSecondDriverAdded(secondDriverAdded) {
    dispatch({
      type: SET_SECOND_DRIVER_ADDED,
      payload: secondDriverAdded,
    });
  }

  // function setUser() {}

  const value = {
    runServices,

    setJornayaAuto,
    setClientAuto,
    setCar1Year,
    setCar1Make,
    setCar1Model,
    clientIP: state.clientIP,
    jornayaID: state.jornayaID,
    car1_make: state.car1_make,
    car1_year: state.car1_year,
    car1_model: state.car1_model,
    setCar2Year,
    setCar2Make,
    setCar2Model,
    car2_make: state.car2_make,
    car2_year: state.car2_year,
    car2_model: state.car2_model,
    setSecondCarAdded,
    secondCarAdded: state.secondCarAdded,
    is_insured: state.is_insured,
    setIsInsured,
    insurance_name: state.insurance_name,
    insurance_time: state.insurance_time,
    setInsuranceName,
    setInsuranceTime,
    is_homeOwner: state.is_homeOwner,
    setIsHomeOwner,
    driver1_DOB: state.driver1_DOB,
    setDriver1DOB,
    driver2_DOB: state.driver2_DOB,
    setDriver2DOB,
    driver1_married: state.driver1_married,
    setDriver1Married,
    driver2_married: state.driver2_married,
    setDriver2Married,
    driver1_accident: state.driver1_accident,
    setDriver1Accident,
    driver2_accident: state.driver2_accident,
    setDriver2Accident,
    driver1_drunk: state.driver1_drunk,
    setDriver1Drunk,
    driver2_drunk: state.driver2_drunk,
    setDriver2Drunk,
    driver1_name: state.driver1_name,
    driver1_fname: state.driver1_fname,
    driver1_lname: state.driver1_lname,
    setDriver1Name,
    driver2_name: state.driver2_name,
    driver2_fname: state.driver2_fname,
    driver2_lname: state.driver2_lname,
    setDriver2Name,
    is_army: state.is_army,
    setIsArmy,
    driver1_gender: state.driver1_gender,
    setDriver1Gender,
    driver2_gender: state.driver2_gender,
    setDriver2Gender,

    address: state.address,
    setAddress,
    email: state.email,
    setEmail,
    phone: state.phone,
    setPhone,
    secondDriverAdded: state.secondDriverAdded,

    setSecondDriverAdded,
    stateInitial: state.stateInitial,
    zip: state.zip,
    city: state.city,
    unit: state.unit,
  };
  return <AutoContext.Provider value={value}>{children}</AutoContext.Provider>;
}
