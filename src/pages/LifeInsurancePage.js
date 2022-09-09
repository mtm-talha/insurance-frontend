import React, { useState, createContext, useContext, useEffect } from "react"
// import { AutoContext } from "../context/autoContext/AutoContext"
import { useAppContext } from "../context/appContext/AppContext"
import { useNavigate } from "react-router-dom"

import {
  Address,
  Dob,
  Email,
  Gender,
  Married,
  Name,
  Phone,
  LifeInsuranceSummary,
  Height,
  Weight,
  Tobacco,
  IsHealthCondition,
  HealthCondition,
  CoverageTime,
  CoverageAmount,
  LifeInsured,
  LivePrevInsureName,
} from "../components/LifeInsuranceSpecific"

import { allSteps } from "../util/allSteps"
import { SET_MODULE_LIFE } from "../context/appContext/appActions"
import { CircularProgress } from "@mui/material"

const LifeInsurancePage = () => {
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

  useEffect(() => {
    setActiveModule(SET_MODULE_LIFE)
  }, [])

  useEffect(() => {
    //("The Current Step is:", step)
  }, [])
  useEffect(()=>{
    const script = document.createElement('script');
    script.id = 'LeadiDscript_campaign';
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.crossorigin = 'anonymous';
    script.src = `https://create.lidstatic.com/campaign/9c55aa3a-cce3-9e18-de5d-188014425fe3.js?snippet_version=2`;
    document.body.appendChild(script);
  },[])
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

    case allSteps.currentInsuredStep:
      return <LifeInsured />
    case allSteps.prevInsureNameStep:
      return <LivePrevInsureName />

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
          <LifeInsuranceSummary />
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
    case allSteps.marriedStep:
      return (
        <div>
          <Married />
        </div>
      )
    case allSteps.heightStep:
      return (
        <div>
          <Height />
        </div>
      )
    case allSteps.weightStep:
      return (
        <div>
          <Weight />
        </div>
      )
    case allSteps.tobaccoStep:
      return (
        <div>
          <Tobacco />
        </div>
      )
    case allSteps.isHealthConditionStep:
      return (
        <div>
          <IsHealthCondition />
        </div>
      )
    case allSteps.selectHealthConditionStep:
      return (
        <div>
          <HealthCondition />
        </div>
      )
    case allSteps.coverageTimeStep:
      return (
        <div>
          <CoverageTime />
        </div>
      )
    case allSteps.coverageAmountStep:
      return (
        <div>
          <CoverageAmount />
        </div>
      )
  }
}

export default LifeInsurancePage
