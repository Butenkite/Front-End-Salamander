"use client";

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import "./edit.css"
import Link from "next/link";
import ImageBinarizer from './BinarizerComponent';

export default function Page() {
  const searchParams =  useSearchParams();
  const video = searchParams.get("video");

  const [color, setColor] = useState('#ffffff');
  const [threshold, setThreshold] = useState('0');

  return (
    <main className="app-container">
      <nav className="top-nav">
        <h1 className="logo">Salamander Finder</h1>
        <div className="nav-right">
        <Link href="/" className="nav-btn">Home</Link>
        <Link href="/output" className="nav-btn">Output</Link>
        </div>
      </nav>

      <section className="content-layout-2">
        <ImageBinarizer videoName={video || undefined} />
      </section>
    </main>
  );
}
