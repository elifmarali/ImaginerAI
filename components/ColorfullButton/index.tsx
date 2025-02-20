import { Button } from '@mui/material'
import React from 'react'
import styles from "@/components/ColorfullButton/style.module.scss"
import { useSelected } from '@/context/useSelected';
import { IColorfullButtonProps } from './IColorfullButtonProps';

function ColorfullButton({ text, click }: IColorfullButtonProps) {
    const { setSelectedTab } = useSelected();

    return (
        <div className={`${styles.buttonSection} ${click === "" && styles.smallButton}`} onClick={() => setSelectedTab(click)}>
            <Button className={styles.button} type='submit'>{text}</Button>
        </div>
    )
}

export default ColorfullButton
