import { Avatar, Box, Divider, Paper, Typography } from "@mui/material"

const ReviewCard = ({review}) => {
    return review ? 
    (
        <Box sx={{padding: 3}}>
            <Paper sx={{padding: 3, width: 250, position: 'relative'}}>
        <Avatar sx={{position: 'absolute', top: -15, left: -15}} />
        <Typography fontSize={15}>{review.text}</Typography>
        <Divider />
        <Typography sx={{textAlign: 'right'}}><i>{review.from}</i></Typography>
        <Typography sx={{textAlign: 'right', color: 'grey'}}>{review.role}</Typography>
    </Paper>
        </Box>
    ) : null
}

export default ReviewCard;