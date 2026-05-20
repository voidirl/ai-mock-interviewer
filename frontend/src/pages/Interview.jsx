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

`