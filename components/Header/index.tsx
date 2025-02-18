"use client";
import React from 'react'
import Typography from '@mui/material/Typography';
import { useSelected } from '@/context/useSelected';

function Header() {
  const selectedTab = useSelected();
  console.log("selectedTab : ",selectedTab);
  
  return (
    <div>
      {
        (selectedTab === "" || selectedTab===null) ? (
          <>
            <Typography variant="h1" gutterBottom >
              WELCOME
              <br />
              ImaginerAI
            </Typography>
            <Typography variant="h5" gutterBottom className='pb-10'>
              This project provides a platform where users can generate content by inputting prompts; they can automatically create stories or images based on the text they provide.
            </Typography>
          </>
        ) : (
          selectedTab === "generate" ? (
            <>
              <Typography variant="h1" gutterBottom >
                You just imagine,
                <br />
                we handle the rest
              </Typography>
              <Typography variant="h5" gutterBottom >
                Tell us a prompt and we'll generate a story for you.
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h1" gutterBottom>
                Add Your Data,
                <br />
                Let's create something new!
              </Typography>
              <Typography variant="h5" gutterBottom>
                Provide the necessary information and we'll generate content based on it.
              </Typography>
            </>
          )
        )
      }
    </div>
  )
}

export default Header
