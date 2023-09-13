export default function Score({ score, bestScore }) {
    return (
        <div className="flex flex-col">
            <span>Score: {score}</span>
            <span>Best score: {bestScore}</span>
        </div>
    );
}
