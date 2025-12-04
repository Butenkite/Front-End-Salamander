export default function Card({ video, onClick, isSelected }) {
    return(
        <div className={`card-item ${isSelected ? 'selected' : ''}`} onClick={onClick}>
            <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5v14l11-7L8 5z" fill="currentColor"/>
                </svg>
            </div>
            <div className="card-content">
                <h3 className="card-title">{video}</h3>
                <p className="card-subtitle">Video file • Ready to process</p>
            </div>
            <div className="card-arrow">→</div>
        </div>
    )
}