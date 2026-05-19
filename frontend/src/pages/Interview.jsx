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
`