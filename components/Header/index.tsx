import React from 'react'
import Typography from '@mui/material/Typography';

function Header() {
  return (
    <div>
      <Typography variant="h1" gutterBottom className=''>
        You just imagine,
        <br />
        we handle the rest
      </Typography>
      <Typography variant="h5" gutterBottom className=''>
        Tell us a prompt and we'll generate a story for you.
      </Typography>
    </div>
  )
}

export default Header
