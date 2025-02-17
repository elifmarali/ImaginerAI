"use client";
import React from 'react';
import Image from 'next/image';
import { Images } from '@/mocks/images';
import styles from "@/components/PhotosSection/styles.module.scss"
import { usePrompt } from '@/context/usePrompt';
function PhotosSection() {
    const { setPrompt } = usePrompt();
    return (
        <div className={styles.photos}>
            {
                Images.map((image) => (
                    <div key={image.id} className={styles.photo}>
                        <p className='text-lg mb-2'>{image.prompt}</p>
                        <div className='border border-[#27272a] border-solid cursor-pointer bg-[#0a0a0a80] rounded-md w-14 flex justify-center items-center p-1'>
                            <button onClick={() => {
                                setPrompt(image.prompt);
                                window.scrollTo(0, 0);
                            }}>
                                Copy
                            </button>
                        </div>
                        <Image src={image.image} alt={image.prompt} fill className='rounded-3xl' />
                    </div>
                ))
            }
        </div>
    )
}

export default PhotosSection
