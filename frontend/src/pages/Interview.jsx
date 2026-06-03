import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API = "http://localhost:8000";
const TOTAL_QUESTIONS = 5;

const css = `
@import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500;600&family=Outfit:wght@300;400;500;600;700&display=swap');
*,*:: before, *::after {
    box - sizing : border - box; margin: 0; padding: 0;
}

.iv-root{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Outfit', sans-serif;
    background: #080b12;
    color: #e2e8f0; 
}

.iv-grid-bg {
    position: fixed;
    inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
}

// NAV
.iv-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    height: 54px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    background: rgba(8,11,18,0.9);
    backdrop-filter: blur(20px);
    flex-shrink: 0;
}

.iv-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 600;
    color: #f1f5f9;
}

.iv-logo-icon { 
    width: 26px; height: 26px;
    border-radius: 6px;
    background: linear-gradient(135deg,#00d2a0,#0ea5e9);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #080b12;
}

.iv-nav-center{
    display; flex;
    align-items: center; gap: 6px;
}

.iv-q-pip{
    width: 26px; height: 4px;
    border-radius: 2px;
    transition: background 0.3s;
}

.iv-nav-right{
    display; flex; align-items: center; gap: 14px;
}

.iv-timer{
    font-family: 'Geist Mono', monospace;
    font-size: 13px; padding: 4px 10px;
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.7);
    background: rgba(255,255,255,0.03);
    min-width: 60px; text-align: center;
}

.iv-exit-btn{
    background; transparent:
    border: 1px solid rgba(255,255,255,0.7);
    color: #475569;
    padding: 4px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    font-family: 'Outfit', sans-serif;
    transition: all 0.15s;
}

.iv-exit-btn:hover{border-color: rgba(255,255,255,0.15); color: #94a3b8;}

// Main Layout
.iv-body{
    position: relative;
    z-index: 1;
    flex:1; display: flex;
    flex-direction: column;
    max-width: 860px;
    margin: 0 auto;
    width: 100%;
    padding: 2rem 2rem 1 rem;
    gap: 1.2rem;
}

// Question Card
.iv-q-card{
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    padding: 1.6rem;
    animation: fadeSlideIn 0.3s ease;
}

@keyframes fadeSlideIn {
    from {opacity: 0; transform: translateY(10px);}
    to {opacity: 1; transform: translateY(0);}
}

.iv-q-meta{
    display: flex; 
    align-items: center;
    gap: 8px;
    margin-bottom: 1rem;
    flex-wrap: wrap;
}

.iv-badge{
    font-family: 'Geist Mono', monospace;
    font-size: 10px;
    padding: 3px 8px;
    border-radius: 4px;
    font-weight: 500;
    letter-spacing: 0.05rem;
}

.iv-q-text{
    font-size: 17px;
    font-weight: 500;
    color: #f1f5f9;
    line-height: 1.6;
    letter-spacing: -0.2px;
}

.iv-hints{
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.iv-hint-item{
    font-size: 12px;
    color: #475569;
    font-family: 'Geist Mono', monospace;
    display: flex;
    gap: 6px;
}

.iv-hint-item::before{
    content: '->';
    color: #1e3a2f;
}

// Answer Area
.iv-answer-card{
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    overflow: hidden;
}

.iv-answer-hidden{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.9rem 1.4rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    background: rgba(255,255,255,0.01);
}

.iv-answer-label {
    font-family: 'Geist Mono', monospace;
    font-size: 10px;
    color: #334155;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

.iv-lang-select {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    color: #94a3b8;
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Geist Mono', monospace;
}

.iv-monaco-wrap {
    height: 280px;
}
 
.iv-textarea {
    width: 100%;
    min-height: 180px;
    background: transparent;
    border: none;
    color: #cbd5e1;
    font-size: 14px;
    font-family: 'Outfit', sans-serif;
    resize: none;
    padding: 1.2rem 1.4rem;
    outline: none;
    line-height: 1.7;
}

.iv-textarea::placeholder { color: #1e293b; }


// Actions
.iv-actions{
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 0.8rem 1.4rem;
    align-items: center;
    border-top: 1px solid rgba(255,255,255,0.04);
    background: rgba(255,255,255,0.01);
}

.iv-hint-toggle {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.07);
    color: #475569;
    padding: 6px 14px;
    border-radius: 7px;
    cursor: pointer;
    font-size: 12px;
    font-family: 'Outfit', sans-serif;
    transition: all 0.15s;
}

.iv-hint-toggle:hover { color: #64748b; border-color: rgba(255,255,255,0.12); }

.iv-submit-btn {
    background: linear-gradient(135deg,#00d2a0,#0ea5e9);
    border: none;
    color: #080b12;
    padding: 8px 22px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Outfit', sans-serif;
    transition: opacity 0.15s, transform 0.1s;
    display: flex;
    align-items: center;
    gap: 6px;
}

.iv-submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.iv-submit-btn:not(:disabled):hover { opacity: 0.9; transform: translateY(-1px); }


// Loading..
.iv-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 3rem;
    color: #334155;
    font-family: 'Geist Mono', monospace;
    font-size: 13px;
}

.iv-spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(0,210,160,0.2);
    border-top-color: #00d2a0;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }


// Result Card

.iv-result-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    padding: 1.6rem;
    animation: fadeSlideIn 0.3s ease;
}

.iv-score-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.2rem;
}

.iv-score-num {
    font-size: 40px;
    font-weight: 700;
    font-family: 'Geist Mono', monospace;
    line-height: 1;
}
 
.iv-verdict {
    font-size: 13px;
    color: #64748b;
    margin-top: 4px;
    font-style: italic;
}
 
.iv-score-bar-bg {
    flex: 1;
    height: 6px;
    background: rgba(255,255,255,0.05);
    border-radius: 3px;
    margin: 0 1.5rem;
    overflow: hidden;
}
.iv-score-bar-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.8s ease;
}
 
.iv-result-sections {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.2rem;
}
 
.iv-result-section-title {
    font-family: 'Geist Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.6rem;
}
 
.iv-result-list {
    display: flex;
    flex-direction: column;
    gap: 5px;
    list-style: none;
}
 
.iv-result-list li {
    font-size: 13px;
    color: #94a3b8;
    display: flex;
    gap: 7px;
    line-height: 1.5;
}
 
.iv-model-summary {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 10px;
    padding: 1rem 1.2rem;
    font-size: 13px;
    color: #64748b;
    line-height: 1.7;
    margin-bottom: 1rem;
}
 
.iv-result-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}
 
.iv-followup-btn {
    background: rgba(99,102,241,0.1);
    border: 1px solid rgba(99,102,241,0.25);
    color: #818cf8;
    padding: 7px 16px;
    border-radius: 7px;
    cursor: pointer;
    font-size: 12px;
    font-family: 'Outfit', sans-serif;
    transition: all 0.15s;
}
.iv-followup-btn:hover { background: rgba(99,102,241,0.15); }
.iv-followup-btn:disabled { opacity: 0.4; cursor: not-allowed; }
 
.iv-next-btn {
    background: linear-gradient(135deg,#00d2a0,#0ea5e9);
    border: none;
    color: #080b12;
    padding: 8px 20px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Outfit', sans-serif;
    transition: opacity 0.15s, transform 0.1s;
}
.iv-next-btn:hover { opacity: 0.9; transform: translateY(-1px); }
 
/* FOLLOWUP */
.iv-followup-card {
    background: rgba(99,102,241,0.05);
    border: 1px solid rgba(99,102,241,0.15);
    border-radius: 12px;
    padding: 1.2rem 1.4rem;
    animation: fadeSlideIn 0.3s ease;
}
 
.iv-followup-label {
    font-family: 'Geist Mono', monospace;
    font-size: 10px;
    color: #6366f1;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
}
 
.iv-followup-q {
    font-size: 15px;
    color: #c7d2fe;
    font-weight: 500;
    line-height: 1.5;
}
 
/* ERROR */
.iv-error {
    background: rgba(248,113,113,0.07);
    border: 1px solid rgba(248,113,113,0.2);
    border-radius: 10px;
    padding: 0.8rem 1.2rem;
    font-size: 13px;
    color: #f87171;
    font-family: 'Geist Mono', monospace;
}
 
/* EMPTY STATE */
.iv-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    gap: 12px;
    color: #334155;
    font-family: 'Geist Mono', monospace;
    font-size: 13px;
}
`;


