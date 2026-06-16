import React, { useState } from 'react';
import Header from './components/Header';
import ProfileForm from './components/ProfileForm';
import RepoForm from './components/RepoForm';
import PreviewPanel from './components/PreviewPanel';
import { EditorMode, ProfileData, RepoData } from './types';
import { INITIAL_PROFILE, INITIAL_REPO } from './data';
import { Sparkles, Sliders, Heart } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState<EditorMode>('profile');
  const [profileData, setProfileData] = useState<ProfileData>(INITIAL_PROFILE);
  const [repoData, setRepoData] = useState<RepoData>(INITIAL_REPO);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all edits to the default template?')) {
      setProfileData(INITIAL_PROFILE);
      setRepoData(INITIAL_REPO);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 antialiased flex flex-col relative">
      {/* 1. Header Toolbar */}
      <Header mode={mode} setMode={setMode} onReset={handleReset} />

      {/* 2. Primary Workspace Grid */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Active configuration panel on the left (5/12 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
                <div className="flex items-center space-x-2">
                  <Sliders className="h-4 w-4 text-indigo-600" id="pane-setting-icon" />
                  <h2 className="text-xs font-black text-slate-950 uppercase tracking-wider" id="editor-title">
                    {mode === 'profile' ? 'Profile Customizer' : 'Repository Architect'}
                  </h2>
                </div>
                <span className="inline-flex items-center space-x-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700">
                  <Sparkles className="h-2.5 w-2.5 shrink-0" />
                  <span>Auto-Sync Live</span>
                </span>
              </div>

              {/* Form Render based on active Mode Selection */}
              {mode === 'profile' ? (
                <ProfileForm data={profileData} onChange={setProfileData} />
              ) : (
                <RepoForm data={repoData} onChange={setRepoData} />
              )}
            </div>
          </div>

          {/* Stick previewer frame on the right (7/12 Columns) */}
          <div className="lg:col-span-7">
            <PreviewPanel
              mode={mode}
              profileData={profileData}
              repoData={repoData}
            />
          </div>

        </div>
      </main>

      {/* Subtle footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-bold text-slate-500">
          <p>ReadmeCraft — Built offline-first, client-side verified.</p>
          <p className="flex items-center space-x-1">
            <span>Powered by</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            <span className="text-slate-800">React & Tailwind</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
