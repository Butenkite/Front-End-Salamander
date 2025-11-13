export default function Cardlist({list}) {
    return(
        <div className="card">
            {list.map((parseVideos) => (
                <Card list = {list}/>
            ))}
        </div>
    );
}