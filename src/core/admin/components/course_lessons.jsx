import React, { useState } from "react";
import {
  Paper, Typography, List,
  ListItem,
  ListItemText,
  Divider, IconButton,
  ListItemIcon,
  ListItemButton,
  Stack
} from "@mui/material";
import {
  AttachmentRounded,
  Delete,
  Pause,
  PlayArrow,
} from "@mui/icons-material";

const CourseLessons = ({ course }) => {
  const [activeLesson, setActiveLesson] = useState(course.lessons[0]);

  return (
    <Paper sx={{ padding: 2 }}>
      <video url={course.videoUrl} controls width="100%" height="auto" />

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Lessons
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Total Duration: {course.duration}
      </Typography>
      <List>
        {course.lessons.map((lesson, index) => (
          <ListItem
            key={lesson.id}
            secondaryAction={
              <Stack direction="row" alignItems="center">
                {lesson.attachmentUrl !== "" ? (
                  <IconButton
                    onClick={() => window.open(lesson.attachmentUrl, "_blank")}
                  >
                    <AttachmentRounded />
                  </IconButton>
                ) : null}
                <Typography>{lesson.length}</Typography>
                <IconButton>
                  <Delete />
                </IconButton>
              </Stack>
            }
            disablePadding
          >
            <ListItemButton
              onClick={() => setActiveLesson(lesson)}
              selected={activeLesson === lesson}
            >
              <ListItemIcon>
                {activeLesson === lesson ? <Pause /> : <PlayArrow />}
              </ListItemIcon>
              <ListItemText primary={`${index + 1}. ${lesson.title}`} />
            </ListItemButton>
            <Divider component="li" />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default CourseLessons;
