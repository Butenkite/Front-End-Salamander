"use client";

import { useState } from "react";
import {useRouter } from "next/navigation";
import Link from "next/link";
import videoList from "../samples/testVideoList.json";
import Cardlist from "./Cardlist";
import { videoParser } from "./videoParser";
import './home.css';


const parsedVideos = videoParser(videoList);

export default function Page() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const router = useRouter();

  return (
    <main className="app-container">
      <nav className="top-nav">
        <h1 className="logo">Salamander Finder</h1>
        <div className="nav-right">
        <Link href="/edit" className="nav-btn">Edit</Link>
        <Link href="/output" className="nav-btn">Outputs</Link>
        </div>
      </nav>

      <section className="content-layout">
        <div className="cardlist-section">
          <Cardlist 
            list={parsedVideos}
            onSelect={setSelectedVideo}
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