import React from 'react';
import { Github, User, FolderGit } from 'lucide-react';
import { EditorMode } from '../types';

interface HeaderProps {
  mode: EditorMode;
  setMode: (mode: EditorMode) => void;
  onReset: () => void;
}

export default function Header({ mode, setMode, onReset }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white shadow-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Platform Name */}
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-700 text-white shadow-lg shadow-indigo-100 transition-all hover:scale-105">
              <Github className="h-5 w-5" id="header-logo-icon" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight text-slate-900 uppercase sm:text-base" id="header-title">
                Readme<span className="text-indigo-600">Craft</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest" id="header-subtitle">
                Markdown Architect
              </p>
            </div>
          </div>

          {/* Mode Toggles */}
          <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              id="mode-toggle-profile"
              onClick={() => setMode('profile')}
              className={`flex items-center space-x-2 rounded-lg px-3.5 py-1.5 text-xs font-bold select-none transition-all ${
                mode === 'profile'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-white/50'
              }`}
            >
              <User className="h-3.5 w-3.5" />
              <span>Profile README</span>
            </button>
            <button
              id="mode-toggle-repo"
              onClick={() => setMode('repository')}
              className={`flex items-center space-x-2 rounded-lg px-3.5 py-1.5 text-xs font-bold select-none transition-all ${
                mode === 'repository'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-white/50'
              }`}
            >
              <FolderGit className="h-3.5 w-3.5" />
              <span>Repository README</span>
            </button>
          </div>

          {/* Reset Action */}
          <div>
            <button
              id="reset-template-btn"
              onClick={onReset}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
            >
              Reset Template
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
