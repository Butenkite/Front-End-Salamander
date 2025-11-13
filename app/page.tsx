import videoList from "../samples/testVideoList.json";
import Cardlist from "./Cardlist"
import {videoParser} from "./videoParser"

const parsedVideos = videoParser(videoList)

export default function Page({videoList}) {
  return (
  <main>
    <nav>
      <h1>Salamander Finder</h1>
      <button>outputs</button>
    </nav>
    <div>
      <Cardlist list={parsedVideos}/>
      <div>
      </div>
      <aside>
        <h2>Currently selected:  videoname </h2>
        <div>
          <button>start job </button>
        </div>
      </aside>
    </div>
  </main>
  )
}