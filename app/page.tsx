"use client";

import { useEffect, useState } from "react";
import {useRouter } from "next/navigation";
import Link from "next/link";
import Cardlist from "./Cardlist";
import './home.css';

console.log("CURRENT WORKING DIR:", process.cwd());

export default function Page() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const router = useRouter();

  //FETCHING backend on page load
  useEffect(() => {
    async function loadVideos(){
      try{
        const res = await fetch("/api/videos");
        const data = await res.json();
        console.log("Fetch Response", data);
        
        if (Array.isArray(data)){
          setVideos(data);
        } else {
          console.error("Invalid response format: ", data);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    }
    loadVideos();
  }, []);



  return (
    <main className="app-container">
      <nav className="top-nav">
        <h1 className="logo">Salamander Finder</h1>
        <div className="nav-right">
        <Link href="/output" className="nav-btn">Outputs</Link>
        </div>
      </nav>

      <section className="content-layout">
        <div className="cardlist-section">
          <Cardlist 
            list={videos}
            onSelect={setSelectedVideo}
            selectedVideo={selectedVideo}
          />
        </div>

        <aside className="sidebar">
          <h2 className="sidebar-title">
            Currently selected:{" "}
            <span className="highlight">{selectedVideo ?? "none"}</span>
          </h2>

          <div className="sidebar-actions">
            <button className="start-btn"
              onClick={() => {
                if (!selectedVideo) return;
                router.push(`/edit?video=${selectedVideo}`);
              }}
            >
              Start Job
              </button>
          </div>
        </aside>
      </section>
    </main>
  );
}