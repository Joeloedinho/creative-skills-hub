import { Favorite, LocalOffer, Person, Tag } from "@mui/icons-material";
import { Box, Card, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const style = {
  fontWeight: 600,
  fontSize: 14,
};

const ClientCard = ({ id, client, onClick }) => {
  const navigate = useNavigate();
  return client !== null ? (
    <Card
      sx={{ width: 200, margin: 2, padding: 2, paddingBottom: 1 }}
      className="course-card"
      onClick={onClick}
    >
      <Stack
        justifyContent="end"
        sx={{
          width: 175,
          height: 175,
          margin: "0 auto",
          borderRadius: 100,
          backgroundImage: `url(${client.photo})`,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "multiply",
          backgroundBlendMode: "multiply",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></Stack>
      <Typography
        sx={{fontSize: 20, lineHeight: 1.1, padding: 1 }}
      >
        {client.name}
      </Typography>
    </Card>
  ) : null;
};

export default ClientCard;
