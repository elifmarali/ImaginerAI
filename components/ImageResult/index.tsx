"use client";
import { usePrompt } from '@/context/usePrompt';
import Image from 'next/image';
import React, { useEffect } from 'react';
import DownloadSVG from "@/assets/icons/download.svg";
import styles from "@/components/ImageResult/style.module.scss";

function ImageResult() {
  const { dataResult } = usePrompt();

  useEffect(() => {
    console.log("dataResult.fileBase64 : ", dataResult[0].fileBase64);
  }, [dataResult.fileBase64]);

  useEffect(() => {
    console.log("dataResult : ", dataResult);
  }, [dataResult]);

  if (!dataResult) {
    return <p>Resim yüklenemedi.</p>;
  }

  return (
    <div className="relative">
      <Image
        src={dataResult[0].fileBase64}
        alt={dataResult[0].originalText}
        width={300}
        height={500}
        className="rounded-lg"
        loading="lazy"
      />
      <a
        href={dataResult[0].fileBase64}
        download
        className={`absolute bottom-2 left-64 bg-gray-300 p-2 rounded-md shadow-md ${styles.downloadButton}`}
      >
        <Image
          src={DownloadSVG}
          width={14}
          height={14}
          alt="Download Image"
          className={`inline-block ${styles.downloadIcon}`}
        />
      </a>
    </div>
  );
}

export default ImageResult;
