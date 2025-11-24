import Card from "./Card"

export default function Cardlist({list, onSelect}) {
    return(
        <div className="card">
            {list.map((video) => (
                <Card key={video.id} 
                video = {video} 
                onClick={() => onSelect(video.name)}
                />
            ))}
        </div>
    );
}