import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    FormControl, Input,
    InputLabel,
    MenuItem,
    Paper,
    Select, Stack,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { useAlert } from "../../../hooks";
import MUIRichTextEditor from "mui-rte";
import { useFormik } from "formik";
import * as Yup from "yup";
import {AttachFile, Category} from "@mui/icons-material";

const AddProjectPage = ({ onDone, setData, data }) => {
    const [briefingPreview, setBriefingPreview] = useState(data.imageFile != null ? URL.createObjectURL(data.imageFile) : null);
    const [projectOverview, setProjectOverview] = useState("");
    const alert = useAlert();
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {
            title: data.title,
            level: data.level,
            skills: data.skills,
            overview: data.overview,
            briefingFile: data.briefingFile,
            duration: data.duration,
            price: data.price,
            dateUploaded: data.dateUploaded,
            installments: data.installments,
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            overview: Yup.string(),
            level: Yup.string().required("Level is required"),
            briefingFile: Yup.mixed().required("Brief is required"),
            skills: Yup.array().min(1, "Atleast 1 skill is required"),
            installments : Yup.number().required("Installments is required"),
            durationLength: Yup.string().required("Duration Length is required"),
        }),
        onSubmit: (values) => {
            // Handle form submission logic here
            setData((prev) => ({
                ...prev,
                title: values.title,
                installments: values.installments,
                durationLength: values.durationLength,
                duration: values.duration,
                price: values.price,
                level: values.level,
                skills: values.skills,
                overview: values.overview,
                briefingFile: values.briefingFile,
            }));
            console.log("Values", values, "Data", projectOverview);
            onDone();
        },
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // if (file.size > 2 * 1024 * 1024) {
        //     alert.show({
        //         message: "Image size should not exceed 2MB",
        //         type: "error",
        //         duration: 5000,
        //     });
        //     return;
        // }
        formik.setFieldValue("briefingFile", file);
        console.log("File", file)
        setBriefingPreview(file.name);
    };

    return (
        <Container>
            <Box sx={{ width: "100%", maxWidth: "700px", margin: "0 auto" }}>
                <Typography variant="h4" gutterBottom>
                    Add Project
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Box mt={2}>
                        <InputLabel htmlFor="brief">Project Brief:</InputLabel>
                        <Input
                            type="file"
                            id='brief'
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                        <label htmlFor="brief">
                            <Button variant="contained" component="span">
                                Upload Brief
                            </Button>
                        </label>
                        {formik.errors.briefingFile && (
                            <Typography color="error">{formik.errors.briefingFile}</Typography>
                        )}
                    </Box>
                    {briefingPreview && (
                        <Stack direction="row" spacing={2}>
                            <AttachFile />
                            <Typography color="success">{briefingPreview}</Typography>
                        </Stack>
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
                        <InputLabel id="skills-label">Skills Needed</InputLabel>
                        <Select
                            labelId="skills-label"
                            multiple
                            value={formik.values.skills}
                            onChange={formik.handleChange}
                            name="skills"
                            renderValue={(selected) => selected.join(", ")}
                        >
                            <MenuItem value="Capcut">Capcut</MenuItem>
                            <MenuItem value="Adobe Photoshop">Adobe Photoshop</MenuItem>
                            <MenuItem value="Adobe Indesign">Adobe Indesign</MenuItem>
                            <MenuItem value="Recording">Recording</MenuItem>
                        </Select>
                        {formik.touched.skills && formik.errors.skills && (
                            <Typography color="error">{formik.errors.skills}</Typography>
                        )}
                    </FormControl>
                    <Stack direction='row'>
                        <TextField
                            label="Duration"
                            fullWidth
                            margin="normal"
                            value={formik.values.duration}
                            onChange={formik.handleChange}
                            name="duration"
                            error={
                                formik.touched.duration && Boolean(formik.errors.duration)
                            }
                            helperText={formik.touched.duration && formik.errors.duration}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="durationLength">Length</InputLabel>
                            <Select
                                labelId="durationLength"
                                value={formik.values.durationLength}
                                onChange={formik.handleChange}
                                name="durationLength"
                            >
                                <MenuItem value="hour">Hour</MenuItem>
                                <MenuItem value="day">Day</MenuItem>
                                <MenuItem value="week">Week</MenuItem>
                                <MenuItem value="month">Month</MenuItem>
                                <MenuItem value="year">Year</MenuItem>
                            </Select>
                            {formik.touched.durationLength && formik.errors.durationLength && (
                                <Typography color="error">{formik.errors.durationLength}</Typography>
                            )}
                        </FormControl>
                    </Stack>
                    <Stack direction='row'>
                        <TextField
                            label="Number of Installments"
                            fullWidth
                            margin="normal"
                            value={formik.values.installments}
                            onChange={formik.handleChange}
                            name="installments"
                            error={
                                formik.touched.installments && Boolean(formik.errors.installments)
                            }
                            helperText={formik.touched.installments && formik.errors.installments}
                        />
                        <TextField
                            label="Budget"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            name="price"
                            error={
                                formik.touched.price && Boolean(formik.errors.price)
                            }
                            helperText={formik.touched.price && formik.errors.price}
                        />
                    </Stack>
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

export default AddProjectPage;
