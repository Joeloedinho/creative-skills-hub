import { Stack, Typography, useTheme } from "@mui/material"

const FullTitleElement = ({isDark = false}) => {
    const theme = useTheme();
    return (
        <Stack direction='row' spacing={1} flexWrap='wrap'>
            <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Creative</Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: isDark ? '#000' : '#FFF'}}>Skills</Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 , color: theme.palette.secondary.main }}>Hub</Typography>
        </Stack>
    )
}

export { FullTitleElement }