import {alpha, useTheme} from "@mui/material";

const useColors = () => {
    const theme = useTheme();

    const hoverColor = alpha(theme.palette.primary.light, 0.2);

    return {hoverColor}
}

export default useColors;