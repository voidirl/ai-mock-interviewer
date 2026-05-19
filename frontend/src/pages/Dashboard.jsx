import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TOPICS = ["Arrays", "Linked Lists", "Trees", "Graphs", "Dynamic Programming", "System Design", "OS Concepts", "DBMS", "OOP", "SQL"];
const DIFFICULTIES = ["easy", "medium", "hard"];
const TYPES = ["coding", "conceptual", "system_design"];

const DIFF_META = {
    easy: { color: "#34d399", glow: "rgba(52,211,153,0.13)", label: "Easy", sub: "warm up", segs: 1 },
    medium: { color: "#f59e0b", glow: "rgba(245,158,11,0.13)", label: "Medium", sub: "real talk", segs: 2 },
    hard: { color: "#f43f5e", glow: "rgba(244,63,94,0.13)", label: "Hard", sub: "grind mode", segs: 3 },
};

const TYPE_META = {
    coding: { icon: "💻", label: "Coding", desc: "DSA & implementation", accent: "#818cf8" },
    conceptual: { icon: "🧠", label: "Conceptual", desc: "Theory & fundamentals", accent: "#34d399" },
    system_design: { icon: "🏗️", label: "System Design", desc: "Architecture & scale", accent: "#f59e0b" },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body, #root { height: 100%; background: #0c0e14; }

.db-root {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #0c0e14;
    color: #e2e8f0;
    font-family: 'Plus Jakarta Sans', sans-serif;
    position: relative;
    overflow: hidden;
}

/* subtle noise texture */
.db-root::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0; opacity: 0.4;
}

/* top accent bar */
.db-accent-bar {
    position: fixed; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, #6366f1 30%, #34d399 70%, transparent);
    z-index: 200;
}

/* glow blobs */
.db-blob1 {
    position: fixed;
    width: 560px; height: 560px; border-radius: 50%;
    background: radial-gradient(circle at center, rgba(99,102,241,0.08) 0%, transparent 70%);
    top: -220px; right: -120px;
    pointer-events: none; z-index: 0;
    filter: blur(40px);
}
.db-blob2 {
    position: fixed;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle at center, rgba(52,211,153,0.06) 0%, transparent 70%);
    bottom: -160px; left: -100px;
    pointer-events: none; z-index: 0;
    filter: blur(40px);
}

