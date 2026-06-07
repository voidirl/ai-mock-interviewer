import { useLocation, useNavigate } from "react-router-dom";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500;600&family=Outfit:wght@300;400;500;600;700&display=swap');

*, *::before, *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}
  .fb.root{
    min-height: 100vh;
    background: #080b12;
    color: #e2e8f0;
    font-family: 'Outfit', sans-serif;}

  .fb-grid-bg{
    position: fixed;
    inset: 0;
    background-image: 
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0; }

  .fb-nav{
    display: flex;
    position: sticky;
    top: 0;
    z-index: 100;
    align-items: center;
    justify-content: space-between;
    padding: 0rem 2rem;
    height: 54px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    background: rgba(8,11,18,0.9);
    backdrop-filter: blur(20px); }

   .fb-logo{  
     display: flex;
     align-items: center; gap: 8px;
     font-size: 14px; font-weight: 600;
     color: #f1f5f9; }

    .fb-logo-icon {
    width: 26px; height: 26px;
    border-radius: 6px;
    background: linear-gradient(135deg,#00d2a0,#0ea5e9);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #080b12; }

    .fb-home-btn {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.07);
    color: #475569;
    padding: 5px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    font-family: 'Outfit', sans-serif;
    transition: all 0.15s;
}
.fb-home-btn:hover { color: #94a3b8; border-color: rgba(255,255,255,0.15); }

.fb-body {
    position: relative;
    z-index: 1;
    max-width: 820px;
    margin: 0 auto;
    padding: 2.5rem 2rem 4rem;
}

/* Hero Score */
.fb-hero {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 2.5rem;
    gap: 2rem;
    flex-wrap: wrap;
}
 
.fb-hero-left {}

.fb-hero-tag {
    font-family: 'Geist Mono', monospace;
    font-size: 10px;
    color: #334155;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.6rem;
}
 
.fb-hero-score {
    font-size: 72px;
    font-weight: 700;
    font-family: 'Geist Mono', monospace;
    line-height: 1;
    letter-spacing: -3px;
}

.fb-hero-denom {
    font-size: 28px;
    color: #1e293b;
    font-weight: 400;
}
 
.fb-hero-verdict {
    font-size: 15px;
    color: #475569;
    margin-top: 0.6rem;
    font-style: italic;
}
 
.fb-hero-right {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-end;
}
.fb-stat-chip {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 8px;
    padding: 8px 14px;
    min-width: 160px;
    justify-content: space-between;
}
 
.fb-stat-label {
    font-family: 'Geist Mono', monospace;
    font-size: 10px;
    color: #334155;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}
 
.fb-stat-val {
    font-family: 'Geist Mono', monospace;
    font-size: 13px;
    font-weight: 600;
}

/* Divider */
.fb-divider {
    height: 1px;
    background: rgba(255,255,255,0.05);
    margin: 2rem 0;
}

/* Section Label */
.fb-section-label {
    font-family: 'Geist Mono', monospace;
    font-size: 10px;
    color: #334155;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 8px;
}
.fb-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.04);
}

/* Score bars */
.fb-score-bars {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 2rem;
}
 
.fb-bar-row {
    display: flex;
    align-items: center;
    gap: 12px;
}

.fb-bar-label {
    font-family: 'Geist Mono', monospace;
    font-size: 11px;
    color: #475569;
    width: 70px;
    flex-shrink: 0;
    text-align: right;
}
 
.fb-bar-track {
    flex: 1;
    height: 5px;
    background: rgba(255,255,255,0.05);
    border-radius: 3px;
    overflow: hidden;
}
.fb-bar-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 1s ease;
}
 
.fb-bar-val {
    font-family: 'Geist Mono', monospace;
    font-size: 11px;
    width: 32px;
    flex-shrink: 0;
    text-align: right;
}

/* Q Breakdown */
.fb-q-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
 
.fb-q-item {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    overflow: hidden;
    animation: fadeSlideIn 0.3s ease both;
}
 
@keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
}
 
.fb-q-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 1rem 1.2rem;
    cursor: pointer;
    transition: background 0.15s;
}
.fb-q-header:hover { background: rgba(255,255,255,0.02); }

