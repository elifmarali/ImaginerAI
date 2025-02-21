"use client";
import { usePrompt } from '@/context/usePrompt';
import React, { useEffect } from 'react';

function ImageResult() {
    const { dataResult } = usePrompt();

    // bulgu : img yüklenme sorununu hallet, img src olarak almıyor 
    useEffect(() => {
        console.log("res : ", dataResult.fileBase64);
    }, [dataResult]);

    if (!dataResult) {
        return <p>Resim yüklenemedi.</p>;
    }

    return (
        <div>
            <img src={dataResult.fileBase64} alt="" />
        </div>
    );
}

export default ImageResult;
