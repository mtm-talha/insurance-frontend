import React, { useState, useEffect } from "react"
import {
  Navbar,
  Container,
  Offcanvas,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap"

import { Link } from "react-router-dom"
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety"
import { Typography } from "@mui/material"
import "./NavbarComponent.css"

const NavbarComponent = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  return (
    <Navbar expand="lg" style={{ display: "flex", flexDirection: "column" }}>
      <Container bg="white">
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          onClick={() => setOpenDrawer(true)}
        />
        <Navbar.Brand href="#">
          <div
            className="m-3"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <HealthAndSafetyIcon color="success" fontSize="large" />

            <Link
              to="/"
              style={{
                display: "flex",
                flexDirection: "row",
                textDecoration: "none",
                color: "black",
              }}
            >
              <Typography color="success" variant="h4" fontWeight="bold">
                Advance
              </Typography>
              <Typography
                color="success"
                variant="h4"
                fontStyle="italic"
                fontWeight="bold"
              >
                Insurance
              </Typography>
            </Link>
          </div>
        </Navbar.Brand>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Link
            className="m-3 "
            style={styles.link}
            to="about-us"
            onClick={() => setOpenDrawer(false)}
          >
            About Us
          </Link>
          <Typography
            className="m-3"
            color="success"
            variant="h4"
            fontWeight="bold"
          >
            0900-786-01
          </Typography>
        </div>

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          show={openDrawer}
          onHide={() => setOpenDrawer(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Link
                style={styles.canvasLinks}
                to="auto-insurance"
                onClick={() => {
                  setOpenDrawer(false)
                }}
              >
                Auto Insurance
              </Link>
              <Link
                style={styles.canvasLinks}
                to="medicare"
                onClick={() => {
                  setOpenDrawer(false)
                }}
              >
                Medicare
              </Link>
              <Link
                style={styles.canvasLinks}
                to="life-insurance"
                onClick={() => {
                  setOpenDrawer(false)
                }}
              >
                Life Insurance
              </Link>
              <Link
                style={styles.canvasLinks}
                to="health-insurance"
                onClick={() => setOpenDrawer(false)}
              >
                Health Insurance
              </Link>

              <Link
                style={styles.canvasLinks}
                to="about-us"
                onClick={() => setOpenDrawer(false)}
              >
                About Us
              </Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
      <Container>
        <Nav className="justify-content-end flex-grow-1 pe-3">
          <Link
            style={styles.link}
            className="m-3"
            to="auto-insurance"
            onClick={() => setOpenDrawer(false)}
          >
            Auto Insurance
          </Link>
          <Link
            style={styles.link}
            className="m-3"
            to="medicare"
            onClick={() => setOpenDrawer(false)}
          >
            Medicare
          </Link>
          <Link
            style={styles.link}
            className="m-3"
            to="life-insurance"
            onClick={() => setOpenDrawer(false)}
          >
            Life Insurance
          </Link>
          <Link
            style={styles.link}
            className="m-3"
            to="health-insurance"
            onClick={() => setOpenDrawer(false)}
          >
            Health Insurance
          </Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
const styles = {
  link: {
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "18px",
  },
  secondNav: {
    color: "grey",
  },
  backButton: {
    display: "flex",
    flexDirection: "row",
    justifySelf: "flex-start",
    alignSelf: "flex-start",
  },
}

export default NavbarComponent
