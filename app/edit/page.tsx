"use client";
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import "./edit.css"
import Link from "next/link";

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
        <div className="image-panel">
          <img src="/squares.jpg" alt="image of four squares" className="preview-img" />
          <img src="/binarized.png" alt="binarized" className="preview-img" />
        </div>

        <aside className="control-panel">
          <h2 className="panel-title">Editing: {video}</h2>

          {/* COLOR PICKER */}
          <div className="control-block">
            <label className="control-label">Pick Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="color-picker"
            />
            <p className="value-text">Selected Color: {color}</p>
          </div>

          {/* THRESHOLD SLIDER */}
          <div className="control-block">
            <label htmlFor="threshold" className="control-label">Threshold</label>
            <input
              type="range"
              id="threshold"
              min="0"
              max="100"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="slider"
            />
            <p className="value-text">Selected Threshold: {threshold}</p>
          </div>

          <button className="start-btn">Begin</button>
        </aside>
      </section>
    </main>
  );
}
