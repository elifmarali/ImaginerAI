"use client";
import React, { useState } from 'react'
import styles from "@/components/Input/style.module.scss";
import { usePrompt } from "@/context/usePrompt"
function Input() {
    const { prompt, setPrompt, submitPrompt }: any = usePrompt();
    return (
        <div className={styles.imaginerInput}>
            <form className={styles.form} onSubmit={(e) => {
                e.preventDefault();
                submitPrompt();
            }}>
                <textarea
                    className={styles.textarea}
                    rows={2}
                    typeof="text"
                    placeholder="An orchestra of characters playing instruments on fire in a chapel + surrounded by ghosts made out of chiseled marble"
                    required
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                    className={styles.generateButton}
                    type='submit'
                >
                    Generate
                </button>
            </form>
        </div>
    )
}

export default Input
