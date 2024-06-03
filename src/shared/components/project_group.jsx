import { Divider, Stack, Typography, Button, IconButton, Box, Grid } from "@mui/material";
import { useRef } from "react";
import { ArrowCircleLeft, ArrowCircleRight, } from "@mui/icons-material";
import ProjectCard from "./project_card";
import { useNavigate } from "react-router-dom";

const ProjectGroup = ({projects = [], title, role = "" }) => {
  const navigate = useNavigate();

  return (
      <>
      <Typography variant='h5' fontWeight='bold'>{title}</Typography>
        <Grid container alignItems='center' spacing={1} flexWrap='wrap'>
          {projects.map((project, index) => {
              let path = "";
              if(role.trim() != ""){
                path = `/${role}/projects/${project.id}`;
              }
            return <ProjectCard key={index} id={index} project={project} onClick={() => navigate(path)} />
      })}
      </Grid>
      </>
  );
};

export default ProjectGroup;