.fb-q-num {
    font-family: 'Geist Mono', monospace;
    font-size: 11px;
    color: #334155;
    width: 22px;
    flex-shrink: 0;
}
 
.fb-q-score-badge {
    width: 38px;
    height: 38px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Geist Mono', monospace;
    font-size: 13px;
    font-weight: 600;
    flex-shrink: 0;
}
.fb-q-summary {
    flex: 1;
    min-width: 0;
}
 
.fb-q-text-preview {
    font-size: 13px;
    color: #94a3b8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 3px;
}
 
.fb-q-verdict-small {
    font-size: 11px;
    color: #334155;
    font-style: italic;
}

.fb-q-chevron {
    font-size: 12px;
    color: #334155;
    transition: transform 0.2s;
    flex-shrink: 0;
}
.fb-q-chevron.open { transform: rotate(90deg); }
 
.fb-q-detail {
    border-top: 1px solid rgba(255,255,255,0.04);
    padding: 1rem 1.2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    animation: fadeSlideIn 0.2s ease;
}

.fb-detail-section {}

.fb-detail-title {
    font-family: 'Geist Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
}
 
.fb-detail-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    list-style: none;
}
.fb-detail-list li {
    font-size: 12px;
    color: #64748b;
    display: flex;
    gap: 6px;
    line-height: 1.5;
}
 
.fb-model-ans {
    grid-column: 1 / -1;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.04);
    border-radius: 8px;
    padding: 0.8rem 1rem;
    font-size: 12px;
    color: #475569;
    line-height: 1.7;
}
 
/*Footer actions */
.fb-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 2.5rem;
}
 
.fb-retry-btn {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    color: #94a3b8;
    padding: 10px 24px;
    border-radius: 9px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Outfit', sans-serif;
    transition: all 0.15s;
}

.fb-retry-btn:hover { background: rgba(255,255,255,0.07); }
 
