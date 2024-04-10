import { Circle } from '@mui/icons-material'
import { Button, Paper, Stack } from '@mui/material'
import React from 'react'
import { FullTitleElement } from '../shared/components/title'
import { NavLink } from 'react-router-dom'

export default function LandingNavbar() {
  return (
    <Paper elevation={2} sx={{padding: '15px 30px'}}>
      <Stack direction='row' justifyContent='space-between'>
        <Stack direction='row' alignItems='center'>
          <Circle sx={{fontSize: 30}}/>
          <FullTitleElement isDark={true} fontSize={20}/>
        </Stack>
        <Stack direction='row' alignItems='center'>
          <NavLink to={'/'}>
            <Button>Home</Button>
          </NavLink>
          <NavLink to={'/about'}>
            <Button>About Us</Button>
          </NavLink>
          <NavLink to={'/auth/register'}>
            <Button>Register</Button>
          </NavLink>
        </Stack>
      </Stack>
    </Paper>
  )
}
