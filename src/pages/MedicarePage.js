import React, { useState, createContext, useContext, useEffect } from "react"
// import { AutoContext } from "../context/autoContext/AutoContext"
import { useAppContext } from "../context/appContext/AppContext"
import { useNavigate } from "react-router-dom"

import {
  Address,
  Dob,
  Email,
  Gender,
  Name,
  Phone,
  MedicareInsuranceType,
  MedicareInsuranceSummary,
  MedicarePrevInsureName,
  MedicareInsured,
} from "../components/MedicareInsuranceSpecific"

import { allSteps } from "../util/allSteps"
import { SET_MODULE_MEDICARE } from "../context/appContext/appActions"
import { CircularProgress } from "@mui/material"

const MedicarePage = () => {
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
    setActiveModule(SET_MODULE_MEDICARE)
  }, [])

  useEffect(()=>{
    const script = document.createElement('script');
    script.id = 'LeadiDscript_campaign';
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.crossorigin = 'anonymous';
    script.src = `https://create.lidstatic.com/campaign/5df7b9c8-4101-af29-b00d-ba3fb2493d5d.js?snippet_version=2`;
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
    case allSteps.currentInsuredStep:
      return <MedicareInsured />
    case allSteps.insuranceType:
      return <MedicareInsuranceType />
    case allSteps.prevInsureNameStep:
      return <MedicarePrevInsureName />
    case allSteps.summaryStep:
      return (
        <div>
          <MedicareInsuranceSummary />
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
  }
}

export default MedicarePage
