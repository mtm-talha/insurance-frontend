import React, { useEffect, Suspense, lazy } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import AboutUsPage from "../pages/AboutUsPage"
import CircularProgress from "@mui/material/CircularProgress"
import HomePage from "../pages/HomePage"
import LifeInsurancePage from "../pages/LifeInsurancePage"
import MedicarePage from "../pages/MedicarePage"
import NavbarComponent from "../components/NavbarComponent"
import ProgressBar from "../components/ProgressBarCustom"
import AutoInsurancePage from "../pages/AutoInsurancePage"
import Footer from "../pages/Footer"
// import MedicareContextProvider from "../context/medicareContext/MedicareContext"

import AutoContextProvider from "../context/autoContext/AutoContext"
import MedicareContextProvider from "../context/medicareContext/MedicareContext"
import LifeContextProvider from "../context/lifeContext/LifeContext"

import MedicareQuotesPage from "../pages/MedicareQuotesPage"
import AutoQuotesPage from "../pages/AutoQuotesPage"
import LifeQuotesPage from "../pages/LifeQuotesPage"
import { useAppContext } from "../context/appContext/AppContext"

import {
  SET_MODULE_HOMEPAGE,
  SET_MODULE_ADMIN_PANEL,
} from "../context/appContext/appActions"
import TermsOfUsePage from "../pages/TermsOfUsePage"
import DoNotSellPage from "../pages/DoNotSellPage"
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage"
import { AnimatePresence } from "framer-motion/dist/framer-motion"
import HomeFooter from "../components/HomeFooter"
import ErrorPage from "../pages/ErrorPage"
import LoginPage from "../pages/LoginPage"
import AdminPanelPage from "../pages/AdminPanelPage"

const AppRouter = () => {
  const { activeModule, getStarted, setGetStarted } = useAppContext()
  // const HomePage = lazy(() => import("../pages/HomePage"))

  // //("Active Module in APP ROUTER:", activeModule)
  useEffect(() => {
    //("Active Module in APP ROUTER:", activeModule)
    //("Get started in App router", getStarted)
    //("The COOKIE IS,", window.sessionStorage.getItem("getStarted"))
    if (window.sessionStorage.getItem("getStarted") === "true") {
      //("Same session")
      setGetStarted(true)
    } else {
      //("Not same session")
      setGetStarted(false)
    }
  }, [])

  return (
    <AnimatePresence>
      <Router>
        <Suspense
          fallback={
            <div>
              <CircularProgress />
            </div>
          }
        >
          {getStarted === true && activeModule !== SET_MODULE_ADMIN_PANEL ? (
            <NavbarComponent />
          ) : null}

          {activeModule === SET_MODULE_HOMEPAGE ? null : activeModule ===
            SET_MODULE_ADMIN_PANEL ? null : (
            <ProgressBar />
          )}
          <Routes>
            {/* <Route exact path={["/", "homepage"]} component={HomePage} /> */}
            <Route
              exact
              path="/"
              element={
                <>
                  <HomePage /> <HomeFooter />
                </>
              }
            />
            <Route
              exact
              path="error-page"
              element={
                <>
                  <ErrorPage />
                </>
              }
            />
            <Route
              exact
              path="login"
              element={
                <>
                  <LoginPage />
                </>
              }
            />
            <Route
              exact
              path="admin-panel"
              element={
                <>
                  <AdminProtectedRoute>
                    <AdminPanelPage />
                  </AdminProtectedRoute>
                </>
              }
            />

            <Route
              exact
              path="about-us"
              element={
                <>
                  <AboutUsPage /> <HomeFooter />
                </>
              }
            />
            <Route
              exact
              path="contact-us"
              element={
                <>
                  <AboutUsPage /> <HomeFooter />
                </>
              }
            />
            <Route exact path="terms-of-use" element={<TermsOfUsePage />} />
            <Route exact path="ccpa-opt-out" element={<DoNotSellPage />} />
            <Route
              exact
              path="privacy-policy"
              element={<PrivacyPolicyPage />}
            />

            <Route
              exact
              path="auto-insurance"
              element={
                <AutoContextProvider>
                  <AutoInsurancePage />
                  <Footer />
                </AutoContextProvider>
              }
            />

            <Route
              exact
              path="life-insurance"
              element={
                <LifeContextProvider>
                  <LifeInsurancePage />
                  <Footer />
                </LifeContextProvider>
              }
            />

            <Route
              exact
              path="medicare"
              element={
                <MedicareContextProvider>
                  <MedicarePage />
                  <Footer />
                </MedicareContextProvider>
              }
            />
            <Route
              path="get-medicare-quotes"
              element={
                // Good! Do your composition here instead of wrapping <Route>.
                // This is really just inverting the wrapping, but it's a lot
                // more clear which components expect which props.

                <MedicareContextProvider>
                  <ProtectedRoute>
                    <MedicareQuotesPage />
                  </ProtectedRoute>
                </MedicareContextProvider>
              }
            />

            <Route
              exact
              path="get-auto-quotes"
              element={
                <AutoContextProvider>
                  <ProtectedRoute>
                    <AutoQuotesPage />
                  </ProtectedRoute>
                </AutoContextProvider>
              }
            />
            <Route
              exact
              path="get-life-quotes"
              element={
                <LifeContextProvider>
                  <ProtectedRoute>
                    <LifeQuotesPage />
                  </ProtectedRoute>
                </LifeContextProvider>
              }
            />
          </Routes>
        </Suspense>

        {/* {activeModule === SET_MODULE_AUTO ||
        activeModule === SET_MODULE_LIFE ||
        activeModule === SET_MODULE_MEDICARE ? (
          <Footer />
        ) : null} */}
      </Router>
    </AnimatePresence>
  )
}
function ProtectedRoute({ children }) {
  const { readyToPost } = useAppContext()

  if (readyToPost) {
    //("Ready to post is true")
    return children
  } else {
    //("Ready to post is FALSE")
    return <Navigate to="/" />

    // return (
    //   <>
    //     <BasicAlerts messageToShow="This is a protected route! Please complete the steps. Redirecting to Home Page" />
    //     {() => {
    //       const timeout = setTimeout(
    //         () => <Navigate to="/" />,

    //         3000
    //       )
    //       return () => clearTimeout(timeout)
    //     }}
    //   </>
    // )
  }
}
function AdminProtectedRoute({ children }) {
  // if (adminAccess) {
  if (window.sessionStorage.getItem("authAccess") === "true") {
    //("Cookie is ", window.sessionStorage.getItem("authAccess"))

    return children
  } else {
    //("Cookie is ", window.sessionStorage.getItem("authAccess"))
    return <Navigate to="/" />

    // return (
    //   <>
    //     <BasicAlerts messageToShow="This is a protected route! Please complete the steps. Redirecting to Home Page" />
    //     {() => {
    //       const timeout = setTimeout(
    //         () => <Navigate to="/" />,

    //         3000
    //       )
    //       return () => clearTimeout(timeout)
    //     }}
    //   </>
    // )
  }
}
export default AppRouter
