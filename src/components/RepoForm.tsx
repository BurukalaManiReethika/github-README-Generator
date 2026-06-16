import React, { useState } from 'react';
import { Layers, Terminal, Sparkles, User, Link, Plus, Trash2 } from 'lucide-react';
import { RepoData } from '../types';
import TechSelector from './TechSelector';

interface RepoFormProps {
  data: RepoData;
  onChange: (data: RepoData) => void;
}

export default function RepoForm({ data, onChange }: RepoFormProps) {
  const [newFeature, setNewFeature] = useState('');

  const updateField = (field: keyof RepoData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const addFeature = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (newFeature.trim()) {
      onChange({
        ...data,
        features: [...data.features, newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    onChange({
      ...data,
      features: data.features.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-8 bg-white p-1" id="repo-editor-form">
      {/* 01. Repository Information */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Layers className="h-4 w-4" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">01. Project Information</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-slate-700">Project Name</label>
            <input
              type="text"
              value={data.projectName}
              onChange={(e) => updateField('projectName', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="e.g. fast-draft"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700">GitHub Slogan / Tagline</label>
            <input
              type="text"
              value={data.tagline}
              onChange={(e) => updateField('tagline', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="e.g. A fast documentation pipeline tool..."
            />
          </div>

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
            <label className="block text-xs font-bold text-slate-700">Repository Name</label>
            <input
              type="text"
              value={data.repoName}
              onChange={(e) => updateField('repoName', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="e.g. fast-draft"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700">Project License</label>
            <select
              value={data.license}
              onChange={(e) => updateField('license', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
            >
              <option value="MIT">MIT License</option>
              <option value="Apache-2.0">Apache 2.0</option>
              <option value="GPL-3.0">GPL v3</option>
              <option value="BSD-3-Clause">BSD 3-Clause</option>
              <option value="None">None / Plain</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700">Release Version</label>
            <input
              type="text"
              value={data.version}
              onChange={(e) => updateField('version', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="e.g. 1.0.0"
            />
          </div>
        </div>
      </section>

      {/* 02. Interactive Feature Adder */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Sparkles className="h-4 w-4" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">02. Highlight Features</h3>
        </div>

        <form onSubmit={addFeature} className="flex gap-2">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
            placeholder="Introduce a core USP feature (e.g. React 19 support)..."
          />
          <button
            type="submit"
            className="flex items-center space-x-1 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="h-3 w-3" />
            <span>Add</span>
          </button>
        </form>

        <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
          {data.features.map((feature, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 p-2.5">
              <span className="text-xs font-bold text-slate-700 truncate mr-2">{feature}</span>
              <button
                type="button"
                onClick={() => removeFeature(idx)}
                className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {data.features.length === 0 && (
            <p className="text-center py-4 text-xs font-bold text-slate-400">No features specified yet. Add one above!</p>
          )}
        </div>
      </section>

      {/* Tech Stack Select */}
      <section className="space-y-4">
        <TechSelector
          selectedTechs={data.technologies}
          onChange={(techs) => updateField('technologies', techs)}
        />
      </section>

      {/* 03. Guides & Command Terminal Setup */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Terminal className="h-4 w-4" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">03. Setup Instructions</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700">Prerequisites / Requirements</label>
            <input
              type="text"
              value={data.prerequisites}
              onChange={(e) => updateField('prerequisites', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="e.g. Node.js LTS (v18 or higher) and npm / yarn."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700">Installation commands (Shell script style)</label>
            <textarea
              value={data.installation}
              onChange={(e) => updateField('installation', e.target.value)}
              rows={2}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-xs font-bold text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="e.g. npm install my-awesome-project"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700">Usage Guides & Running details</label>
            <textarea
              value={data.usage}
              onChange={(e) => updateField('usage', e.target.value)}
              rows={2}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-xs font-bold text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="e.g. npm run start"
            />
          </div>
        </div>
      </section>

      {/* 04. Author Details & Demo URLs */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Link className="h-4 w-4" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">04. Demo & Contact</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-slate-700">Author Name</label>
            <input
              type="text"
              value={data.authorName}
              onChange={(e) => updateField('authorName', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="Your name..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700">Author Email</label>
            <input
              type="email"
              value={data.authorEmail}
              onChange={(e) => updateField('authorEmail', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="email@example.com"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700">Live Website / Demo Link URL</label>
            <input
              type="url"
              value={data.demoUrl}
              onChange={(e) => updateField('demoUrl', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
              placeholder="https://..."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
