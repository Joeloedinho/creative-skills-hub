import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"

const AuthWrapper = () => {
    return <Box 
        sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}} 
        className='auth-bg'>
        <Outlet />
    </Box>
}

export default AuthWrapper;