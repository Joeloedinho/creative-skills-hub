import { Favorite, LocalOffer, Person, Tag } from "@mui/icons-material";
import { Box, Card, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const style = {
    fontWeight : 600,
    fontSize : 14,
}

const CourseCard = ({ course }) => {
  return course !== null ? (
    <Card sx={{ display: "block"}} className='course-card'>
      <Link to={`/course/${course.title}`}>
      <Stack sx={{ width: 250, height: "fit-content" }}>
        <Stack
          justifyContent="end"
          sx={{
            width: "100%",
            height: 200,
            backgroundImage: `url(${course.img})`,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundBlendMode: "multiply",
            backgroundBlendMode: "multiply",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Typography
            sx={{ color: "white", fontSize: 20, lineHeight: 1.1, paddingX: 1 }}
          >
            {course.title}
          </Typography>
        </Stack>
        <Typography
          sx={{
            textOverflow: "ellipsis",
            fontSize: 9,
            height: 10,
            paddingX: 1,
            overflow: "hidden",
          }}
        >
          {course.description}
        </Typography>
        <Stack spacing={1}>
        <Stack direction="row" justifyContent='space-between' sx={{paddingX: 2}}>
          <Stack direction="row" alignItems='center' spacing={1}>
            <Favorite color="error"/>
            <Typography sx={style}>{course.likes}</Typography>
          </Stack>
          <Stack direction="row" alignItems='center' spacing={1}>
            <Person sx={{ color: "grey", }} />
            <Typography sx={style}>{course.enrolled}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={1} direction="row" alignItems='center' sx={{paddingX: 2, marginBottom: 1, ...style}}>
          <LocalOffer color="primary" />
          <Typography sx={style}>{course.price}</Typography>
        </Stack>
        </Stack>
      </Stack>
      </Link>
    </Card>
  ) : null;
};

export default CourseCard;
