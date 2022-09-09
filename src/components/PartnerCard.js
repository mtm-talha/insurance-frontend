import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"
import React from "react"

const PartnerCard = ({ img, title, desc, children }) => {
  return (
    <Card sx={styles.cardContainer}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={styles.imageContainer}
          image={img}
          alt="partners"
        />
        <CardContent>
          <Typography
            // gutterBottom={true}
            textDecoration="none"
            sx={styles.picTitle}
            component="div"
          >
            {title}
          </Typography>
          <Typography
            // gutterBottom={true}
            textDecoration="none"
            sx={styles.picDesc}
            component="div"
          >
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const styles = {
  picTitle: {
    // fontSize: { lg: 25, md: 25, sm: 25, xs: 25 },
    color: "#000e31",
    fontWeight: "900",
    textAlign: "center",
  },
  picDesc: {
    // fontSize: { lg: 25, md: 25, sm: 25, xs: 25 },
    color: "#000e31",
    textAlign: "center",
  },
  cardContainer: {
    boxShadow: 20,
    // width: { lg: 200, md: 200, sm: 300, xs: 250 },
    // height: { lg: 175, md: 175, sm: 203, xs: 203 },
    width: "100%",
    height: "100%",
    maxWidth: 400,
    borderRadius: 7,
    backgroundColor: "#f2fefe",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    maxWidth: 400,
  },
  media: {
    objectFit: "contain",
  },
}

export default PartnerCard
