import { useEffect, useState } from "react";
import "./index.css";

function CircularProgress({ value, size = 140, stroke = 10, label }) {
  const [progress, setProgress] = useState(0);

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    setTimeout(() => {
      setProgress(value);
    }, 200);
  }, [value]);

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="circle-wrapper" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          className="circle-bg"
          strokeWidth={stroke}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        <circle
          className="circle-progress"
          strokeWidth={stroke}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <div className="circle-content">
        <h2>{progress}%</h2>
        <p>{label}</p>
      </div>
    </div>
  );
}

function ScoreCard({ finalScore, semanticScore, keywordScore }) {
  const isMobile = window.innerWidth < 480;
  return (
    <div className="score-card">
      <CircularProgress
        value={finalScore}
        size={isMobile ? 150 : 180}
        stroke={12}
        label="Final Score"
      />

      <div className="score-small">
        <CircularProgress
          value={semanticScore}
          size={120}
          stroke={10}
          label="Semantic"
        />

        <CircularProgress
          value={keywordScore}
          size={120}
          stroke={10}
          label="Keyword"
        />
      </div>
    </div>
  );
}

export default ScoreCard;