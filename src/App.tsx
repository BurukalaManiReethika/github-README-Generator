import React, { useState } from 'react';
import Header from './components/Header';
import ProfileForm from './components/ProfileForm';
import RepoForm from './components/RepoForm';
import PreviewPanel from './components/PreviewPanel';
import { EditorMode, ProfileData, RepoData } from './types';
import { INITIAL_PROFILE, INITIAL_REPO } from './data';
import { Sparkles, Sliders, Heart, Github, UploadCloud, X, ArrowRight } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState<EditorMode>('profile');
  const [profileData, setProfileData] = useState<ProfileData>(INITIAL_PROFILE);
  const [repoData, setRepoData] = useState<RepoData>(INITIAL_REPO);
  const [showPublishModal, setShowPublishModal] = useState(false);

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

            {/* Publish to GitHub Promo Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-all">
              <div className="absolute top-0 right-0 p-3 text-indigo-50/10 group-hover:text-indigo-500/10 transition-colors pointer-events-none">
                <Github className="h-24 w-24 -mr-6 -mt-6" />
              </div>
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-4">
                <Github className="h-4 w-4 text-indigo-600" />
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider">Publish to GitHub</h3>
              </div>
              <p className="text-xs text-slate-600 font-bold leading-relaxed mb-4">
                When your prototype is ready for a full development environment, publish the entire codebase to a new GitHub repository with a single click.
              </p>
              <button
                id="btn-publish-github"
                onClick={() => setShowPublishModal(true)}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 px-4 shadow-xs active:scale-98 transition-all cursor-pointer"
              >
                <UploadCloud className="h-4 w-4" />
                <span>Publish Codebase</span>
              </button>
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

      {/* Subtle footer - removed "powered by" and simplified as per user request */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-bold text-slate-500">
          <p>ReadmeCraft — Built offline-first, client-side verified.</p>
        </div>
      </footer>

      {/* Beautiful walkthrough dialog popup */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Github className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Export Codebase</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">GitHub Integration Guide</p>
                </div>
              </div>
              <button
                onClick={() => setShowPublishModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-600 font-bold leading-relaxed">
                Since you are working inside the Google AI Studio builder environment, your entire codebase can be pushed directly to your personal GitHub account with a single click:
              </p>

              <div className="space-y-3">
                <div className="flex items-start space-x-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black text-white">1</span>
                  <p className="text-xs text-slate-700 font-bold leading-normal">
                    Scroll up and find the <span className="text-slate-950 font-black">Settings & Export</span> menu in the AI Studio editor interface navigation.
                  </p>
                </div>

                <div className="flex items-start space-x-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black text-white">2</span>
                  <p className="text-xs text-slate-700 font-bold leading-normal">
                    Click <span className="text-indigo-600 font-black">Export to GitHub</span> (or download the full ZIP of the repository).
                  </p>
                </div>

                <div className="flex items-start space-x-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black text-white">3</span>
                  <p className="text-xs text-slate-700 font-bold leading-normal">
                    Authorize your GitHub profile to instantly create a new online repository containing this fully-styled React/Tailwind system!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowPublishModal(false)}
                className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-4 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                Got it, continuous build!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
