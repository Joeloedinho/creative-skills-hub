import { Divider, Stack, Typography } from "@mui/material";
import CourseCard from "./course_card";

const CourseGroup = ({ title = "", courses = [] }) => {
  return (
    <Stack spacing={2}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Stack direction='row' spacing={2} sx={{ overflowX: "auto" }}>
        {courses.slice(4).map((course) => (
          <CourseCard course={course} />
        ))}
      </Stack>
    </Stack>
  );
};

export default CourseGroup;
