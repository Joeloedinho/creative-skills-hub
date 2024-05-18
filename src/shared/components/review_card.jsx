import { Avatar, Box, Divider, Paper, Stack, Typography } from "@mui/material"

const ReviewCard = ({review}) => {
    return review ? 
    (
        <Box sx={{padding: 3}}>
            <Paper sx={{padding: 3, maxWidth: 300, position: 'relative'}}>
        <Avatar src={review.profilePic} sx={{position: 'absolute', top: -15, left: -15, width: 40, height: 40}} />
        <Typography>{review.review}</Typography>
        <Typography variant="caption" fontStyle='italic' sx={{my: 3}}>{review.email}</Typography>
        <Divider />
        <Typography sx={{textAlign: 'right'}}><i>{review.from}</i></Typography>
        <Stack direction='row' justifyContent='space-between'>
        <Typography sx={{textAlign: 'right', color: 'grey'}}>{review.role}</Typography>
        <Typography variant="caption"sx={{marginLeft: 2}}>{new Date(review.dateTime).toLocaleString()}</Typography>
        </Stack>
    </Paper>
        </Box>
    ) : null
}

export default ReviewCard;

{/* <Box key={index} sx={{ marginBottom: 2, border: '1px solid #ccc', padding: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar src={review.profilePic} alt="Profile Pic" sx={{ width: 40, height: 40 }} />
        </Grid>
        <Grid item xs>
          <Typography variant="subtitle1">{review.email}</Typography>
          <Typography variant="body1">{review.review}</Typography>
          <Typography variant="caption" sx={{fontStyle: 'italic', color: 'blue' }}>{review.role}</Typography>
          <Typography variant="caption"sx={{marginLeft: 2}}>{new Date(review.dateTime).toLocaleString()}</Typography>
        </Grid>
      </Grid>
    </Box> */}