.fb-new-btn {
    background: linear-gradient(135deg,#00d2a0,#0ea5e9);
    border: none;
    color: #080b12;
    padding: 10px 28px;
    border-radius: 9px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Outfit', sans-serif;
    transition: opacity 0.15s, transform 0.1s;
}
.fb-new-btn:hover { opacity: 0.9; transform: translateY(-1px); }

/* Empty */
.fb-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    gap: 12px;
    color: #334155;
    font-family: 'Geist Mono', monospace;
    font-size: 13px;
}
`;

const scoreColor = (s) => {
    if (s >= 80) return "#4ade80";
    if (s >= 50) return "#fb923c";
    return "#f87171";
};

const scoreGrade = (avg) => {
    if (avg >= 85) return { label: "Exceptional", color: "#4ade80" };
    if (avg >= 70) return { label: "Solid", color: "#a3e635" };
    if (avg >= 55) return { label: "Decent", color: "#fb923c" };
    if (avg >= 40) return { label: "Needs Work", color: "#f97316" };
    return { label: "Keep Grinding", color: "#f87171" };
};
const Feedback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { session = [], config = {} } = location.state || {};

    const [expanded, setExpanded] = useState(null);

    if (!session.length) {
        return (
            <>
                <style>{css}</style>
                <div className="fb-root">
                    <div className="fb-empty">
                        <span>no session data found</span>
                        <button className="fb-new-btn" onClick={() => navigate("/dashboard")}>← back to dashboard</button>
                    </div>
                </div>
            </>
        );
    }

    const scores = session.map(s => s.result.score);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const best = Math.max(...scores);
    const worst = Math.min(...scores);
    const grade = scoreGrade(avg);

    const toggleExpand = (i) => setExpanded(e => e === i ? null : i);

    return (
        <>
            <style>{css}</style>
            <div className="fb-root">
                <div className="fb-grid-bg" />

                <nav className="fb-nav">
                    <div className="fb-logo">
                        <div className="fb-logo-icon">M</div>
                        MockForge
                    </div>
                    <button className="fb-home-btn" onClick={() => navigate("/dashboard")}>← Dashboard</button>
                </nav>
                <div className="fb-body">

                    {/* Hero */}
                    <div className="fb-hero">
                        <div className="fb-hero-left">
                            <div className="fb-hero-tag">session complete · {session.length} questions</div>
                            <div className="fb-hero-score" style={{ color: grade.color }}>
                                {avg}<span className="fb-hero-denom">/100</span>
                            </div>
                            <div className="fb-hero-verdict">{grade.label}</div>
                        </div>
                        <div className="fb-hero-right">
                            {[
                                { label: "topic", val: config.topic, color: "#00d2a0" },
                                { label: "difficulty", val: config.difficulty, color: "#fb923c" },
                                { label: "best score", val: `${best}/100`, color: "#4ade80" },
                                { label: "worst score", val: `${worst}/100`, color: "#f87171" },
                                { label: "type", val: config.question_type?.replace("_", " "), color: "#94a3b8" },
                            ].map(s => (
                                <div key={s.label} className="fb-stat-chip">
                                    <span className="fb-stat-label">{s.label}</span>
                                    <span className="fb-stat-val" style={{ color: s.color }}>{s.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="fb-divider" />

                    {/* Per-question bars */}
                    <div className="fb-section-label">score breakdown</div>
                    <div className="fb-score-bars">
                        {session.map((s, i) => (
                            <div key={i} className="fb-bar-row">
                                <span className="fb-bar-label">Q{i + 1}</span>
                                <div className="fb-bar-track">
                                    <div
                                        className="fb-bar-fill"
                                        style={{
                                            width: `${s.result.score}%`,
                                            background: scoreColor(s.result.score),
                                        }}
                                    />
                                </div>
                                <span className="fb-bar-val" style={{ color: scoreColor(s.result.score) }}>{s.result.score}</span>
                            </div>
                        ))}
                    </div>

                    <div className="fb-divider" />

                    {/* Q breakdown */}
                    <div className="fb-section-label">question review</div>
                    <div className="fb-q-list">
                        {session.map((s, i) => {
                            const open = expanded === i;
                            const sc = s.result.score;
                            const c = scoreColor(sc);
                            return (
                                <div key={i} className="fb-q-item" style={{ animationDelay: `${i * 0.05}s` }}>
                                    <div className="fb-q-header" onClick={() => toggleExpand(i)}>
                                        <span className="fb-q-num">Q{i + 1}</span>
                                        <div
                                            className="fb-q-score-badge"
                                            style={{ background: `${c}18`, border: `1px solid ${c}30`, color: c }}
                                        >{sc}</div>
                                        <div className="fb-q-summary">
                                            <div className="fb-q-text-preview">{s.question}</div>
                                            <div className="fb-q-verdict-small">"{s.result.verdict}"</div>
                                        </div>
                                        <span className={`fb-q-chevron ${open ? "open" : ""}`}>▶</span>
                                    </div>

                                    {open && (
                                        <div className="fb-q-detail">
                                            <div className="fb-detail-section">
                                                <div className="fb-detail-title" style={{ color: "#4ade80" }}>Strengths</div>
                                                <ul className="fb-detail-list">
                                                    {s.result.strengths.map((str, j) => (
                                                        <li key={j}><span style={{ color: "#166534" }}>+</span>{str}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="fb-detail-section">
                                                <div className="fb-detail-title" style={{ color: "#fb923c" }}>Improvements</div>
                                                <ul className="fb-detail-list">
                                                    {s.result.improvements.map((imp, j) => (
                                                        <li key={j}><span style={{ color: "#7c2d12" }}>!</span>{imp}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="fb-model-ans">
                                                <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10, color: "#334155", display: "block", marginBottom: 5, letterSpacing: "0.1em", textTransform: "uppercase" }}>model answer</span>
                                                {s.result.model_answer_summary}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    <div className="fb-footer">
                        <button className="fb-retry-btn" onClick={() => navigate("/interview", { state: config })}>
                            ↺ retry same config
                        </button>
                        <button className="fb-new-btn" onClick={() => navigate("/dashboard")}>
                            New Session →
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Feedback;
