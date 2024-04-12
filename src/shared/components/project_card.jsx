import { Favorite, LocalOffer, Person, Tag } from "@mui/icons-material";
import { Box, Card, Chip, Divider, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const style = {
  fontWeight: 600,
  fontSize: 14,
  color: '#343434'
};

const ProjectCard = ({ id, project }) => {
  const navigate = useNavigate();
  return project !== null ? (
    <Stack>
      <Divider />
      <Stack
        spacing={2}
        justifyContent='center'
        onClick={() => navigate(`/project/${id}`)}
        sx={{
          width: "100%",
          maxWidth: 1200,
          margin: '5px auto',
          padding: 1,
        }}
        className="project-card"
      >
        <Typography sx={{ marginLeft: '-10px', fontSize: 20, lineHeight: 1.1, fontWeight: 700, paddingY: 1 }}>
        {project.title}
      </Typography>
        <Typography sx={style}>Date Posted: {project.dateAdded}</Typography>
        <Typography sx={style}>
          Status: <span style={{color: 'green'}}>{project.status}</span>
        </Typography>
        <Typography sx={{height: 100, overflow: 'hidden', textOverflow: 'ellipsis'}}>{project.info}</Typography>
        <Typography sx={style}>
          Pay: ${project.payFrequency} - ${project.pay} FCFA - project.skills
        </Typography>
        <Typography sx={style}>Timeline: {project.timeline}</Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {project.tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  ) : null;
};

export default ProjectCard;
