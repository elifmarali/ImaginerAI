import { Button } from '@mui/material'
import React from 'react'
import styles from "@/components/ColorfullButton/style.module.scss"
import { useSelected } from '@/context/useSelected';
import { IColorfullButtonProps } from './IColorfullButtonProps';

function ColorfullButton({ text, click, buttonType }: IColorfullButtonProps) {
    const { setSelectedTab } = useSelected();

    return (
        <div className={`${styles.buttonSection} ${buttonType === "small" && styles.smallButton}`} onClick={() => setSelectedTab(click)}>
            <Button className={styles.button}>{text}</Button>
        </div>
    )
}

export default ColorfullButton
