// Cyberpunk Save/Load Panel

import { useState, useRef } from 'react';
import {
  saveLayout,
  getAllLayouts,
  deleteLayout,
  exportLayoutAsJson,
  importLayoutFromJson,
} from '../../utils/storage';
import { LAYOUT_PRESETS } from '../../data/furniturePresets';

export default function SaveLoadPanel({ furniture, setFurniture, setSelectedId }) {
  const [savedLayouts, setSavedLayouts] = useState(() => getAllLayouts());
  const [saveName, setSaveName] = useState('');
  const [showSaveInput, setShowSaveInput] = useState(false);
  const fileInputRef = useRef(null);

  const handleSave = () => {
    if (!saveName.trim()) return;
    saveLayout(saveName.trim(), furniture);
    setSavedLayouts(getAllLayouts());
    setSaveName('');
    setShowSaveInput(false);
  };

  const handleLoad = (layout) => {
    setFurniture(layout.furniture);
    setSelectedId(null);
  };

  const handleDelete = (name) => {
    if (confirm(`TERMINATE LAYOUT "${name}"?`)) {
      deleteLayout(name);
      setSavedLayouts(getAllLayouts());
    }
  };

  const handleExport = () => {
    const name = saveName.trim() || `earl-layout-${new Date().toISOString().slice(0, 10)}`;
    exportLayoutAsJson(name, furniture);
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await importLayoutFromJson(file);
      setFurniture(data.furniture);
      setSelectedId(null);
    } catch (err) {
      alert(err.message);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLoadPreset = (presetKey) => {
    const preset = LAYOUT_PRESETS[presetKey];
    if (preset) {
      setFurniture(preset.furniture);
      setSelectedId(null);
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-[#12121a] to-[#0d0d15] rounded-lg p-5 border border-purple-500/20 overflow-hidden">
      {/* Top neon line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-purple-400/50" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-purple-400/50" />

      <h3 className="font-orbitron text-purple-400 font-bold mb-4 flex items-center gap-3 text-sm tracking-wider">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        DATA STORAGE
      </h3>

      {/* Save controls */}
      {showSaveInput ? (
        <div className="mb-5 flex gap-2">
          <input
            type="text"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            placeholder="DESIGNATION..."
            className="flex-1 px-3 py-2.5 bg-[#0a0a10] border border-purple-500/30 rounded text-purple-300 text-xs font-mono placeholder-gray-600 focus:outline-none focus:border-purple-400 focus:shadow-[0_0_10px_rgba(153,51,255,0.2)]"
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
          />
          <button
            onClick={handleSave}
            className="px-4 py-2.5 bg-green-900/30 hover:bg-green-800/40 text-green-400 border border-green-500/30 rounded transition-all hover:border-green-400 hover:shadow-[0_0_10px_rgba(0,255,136,0.2)] active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
          <button
            onClick={() => setShowSaveInput(false)}
            className="px-3 py-2.5 bg-pink-900/30 hover:bg-pink-800/40 text-pink-400 border border-pink-500/30 rounded transition-all hover:border-pink-400 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowSaveInput(true)}
          className="w-full mb-5 px-4 py-3 bg-gradient-to-r from-purple-900/40 to-pink-900/40 hover:from-purple-800/50 hover:to-pink-800/50 text-purple-300 border border-purple-500/30 rounded text-xs font-orbitron tracking-wider transition-all hover:border-purple-400 hover:shadow-[0_0_15px_rgba(153,51,255,0.2)] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          SAVE CURRENT STATE
        </button>
      )}

      {/* Preset layouts */}
      <div className="mb-5">
        <h4 className="text-gray-600 text-[10px] font-orbitron font-semibold mb-3 tracking-widest flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          PRESET CONFIGURATIONS
        </h4>
        <div className="space-y-2">
          {Object.entries(LAYOUT_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => handleLoadPreset(key)}
              className="w-full text-left p-3 rounded bg-[#0a0a10] border border-gray-800 hover:border-purple-500/30 hover:bg-purple-900/10 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="text-white text-xs font-orbitron font-medium group-hover:text-purple-300 transition-colors tracking-wide">
                  {preset.name.toUpperCase()}
                </div>
                <svg className="w-4 h-4 text-gray-600 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="text-gray-600 text-[10px] font-mono mt-1">{preset.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Saved layouts */}
      {Object.keys(savedLayouts).length > 0 && (
        <div className="mb-5">
          <h4 className="text-gray-600 text-[10px] font-orbitron font-semibold mb-3 tracking-widest flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            USER SAVED DATA
          </h4>
          <div className="space-y-1.5">
            {Object.entries(savedLayouts).map(([name, layout]) => (
              <div
                key={name}
                className="flex items-center gap-2 p-2.5 rounded bg-[#0a0a10] hover:bg-gray-900/50 transition-colors group border border-gray-800"
              >
                <button
                  onClick={() => handleLoad(layout)}
                  className="flex-1 text-left text-gray-300 text-xs font-mono truncate hover:text-purple-300 transition-colors"
                >
                  {name}
                </button>
                <button
                  onClick={() => handleDelete(name)}
                  className="w-7 h-7 rounded flex items-center justify-center text-pink-400 opacity-0 group-hover:opacity-100 hover:bg-pink-500/20 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Import/Export */}
      <div className="pt-4 border-t border-gray-800 grid grid-cols-2 gap-2">
        <button
          onClick={handleExport}
          className="px-3 py-2.5 bg-cyan-900/20 hover:bg-cyan-800/30 text-cyan-400 border border-cyan-500/30 rounded text-xs font-orbitron tracking-wide transition-all hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(0,240,255,0.2)] flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          EXPORT
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-2.5 bg-orange-900/20 hover:bg-orange-800/30 text-orange-400 border border-orange-500/30 rounded text-xs font-orbitron tracking-wide transition-all hover:border-orange-400 hover:shadow-[0_0_10px_rgba(255,102,0,0.2)] flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          IMPORT
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </div>
    </div>
  );
}
