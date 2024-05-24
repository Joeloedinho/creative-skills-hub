import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAlert } from "../../../hooks";
import { Attachment, PlayArrow } from "@mui/icons-material";

const LessonList = ({goBack, onDone, setData, data}) => {
  const [lessons, setLessons] = useState(data.lessons);
  const alert = useAlert();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    title: '',
    videoLink: '',
    videoUpload: '',
  })
  const [newLesson, setNewLesson] = useState({
    videoLink: "",
    attachmentLink: null,
    title: "",
    duration: "",
    videoUpload: null,
    videoType: "link",
  });

  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getVideoDuration = ({video, type='file'}) => {
    const videoElement = document.createElement("video");
    videoElement.src =
      type === "link"
        ? video
        : URL.createObjectURL(video);
        
    videoElement.addEventListener("loadedmetadata", () => {
      const vidLength = videoElement.duration;
      const hours = Math.floor(vidLength / 3600);
      const minutes = Math.floor((vidLength % 3600) / 60);
      const seconds = Math.floor(vidLength % 60);
      const timeString = `${hours}h ${minutes
        .toString()
        .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
      setNewLesson(prev => ({ ...prev, duration: timeString }));
    });
  }

  const handleChange = (e) => {
    setNewLesson({ ...newLesson, [e.target.name]: e.target.value });
  };

  const handleVideoTypeChange = (e) => {
    const videoType = e.target.value;
    if (videoType === "link") {
      setNewLesson({
        ...newLesson,
        videoType: videoType,
        videoLink: "",
        videoUpload: null,
      });
    } else {
      setNewLesson({
        ...newLesson,
        videoType: videoType,
        videoLink: "",
        videoUpload: null,
      });
    }
  };

  const handleVideoUpload = (e) => {
    getVideoDuration({video: e.target.files[0], type: "file"});
    setNewLesson({ ...newLesson, videoUpload: e.target.files[0] });
  };

  const handleAttachmentUpload = (e) => {
    setNewLesson({ ...newLesson, attachment: e.target.files[0] });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(newLesson.title === ''){
        setErrors(prev => ({...prev, title: 'Title is required'}));
        return;
    } else {
        setErrors(prev => ({...prev, title: ''}));
    }

    if(newLesson.videoType === 'upload' && newLesson.videoUpload == null){
        setErrors(prev => ({...prev, videoUpload: 'Video is required'}));
        return;
    } else {
        setErrors(prev => ({...prev, videoUpload: ''}));
    }

    if(newLesson.videoType === 'link' && newLesson.videoLink === ""){
        setErrors(prev => ({...prev, videoLink: 'Video link is required'}));
        return;
    } else {
        setErrors(prev => ({...prev, videoLink: ''}));
    }
    
    const newLessonData = {
      videoLink:
        newLesson.videoType === "link"
          ? newLesson.videoLink
          : URL.createObjectURL(newLesson.videoUpload),
      attachmentLink: newLesson.attachmentLink,
      title: newLesson.title,
      duration: newLesson.duration,
    };

    setLessons(prev => ([...prev, newLessonData]));
    setData(prev => ({...prev, lessons: [...prev.lessons, newLessonData]}))
    
    alert.show({message: "Success", type: "success"})
    console.log("New Lesson", newLesson);
    setNewLesson({
      videoLink: "",
      attachmentLink: null,
      title: "",
      duration: "",
      videoUpload: null,
      videoType: "link",
    });
    handleClose();
  };

  const handleVideoClick = (videoLink) => {
    setSelectedVideo(videoLink);
  };

  const handleDeleteLesson = (index) => {
    const newLessons = [...lessons];
    newLessons.splice(index, 1);
    setLessons(newLessons);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "700px", margin: "0 auto" }}>
      <Typography variant="h2">Lessons</Typography>
      {selectedVideo && (
        <Box sx={{ width: "100%" }}>
          <video width="100%" src={selectedVideo} controls autoPlay />
        </Box>
      )}
      {lessons.length === 0 ? (
        <Typography variant="h5" textAlign="center" sx={{color: 'grey', margin: 5}}>No lessons added yet. Please add lessons.</Typography>
      ) : (
        <List>
          {lessons.map((lesson, index) => (
            <ListItem
              key={index}
              sx={{
                backgroundColor:
                  selectedVideo === lesson.videoLink ? "rgba(0, 0, 0, 0.3)" : "inherit",
              }}
            >
              <ListItemText
                primary={`${index + 1}. ${lesson.title}`}
                secondary={`Duration: ${lesson.duration}`}
              />
              <IconButton onClick={() => handleVideoClick(lesson.videoLink)}>
                <PlayArrow />
              </IconButton>
              {lesson.attachmentLink && <Link
                href={lesson.attachmentLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton>
                  <Attachment />
                </IconButton>
              </Link>}
              <IconButton
                aria-label="delete"
                onClick={() => handleDeleteLesson(index)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}

      <Button variant="contained" onClick={handleOpen}>
        Add Lesson
      </Button>
      <Stack sx={{marginTop: 10}} direction="row" justifyContent='space-between'>
        <Button variant="text" onClick={goBack}>
          Back
        </Button>
        <Button variant="text" onClick={() => {
            onDone();
        }}>
          Continue
        </Button>
      </Stack>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">Add Lesson</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name="title"
              label="Title"
              value={newLesson.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.title != ""}
              helperText={errors.title}
            />
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Video</FormLabel>
              <RadioGroup
                aria-label="video"
                name="videoType"
                value={newLesson.videoType}
                onChange={handleVideoTypeChange}
              >
                <FormControlLabel
                  value="link"
                  control={<Radio />}
                  label="Video Link"
                />
                <FormControlLabel
                  value="upload"
                  control={<Radio />}
                  label="Upload Video"
                />
              </RadioGroup>
              {newLesson.videoType === "link" ? (
                <TextField
                  name="videoLink"
                  label="Video Link"
                  value={newLesson.videoLink}
                  onChange={(e) => {
                    getVideoDuration({video: e.target.value, type: "link"})
                    handleChange(e)
                }}
                  errors={errors.videoLink != ""}
                  helperText={errors.videoLink}
                  fullWidth
                />
              ) : (
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  errors={errors.videoUpload != ""}
                  helperText={errors.videoUpload}
                  fullWidth
                />
              )}
            </FormControl>
            <TextField
              name="attachmentLink"
              label="Attachment Link"
              type="file"
              value={newLesson.attachmentLink}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained">
              Add Lesson
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default LessonList;