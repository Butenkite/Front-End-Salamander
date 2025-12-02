import Card from "./Card"

export default function Cardlist({list, onSelect}) {
    return(
        <div className="card">
            {list.map((videoName) => (
                <Card key={videoName} 
                video = {videoName} 
                onClick={() => onSelect(videoName)}
                />
            ))}
        </div>
    );
}