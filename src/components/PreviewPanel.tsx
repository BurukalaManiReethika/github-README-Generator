import React, { useState, useEffect } from 'react';
import { Eye, Code, Copy, Check, Download, Monitor, Sun, Moon, Sparkles, Terminal } from 'lucide-react';
import { ProfileData, RepoData, TechItem } from '../types';
import { generateProfileMarkdown, generateRepoMarkdown, findTechItem } from '../utils/markdownGenerator';

interface PreviewPanelProps {
  mode: 'profile' | 'repository';
  profileData: ProfileData;
  repoData: RepoData;
}

export default function PreviewPanel({ mode, profileData, repoData }: PreviewPanelProps) {
  const [activeTab, setActiveTab] = useState<'mockup' | 'code'>('mockup');
  const [copied, setCopied] = useState(false);
  const [githubTheme, setGithubTheme] = useState<'light' | 'dark'>('dark');

  const markdown = mode === 'profile'
    ? generateProfileMarkdown(profileData)
    : generateRepoMarkdown(repoData);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'README.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Extract variables for mock presentation
  const isProfile = mode === 'profile';
  const name = isProfile ? profileData.name : repoData.projectName;
  const username = isProfile ? profileData.githubUsername : repoData.githubUsername;
  const emailVal = isProfile ? profileData.emailAddress : repoData.authorEmail;

  return (
    <div id="preview-panel-root" className="sticky top-6 flex flex-col h-full max-h-[820px] rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
      {/* Tab bar header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 px-4 py-3">
        <div className="flex items-center space-x-2">
          {/* Active Tab Toggles */}
          <button
            id="tab-btn-mockup"
            onClick={() => setActiveTab('mockup')}
            className={`flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all select-none cursor-pointer ${
              activeTab === 'mockup'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Interactive Preview</span>
          </button>
          <button
            id="tab-btn-code"
            onClick={() => setActiveTab('code')}
            className={`flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all select-none cursor-pointer ${
              activeTab === 'code'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            <span>Markdown Source</span>
          </button>
        </div>

        {/* Global Toolbar actions */}
        <div className="flex items-center space-x-1.5">
          {/* Mock theme toggle only shown in mockup tab */}
          {activeTab === 'mockup' && (
            <button
              id="mockup-theme-toggle"
              onClick={() => setGithubTheme(githubTheme === 'light' ? 'dark' : 'light')}
              title={`Switch to GitHub ${githubTheme === 'light' ? 'Dark' : 'Light'} mockup theme`}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              {githubTheme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </button>
          )}

          <button
            id="btn-copy-markdown"
            onClick={handleCopy}
            className={`flex items-center space-x-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
            }`}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>

          <button
            id="btn-download-readme"
            onClick={handleDownload}
            className="flex items-center justify-center rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
            title="Download README.md"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50/20">
        {activeTab === 'mockup' ? (
          /* High Fidelity GitHub Layout Simulation */
          <div
            id="github-mockup-wrapper"
            className={`rounded-xl border transition-all duration-300 shadow-inner overflow-hidden ${
              githubTheme === 'dark'
                ? 'bg-[#0d1117] text-[#c9d1d9] border-[#30363d]'
                : 'bg-white text-[#24292f] border-[#d0d7de]'
            }`}
          >
            {/* Mock GitHub Header Rail */}
            <div
              className={`flex items-center justify-between px-4 py-2.5 border-b text-xs ${
                githubTheme === 'dark'
                  ? 'bg-[#161b22] border-[#30363d] text-[#8b949e]'
                  : 'bg-[#f6f8fa] border-[#d0d7de] text-[#57606a]'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-[#ef6f6c]" />
                <span className="h-2 w-2 rounded-full bg-[#f4c15b]" />
                <span className="h-2 w-2 rounded-full bg-[#6fd08c]" />
                <span className="pl-2 font-mono text-[10px]">github.com/{username || 'developer'}/{isProfile ? '' : repoData.repoName || 'my-project'}</span>
              </div>
              <div className="hidden sm:flex items-center space-x-2 font-mono text-[9px]">
                <span>HTTPS</span>
                <span>•</span>
                <span>Branch: main</span>
              </div>
            </div>

            {/* Profile vs Repo specific views */}
            {isProfile ? (
              /* PROFILE VIEW SIMULATION */
              <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Simulated GitHub Profile Left Sidebar */}
                <div className="md:col-span-4 space-y-4">
                  <div className="flex md:flex-col items-center md:items-start gap-4">
                    {/* Glowing mock modern developer avatar */}
                    <div className="relative shrink-0">
                      <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-full border-2 border-gray-300 overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-600 flex items-center justify-center text-white text-3xl font-extrabold select-none shadow-md">
                        {name ? name.charAt(0) : 'D'}
                      </div>
                      <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-[#3ecf8e] border-2 border-white flex items-center justify-center text-[10px] select-none shadow-xs">💬</span>
                    </div>
                    <div>
                      <h2 className={`text-xl font-bold truncate ${githubTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{name || 'John Doe'}</h2>
                      <p className="text-sm font-medium opacity-70">@{username || 'developer'}</p>
                      {profileData.pronouns && (
                        <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${githubTheme === 'dark' ? 'bg-[#21262d] text-[#8b949e]' : 'bg-gray-100 text-gray-600'}`}>
                          {profileData.pronouns}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Profile Pitch Card */}
                  <div className={`p-3 rounded-lg text-xs leading-relaxed border ${githubTheme === 'dark' ? 'bg-[#161b22] border-[#30363d]' : 'bg-gray-50 border-gray-200'}`}>
                    <h4 className="font-bold mb-1">Developer Statement</h4>
                    <p className="opacity-80 italic">"{profileData.subtitle || 'Build, learn, and deploy.'}"</p>
                  </div>

                  {/* Social Handles mini panel */}
                  <div className="space-y-1.5 text-xs font-semibold">
                    {profileData.linkedinUsername && (
                      <div className="flex items-center space-x-1.5 opacity-80">
                        <span className="text-[#0a66c2]">🔗</span>
                        <span className="truncate">in/{profileData.linkedinUsername}</span>
                      </div>
                    )}
                    {profileData.twitterUsername && (
                      <div className="flex items-center space-x-1.5 opacity-80">
                        <span className="text-[#1da1f2]">🐦</span>
                        <span className="truncate">@{profileData.twitterUsername}</span>
                      </div>
                    )}
                    {profileData.portfolioUrl && (
                      <div className="flex items-center space-x-1.5 opacity-80 text-blue-500 hover:underline">
                        <span>🌐</span>
                        <span className="truncate">{profileData.portfolioUrl}</span>
                      </div>
                    )}
                    {emailVal && (
                      <div className="flex items-center space-x-1.5 opacity-80">
                        <span>✉️</span>
                        <span className="truncate">{emailVal}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right profile README simulation content box */}
                <div className="md:col-span-8 space-y-6 border-t md:border-t-0 md:border-l border-dashed border-[#30363d]/55 md:pl-6 pt-6 md:pt-0">
                  <div className={`rounded-xl border p-4 sm:p-5 ${githubTheme === 'dark' ? 'bg-[#0d1117] border-[#30363d]' : 'bg-white border-[#d0d7de]'}`}>
                    <div className="flex items-center justify-between border-b pb-2 mb-4 border-[#30363d]/30 text-xs text-opacity-70">
                      <span className="font-semibold font-mono">{username || 'developer'}/README.md</span>
                      <span className="text-[10px] border border-emerald-500 text-emerald-500 px-1.5 py-0.2 rounded-sm font-bold">PROFILE PIN</span>
                    </div>

                    {/* RENDERED MARKDOWN PRESENTATION */}
                    <div className="space-y-5 prose max-w-none text-xs sm:text-sm">
                      {/* Views Badge */}
                      {profileData.visitorsBadge && (
                        <div>
                          <img
                            src={`https://komarev.com/ghpvc/?username=${username || 'dev'}&color=${profileData.visitorsBadgeColor}&style=for-the-badge`}
                            alt="Views Counter"
                            referrerPolicy="no-referrer"
                            className="inline max-h-6"
                          />
                        </div>
                      )}

                      {/* Header Title */}
                      <div>
                        <h1 className={`text-xl sm:text-2xl font-bold tracking-tight mb-1 ${githubTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Hi there, I'm {profileData.name || 'Alex'}! 👋
                        </h1>
                        <p className="text-sm font-semibold text-blue-500">{profileData.title}</p>
                        <p className="text-xs italic opacity-75">{profileData.subtitle}</p>
                      </div>

                      {/* Bio Details */}
                      <div className="space-y-1.5 border-l-2 border-gray-500 pl-3">
                        {profileData.workingOn && <p>🔭 I’m currently working on <strong>{profileData.workingOn}</strong></p>}
                        {profileData.learning && <p>🌱 I’m currently learning <strong>{profileData.learning}</strong></p>}
                        {profileData.askMeAbout && <p>💬 Ask me about <strong>{profileData.askMeAbout}</strong></p>}
                        {profileData.funFact && <p>⚡ Fun fact: <strong>{profileData.funFact}</strong></p>}
                      </div>

                      {/* Tech Stack Badge list */}
                      {profileData.techs.length > 0 && (
                        <div>
                          <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${githubTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>My Core Stack</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {profileData.techs.map(techId => {
                              const tech = findTechItem(techId);
                              if (!tech) return null;
                              return (
                                <img
                                  key={techId}
                                  src={`https://img.shields.io/badge/${tech.badgeLabel}-${tech.badgeColor}?style=for-the-badge&logo=${tech.badgeLogo}&logoColor=white`}
                                  alt={tech.name}
                                  referrerPolicy="no-referrer"
                                  className="h-6"
                                />
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Stats cards renderings */}
                      {(profileData.showStats || profileData.showLangs || profileData.showStreak) && (
                        <div className="space-y-3 pt-2">
                          <h4 className={`text-xs font-bold uppercase tracking-wider ${githubTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>GitHub Analytics</h4>
                          <div className="flex flex-col gap-2 max-w-md">
                            {profileData.showStats && (
                              <div className="rounded-lg border border-dashed border-gray-400 p-2 text-center text-[10px] font-mono leading-none bg-black/10">
                                📊 [Live Scorecard: {username || 'developer'}]
                                <img
                                  src={`https://github-readme-stats.vercel.app/api?username=${username || 'anuraghazra'}&show_icons=true&theme=${profileData.statsTheme}`}
                                  alt="GitHub Stats"
                                  referrerPolicy="no-referrer"
                                  className="mt-1 max-h-28 mx-auto"
                                />
                              </div>
                            )}

                            {profileData.showLangs && (
                              <div className="rounded-lg border border-dashed border-gray-400 p-2 text-center text-[10px] font-mono leading-none bg-black/10">
                                🖥️ [Top Languages: {username || 'developer'}]
                                <img
                                  src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username || 'anuraghazra'}&layout=compact&theme=${profileData.statsTheme}`}
                                  alt="GitHub Languages"
                                  referrerPolicy="no-referrer"
                                  className="mt-1 max-h-24 mx-auto"
                                />
                              </div>
                            )}

                            {profileData.showStreak && (
                              <div className="rounded-lg border border-dashed border-gray-400 p-2 text-center text-[10px] font-mono leading-none bg-black/10">
                                🔥 [Commit Streak: {username || 'developer'}]
                                <img
                                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${username || 'anuraghazra'}&theme=${profileData.statsTheme}`}
                                  alt="GitHub Streak"
                                  referrerPolicy="no-referrer"
                                  className="mt-1 max-h-22 mx-auto"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Quote card */}
                      {profileData.quoteCard && (
                        <div className="pt-2 border-t border-dashed border-gray-500/30">
                          <img
                            src={`https://github-readme-quotes.herokuapp.com/api?theme=${profileData.quoteTheme}&type=quote`}
                            alt="Programming Quote Widget"
                            referrerPolicy="no-referrer"
                            className="max-h-22 w-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* REPOSITORY VIEW SIMULATION */
              <div className="p-4 sm:p-5">
                {/* Repository Header Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 border-[#30363d]/40 mb-4 text-xs font-semibold">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold select-none text-blue-500">📁 codebase</span>
                    <span>/</span>
                    <span className="font-bold">{repoData.projectName || 'my-project'}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-[11px]">
                    <span className="rounded-l-md px-2 py-1 border border-r-0 border-gray-400 bg-gray-50/10">Watchers</span>
                    <span className="rounded-r-md px-2 py-1 border border-gray-400 font-mono">14</span>
                    <span className="ml-1 rounded-l-md px-2 py-1 border border-r-0 border-gray-400 bg-gray-50/10">Stars</span>
                    <span className="rounded-r-md px-2 py-1 border border-gray-400 font-mono">237</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 leading-normal">
                  {/* File structure simulator on the Left */}
                  <div className="lg:col-span-8 space-y-4">
                    {/* Simulated directory folder */}
                    <div className={`rounded-xl border text-xs overflow-hidden ${githubTheme === 'dark' ? 'border-[#30363d]' : 'border-gray-200'}`}>
                      <div className={`px-4 py-2 border-b flex items-center justify-between font-mono text-[10px] font-bold ${githubTheme === 'dark' ? 'bg-[#161b22] border-[#30363d]' : 'bg-gray-100'}`}>
                        <span>Latest Commit: "Release build {repoData.version}"</span>
                        <span className="opacity-60">10 mins ago</span>
                      </div>
                      <div className="divide-y divide-[#30363d]/30 font-medium">
                        <div className="px-4 py-2.5 flex items-center justify-between">
                          <span className="text-blue-400">📂 .github/workflows</span>
                          <span className="opacity-60">Add build checks</span>
                        </div>
                        <div className="px-4 py-2.5 flex items-center justify-between">
                          <span className="text-blue-400">📂 src</span>
                          <span className="opacity-60">Implement key layout changes</span>
                        </div>
                        <div className="px-4 py-2.5 flex items-center justify-between">
                          <span>📄 LICENSE</span>
                          <span className="opacity-60">Initialize license details</span>
                        </div>
                        <div className="px-4 py-2.5 flex items-center justify-between bg-black/5">
                          <span className="font-bold text-emerald-400">📄 README.md</span>
                          <span className="opacity-60">Configure responsive profiles</span>
                        </div>
                      </div>
                    </div>

                    {/* REDNDERED REPO README CARD */}
                    <div className={`rounded-xl border p-4 sm:p-5 ${githubTheme === 'dark' ? 'bg-[#0d1117] border-[#30363d]' : 'bg-white border-[#d0d7de]'}`}>
                      <div className="flex items-center space-x-1.5 border-b pb-2 mb-4 border-[#30363d]/30 text-[10px] font-mono opacity-80 text-center">
                        <span>📖 README.md</span>
                      </div>

                      {/* Repo Content */}
                      <div className="space-y-6 text-xs sm:text-sm">
                        {/* Repository Badges */}
                        <div className="flex flex-wrap gap-1.5">
                          {repoData.buildStatus && (
                            <img
                              src={`https://img.shields.io/github/actions/workflow/status/${username || 'alexdev'}/${repoData.repoName || 'my-project'}/ci.yml?branch=main&style=for-the-badge&logo=github-actions`}
                              alt="CI Status"
                              referrerPolicy="no-referrer"
                              className="h-6"
                            />
                          )}
                          {repoData.license && repoData.license !== 'None' && (
                            <img
                              src={`https://img.shields.io/badge/license-${repoData.license}-green?style=for-the-badge`}
                              alt="License Badge"
                              referrerPolicy="no-referrer"
                              className="h-6"
                            />
                          )}
                          {repoData.version && (
                            <img
                              src={`https://img.shields.io/badge/version-${repoData.version}-blue?style=for-the-badge`}
                              alt="Version Badge"
                              referrerPolicy="no-referrer"
                              className="h-6"
                            />
                          )}
                          {repoData.prsWelcome && (
                            <img
                              src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge"
                              alt="PRs Welcome"
                              referrerPolicy="no-referrer"
                              className="h-6"
                            />
                          )}
                          {repoData.nodeVersion && (
                            <img
                              src={`https://img.shields.io/badge/node-${encodeURIComponent(repoData.nodeVersion)}-darkgreen?style=for-the-badge&logo=node.js`}
                              alt="Node Version"
                              referrerPolicy="no-referrer"
                              className="h-6"
                            />
                          )}
                        </div>

                        {/* Title & Tagline */}
                        <div>
                          <h1 className={`text-2xl font-bold tracking-tight mb-2 ${githubTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{repoData.projectName || 'My Project'}</h1>
                          {repoData.tagline && (
                            <blockquote className="border-l-4 border-gray-400 pl-4 py-1 my-2 opacity-80 italic">
                              {repoData.tagline}
                            </blockquote>
                          )}

                          {repoData.demoUrl && (
                            <div className="mt-3 flex items-center space-x-2 text-xs">
                              <a href={repoData.demoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-bold hover:underline">
                                ✨ Live Demo Link
                              </a>
                              <span className="opacity-40">|</span>
                              <a href="#docs" className="text-blue-500 font-bold hover:underline">
                                📖 Documentation
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Features list */}
                        {repoData.features.length > 0 && (
                          <div className="space-y-2">
                            <h3 className={`text-base font-bold ${githubTheme === 'dark' ? 'text-white' : 'text-[#c9d1d9]'}`}>⚡ Key Features</h3>
                            <ul className="list-disc pl-5 space-y-1">
                              {repoData.features.map((feat, i) => (
                                <li key={i}>{feat}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Stack */}
                        {repoData.technologies.length > 0 && (
                          <div className="space-y-2">
                            <h3 className={`text-base font-bold ${githubTheme === 'dark' ? 'text-white' : 'text-[#c9d1d9]'}`}>🛠️ Built With</h3>
                            <div className="flex flex-wrap gap-1">
                              {repoData.technologies.map(techId => {
                                const tech = findTechItem(techId);
                                if (!tech) return null;
                                return (
                                  <img
                                    key={techId}
                                    src={`https://img.shields.io/badge/${tech.badgeLabel}-${tech.badgeColor}?style=flat-square&logo=${tech.badgeLogo}&logoColor=white`}
                                    alt={tech.name}
                                    referrerPolicy="no-referrer"
                                    className="h-5"
                                  />
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Setup */}
                        <div className="space-y-3">
                          <h3 className={`text-base font-bold ${githubTheme === 'dark' ? 'text-white' : 'text-[#c9d1d9]'}`}>🚀 Getting Started</h3>
                          {repoData.prerequisites && (
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Prerequisites</h4>
                              <p className="text-xs mt-0.5">{repoData.prerequisites}</p>
                            </div>
                          )}

                          {repoData.installation && (
                            <div>
                              <h4 className="text-xs font-bold mb-1 uppercase tracking-wider text-gray-500">Installation</h4>
                              <pre className={`p-3 rounded-lg font-mono text-[11px] overflow-x-auto ${githubTheme === 'dark' ? 'bg-[#161b22]' : 'bg-gray-100'}`}>
                                {repoData.installation}
                              </pre>
                            </div>
                          )}
                        </div>

                        {/* Usage */}
                        {repoData.usage && (
                          <div className="space-y-2">
                            <h3 className={`text-base font-bold ${githubTheme === 'dark' ? 'text-white' : 'text-[#c9d1d9]'}`}>💻 Usage</h3>
                            <pre className={`p-3 rounded-lg font-mono text-[11px] overflow-x-auto ${githubTheme === 'dark' ? 'bg-[#161b22]' : 'bg-gray-100'}`}>
                              {repoData.usage}
                            </pre>
                          </div>
                        )}

                        {/* Contact details & copyright */}
                        {(repoData.authorName || repoData.license) && (
                          <div className="space-y-2 border-t pt-4 border-[#30363d]/30 text-xs">
                            <h3 className={`text-base font-bold ${githubTheme === 'dark' ? 'text-white' : 'text-[#c9d1d9]'}`}>📝 License & Contact</h3>
                            {repoData.authorName && (
                              <p>Project crafted with ❤️ by <strong>{repoData.authorName}</strong> {repoData.authorEmail && <span>(<a>{repoData.authorEmail}</a>)</span>}.</p>
                            )}
                            {repoData.license && repoData.license !== 'None' && (
                              <p>Distributed under the <strong>{repoData.license} License</strong>.</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right side Repository Meta column info panel */}
                  <div className="lg:col-span-4 space-y-4 text-xs font-medium">
                    <div className={`p-4 rounded-xl border ${githubTheme === 'dark' ? 'bg-[#161b22] border-[#30363d]' : 'bg-gray-50 border-gray-200'}`}>
                      <h4 className="font-bold text-sm mb-2">About</h4>
                      <p className="opacity-80 leading-relaxed mb-3">{repoData.tagline || 'A fully config-driven boilerplate repo.'}</p>
                      {repoData.demoUrl && (
                        <div className="flex items-center space-x-1.5 text-blue-500 hover:underline mb-3">
                          <span>🌐</span>
                          <span className="truncate">{repoData.demoUrl}</span>
                        </div>
                      )}
                      <div className="space-y-1.5 pt-2 border-t border-gray-400/20 opacity-85">
                        <div className="flex justify-between">
                          <span>License</span>
                          <strong>{repoData.license}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Language version</span>
                          <strong>Node {repoData.nodeVersion}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Releases</span>
                          <strong>v{repoData.version}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* RAW MARKDOWN BLOCK RENDER WITH STYLING */
          <div className="relative rounded-xl border border-gray-200 bg-gray-900 shadow-sm overflow-hidden text-gray-100 font-mono text-xs leading-relaxed">
            {/* Quick action bar */}
            <div className="flex items-center justify-between border-b border-gray-800 bg-gray-950 px-4 py-2 text-[10px] uppercase font-bold text-gray-500 tracking-wider">
              <span>Markdown Source ({markdown.split('\n').length} lines)</span>
              <span className="animate-pulse flex items-center space-x-1 text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Sync Active</span>
              </span>
            </div>

            {/* Code lines list */}
            <div className="max-h-[700px] overflow-auto p-4 flex">
              {/* Line numbering sidebar */}
              <div className="select-none pr-4 text-right text-gray-600 font-mono text-[11px] border-r border-gray-800/60 sticky left-0 leading-relaxed">
                {markdown.split('\n').map((_, index) => (
                  <div key={index} className="h-5">{index + 1}</div>
                ))}
              </div>

              {/* Real markdown text markup */}
              <pre className="pl-4 leading-relaxed overflow-x-auto whitespace-pre font-mono text-[11px] text-gray-100 flex-1">
                {markdown.split('\n').map((line, idx) => {
                  // Basic code syntax highlighting rules for visualization of markdown
                  let styleClass = 'text-gray-300';
                  if (line.startsWith('#')) styleClass = 'text-blue-400 font-bold';
                  else if (line.startsWith('-') || line.startsWith('*') || line.startsWith('1.')) styleClass = 'text-amber-300';
                  else if (line.startsWith('```')) styleClass = 'text-emerald-400 font-bold';
                  else if (line.includes('![') || line.includes('[![')) styleClass = 'text-purple-400';

                  return (
                    <div key={idx} className={`h-5 ${styleClass}`}>
                      {line || ' '}
                    </div>
                  );
                })}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
