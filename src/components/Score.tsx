interface ScoreProps {
    score: number;
    bestScore: number;
}

export default function Score({ score, bestScore }: ScoreProps) {
    return (
        <div className="flex flex-col">
            <span>Score: {score}</span>
            <span>Best score: {bestScore}</span>
        </div>
    );
}
