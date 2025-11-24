import videoList from "../samples/testVideoList.json";
import Cardlist from "./Cardlist";
import { videoParser } from "./videoParser";
import './home.css';
import Link from "next/link";

const parsedVideos = videoParser(videoList);

export default function Page({ videoList }) {
  return (
    <main className="app-container">
      <nav className="top-nav">
        <h1 className="logo">Salamander Finder</h1>
        <Link href="/output" className="nav-btn">Outputs</Link>
      </nav>

      <section className="content-layout">
        <div className="cardlist-section">
          <Cardlist list={parsedVideos} />
        </div>

        <aside className="sidebar">
          <h2 className="sidebar-title">
            Currently selected: <span className="highlight">videoname</span>
          </h2>

          <div className="sidebar-actions">
            <button className="start-btn">Start Job</button>
          </div>
        </aside>
      </section>
    </main>
  );
}