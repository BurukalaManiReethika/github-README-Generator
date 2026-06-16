import React, { useState } from 'react';
import { Search, Code2, Layout, Server, Database, Check } from 'lucide-react';
import { TECH_ITEMS } from '../data';
import { TechItem } from '../types';

interface TechSelectorProps {
  selectedTechs: string[];
  onChange: (techs: string[]) => void;
}

type TabType = 'all' | 'languages' | 'frontend' | 'backend' | 'database_cloud' | 'tools';

export default function TechSelector({ selectedTechs, onChange }: TechSelectorProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggle = (techId: string) => {
    if (selectedTechs.includes(techId)) {
      onChange(selectedTechs.filter(id => id !== techId));
    } else {
      onChange([...selectedTechs, techId]);
    }
  };

  const categories: { label: string; tab: TabType; icon: React.ReactNode }[] = [
    { label: 'All Tech', tab: 'all', icon: <Code2 className="h-4 w-4" /> },
    { label: 'Languages', tab: 'languages', icon: <Code2 className="h-4 w-4" /> },
    { label: 'Frontend', tab: 'frontend', icon: <Layout className="h-4 w-4" /> },
    { label: 'Backend', tab: 'backend', icon: <Server className="h-4 w-4" /> },
    { label: 'DB & Cloud', tab: 'database_cloud', icon: <Database className="h-4 w-4" /> },
    { label: 'Tools', tab: 'tools', icon: <Check className="h-4 w-4" /> },
  ];

  // Filter items
  const filteredItems = TECH_ITEMS.filter(item => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <div id="tech-selector-container" className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-xs font-black uppercase tracking-wider text-slate-700" id="tech-selector-label">
          Shields.io Badges ({selectedTechs.length} Selected)
        </label>

        {/* Mini Search Filter */}
        <div className="relative max-w-xs">
          <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search badges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pr-3 pl-9 text-xs font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all"
          />
        </div>
      </div>

      {/* Tiny Tab Buttons */}
      <div className="flex flex-wrap gap-1 border-b border-slate-200 pb-2">
        {categories.map((cat) => (
          <button
            key={cat.tab}
            type="button"
            onClick={() => setActiveTab(cat.tab)}
            className={`flex items-center space-x-1 rounded-md px-2.5 py-1 text-[11px] font-bold select-none transition-all ${
              activeTab === cat.tab
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
            }`}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Tech Grid selection */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 max-h-[220px] overflow-y-auto pr-1">
        {filteredItems.map((tech) => {
          const isSelected = selectedTechs.includes(tech.id);
          return (
            <button
              key={tech.id}
              type="button"
              onClick={() => handleToggle(tech.id)}
              className={`flex items-center justify-between rounded-lg border p-2 text-left transition-all hover:scale-[1.01] active:scale-[0.99] group ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/10'
              }`}
            >
              <div className="flex items-center space-x-2 overflow-hidden">
                {/* Visual indicator / dynamic color patch */}
                <span
                  className="h-2 w-2 shrink-0 rounded-full transition-transform group-hover:scale-125"
                  style={{ backgroundColor: `#${tech.badgeColor}` }}
                />
                <span id={`tech-name-${tech.id}`} className="truncate text-xs font-bold">
                  {tech.name}
                </span>
              </div>
              {isSelected && (
                <Check className="h-3.5 w-3.5 shrink-0 text-white" />
              )}
            </button>
          );
        })}
        {filteredItems.length === 0 && (
          <div className="col-span-full py-6 text-center text-xs font-medium text-slate-500">
            No matching tech badges found
          </div>
        )}
      </div>
    </div>
  );
}
