export default function Card({ video, onClick }) {
    return(
        <div className="card-item" onClick={onClick}>
            <p>{video}</p>
        </div>
    )
}