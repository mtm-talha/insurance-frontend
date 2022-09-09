import React, { useState, useEffect } from "react"
// import { AutoContext } from "../context/autoContext/AutoContext"
import { useAppContext } from "../context/appContext/AppContext"
import { useNavigate } from "react-router-dom"

import CircularProgress from "@mui/material/CircularProgress"

import {
  AutoAccident,
  AutoDUI,
  AutoHomeOwner,
  AutoInsured,
  AutoMake,
  AutoMilitary,
  AutoModel,
  AutoPrevInsureName,
  AutoRepeatDriver,
  AutoRepeatVehicle,
  AutoTimeWithComp,
  AutoYear,
  Address,
  Dob,
  Email,
  Gender,
  Married,
  Name,
  Phone,
  AutoInsuranceSummary,
} from "../components/AutoInsuranceSpecific"

import { allSteps } from "../util/allSteps"
import { SET_MODULE_AUTO } from "../context/appContext/appActions"

const AutoInsurancePage = (props) => {
  const { step, setActiveModule } = useAppContext()
  const [finishStatus, setfinishStatus] = useState(false)
  const navigate = useNavigate()

  const onBackButtonEvent = (e) => {
    e.preventDefault()
    if (!finishStatus) {
      if (window.confirm("Do you want to go back ?")) {
        //("Going Back to home")
        setfinishStatus(true)
        // your logic
        navigate("/")
      } else {
        window.history.pushState(null, null, window.location.pathname)
        setfinishStatus(false)
      }
    }
  }
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname)
    window.addEventListener("popstate", onBackButtonEvent)
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent)
    }
  }, [])

  useEffect(()=>{
    const script = document.createElement('script');
    script.id = 'LeadiDscript_campaign';
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.crossorigin = 'anonymous';
    script.src = `https://create.lidstatic.com/campaign/f90794ac-e5fc-032d-c2c1-9b811c8fc20c.js?snippet_version=2`;
    document.body.appendChild(script);
  },[])
  useEffect(() => {
    setActiveModule(SET_MODULE_AUTO)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  switch (step) {
    default:
      return (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress style={{ color: "#000e31" }} />
        </div>
      )
    case allSteps.addressStep:
      return (
        <div>
          <Address />
        </div>
      )
    case allSteps.dobStep:
      return (
        <div>
          <Dob />
        </div>
      )
    case allSteps.summaryStep:
      return (
        <div>
          <AutoInsuranceSummary />
        </div>
      )
    case allSteps.emailStep:
      return (
        <div>
          <Email />
        </div>
      )
    case allSteps.genderStep:
      return (
        <div>
          <Gender />
        </div>
      )
    case allSteps.marriedStep:
      return (
        <div>
          <Married />
        </div>
      )
    case allSteps.nameStep:
      return (
        <div>
          <Name />
        </div>
      )
    case allSteps.phoneStep:
      return (
        <div>
          <Phone />
        </div>
      )
    case allSteps.accidentStep:
      return (
        <div>
          <AutoAccident />
        </div>
      )
    case allSteps.currentInsuredStep:
      return (
        <div>
          <AutoInsured />
        </div>
      )
    case allSteps.duiStep:
      return (
        <div>
          <AutoDUI />
        </div>
      )
    case allSteps.homeOwnerStep:
      return (
        <div>
          <AutoHomeOwner />
        </div>
      )
    case allSteps.makeStep:
      return (
        <div>
          <AutoMake />
        </div>
      )
    case allSteps.militaryStep:
      return (
        <div>
          <AutoMilitary />
        </div>
      )
    case allSteps.modelStep:
      return (
        <div>
          <AutoModel />
        </div>
      )
    case allSteps.prevInsureNameStep:
      return (
        <div>
          <AutoPrevInsureName />
        </div>
      )
    case allSteps.prevInsureTimeStep:
      return (
        <div>
          <AutoTimeWithComp />
        </div>
      )
    case allSteps.repeatDriverStep:
      return (
        <div>
          <AutoRepeatDriver />
        </div>
      )
    case allSteps.repeatVehicleStep:
      return (
        <div>
          <AutoRepeatVehicle />
        </div>
      )
    case allSteps.yearStep:
      return (
        <div>
          <AutoYear />
        </div>
      )
  }
}

export default AutoInsurancePage
