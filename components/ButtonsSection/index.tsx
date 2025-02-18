"use client";
import { Button } from '@mui/material'
import React from 'react'
import styles from "@/components/ButtonsSection/style.module.scss"
import { useSelected } from '@/context/useSelected'

function ButtonSection() {
    const {setSelectedTab} = useSelected();
    return (
        <div className='flex justify-around items-center'>
            <div className={styles.buttonSection}>
                <Button className={styles.button} onClick={()=> setSelectedTab("generate")}>Image Generate</Button>
            </div>
            <div className={styles.buttonSection}>
                <Button className={styles.button} onClick={()=> setSelectedTab("add")}>Add Data</Button>
            </div>
        </div>
    )
}

export default ButtonSection
