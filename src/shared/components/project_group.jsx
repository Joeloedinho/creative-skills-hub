import { Divider, Stack, Typography, Button, IconButton, Box } from "@mui/material";
import { useRef } from "react";
import { ArrowCircleLeft, ArrowCircleRight, } from "@mui/icons-material";
import ProjectCard from "./project_card";

const ProjectGroup = ({projects = [] }) => {

  return (
      <Stack justifyContent='center' spacing={1}>
          {projects.map((project, index) => (
            <ProjectCard id={index} project={project} />
          ))}
      </Stack>
  );
};

export default ProjectGroup;