/* ─── NAV ─── */
.db-nav {
    position: relative; z-index: 100; flex-shrink: 0;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2.5rem; height: 60px;
    background: rgba(12,14,20,0.8);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.db-logo { display: flex; align-items: center; gap: 10px; }
.db-logo-mark {
    width: 32px; height: 32px; border-radius: 8px;
    background: linear-gradient(135deg, #6366f1, #34d399);
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; font-weight: 800; color: #fff;
    box-shadow: 0 0 16px rgba(99,102,241,0.3);
}
.db-logo-name {
    font-size: 16px; font-weight: 700; color: #f1f5f9; letter-spacing: -0.4px;
}
.db-logo-version {
    font-family: 'DM Mono', monospace; font-size: 10px;
    color: #6366f1; background: rgba(99,102,241,0.12);
    border: 1px solid rgba(99,102,241,0.25);
    padding: 2px 7px; border-radius: 4px; letter-spacing: 0.06em;
}
.db-nav-right { display: flex; align-items: center; gap: 16px; }
.db-online {
    display: flex; align-items: center; gap: 7px;
    font-family: 'DM Mono', monospace; font-size: 11px; color: #475569;
}
.db-online-pip {
    width: 7px; height: 7px; border-radius: 50%;
    background: #34d399; box-shadow: 0 0 8px rgba(52,211,153,0.7);
    animation: pip 2.4s ease-in-out infinite;
}
@keyframes pip {
    0%,100% { opacity:1; box-shadow: 0 0 8px rgba(52,211,153,0.7); }
    50%      { opacity:0.4; box-shadow: 0 0 3px rgba(52,211,153,0.3); }
}
.db-logout-btn {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 12px; font-weight: 500;
    color: #475569; background: transparent;
    border: 1px solid rgba(255,255,255,0.08);
    padding: 6px 16px; border-radius: 7px; cursor: pointer;
    transition: all 0.15s;
}
.db-logout-btn:hover { color: #94a3b8; border-color: rgba(255,255,255,0.16); background: rgba(255,255,255,0.03); }

/* ─── BODY: two-column layout ─── */
.db-body {
    position: relative; z-index: 1;
    flex: 1; display: flex;
    overflow: hidden;
}

/* LEFT PANEL — hero */
.db-left {
    width: 300px; flex-shrink: 0;
    display: flex; flex-direction: column; justify-content: center;
    padding: 2.5rem 2.5rem 2.5rem 3rem;
    border-right: 1px solid rgba(255,255,255,0.05);
}
.db-eyebrow {
    font-family: 'DM Mono', monospace; font-size: 10px;
    color: #6366f1; letter-spacing: 0.14em; text-transform: uppercase;
    margin-bottom: 1.4rem;
    display: flex; align-items: center; gap: 8px;
}
.db-eyebrow::before {
    content: ''; width: 20px; height: 1px; background: #6366f1;
}
.db-h1 {
    font-size: 32px; font-weight: 800; line-height: 1.15;
    letter-spacing: -1px; color: #f8fafc; margin-bottom: 1rem;
}
.db-h1 em {
    font-style: normal;
    background: linear-gradient(135deg, #6366f1 0%, #34d399 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.db-tagline {
    font-size: 13px; color: #475569; line-height: 1.7;
    margin-bottom: 2rem;
}
.db-stats {
    display: flex; flex-direction: column; gap: 10px;
}
.db-stat {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 14px; border-radius: 10px;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.06);
}
.db-stat-ico { font-size: 16px; }
.db-stat-info {}
.db-stat-val {
    font-family: 'DM Mono', monospace; font-size: 13px;
    font-weight: 500; color: #cbd5e1;
}
.db-stat-lbl { font-size: 11px; color: #334155; margin-top: 1px; }

/* RIGHT PANEL — config */
.db-right {
    flex: 1; display: flex; flex-direction: column;
    overflow-y: auto; overflow-x: hidden;
    scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.06) transparent;
    padding: 2rem 2.5rem 0;
}
.db-right::-webkit-scrollbar { width: 4px; }
.db-right::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 2px; }

.db-section { margin-bottom: 1.6rem; }

.db-section-hd {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 1rem;
}
.db-section-num {
    font-family: 'DM Mono', monospace; font-size: 10px;
    color: #6366f1; background: rgba(99,102,241,0.12);
    border: 1px solid rgba(99,102,241,0.2);
    width: 22px; height: 22px; border-radius: 5px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; font-weight: 500;
}
.db-section-title {
    font-size: 12px; font-weight: 600; color: #64748b;
    text-transform: uppercase; letter-spacing: 0.08em;
}

/* TOPIC CHIPS */
.db-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.db-chip {
    padding: 6px 14px; border-radius: 8px; font-size: 12.5px; font-weight: 500;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.02); color: #64748b;
    cursor: pointer; transition: all 0.15s;
    font-family: 'Plus Jakarta Sans', sans-serif;
}
.db-chip:hover { border-color: rgba(255,255,255,0.15); color: #94a3b8; background: rgba(255,255,255,0.04); }
.db-chip.on {
    border-color: rgba(99,102,241,0.5); background: rgba(99,102,241,0.12);
    color: #a5b4fc; font-weight: 600;
}

/* DIFFICULTY */
.db-diffs { display: flex; gap: 8px; }
.db-diff-btn {
    flex: 1; padding: 14px 12px; border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.02); cursor: pointer;
    transition: all 0.2s; font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex; flex-direction: column; align-items: flex-start; gap: 8px;
    text-align: left;
}
.db-diff-btn:hover { border-color: rgba(255,255,255,0.13); background: rgba(255,255,255,0.035); }
.db-diff-segs { display: flex; gap: 3px; }
.db-diff-seg { height: 3px; border-radius: 2px; width: 22px; transition: background 0.2s; }
.db-diff-name { font-size: 14px; font-weight: 700; transition: color 0.2s; }
.db-diff-sub {
    font-family: 'DM Mono', monospace; font-size: 10px; color: #334155; letter-spacing: 0.05em;
}

/* TYPES */
.db-types { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
.db-type-btn {
    padding: 16px 14px; border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.02); cursor: pointer;
    transition: all 0.2s; font-family: 'Plus Jakarta Sans', sans-serif;
    text-align: left; display: flex; flex-direction: column; gap: 8px;
}
.db-type-btn:hover { border-color: rgba(255,255,255,0.13); background: rgba(255,255,255,0.035); }
.db-type-ico { font-size: 24px; line-height: 1; }
.db-type-name { font-size: 13px; font-weight: 700; color: #94a3b8; transition: color 0.2s; }
.db-type-desc { font-family: 'DM Mono', monospace; font-size: 10px; color: #2d3748; letter-spacing: 0.03em; line-height: 1.4; }

/* FOOTER */
.db-footer {
    position: relative; z-index: 10; flex-shrink: 0;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.1rem 2.5rem;
    border-top: 1px solid rgba(255,255,255,0.06);
    background: rgba(12,14,20,0.95); backdrop-filter: blur(20px);
}
.db-preview { display: flex; align-items: center; gap: 6px; }
.db-pc {
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500;
    padding: 4px 10px; border-radius: 6px;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
}
.db-dot { color: #1e293b; font-size: 14px; }

.db-cta {
    display: flex; align-items: center; gap: 10px;
    background: linear-gradient(135deg, #6366f1, #34d399);
    border: none; color: #fff;
    padding: 12px 28px; border-radius: 10px;
    font-size: 14px; font-weight: 700; cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif; letter-spacing: -0.2px;
    box-shadow: 0 4px 24px rgba(99,102,241,0.3);
    transition: all 0.15s;
}
.db-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(99,102,241,0.4); }
.db-cta:active { transform: translateY(0); }
.db-cta-arrow { transition: transform 0.2s; display: inline-block; }
.db-cta:hover .db-cta-arrow { transform: translateX(4px); }
`;

const Dashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [topic, setTopic] = useState("Arrays");
    const [difficulty, setDifficulty] = useState("medium");
    const [questionType, setQuestionType] = useState("coding");

    const handleStart = () => {
        navigate("/interview", { state: { topic, difficulty, question_type: questionType } });
    };

    return (
        <>
            <style>{css}</style>
            <div className="db-root">
                <div className="db-accent-bar" />
                <div className="db-blob1" />
                <div className="db-blob2" />

                {/* NAV */}
                <nav className="db-nav">
                    <div className="db-logo">
                        <div className="db-logo-mark">M</div>
                        <span className="db-logo-name">MockForge</span>
                        <span className="db-logo-version">v1.0</span>
                    </div>
                    <div className="db-nav-right">
                        <div className="db-online">
                            <div className="db-online-pip" />
                            online
                        </div>
                        <button className="db-logout-btn" onClick={logout}>Sign out</button>
                    </div>
                </nav>

                {/* BODY */}
                <div className="db-body">

                    {/* LEFT — hero */}
                    <div className="db-left">
                        <div className="db-eyebrow">AI Interviewer</div>
                        <h1 className="db-h1">
                            Land your<br />
                            <em>dream job.</em>
                        </h1>
                        <p className="db-tagline">
                            Configure your session, face the AI,<br />
                            and get brutal honest feedback.
                        </p>
                        <div className="db-stats">
                            <div className="db-stat">
                                <span className="db-stat-ico">⚡</span>
                                <div className="db-stat-info">
                                    <div className="db-stat-val">5 Questions</div>
                                    <div className="db-stat-lbl">per session</div>
                                </div>
                            </div>
                            <div className="db-stat">
                                <span className="db-stat-ico">🤖</span>
                                <div className="db-stat-info">
                                    <div className="db-stat-val">Groq LLaMA</div>
                                    <div className="db-stat-lbl">powered by llama-3.3-70b</div>
                                </div>
                            </div>
                            <div className="db-stat">
                                <span className="db-stat-ico">📊</span>
                                <div className="db-stat-info">
                                    <div className="db-stat-val">Scored Feedback</div>
                                    <div className="db-stat-lbl">strengths + improvements</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — config */}
                    <div className="db-right">

                        {/* Topic */}
                        <div className="db-section">
                            <div className="db-section-hd">
                                <div className="db-section-num">1</div>
                                <span className="db-section-title">Choose Topic</span>
                            </div>
                            <div className="db-chips">
                                {TOPICS.map(t => (
                                    <button key={t} className={`db-chip ${topic === t ? "on" : ""}`} onClick={() => setTopic(t)}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Difficulty */}
                        <div className="db-section">
                            <div className="db-section-hd">
                                <div className="db-section-num">2</div>
                                <span className="db-section-title">Difficulty</span>
                            </div>
                            <div className="db-diffs">
                                {DIFFICULTIES.map(d => {
                                    const m = DIFF_META[d];
                                    const active = difficulty === d;
                                    return (
                                        <button
                                            key={d} className="db-diff-btn"
                                            onClick={() => setDifficulty(d)}
                                            style={{
                                                borderColor: active ? m.color : undefined,
                                                background: active ? m.glow : undefined,
                                            }}
                                        >
                                            <div className="db-diff-segs">
                                                {[0, 1, 2].map(i => (
                                                    <div key={i} className="db-diff-seg" style={{
                                                        background: i < m.segs
                                                            ? (active ? m.color : `${m.color}40`)
                                                            : "rgba(255,255,255,0.07)",
                                                    }} />
                                                ))}
                                            </div>
                                            <span className="db-diff-name" style={{ color: active ? m.color : "#475569" }}>
                                                {m.label}
                                            </span>
                                            <span className="db-diff-sub">{m.sub}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Type */}
                        <div className="db-section">
                            <div className="db-section-hd">
                                <div className="db-section-num">3</div>
                                <span className="db-section-title">Question Type</span>
                            </div>
                            <div className="db-types">
                                {TYPES.map(type => {
                                    const m = TYPE_META[type];
                                    const active = questionType === type;
                                    return (
                                        <button
                                            key={type}
                                            className="db-type-btn"
                                            onClick={() => setQuestionType(type)}
                                            style={{
                                                borderColor: active ? `${m.accent}55` : undefined,
                                                background: active ? `${m.accent}0f` : undefined,
                                            }}
                                        >
                                            <span className="db-type-ico">{m.icon}</span>
                                            <span className="db-type-name" style={{ color: active ? m.accent : undefined }}>{m.label}</span>
                                            <span className="db-type-desc">{m.desc}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* spacer so content doesn't sit behind footer */}
                        <div style={{ height: "5rem" }} />
                    </div>
                </div>

                {/* STICKY FOOTER */}
                <div className="db-footer">
                    <div className="db-preview">
                        <span className="db-pc" style={{ color: "#a5b4fc" }}>{topic}</span>
                        <span className="db-dot">·</span>
                        <span className="db-pc" style={{ color: DIFF_META[difficulty].color }}>{difficulty}</span>
                        <span className="db-dot">·</span>
                        <span className="db-pc" style={{ color: "#94a3b8" }}>{questionType.replace("_", " ")}</span>
                    </div>
                    <button className="db-cta" onClick={handleStart}>
                        Start Session <span className="db-cta-arrow">→</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Dashboard;