"use client";
import React from 'react'
import { mind } from '@/mocks/mind'
import { Typography } from '@mui/material'
import { IMindItem } from './IMindProps'
import { usePrompt } from '@/context/usePrompt'
function NothingInMind() {
    const { setPrompt } = usePrompt();
    return (
        <div className='py-5 px-2'>
            <Typography variant="h6" gutterBottom className=''>
                Tell us a prompt and we'll generate a story for you.
            </Typography>
            {
                mind.map((mindItem: IMindItem, index: number) => (
                    <div key={index} className=' rounded-xl bg-[#0a0a0a80] m-2 px-2 py-1 inline-block border border-[#27272a] border-solid cursor-pointer' 
                    onClick={() => {
                        setPrompt(mindItem.text);                        
                        window.scrollTo(0,0);
                    }}>
                        {mindItem.text}
                    </div>
                ))
            }
        </div>
    )
}

export default NothingInMind
