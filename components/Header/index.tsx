"use client";
import React from 'react'
import Typography from '@mui/material/Typography';
import { useSelected } from '@/context/useSelected';
import ColorfullButton from '../ColorfullButton';
import Image from 'next/image';
import Logo from "@/assets/logo/logo.png"
function Header() {
  const { selectedTab } = useSelected();

  return (
    <div>
      {
        (selectedTab === "" || selectedTab === null) ? (
          <div className='flex justify-between'>
            <div className='max-w-[70%]'>
            <Typography variant="h1" gutterBottom >
              WELCOME
              <br />
              ImaginerAI
            </Typography>
            <Typography variant="h5" gutterBottom className='pb-10'>
              This project provides a platform where users can generate content by inputting prompts; they can automatically create stories or images based on the text they provide.
            </Typography>
            </div>
            <Image src={Logo} alt="ImaginerAI Logo" style={{borderRadius:"50%",height:"24%",width:"24%"}}/>
          </div>
        ) : (
          selectedTab === "generate" ? (
            <>
              <ColorfullButton text="Back" click="" buttonType="small"/>
              <Typography variant="h2" gutterBottom >
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
              <ColorfullButton text="Back" click="" buttonType="small" />
              <Typography variant="h2" gutterBottom>
                Add Your Data,
                <br />
                Let's create something new!
              </Typography>
              <Typography variant="h6" gutterBottom>
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
