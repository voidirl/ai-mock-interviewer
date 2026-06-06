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

`