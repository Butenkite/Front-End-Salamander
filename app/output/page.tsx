"use client";
import {useEffect, useState } from "react";
import "./output.css";
import Link from "next/link";

export default function OutputPage(){
    const [outputs, setOutputs] = useState([]);

    useEffect(() => {
      async function loadOutputs(){
        try{
          const res = await fetch("http://localhost:3000/api/status");
          const data = await res.json();
          setOutputs(data);
      } catch (err) {
        console.error("failed to fetch outputs:", err);
        } 
      }
      loadOutputs();
    }, []);

    return(
    <main className="output-container">
        <nav className="top-nav">
        <h1 className="logo">Salamander Video Output</h1>
          <div className="nav-right">
        <Link href="/" className="nav-btn">Home</Link>
        <Link href="/edit" className="nav-btn">Edit</Link>
          </div>
        </nav>

        <p className="instructions">
         Output Instructions: select the link of the video output and a csv file
        should pop up and have the ability to scroll through the results
        </p>

         <section className="output-grid">
          {outputs.length === 0 && (
          <p style={{ color: "white" }}>No CSV outputs found.</p>
        )}
          
        {outputs.map((out, index) => (
          <div key={index} className="output-card">
            <h2 className="video-title">{out.name}</h2>

            <div className="scroll-box">
              {out.done ? (
                out.csv.length > 0? (
                out.csv.map((line, i) => <p key={i}>{line}</p>)
              ) : (
                <p>No CSV data available</p>
              )
            ) : (
                <p>STILL PROCESSING</p>
              )}
            </div>

            <p className="csv-label">Output csv {index + 1}</p>

            <button className="delete-btn">Delete Output</button>
          </div>
        ))}
      </section>
    </main>
);
}