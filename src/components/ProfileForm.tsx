import React from 'react';
import { Sliders, User, Compass, Share2, ChartBar, Shuffle } from 'lucide-react';
import { ProfileData } from '../types';
import TechSelector from './TechSelector';

interface ProfileFormProps {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
}

export default function ProfileForm({ data, onChange }: ProfileFormProps) {
  const updateField = (field: keyof ProfileData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  // Generate a random fun fact or quote bio
  const randomizeFunFact = () => {
    const facts = [
      "I drink 4 cups of coffee a day and code better at 2 AM!",
      "I compile my best solutions after taking a long hot shower.",
      "My git history is a mix of poetry and emergency hotfixes.",
      "I speak fluent React and mediocre sarcasm.",
      "I started coding because I wanted to make computer games but stayed to fix side-project bugs.",
      "My keyboard clicks at 90 WPM, but my brain operates at 10 WPM on Mondays.",
      "I have 47 browser tabs open, and 45 of them are StackOverflow answers."
    ];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    updateField('funFact', randomFact);
  };

  return (
    <div className="space-y-8 bg-white p-1" id="profile-editor-form">
      {/* 01. Profile Basics */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <User className="h-4 w-4" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">01. Profile Basics</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-slate-700">Your Full Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="e.g. Alex Developer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700">Pronouns</label>
            <input
              type="text"
              value={data.pronouns}
              onChange={(e) => updateField('pronouns', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="e.g. he/him"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700">Headline Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="e.g. Full-Stack Software Engineer"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700">Short Subtitle / Slogan</label>
            <input
              type="text"
              value={data.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="e.g. Building elegant solutions to complex real-world challenges."
            />
          </div>
        </div>
      </section>

      {/* 02. About & Core Focus */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Compass className="h-4 w-4" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">02. Bio Details</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700">🔭 I’m currently working on</label>
            <input
              type="text"
              value={data.workingOn}
              onChange={(e) => updateField('workingOn', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="Active project description..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700">🌱 I’m currently learning</label>
            <input
              type="text"
              value={data.learning}
              onChange={(e) => updateField('learning', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="Languages, frameworks, or algorithms..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700">💬 Ask me about</label>
            <input
              type="text"
              value={data.askMeAbout}
              onChange={(e) => updateField('askMeAbout', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="Your expertises..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700">⚡ Fun fact</label>
              <button
                type="button"
                onClick={randomizeFunFact}
                className="flex items-center space-x-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 focus:outline-hidden"
              >
                <Shuffle className="h-3 w-3" />
                <span>Randomize Fact</span>
              </button>
            </div>
            <input
              type="text"
              value={data.funFact}
              onChange={(e) => updateField('funFact', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="Something quirky or fun..."
            />
          </div>
        </div>
      </section>

      {/* 03. Social Media handles */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Share2 className="h-4 w-4" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">03. Social Channels</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-slate-700">GitHub Username</label>
            <input
              type="text"
              value={data.githubUsername}
              onChange={(e) => updateField('githubUsername', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="e.g. alexdev"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700">LinkedIn Username</label>
            <input
              type="text"
              value={data.linkedinUsername}
              onChange={(e) => updateField('linkedinUsername', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="e.g. alex-developer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700">Twitter Handle</label>
            <input
              type="text"
              value={data.twitterUsername}
              onChange={(e) => updateField('twitterUsername', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="e.g. alexcodes"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700">Portfolio Website</label>
            <input
              type="url"
              value={data.portfolioUrl}
              onChange={(e) => updateField('portfolioUrl', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="https://..."
            />
          </div>
        </div>
      </section>

      {/* Tech Stack Select */}
      <section className="space-y-4">
        <TechSelector
          selectedTechs={data.techs}
          onChange={(techs) => updateField('techs', techs)}
        />
      </section>

      {/* 04. Stats & Widget Customization */}
      <section className="space-y-4 border-t border-slate-100 pt-6">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <ChartBar className="h-4 w-4" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">04. GitHub Cards & Addons</h3>
        </div>

        <div className="space-y-3">
          {/* Visitors badge toggle */}
          <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3 bg-slate-50/50 transition-colors hover:bg-slate-50">
            <div>
              <p className="text-xs font-bold text-slate-800">Enable Profile Visitor Counter</p>
              <p className="text-[10px] font-bold text-slate-500">Live tracker counts page visits directly</p>
            </div>
            <input
              type="checkbox"
              checked={data.visitorsBadge}
              onChange={(e) => updateField('visitorsBadge', e.target.checked)}
              className="h-4.5 w-4.5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </div>

          {data.visitorsBadge && (
            <div className="ml-3 pl-3 border-l-2 border-indigo-600">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">Counter Color Style</label>
              <select
                value={data.visitorsBadgeColor}
                onChange={(e) => updateField('visitorsBadgeColor', e.target.value)}
                className="mt-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              >
                <option value="3178C6">Royal Blue</option>
                <option value="232F3E">Charcoal Black</option>
                <option value="FF3E00">Hot Coral</option>
                <option value="3ECF8E">Emerald Green</option>
                <option value="FFCA28">Amber Gold</option>
              </select>
            </div>
          )}

          {/* GitHub stats widgets */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <label className="flex items-center space-x-2 rounded-lg border border-slate-200 p-3 bg-slate-50/20 cursor-pointer hover:bg-slate-50 hover:border-indigo-200 transition-all select-none">
              <input
                type="checkbox"
                checked={data.showStats}
                onChange={(e) => updateField('showStats', e.target.checked)}
                className="h-4 w-4 rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs font-bold text-slate-700">Stats Scorecard</span>
            </label>

            <label className="flex items-center space-x-2 rounded-lg border border-slate-200 p-3 bg-slate-50/20 cursor-pointer hover:bg-slate-50 hover:border-indigo-200 transition-all select-none">
              <input
                type="checkbox"
                checked={data.showLangs}
                onChange={(e) => updateField('showLangs', e.target.checked)}
                className="h-4 w-4 rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs font-bold text-slate-700">Top Languages</span>
            </label>

            <label className="flex items-center space-x-2 rounded-lg border border-slate-200 p-3 bg-slate-50/20 cursor-pointer hover:bg-slate-50 hover:border-indigo-200 transition-all select-none">
              <input
                type="checkbox"
                checked={data.showStreak}
                onChange={(e) => updateField('showStreak', e.target.checked)}
                className="h-4 w-4 rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs font-bold text-slate-700">Activity Streak</span>
            </label>
          </div>

          {(data.showStats || data.showLangs || data.showStreak) && (
            <div className="rounded-lg border border-slate-200 p-3 bg-slate-50/50">
              <label className="block text-xs font-bold text-slate-700">GitHub Stats Card Theme</label>
              <select
                value={data.statsTheme}
                onChange={(e) => updateField('statsTheme', e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              >
                <option value="dark">Default Dark</option>
                <option value="radical">Radical Purple</option>
                <option value="onedark">One Dark</option>
                <option value="gruvbox">Gruvbox Retro</option>
                <option value="dracula">Dracula Vamp</option>
                <option value="tokyonight">Tokyo Night</option>
                <option value="buefy">Buefy Light</option>
              </select>
            </div>
          )}

          {/* Programming Quote card */}
          <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3 bg-slate-50/50 transition-colors hover:bg-slate-50">
            <div>
              <p className="text-xs font-bold text-slate-800">Dynamic Programming Quote Card</p>
              <p className="text-[10px] font-bold text-slate-500">Inserts random computing statements into your footer</p>
            </div>
            <input
              type="checkbox"
              checked={data.quoteCard}
              onChange={(e) => updateField('quoteCard', e.target.checked)}
              className="h-4.5 w-4.5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
