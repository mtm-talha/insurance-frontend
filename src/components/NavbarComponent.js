import React, { useState, useEffect } from "react"
import { Navbar, Container, Offcanvas, Nav, Button } from "react-bootstrap"
import { useAppContext } from "../context/appContext/AppContext"
import {
  SET_MODULE_LIFE,
  SET_MODULE_AUTO,
  SET_MODULE_MEDICARE,
  SET_MODULE_HOMEPAGE,
} from "../context/appContext/appActions"
import { NavLink } from "react-router-dom"

import { Typography, Box } from "@mui/material"
import "./NavbarComponent.css"
import blueLogo from "../assets/blue-logo.PNG"
import { IoIosArrowBack } from "react-icons/io"
import { allSteps } from "../util/allSteps"
const NavbarComponent = () => {
  const [openDrawer, setOpenDrawer] = useState(false)

  const {
    setActiveModule,
    activeModule,
    prevStep,
    historyStack,
    totalSteps,
    isEditing,
    nextStep,
    setIsEditing,
  } = useAppContext()
  // useEffect(() => {
  //   //("Rerendering navbar")
  // }, [activeModule])
  function handleBackClick() {
    //("Calling page back from navbar")
    prevStep()
  }
  function handleFinishEditClick() {
    //("Setting is editing to false")
    setIsEditing(false)
    //("Going back to summary from navbar")
    nextStep(allSteps.summaryStep)
  }

  return activeModule === "SET_MODULE_HOMEPAGE" ? (
    <Navbar expand="md" style={styles.navContainer}>
      <Box style={styles.threeContainer} bg="white">
        <Box sx={styles.upperNav}>
          <Navbar.Brand href="/">
            <img
              style={styles.logo}
              src={blueLogo}
              alt="Advanced Ins. Online"
            />
          </Navbar.Brand>
          <Nav className="justify-content-end">
            <Box sx={styles.linksContainer}>
              <NavLink
                style={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
                sx={{ fontSize: { lg: 40, md: 20, sm: 15, xs: 10 } }}
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                style={styles.link}
                // sx={{ fontSize: { lg: 40, md: 20, sm: 15, xs: 10 } }}

                className="m-3"
                to="/auto-insurance"
                onClick={() => setOpenDrawer(false)}
              >
                Auto Insurance
              </NavLink>
              <NavLink
                style={styles.link}
                className="m-3"
                to="/medicare"
                onClick={() => setOpenDrawer(false)}
              >
                Medicare
              </NavLink>
              <NavLink
                style={styles.link}
                className="m-3"
                to="/life-insurance"
                onClick={() => setOpenDrawer(false)}
              >
                Life Insurance
              </NavLink>
              <NavLink
                style={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
                className="m-3"
                to="/about-us"
                onClick={() => setOpenDrawer(false)}
              >
                About Us
              </NavLink>
              <NavLink
                style={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
                className="m-3"
                to="/login"
                onClick={() => setOpenDrawer(false)}
              >
                Agent Login
              </NavLink>
              <Typography
                className="m-3"
                color="success"
                variant="h6"
                fontWeight="bold"
                sx={styles.phoneHome}
                textAlign="right "
              >
                844-658-4626
              </Typography>
            </Box>

            {/* <Link
            style={styles.link}
            className="m-3"
            to="health-insurance"
            onClick={() => setOpenDrawer(false)}
          >
            Health Insurance
          </Link> */}
          </Nav>
        </Box>
        <Box sx={styles.lowerNav}>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Navbar.Toggle
              style={{ backgroundColor: "white" }}
              aria-controls="offcanvasNavbar"
              onClick={() => setOpenDrawer(true)}
            />
            <Navbar.Brand href="/">
              <img
                style={styles.logo}
                src={blueLogo}
                alt="Advanced Ins. Online"
              />
            </Navbar.Brand>
          </Box>

          <Nav className="justify-content-end">
            <Box sx={styles.bottomLinksContainer}>
              <NavLink
                style={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
                sx={{ fontSize: { lg: 40, md: 20, sm: 15, xs: 10 } }}
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                style={styles.link}
                // sx={{ fontSize: { lg: 40, md: 20, sm: 15, xs: 10 } }}

                className="m-3"
                to="/auto-insurance"
                onClick={() => setOpenDrawer(false)}
              >
                Auto Insurance
              </NavLink>
              <NavLink
                style={styles.link}
                className="m-3"
                to="/medicare"
                onClick={() => setOpenDrawer(false)}
              >
                Medicare
              </NavLink>
              <NavLink
                style={styles.link}
                className="m-3"
                to="/life-insurance"
                onClick={() => setOpenDrawer(false)}
              >
                Life Insurance
              </NavLink>
              <NavLink
                style={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
                className="m-3"
                to="/about-us"
                onClick={() => setOpenDrawer(false)}
              >
                About Us
              </NavLink>
              <NavLink
                style={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
                className="m-3"
                to="/login"
                onClick={() => setOpenDrawer(false)}
              >
                Agent Login
              </NavLink>
              <Typography
                className="m-3"
                color="success"
                variant="h6"
                fontWeight="bold"
                sx={styles.phoneHome}
                textAlign="right "
              >
                844-658-4626
              </Typography>
            </Box>

            {/* <Link
            style={styles.link}
            className="m-3"
            to="health-insurance"
            onClick={() => setOpenDrawer(false)}
          >
            Health Insurance
          </Link> */}
          </Nav>
        </Box>

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          show={openDrawer}
          onHide={() => setOpenDrawer(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title classname="ml-3 " id="offcanvasNavbarLabel">
              <img
                style={styles.logo}
                src={blueLogo}
                alt="Advanced Ins. Online"
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 m-3">
              <NavLink
                style={({ isActive }) =>
                  isActive ? styles.activeLink : styles.canvasLinks
                }
                sx={{ fontSize: { lg: 40, md: 20, sm: 15, xs: 10 } }}
                to="/"
                className="m-3"
                onClick={() => {
                  setActiveModule(SET_MODULE_HOMEPAGE)
                  setOpenDrawer(false)
                }}
              >
                Home
              </NavLink>
              <NavLink
                style={styles.canvasLinks}
                to="/auto-insurance"
                className="m-3"
                onClick={() => {
                  setActiveModule(SET_MODULE_AUTO)
                  setOpenDrawer(false)
                }}
              >
                Auto Insurance
              </NavLink>
              <NavLink
                style={styles.canvasLinks}
                to="/medicare"
                className="m-3"
                onClick={() => {
                  setActiveModule(SET_MODULE_MEDICARE)
                  setOpenDrawer(false)
                }}
              >
                Medicare
              </NavLink>
              <NavLink
                style={styles.canvasLinks}
                className="m-3"
                to="/life-insurance"
                onClick={() => {
                  setActiveModule(SET_MODULE_LIFE)
                  setOpenDrawer(false)
                }}
              >
                Life Insurance
              </NavLink>
              {/* <NavLink
                style={styles.canvasLinks}
                className="m-3"
                to="/about-us"
                onClick={() => setOpenDrawer(false)}
              >
                About Us
              </NavLink> */}
              <NavLink
                style={({ isActive }) =>
                  isActive ? styles.activeLink : styles.canvasLinks
                }
                className="m-3"
                to="/about-us"
                onClick={() => setOpenDrawer(false)}
              >
                About Us
              </NavLink>
              <NavLink
                style={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
                className="m-3"
                to="/login"
                onClick={() => setOpenDrawer(false)}
              >
                Agent Login
              </NavLink>
              <Typography className="m-3" style={styles.canvasLinks}>
                844-658-4626
              </Typography>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Box>
    </Navbar>
  ) : activeModule === "SET_MODULE_ADMIN_PANEL" ? (
    <div>Admin Panel nav</div>
  ) : (
    <Navbar expand="lg" style={styles.navContainer}>
      <Container bg="white">
        <Navbar.Brand>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {historyStack.length > 1 && historyStack.length < totalSteps ? (
              <Button style={styles.backButton} onClick={handleBackClick}>
                <IoIosArrowBack fontSize={20} color="#000e31" />
              </Button>
            ) : null}
            {isEditing ? (
              <Button style={styles.backButton} onClick={handleFinishEditClick}>
                Finish Editing
              </Button>
            ) : null}
            <img
              style={styles.logo}
              src={blueLogo}
              alt="Advanced Ins. Online"
            />
          </div>
        </Navbar.Brand>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* <Link
            className="m-3 "
            style={styles.link}
            to="about-us"
            onClick={() => setOpenDrawer(false)}
          >
            About Us
          </Link> */}
          <Typography sx={styles.activeModuleText} className="m-3">
            {activeModule}
          </Typography>
          <Typography sx={styles.phone} className="m-3">
            844-658-4626
          </Typography>
        </div>
      </Container>

      <Container>{/* <ProgressBarCustom /> */}</Container>
    </Navbar>
  )
}
const styles = {
  logo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    maxWidth: 200,
    maxHeight: 100,
  },
  navContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#000e31",
    borderRadius: "0px 0px 10px 10px",
    width: "100%",
  },
  heading: {
    fontSize: { lg: 30, md: 20, sm: 22, xs: 18 },
    color: "white",
  },
  threeContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  upperNav: {
    display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
    flexDirection: "row",
    backgroundColor: "#000e31",
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
  },
  lowerNav: {
    display: { xs: "flex", sm: "flex", md: "none", lg: "none" },
    flexDirection: "column",
    backgroundColor: "#000e31",

    width: "100%",
  },
  linksContainer: {
    width: "fit-content",
    // display: { xs: "none", sm: "none", md: "none", lg: "none" },
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomLinksContainer: {
    width: "100%",
    // display: { xs: "none", sm: "none", md: "none", lg: "none" },
    display: { xs: "none", sm: "flex", md: "none", lg: "none" },
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    fontWeight: "600",
    fontSize: { lg: 40, md: 20, sm: 15, xs: 10 },
    // fontSize: "2vmin",
    color: "white",
  },
  activeLink: {
    textDecoration: "none",
    fontWeight: "600",
    fontSize: { lg: 40, md: 20, sm: 15, xs: 10 },
    color: "#1DD3F8",
  },
  canvasLinks: {
    textDecoration: "none",
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  phoneHome: {
    color: "#1DD3F8",
    fontSize: { lg: 30, md: 20, sm: 15, xs: 10 },

    display: { xs: "none", sm: "none", md: "block", lg: "block" },
    fontWeight: "bold",
  },
  phone: {
    color: "#1DD3F8",
    fontSize: { lg: 30, md: 20, sm: 15, xs: 10 },

    display: { xs: "none", sm: "none", md: "block", lg: "block" },
    fontWeight: "bold",
  },
  secondNav: {
    color: "grey",
  },
  activeModuleText: {
    color: "white",
    fontSize: { lg: 30, md: 20, sm: 15 },
    fontWeight: "bold",
  },
  backButton: {
    display: "flex",
    flexDirection: "row",
    marginRight: 5,
    backgroundColor: "white",
    color: "#000e31",
    // justifySelf: "flex-start",
    // alignSelf: "flex-start",
  },
}

export default NavbarComponent
