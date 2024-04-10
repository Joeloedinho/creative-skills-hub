import { Stack, Typography, useTheme } from "@mui/material"

const FullTitleElement = ({isDark = false, fontSize = 30}) => {
    const theme = useTheme();
    const titleStyle = {fontSize: {xs: `${fontSize}px`, md: `${fontSize + 5}px`, lg: `${fontSize}px` + 10}, fontWeight: 700};
    return (
        <Stack direction='row' spacing={1} flexWrap='wrap' justifyContent='center'>
            <Typography variant="h4" sx={{ ...titleStyle, color: theme.palette.primary.main }}>Creative</Typography>
            <Typography variant="h4" sx={{ ...titleStyle, color: theme.palette.primary.main}}>Skills</Typography>
            <Typography variant="h4" sx={{ ...titleStyle, color: theme.palette.primary.main }}>Hub</Typography>
        </Stack>
    )
}

export { FullTitleElement }