const LANGUAGES = ["javascript", "python", "java", "cpp", "go", "typescript"];

const scoreColor = (s) => {
    if (s >= 80) return "#4ade80";
    if (s >= 50) return "#fb923c";
    return "#f87171";
};

const useTimer = (limitMin, active) => {
    const [secs, setSecs] = useState(limitMin * 60);
    useEffect(() => {
        if (!active) return;
        setSecs(limitMin * 60);
        const id = setInterval(() => setSecs(s => s > 0 ? s - 1 : 0), 1000);
        return () => clearInterval(id);
    }, [limitMin, active]);
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return { display: `${m}:${s}`, urgent: secs < 60 };
};

const Interview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { token } = useAuth();
    const config = location.state || {};

    const [qNum, setQNum] = useState(0);
    const [question, setQuestion] = useState(null);
    const [loadingQ, setLoadingQ] = useState(false);
    const [language, setLanguage] = useState("python");
    const [submitting, setSubmitting] = useState(false);
    const [loadingFollowup, setLoadingFollowup] = useState(false);
    const [followup, setFollowup] = useState(null);
    const [error, setError] = useState("");
    const [convoHistory, setConvoHistory] = useState([]);
    const [session, setSession] = useState([]);
    const [answer, setAnswer] = useState("");
    const [showHints, setShowHints] = useState(false);
    const [result, setResult] = useState(null);

    const isCoding = config.mode === "coding";
    const { display: timerDisplay, urgent } = useTimer(question?.time_limit_minutes || 15, !!question && !result);

    const headers = { Authorization: `Bearer ${token}` };

    const fetchQuestion = useCallback(async () => {
        setLoadingQ(true);
        setError("");
        setAnswer("");
        setResult(null);
        setFollowup(null);
        setConvoHistory([]);
        setShowHints(false);

        try {
            const res = await axios.post(`${API}/interview/question`, {
                topic: config.topic,
                difficulty: config.difficulty,
                question_type: config.question_type,
            }, { headers });
            setQuestion(res.data);
        } catch (e) {
            setError(e.response?.data?.message || "Failed to load question. Please try again.");
        } finally {
            setLoadingQ(false);
        }
    }, [qNum]);

    useEffect(() => {
        if (!config.topic) { navigate("/dashboard"); return; }
        fetchQuestion();
    }, [qNum]);

    const handleSubmit = async () => {
        if (!answer.trim()) return;
        setSubmitting(true);
        setError("");
        try {
            const res = await axios.post(`${API}/interview/evaluate`, {
                question: question.question,
                user_answer: answer,
                question_type: config.question_type,
                language: isCoding ? language : undefined,
            }, { headers });
            setResult(res.data);
            setConvoHistory([
                { role: "interviewer", content: question.question },
                { role: "candidate", content: answer },
            ]);
            setSession(prev => [...prev, { question: question.question, result: res.data, answer }]);
        } catch (e) {
            setError(e.respond?.data?.detail || "Evaluation failed.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleFollowup = async () => {
        setLoadingFollowup(true);
        setError("");
        try {
            const res = await axios.post(`${API}/interview/followup`, {
                conversation_history: convoHistory,
                question: question.question,
                user_answer: answer,
            }, { headers });
            setFollowup(res.data);
            setConvoHistory(prev => [...prev, { role: "interviewer", content: res.data.followup_question },]);
        } catch (e){
            setError(e.response?.data?.detail || "Followup Failed.");
        } finally {
            setLoadingFollowup(false);
        }  
    }
};