import { Stack, Typography, useTheme } from "@mui/material";
import { primaryLogo } from "../../assets";

const FullTitleElement = ({ isDark = false, fontSize = 30 }) => {
  const theme = useTheme();
  const titleStyle = {
    fontSize: {
      xs: `${fontSize}px`,
      md: `${fontSize + 5}px`,
      lg: `${fontSize}px` + 10,
    },
    fontWeight: 700,
  };
  return (
    <Stack direction="row" alignItems="center">
      <img src={primaryLogo} alt="logo" width='75px'/>
      <Typography
      variant="h4"
      sx={{
        ...titleStyle,
        color: theme.palette.primary.main,
        textAlign: "center",
        textDecoration: "none",
      }}
    >
      Creative Skills Hub
    </Typography>
    </Stack>
  );
};

export { FullTitleElement };
