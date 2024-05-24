import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useAlert } from "../../../hooks";
import MUIRichTextEditor from "mui-rte";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Category } from "@mui/icons-material";

const NewCourseInfo = ({ onDone, setData, data }) => {
  const [imagePreview, setImagePreview] = useState(data.imageFile != null ? URL.createObjectURL(data.imageFile) : null);
  const [courseOverview, setCourseOverview] = useState("");
  const alert = useAlert();
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      title: data.title,
      description: data.description,
      level: data.level,
      categories: data.categories,
      overview: data.overview,
      imageFile: data.imageFile,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      level: Yup.string().required("Level is required"),
      imageFile: Yup.mixed().required("Image is required"),
    }),
    onSubmit: (values) => {
      // Handle form submission logic here
      setData((prev) => ({
        ...prev,
        title: values.title,
        description: values.description,
        level: values.level,
        categories: values.categories,
        overview: values.overview,
        imageFile: values.imageFile,
      }));
      console.log("Values", values, "Data", courseOverview);
      onDone();
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file.size > 2 * 1024 * 1024) {
      alert.show({
        message: "Image size should not exceed 2MB",
        type: "error",
        duration: 5000,
      });
      return;
    }
    formik.setFieldValue("imageFile", file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <Container>
      <Box sx={{ width: "100%", maxWidth: "700px", margin: "0 auto" }}>
        <Typography variant="h4" gutterBottom>
          Create New Course
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box mt={2}>
            <InputLabel htmlFor="image">Course Image:</InputLabel>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="image">
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            </label>
            {formik.errors.imageFile && (
              <Typography color="error">{formik.errors.imageFile}</Typography>
            )}
          </Box>
          {imagePreview && (
            <Box mt={2}>
              <img
                src={imagePreview}
                alt="Course Preview"
                style={{
                  maxHeight: 500,
                  minWidth: 300,
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </Box>
          )}
          <TextField
            label="Title"
            margin="normal"
            fullWidth
            value={formik.values.title}
            onChange={formik.handleChange}
            name="title"
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={2}
            margin="normal"
            value={formik.values.description}
            onChange={formik.handleChange}
            name="description"
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="level-label">Level</InputLabel>
            <Select
              labelId="level-label"
              value={formik.values.level}
              onChange={formik.handleChange}
              name="level"
              error={formik.touched.level && Boolean(formik.errors.level)}
            >
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </Select>
            {formik.touched.level && formik.errors.level && (
              <Typography color="error">{formik.errors.level}</Typography>
            )}
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="categories-label">Categories</InputLabel>
            <Select
              labelId="categories-label"
              multiple
              value={formik.values.categories}
              onChange={formik.handleChange}
              name="categories"
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="Web Development">Web Development</MenuItem>
              <MenuItem value="Mobile Development">Mobile Development</MenuItem>
              <MenuItem value="Data Science">Data Science</MenuItem>
              <MenuItem value="Machine Learning">Machine Learning</MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{
              padding: 2,
              minHeight: 300,
              border: "2px solid " + theme.palette.divider,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">Course Overview</Typography>
            <MUIRichTextEditor
              label="Add overview..."
              defaultValue={data.overview}
              onSave={(value) => formik.setFieldValue("overview", value)}
            />
          </Box>
          <Box mt={2}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Continue
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default NewCourseInfo;
