import { Divider, Stack, Typography, Button, IconButton, Box, Grid } from "@mui/material";
import { useRef } from "react";
import { ArrowCircleLeft, ArrowCircleRight, } from "@mui/icons-material";
import ProjectCard from "./project_card";

const ProjectGroup = ({projects = [], title }) => {

  return (
      <>
      <Typography variant='h5' fontWeight='bold'>{title}</Typography>
        <Grid container alignItems='center' spacing={1} flexWrap='wrap'>
          {projects.map((project, index) => (
            <ProjectCard key={index} id={index} project={project} />
          ))}
      </Grid>
      </>
  );
};

export default ProjectGroup;
