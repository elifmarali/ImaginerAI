"use client";
import Input from '@/components/Input'
import NothingInMind from '@/components/NothingInMind'
import PhotosSection from '@/components/PhotosSection'
import React from 'react'
import { useSelected } from "@/context/useSelected"
import Form from '@/components/Form'
import ButtonSection from '@/components/ButtonsSection';

function HomeContainer() {
  const {selectedTab} = useSelected();

  return (
    <div className='flex flex-col'>
      {
        selectedTab ?
          selectedTab === "generate" ? (
            <>
              <Input />
              <NothingInMind />
              <PhotosSection />
            </>
          )
            :
            (
              <Form />
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
