// Cyberpunk Toolbar with Neon Controls

export default function Toolbar({
  selectedFurniture,
  onRotate,
  onDelete,
  showZones,
  setShowZones,
  showTrafficPaths,
  setShowTrafficPaths,
  showDimensions,
  setShowDimensions,
  gridSnap,
  setGridSnap,
}) {
  return (
    <div className="relative bg-gradient-to-b from-[#12121a] to-[#0d0d15] rounded-lg p-5 border border-cyan-500/20 overflow-hidden">
      {/* Top neon line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400/50" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400/50" />

      <h3 className="font-orbitron text-cyan-400 font-bold mb-4 flex items-center gap-3 text-sm tracking-wider">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        SYSTEM CONTROLS
      </h3>

      {/* Selected furniture controls */}
      {selectedFurniture ? (
        <div className="mb-5 p-4 bg-gradient-to-br from-cyan-900/20 to-[#0a0a10] rounded-lg border border-cyan-500/30 relative">
          {/* Scanning line animation */}
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse" style={{ top: '50%' }} />
          </div>

          <div className="flex items-center gap-3 mb-3 relative">
            <div
              className="w-12 h-10 rounded border-2 flex-shrink-0"
              style={{
                background: selectedFurniture.id === 'couch' ? 'linear-gradient(135deg, #ff6600, #cc5200)' :
                  selectedFurniture.id === 'tv' ? 'linear-gradient(135deg, #ff0066, #cc0052)' :
                  selectedFurniture.id === 'desk' ? 'linear-gradient(135deg, #00f0ff, #00c0cc)' :
                  '#1a1a25',
                borderColor: selectedFurniture.id === 'couch' ? '#ff6600' :
                  selectedFurniture.id === 'tv' ? '#ff0066' :
                  selectedFurniture.id === 'desk' ? '#00f0ff' : '#333',
                boxShadow: `0 0 10px ${selectedFurniture.id === 'couch' ? 'rgba(255,102,0,0.3)' :
                  selectedFurniture.id === 'tv' ? 'rgba(255,0,102,0.3)' :
                  'rgba(0,240,255,0.3)'}`
              }}
            />
            <div>
              <div className="text-white font-orbitron text-xs font-semibold tracking-wide">
                {selectedFurniture.name.split('(')[0].trim().toUpperCase()}
              </div>
              <div className="text-cyan-400/70 text-xs font-mono">
                {selectedFurniture.width}" x {selectedFurniture.depth}"
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3 text-xs font-mono">
            <span className="text-gray-500">ROT:</span>
            <span className="text-cyan-400 font-bold">{selectedFurniture.rotation || 0}°</span>
            <span className="w-px h-3 bg-cyan-800 mx-1" />
            <span className="text-gray-500">ID:</span>
            <span className="text-pink-400/70 truncate">{selectedFurniture.instanceId.slice(-8)}</span>
          </div>

          <div className="flex gap-2 mb-3">
            <button
              onClick={() => onRotate(-90)}
              className="flex-1 px-3 py-2.5 bg-[#1a1a25] hover:bg-cyan-900/30 text-cyan-400 border border-cyan-500/30 rounded text-xs font-orbitron tracking-wide transition-all hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(0,240,255,0.2)] active:scale-95 flex items-center justify-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              -90°
            </button>
            <button
              onClick={() => onRotate(90)}
              className="flex-1 px-3 py-2.5 bg-[#1a1a25] hover:bg-cyan-900/30 text-cyan-400 border border-cyan-500/30 rounded text-xs font-orbitron tracking-wide transition-all hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(0,240,255,0.2)] active:scale-95 flex items-center justify-center gap-1"
            >
              +90°
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
              </svg>
            </button>
          </div>

          <button
            onClick={onDelete}
            className="w-full px-3 py-2.5 bg-pink-900/20 hover:bg-pink-800/30 text-pink-400 border border-pink-500/30 rounded text-xs font-orbitron tracking-wide transition-all hover:border-pink-400 hover:shadow-[0_0_10px_rgba(255,0,102,0.2)] active:scale-95 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            TERMINATE
          </button>
        </div>
      ) : (
        <div className="mb-5 p-4 bg-[#0a0a10] rounded-lg border border-gray-800 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent rounded-lg" />
          <svg className="w-10 h-10 mx-auto mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <div className="text-gray-500 text-xs font-mono relative">SELECT ASSET TO MODIFY</div>
        </div>
      )}

      {/* View toggles */}
      <div className="space-y-2">
        <Toggle
          checked={showZones}
          onChange={setShowZones}
          color="cyan"
          label="ZONE OVERLAY"
          description="Living, kitchen, bedroom sectors"
        />
        <Toggle
          checked={showTrafficPaths}
          onChange={setShowTrafficPaths}
          color="green"
          label="TRAFFIC ROUTES"
          description="Movement corridors"
        />
        <Toggle
          checked={showDimensions}
          onChange={setShowDimensions}
          color="orange"
          label="DIMENSIONS"
          description="Measurement display"
        />
        <Toggle
          checked={gridSnap}
          onChange={setGridSnap}
          color="purple"
          label="GRID LOCK"
          description='6" alignment grid'
        />
      </div>

      {/* Legend */}
      <div className="mt-5 pt-4 border-t border-gray-800">
        <h4 className="text-gray-600 text-[10px] font-orbitron font-semibold mb-3 tracking-widest">STATUS INDICATORS</h4>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex flex-col items-center gap-1.5 p-2 rounded bg-[#0a0a10] border border-gray-800">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 shadow-lg shadow-pink-500/30" />
            <span className="text-gray-500 text-[10px] font-mono">COLLISION</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2 rounded bg-[#0a0a10] border border-gray-800">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/30" />
            <span className="text-gray-500 text-[10px] font-mono">BLOCKING</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2 rounded bg-[#0a0a10] border border-gray-800">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-lg shadow-cyan-500/30" />
            <span className="text-gray-500 text-[10px] font-mono">SELECTED</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Cyberpunk Toggle component
function Toggle({ checked, onChange, color, label, description }) {
  const colorConfig = {
    cyan: { active: 'bg-cyan-500', glow: 'shadow-cyan-500/50', border: 'border-cyan-500/30', text: 'text-cyan-400' },
    green: { active: 'bg-green-500', glow: 'shadow-green-500/50', border: 'border-green-500/30', text: 'text-green-400' },
    orange: { active: 'bg-orange-500', glow: 'shadow-orange-500/50', border: 'border-orange-500/30', text: 'text-orange-400' },
    purple: { active: 'bg-purple-500', glow: 'shadow-purple-500/50', border: 'border-purple-500/30', text: 'text-purple-400' },
  };

  const colors = colorConfig[color];

  return (
    <label className={`flex items-center gap-3 p-2.5 rounded cursor-pointer transition-all border border-transparent hover:border-gray-800 hover:bg-[#0a0a10] group ${checked ? colors.border : ''}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={`w-10 h-5 rounded transition-all ${checked ? `${colors.active} shadow-md ${colors.glow}` : 'bg-gray-800'}`}>
          <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded bg-white shadow-md transition-transform ${checked ? 'translate-x-5' : ''}`} />
        </div>
      </div>
      <div className="flex-1">
        <div className={`text-xs font-orbitron font-medium tracking-wide ${checked ? colors.text : 'text-gray-400'}`}>{label}</div>
        <div className="text-gray-600 text-[10px] font-mono">{description}</div>
      </div>
    </label>
  );
}
