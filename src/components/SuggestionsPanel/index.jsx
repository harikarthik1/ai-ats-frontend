import "./index.css";

function SuggestionsPanel({ matched, missing, aiMissing, suggestions }) {
  return (
    <div className="suggestions-container">
      <div>
        <h3>Matched Keywords</h3>
        {matched.map((m, i) => (
          <span key={i} className="tag green">{m}</span>
        ))}
      </div>

      <div>
        <h3>Missing Keywords</h3>
        {missing.map((m, i) => (
          <span key={i} className="tag red">{m}</span>
        ))}
      </div>

      <div>
        <h3>AI Missing Skills</h3>
        {aiMissing.map((m, i) => (
          <span key={i} className="tag red">{m}</span>
        ))}
      </div>

      <div>
        <h3>AI Suggestions</h3>
        <ul>
          {suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SuggestionsPanel;