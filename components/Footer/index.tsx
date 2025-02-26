"use client";
import React from "react";
import Image from "next/image";
import styles from "@/components/Footer/styles.module.scss";
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <Image src="/icons/github.svg" alt="GitHub" width={30} height={30} />
        <Image src="/icons/twitter.svg" alt="Twitter" width={30} height={30} />
        <div className="text-sm">
          Made by E.M. and,<br />
          built with Next.js
        </div>
      </div>
    </footer>
  );
}

export default Footer;
