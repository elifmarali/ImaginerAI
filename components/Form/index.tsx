"use client";
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';
import { submitAddData } from "@/services/AddData/index"
import { useSelected } from '@/context/useSelected';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

function Form() {
  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File | null>();
  const [textError, setTextError] = useState({ isError: false, errorText: "" });
  const [fileError, setFileError] = useState({ isError: false, errorText: "" });
  const { setSelectedTab } = useSelected();

  const alertControl = async () => {
    setTextError({ isError: false, errorText: "" });
    setFileError({ isError: false, errorText: "" });

    if (text?.trim().split("").length < 3 || text === "") {
      setTextError({ isError: true, errorText: "At least 3 words must be entered!" })
    }
    if (!file) {
      setFileError({ isError: true, errorText: "Image is required field" })
    }
  }

  const addData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await alertControl();
    if (!textError.isError && !fileError.isError && file && text) {
      await submitAddData(text, file);
      setSelectedTab("");
    }
  }


  return (
    <form className='bg-gray-300 rounded px-5 py-5 gap-3 flex flex-col' onSubmit={(e) => addData(e)}>
      <TextField className='w-full' label="Please enter the description that bext describes your image." onChange={(e) => setText(e.target.value)} />
      <Button
        component="label"
        role={undefined}
        tabIndex={-1}
        className='h-[100px]'
        startDecorator={
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </SvgIcon>
        }
      >
        Upload a file
        <VisuallyHiddenInput type="file" onChange={(e) => {
          if (!e.target.files || e.target.files.length === 0) return;
          setFile(e.target.files[0])
        }} />
      </Button>
      {
        file && (
          <div className='flex px-4'>
            <div className='flex flex-1 text-black text-sm font-bold items-center'>{file?.name}</div>
            <div className='flex gap-4'>
              <Button variant="soft" color='danger' onClick={() => setFile(null)}>Remove</Button>
              <Button variant="soft" onClick={() => window.open(URL.createObjectURL(file))}>Show</Button>
            </div>
          </div>
        )
      }
      {/*       <img src={`/uploads/${fileName}`} alt="Uploaded Image" />
 */}
      <div className='flex justify-end'>
        <Button type='submit' color='success'>Submit</Button>
      </div>
    </form>
  )
}

export default Form
