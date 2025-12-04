import Card from "./Card"

export default function Cardlist({list, onSelect, selectedVideo}) {
    return(
        <div className="card">
            {list.map((videoName) => (
                <Card key={videoName} 
                video = {videoName} 
                onClick={() => onSelect(videoName)}
                isSelected={videoName === selectedVideo}
                />
            ))}
        </div>
    );
}