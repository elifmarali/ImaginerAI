import { Button } from '@mui/material'
import React from 'react'
import styles from "@/components/ColorfullButton/style.module.scss"
import { useSelected } from '@/context/useSelected';
import { IColorfullButtonProps } from './IColorfullButtonProps';

function ColorfullButton({text,click}:IColorfullButtonProps) {
    const {setSelectedTab} = useSelected();

    return (
        <div className={styles.buttonSection}>
            <Button className={styles.button} onClick={() => setSelectedTab(click)}>{text}</Button>
        </div>
    )
}

export default ColorfullButton
