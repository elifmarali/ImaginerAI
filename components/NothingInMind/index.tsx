"use client";
import React from 'react'
import { mind } from '@/mocks/mind'
import { Typography } from '@mui/material'
import { IData, IMindItem } from './IMindProps'
import { usePrompt } from '@/context/usePrompt'
function NothingInMind() {
    const { setPrompt } = usePrompt();
    const { generateClicked, dataResult, loading } = usePrompt();

    return (
        <div className='py-5 px-2'>
            {
                (generateClicked && dataResult &&dataResult.length > 1) ? !loading &&
                    (
                        <>
                            <Typography variant="h6" gutterBottom>
                                There are {dataResult && dataResult.length} data found for the prompt you are looking for. If you want to see it, you can search by selecting one of the two.
                            </Typography>
                            {dataResult && (
                                dataResult.map((dataItem: IData, index: number) => (
                                    <div key={index} className=' rounded-xl bg-[#0a0a0a80] m-2 px-2 py-1 inline-block border border-[#27272a] border-solid cursor-pointer'
                                        onClick={() => {
                                            setPrompt(dataItem.originalText);
                                            window.scrollTo(0, 0);
                                        }}>
                                        {dataItem?.originalText}
                                    </div>
                                )))}
                        </>
                    ) : (
                    <>
                        <Typography variant="h6" gutterBottom className=''>
                            Tell us a prompt and we&apos;ll generate a story for you.
                        </Typography>
                        {
                            mind.map((mindItem: IMindItem, index: number) => (
                                <div key={index} className=' rounded-xl bg-[#0a0a0a80] m-2 px-2 py-1 inline-block border border-[#27272a] border-solid cursor-pointer'
                                    onClick={() => {
                                        setPrompt(mindItem.text);
                                        window.scrollTo(0, 0);
                                    }}>
                                    {mindItem.text}
                                </div>
                            ))
                        }
                    </>
                )
            }
        </div>
    )
}

export default NothingInMind
