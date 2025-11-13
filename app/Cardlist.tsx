import Card from "./Card"

export default function Cardlist({list}) {
    return(
        <div className="card">
            {list.map((video) => (
                <Card key={video.id} video = {video}/>
            ))}
        </div>
    );
}