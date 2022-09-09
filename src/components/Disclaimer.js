import { Container, Link, Typography } from "@mui/material"
import React, { useState } from "react"
import { listedBusinesses, partners } from "../util/appData"

const Disclaimer = () => {
  const [showBusiness, setShowBusiness] = useState(false)
  return (
    <Container sx={styles.disclaimerContainer}>
      <Typography sx={styles.textStyle}>
        2022 AdvancedInsonline.com Ins LLC DBA AdvancedInsOnline.com All rights
        reserved. AdvancedInsOnline.com is a digital insurance comparison
        engine, providing real-time rates and insurance services in all 50
        states through its relationships with carrier and agency partners.
        <a href="privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        |
        <a href="terms-of-use" target="_blank" rel="noopener noreferrer">
          Terms of Use
        </a>
        |
        <a href="ccpa-opt-out" target="_blank" rel="noopener noreferrer">
          Do not sell my personal information
        </a>
      </Typography>
      <Typography sx={styles.textStyle}>
        By clicking the "View Rates" button, I provide my electronic signature
        and represent that I am at least 18 and agree to this website's{" "}
        <a href="privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="terms-of-use" target="_blank" rel="noopener noreferrer">
          Terms of Use
        </a>
        .
      </Typography>
      <Typography sx={styles.textStyle}>
        By clicking the 'View Rates' button, I provide my express written
        consent and authorization to the owner of this website and/or the agents
        of one or more of the{" "}
        <button
          style={styles.linkStyle}
          onClick={() => setShowBusiness(!showBusiness)}
        >
          listed businesses
        </button>
        to contact me for marketing/telemarketing purposes at the number and
        address provided above, including my wireless number if provided, using
        live operators, automated telephone dialing systems, artificial voice or
        pre- recorded messages, text messages and/or emails, if applicable, even
        if I have previously registered the provided number on any Federal or
        State Do Not Call Registry. I understand that my consent is not required
        as a condition of purchasing goods or services and can be revoked at any
        time.
      </Typography>
      {showBusiness ? (
        <p style={styles.greyedHeading}>Listed business</p>
      ) : null}

      {showBusiness
        ? listedBusinesses.map((item, key) => (
            <p style={styles.greyedText}>{item}</p>
          ))
        : null}

      {showBusiness ? (
        <p style={styles.greyedHeading}>
          The following is a list of our marketing partners:
        </p>
      ) : null}

      {showBusiness
        ? partners.map((item, key) => <p style={styles.greyedText}>{item}</p>)
        : null}
    </Container>
  )
}
const styles = {
  disclaimerContainer: {
    margin: "50px 0px",
    width: "80%",
  },
  textStyle: {
    fontSize: 13,
  },
  links: {},
  linkStyle: {
    border: "none",
    backgroundColor: "transparent",
    textDecoration: "underline",
    color: "#0d6efd",
  },
  greyedHeading: {
    margin: "30px 0px",
    fontSize: 15,
    color: "#aaa8a8",
  },
  greyedText: {
    fontSize: 13,
    color: "#aaa8a8",
  },
}

export default Disclaimer
