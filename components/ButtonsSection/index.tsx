"use client";
import React from 'react'
import ColorfullButton from '../ColorfullButton';

function ButtonSection() {
    return (
        <div className='flex justify-around items-top min-h-[140px]'>
            <ColorfullButton text="Image Generate" click="generate"/>
            <ColorfullButton text="Add Data" click="add"/>
        </div>
    )
}

export default ButtonSection
