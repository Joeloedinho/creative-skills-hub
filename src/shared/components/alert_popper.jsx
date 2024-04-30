import { Close } from "@mui/icons-material";
import { Box, Collapse, Alert, IconButton } from "@mui/material";

const AlertPopper = ({showAlert, handleClose, children, alertType,sx}) => {
    return ( 
        <Box sx={{
            position: 'fixed',
            top: 7,
            left: '50%',
            transform: 'translate(-50%, 0);',
        }}>
        <Collapse in={showAlert}>
            <Alert
            severity={alertType}
            variant='filled'
                action={
                    <IconButton aria-label="close" color='inherit' size='small' onClick={() => handleClose()}>
                        <Close fontSize='inherit' />
                    </IconButton>
                }
                sx={{ mb: 2, minWidth: '250px' }}
            >
                <p style={{ color: '#fff' }}>{children}</p>
            </Alert>
        </Collapse>
    </Box>
     );
}
 
export default AlertPopper;