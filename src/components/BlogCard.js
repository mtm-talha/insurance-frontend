import React from "react"
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"

const BlogCard = ({ src, title, description }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          width="140"
          src={src}
          alt="green iguana"
          sx={{
            objectFit: "contain",
          }}
        />
        <CardContent>
          <Typography
            style={styles.title}
            gutterBottom
            variant="h5"
            component="div"
          >
            {title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
const styles = {
  title: {
    fontWeight: "bold",
  },
}

export default BlogCard
