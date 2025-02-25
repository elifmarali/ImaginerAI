"use client";
import Input from '@/components/Input'
import NothingInMind from '@/components/NothingInMind'
import PhotosSection from '@/components/PhotosSection'
import React from 'react'
import { useSelected } from "@/context/useSelected"
import Form from '@/components/Form'
import ButtonSection from '@/components/ButtonsSection';
import { usePrompt } from '@/context/usePrompt';
import LoadingSpinner from '@/components/Loading';
import { Alert, Typography } from '@mui/material';
import ImageResult from '@/components/ImageResult';
import SmileSVG from "@/assets/icons/smile.svg"
import Image from 'next/image';

function HomeContainer() {
  const { selectedTab } = useSelected();
  const { dataResult, generateClicked, loading, error } = usePrompt();
  return (
    <div className='flex flex-col'>
      {
        selectedTab ?
          selectedTab === "generate" ? (
            <div className='flex flex-col gap-4'>
              <Input />
              {
                generateClicked && (
                  loading ? <LoadingSpinner /> :
                    error ?
                      <Alert color="error">An error occured while loading the image.</Alert>
                      : (
                        dataResult && (
                          dataResult.length > 0 ?
                            dataResult.length === 1 &&
                              (<ImageResult />) 
                              /* (<Alert>1'den çok </Alert>) */
                            : (
                              <Alert color="warning" sx={{ "& .MuiAlert-message": { paddingTop: "0px" } }}>
                                <Typography variant='h6' gutterBottom >Hello.</Typography>
                                I have not had such a record loaded into my memory before. If you want, you can add it using the add data button on the home page {" "}
                                <Image src={SmileSVG} width={14} height={14} alt='Smile Image' className='inline-block' />
                              </Alert>
                            )
                        )
                      )
                )
              }
              <NothingInMind />
              <PhotosSection />
            </div>
          )
            :
            (
              <div className='min-h-[300px]'>
                <Form />
              </div>
            )
          :
          (
            <ButtonSection />
          )
      }
    </div>
  )
}

export default HomeContainer
