import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TOPICS = ["Arrays", "Linked Lists", "Trees", "Graphs", "Dynamic Programming", "System Design", "OS Concepts", "DBMS", "OOP", "SQL"];
const DIFFICULTIES = ["easy", "medium", "hard"];
const TYPES = ["coding", "conceptual", "system_design"];

const DIFF_COLORS = {
    easy: { border: "#22c55e", bg: "rgba(34,197,94,0.1)", text: "#22c55e" },
    medium: { border: "#f59e0b", bg: "rgba(245,158,11,0.1)", text: "#f59e0b" },
    hard: { border: "#ef4444", bg: "rgba(239,68,68,0.1)", text: "#ef4444" },
};

const TYPE_LABELS = {
    coding: "💻 Coding",
    conceptual: "🧠 Conceptual",
    system_design: "🏗️ System Design",
};

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
        <div style={{ minHeight: "100vh", background: "#0f1117", color: "#e2e8f0", fontFamily: "'Inter', sans-serif" }}>
            <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2rem", borderBottom: "1px solid #1e2533" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg,#00d2a0,#0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
                    <span style={{ fontWeight: 600, fontSize: 16 }}>MockForge</span>
                </div>
                <button onClick={logout} style={{ background: "transparent", border: "1px solid #2d3748", color: "#94a3b8", padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>Logout</button>
            </nav>

            <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 1.5rem" }}>
                <div style={{ marginBottom: "2.5rem" }}>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.5px", margin: 0 }}>Ready to grind?</h1>
                    <p style={{ color: "#64748b", marginTop: 6, fontSize: 15 }}>Configure your session and start the interview.</p>
                </div>

                <div style={{ background: "#161b27", border: "1px solid #1e2d3d", borderRadius: 14, padding: "2rem", marginBottom: "2rem" }}>
                    <h2 style={{ fontSize: 13, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>Session config</h2>

                    <div style={{ marginBottom: "1.5rem" }}>
                        <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 10 }}>Topic</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {TOPICS.map(t => (
                                <button key={t} onClick={() => setTopic(t)} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 13, border: topic === t ? "1px solid #00d2a0" : "1px solid #2d3748", background: topic === t ? "rgba(0,210,160,0.1)" : "transparent", color: topic === t ? "#00d2a0" : "#94a3b8", cursor: "pointer" }}>{t}</button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                        <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 10 }}>Difficulty</label>
                        <div style={{ display: "flex", gap: 8 }}>
                            {DIFFICULTIES.map(d => {
                                const c = DIFF_COLORS[d];
                                const active = difficulty === d;
                                return (
                                    <button key={d} onClick={() => setDifficulty(d)} style={{ padding: "7px 20px", borderRadius: 8, fontSize: 13, fontWeight: 500, border: active ? `1px solid ${c.border}` : "1px solid #2d3748", background: active ? c.bg : "transparent", color: active ? c.text : "#94a3b8", cursor: "pointer", textTransform: "capitalize" }}>{d}</button>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 10 }}>Question type</label>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {TYPES.map(type => (
                                <button key={type} onClick={() => setQuestionType(type)} style={{ padding: "7px 18px", borderRadius: 8, fontSize: 13, border: questionType === type ? "1px solid #0ea5e9" : "1px solid #2d3748", background: questionType === type ? "rgba(14,165,233,0.1)" : "transparent", color: questionType === type ? "#0ea5e9" : "#94a3b8", cursor: "pointer" }}>{TYPE_LABELS[type]}</button>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ color: "#64748b", fontSize: 14 }}>
                        <span style={{ color: "#00d2a0" }}>{topic}</span>{" · "}
                        <span style={{ color: DIFF_COLORS[difficulty].text }}>{difficulty}</span>{" · "}
                        <span style={{ color: "#94a3b8" }}>{questionType.replace("_", " ")}</span>
                    </p>
                    <button onClick={handleStart} style={{ background: "linear-gradient(135deg,#00d2a0,#0ea5e9)", border: "none", color: "#0f1117", padding: "10px 28px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                        Start Interview →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
