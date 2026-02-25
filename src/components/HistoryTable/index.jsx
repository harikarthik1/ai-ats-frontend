import "./index.css";

function getScoreClass(score) {
  if (score >= 80) return "score-green";
  if (score >= 60) return "score-yellow";
  return "score-red";
}

function HistoryTable({ history }) {
  return (
    <div className="history-card">
      <h2>Analysis History</h2>
      <div className="table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>Resume</th>
              <th>Final Score</th>
              <th>AI Score</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.resumeFileName}</td>

                <td>
                  <span className={`score-badge ${getScoreClass(item.finalScore)}`}>
                    {item.finalScore}%
                  </span>
                </td>

                <td>
                  <span className={`score-badge ${getScoreClass(item.semanticScore)}`}>
                    {item.semanticScore}%
                  </span>
                </td>

                <td>
                  {new Date(item.analyzedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryTable;