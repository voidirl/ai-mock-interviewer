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


`