// Cyberpunk Furniture Catalog

import { FURNITURE_CATALOG } from '../../data/furniturePresets';

const categoryConfig = {
  seating: {
    label: 'SEATING',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    color: 'orange'
  },
  work: {
    label: 'WORKSTATION',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'cyan'
  },
  entertainment: {
    label: 'ENTERTAINMENT',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'pink'
  },
  living: {
    label: 'LIVING',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    color: 'yellow'
  },
  lighting: {
    label: 'ILLUMINATION',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'yellow'
  },
  bedroom: {
    label: 'SLEEP SECTOR',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    color: 'purple'
  },
};

const colorClasses = {
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', hover: 'hover:border-orange-400', glow: 'hover:shadow-[0_0_10px_rgba(255,102,0,0.2)]' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', hover: 'hover:border-cyan-400', glow: 'hover:shadow-[0_0_10px_rgba(0,240,255,0.2)]' },
  pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400', hover: 'hover:border-pink-400', glow: 'hover:shadow-[0_0_10px_rgba(255,0,102,0.2)]' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', hover: 'hover:border-yellow-400', glow: 'hover:shadow-[0_0_10px_rgba(255,204,0,0.2)]' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', hover: 'hover:border-purple-400', glow: 'hover:shadow-[0_0_10px_rgba(153,51,255,0.2)]' },
};

export default function FurnitureCatalog({ onAddFurniture }) {
  const groupedFurniture = Object.values(FURNITURE_CATALOG).reduce((acc, item) => {
    const cat = item.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const handleAdd = (item) => {
    const instanceId = `${item.id}-${Date.now()}`;
    onAddFurniture({
      ...item,
      instanceId,
      x: 80,
      y: 80,
      rotation: 0,
    });
  };

  // Cyberpunk gradient style for furniture preview
  const getGradientStyle = (id) => {
    if (id === 'couch') return 'linear-gradient(135deg, #ff6600, #cc5200)';
    if (id === 'desk') return 'linear-gradient(135deg, #00f0ff, #00c0cc)';
    if (id === 'officeChair') return 'linear-gradient(135deg, #9933ff, #7722cc)';
    if (id === 'tv') return 'linear-gradient(135deg, #ff0066, #cc0052)';
    if (id === 'airMattress' || id === 'queenBed') return 'linear-gradient(135deg, #00ff88, #00cc6a)';
    if (id.includes('Table') || id === 'nightstand') return 'linear-gradient(135deg, #ffcc00, #cc9900)';
    if (id === 'tableLamp') return 'linear-gradient(135deg, #ffff00, #cccc00)';
    if (id === 'stool') return 'linear-gradient(135deg, #ff6600, #cc5200)';
    return 'linear-gradient(135deg, #00f0ff, #00c0cc)';
  };

  return (
    <div className="relative bg-gradient-to-b from-[#12121a] to-[#0d0d15] rounded-lg p-5 border border-green-500/20 max-h-[420px] overflow-y-auto">
      {/* Top neon line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent" />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-green-400/50" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-green-400/50" />

      <h3 className="font-orbitron text-green-400 font-bold mb-4 flex items-center gap-3 text-sm tracking-wider sticky top-0 bg-gradient-to-r from-[#12121a] to-[#0d0d15] pb-2 -mt-1 pt-1 z-10">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        ASSET DEPLOYMENT
      </h3>

      {Object.entries(categoryConfig).map(([catKey, catConfig]) => {
        const items = groupedFurniture[catKey];
        if (!items || items.length === 0) return null;
        const colors = colorClasses[catConfig.color];

        return (
          <div key={catKey} className="mb-4">
            <h4 className={`text-[10px] font-orbitron font-semibold mb-2 flex items-center gap-2 ${colors.text} tracking-widest`}>
              {catConfig.icon}
              {catConfig.label}
            </h4>
            <div className="space-y-1.5">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAdd(item)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded ${colors.bg} border ${colors.border} ${colors.hover} ${colors.glow} transition-all text-left group active:scale-[0.98]`}
                >
                  <div
                    className="w-10 h-7 rounded flex-shrink-0 border border-white/10"
                    style={{
                      background: getGradientStyle(item.id),
                      boxShadow: `0 0 8px ${getGradientStyle(item.id).includes('ff6600') ? 'rgba(255,102,0,0.3)' :
                        getGradientStyle(item.id).includes('00f0ff') ? 'rgba(0,240,255,0.3)' :
                        getGradientStyle(item.id).includes('ff0066') ? 'rgba(255,0,102,0.3)' : 'rgba(0,255,136,0.3)'}`
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-orbitron font-medium truncate tracking-wide">
                      {item.name.split('(')[0].trim().toUpperCase()}
                    </div>
                    <div className="text-gray-500 text-[10px] font-mono">
                      {item.width}" x {item.depth}" x {item.height}"h
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
