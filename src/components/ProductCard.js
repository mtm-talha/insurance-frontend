import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material"
import React from "react"

const ProductCard = ({ image, title, children }) => {
  return (
    <Card sx={styles.cardContainer}>
      <CardActionArea>
        <div style={styles.imageContainer} alt="green iguana">
          {children}
        </div>
        <CardContent>
          <Typography
            gutterBottom={true}
            textDecoration="none"
            sx={styles.picTitle}
            component="div"
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    // <Card sx={styles.cardContainer}>
    //   <CardActionArea>
    //     <CardMedia
    //       style={styles.media}
    //       component="img"
    //       alt="Auto Insurance"
    //       image={image}
    //       objectFit="contain"
    //     />
    //     <CardContent style={{ paddingBottom: 10 }}>
    //       <Typography
    //         gutterBottom={true}
    //         textDecoration="none"
    //         sx={styles.picTitle}
    //         component="div"
    //       >
    //         {title}
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    // </Card>
  )
}

const styles = {
  // picTitle: {
  //   fontSize: { lg: 25, md: 25, sm: 25, xs: 25 },

  //   fontWeight: "bold",
  //   textAlign: "center",
  // },
  // cardContainer: {
  //   boxShadow: 10,
  //   width: { lg: 170, md: 170, sm: 400, xs: 350 },
  //   height: { lg: 150, md: 150, sm: 150, xs: 150 },
  //   maxWidth: 500,
  //   maxHeight: 178,
  // },
  // imageContainer: {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  picTitle: {
    fontSize: { lg: 25, md: 25, sm: 25, xs: 25 },
    color: "#000e31",
    fontWeight: "bold",
    textAlign: "center",
  },
  cardContainer: {
    boxShadow: 10,
    width: { lg: 200, md: 200, sm: 300, xs: 250 },
    height: { lg: 175, md: 175, sm: 203, xs: 203 },
    maxWidth: 500,
    maxHeight: 178,
    backgroundColor: "#f2fefe",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  media: {
    objectFit: "contain",
  },
}

export default ProductCard
