import { useState, useEffect, useCallback } from 'react';
import RoomCanvas from './components/Room/RoomCanvas';
import Toolbar from './components/UI/Toolbar';
import SaveLoadPanel from './components/UI/SaveLoadPanel';
import FurnitureCatalog from './components/Furniture/FurnitureCatalog';
import { DEFAULT_FURNITURE } from './data/furniturePresets';
import { saveCurrentLayout, loadCurrentLayout } from './utils/storage';

function App() {
  const [furniture, setFurniture] = useState(() => {
    const saved = loadCurrentLayout();
    return saved || DEFAULT_FURNITURE;
  });

  const [selectedId, setSelectedId] = useState(null);
  const [showZones, setShowZones] = useState(true);
  const [showTrafficPaths, setShowTrafficPaths] = useState(true);
  const [showDimensions, setShowDimensions] = useState(false);
  const [gridSnap, setGridSnap] = useState(true);

  useEffect(() => {
    saveCurrentLayout(furniture);
  }, [furniture]);

  const selectedFurniture = furniture.find((f) => f.instanceId === selectedId);

  const handleRotate = useCallback(
    (degrees) => {
      if (!selectedId) return;
      setFurniture((prev) =>
        prev.map((item) =>
          item.instanceId === selectedId
            ? { ...item, rotation: ((item.rotation || 0) + degrees + 360) % 360 }
            : item
        )
      );
    },
    [selectedId]
  );

  const handleDelete = useCallback(() => {
    if (!selectedId) return;
    setFurniture((prev) => prev.filter((item) => item.instanceId !== selectedId));
    setSelectedId(null);
  }, [selectedId]);

  const handleAddFurniture = useCallback((newItem) => {
    setFurniture((prev) => [...prev, newItem]);
    setSelectedId(newItem.instanceId);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedId) return;

      switch (e.key) {
        case 'Delete':
        case 'Backspace':
          if (document.activeElement.tagName !== 'INPUT') {
            handleDelete();
          }
          break;
        case 'r':
        case 'R':
          if (document.activeElement.tagName !== 'INPUT') {
            handleRotate(e.shiftKey ? -90 : 90);
          }
          break;
        case 'Escape':
          setSelectedId(null);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, handleDelete, handleRotate]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white rain-bg cyber-grid-bg">
      {/* Cyberpunk Header */}
      <header className="border-b border-cyan-500/20 bg-[#0d0d15]/95 backdrop-blur-sm sticky top-0 z-10 relative overflow-hidden">
        {/* Animated top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

        {/* Holographic shimmer */}
        <div className="absolute inset-0 holographic opacity-30" />

        <div className="max-w-[1800px] mx-auto px-6 py-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Logo/Icon */}
              <div className="relative">
                <div className="w-14 h-14 border-2 border-cyan-400 rotate-45 flex items-center justify-center bg-cyan-400/10 pulse-glow">
                  <svg className="w-6 h-6 -rotate-45 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="absolute -inset-1 border border-cyan-400/30 rotate-45" />
              </div>

              <div>
                <h1 className="font-orbitron text-2xl font-bold tracking-wider">
                  <span className="neon-cyan">THE EARL</span>
                  <span className="text-gray-500 mx-3">//</span>
                  <span className="text-gray-300">SECTOR PLANNER</span>
                </h1>
                <div className="flex items-center gap-4 mt-1 text-sm font-mono">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
                    <span className="text-green-400">UNIT S-01</span>
                  </span>
                  <span className="text-cyan-600">|</span>
                  <span className="text-cyan-400/70">MODEL: 1JR-03</span>
                  <span className="text-cyan-600">|</span>
                  <span className="text-pink-400/70">LIVING: 17'4" x 13'0"</span>
                  <span className="text-cyan-600">|</span>
                  <span className="text-orange-400/70">BEDROOM: 8'0" x 9'10"</span>
                </div>
              </div>
            </div>

            {/* Keyboard shortcuts */}
            <div className="hidden md:flex items-center gap-3 text-xs font-mono bg-black/50 px-4 py-3 border border-cyan-500/20 corner-brackets">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px]">R</kbd>
                <span className="text-gray-500">ROTATE</span>
              </div>
              <span className="text-cyan-700">|</span>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-pink-500/10 border border-pink-500/30 text-pink-400 font-mono text-[10px]">DEL</kbd>
                <span className="text-gray-500">REMOVE</span>
              </div>
              <span className="text-cyan-700">|</span>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-[10px]">ESC</kbd>
                <span className="text-gray-500">DESELECT</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-[1800px] mx-auto p-6">
        <div className="flex gap-6 flex-wrap xl:flex-nowrap">
          {/* Canvas area */}
          <div className="flex-1 min-w-0 overflow-x-auto">
            <div className="inline-block relative">
              {/* Corner decorations */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-cyan-400/50" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-pink-400/50" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-pink-400/50" />

              <RoomCanvas
                furniture={furniture}
                setFurniture={setFurniture}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                showZones={showZones}
                showTrafficPaths={showTrafficPaths}
                showDimensions={showDimensions}
                gridSnap={gridSnap}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full xl:w-80 space-y-5 flex-shrink-0">
            <Toolbar
              selectedFurniture={selectedFurniture}
              onRotate={handleRotate}
              onDelete={handleDelete}
              showZones={showZones}
              setShowZones={setShowZones}
              showTrafficPaths={showTrafficPaths}
              setShowTrafficPaths={setShowTrafficPaths}
              showDimensions={showDimensions}
              setShowDimensions={setShowDimensions}
              gridSnap={gridSnap}
              setGridSnap={setGridSnap}
            />

            <FurnitureCatalog onAddFurniture={handleAddFurniture} />

            <SaveLoadPanel
              furniture={furniture}
              setFurniture={setFurniture}
              setSelectedId={setSelectedId}
            />
          </div>
        </div>

        {/* Priority Mission Banner */}
        <div className="mt-8 relative">
          {/* Animated border */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-orange-500/20 rounded-lg animate-pulse" />

          <div className="relative p-5 bg-gradient-to-r from-orange-900/40 via-pink-900/30 to-orange-900/40 border border-orange-500/30 rounded-lg flex items-center gap-5 backdrop-blur-sm">
            {/* Warning icon */}
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 border-2 border-orange-400 flex items-center justify-center bg-orange-400/10">
                <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-ping" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-orbitron text-orange-400 tracking-wider font-bold">PRIORITY OBJECTIVE</span>
                <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-mono">
                  DEADLINE: FEB 11
                </span>
              </div>
              <p className="text-orange-200/80 font-mono text-sm">
                ASSET DEPLOYMENT: Poly & Bark Napa 72" [72" x 36"] - Cognac Leather
              </p>
              <p className="text-orange-200/50 font-mono text-xs mt-1">
                MISSION: Couch placement before NIN concert
              </p>
            </div>

            {/* Status bars */}
            <div className="hidden lg:flex flex-col gap-2 pr-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500 w-16">URGENCY</span>
                <div className="w-24 h-2 bg-black/50 border border-orange-500/30">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-pink-500 w-[85%]" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500 w-16">SPACE</span>
                <div className="w-24 h-2 bg-black/50 border border-cyan-500/30">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-[60%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-900/30 mt-8 py-4 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="max-w-[1800px] mx-auto px-6 flex items-center justify-between">
          <div className="text-cyan-600/50 text-xs font-mono tracking-wider">
            LOCATION: THE EARL // CLARENDON SECTOR // ARLINGTON-VA
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-gray-600">SYS.VER 2.0.49</span>
            <span className="text-cyan-500/30">|</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-500/50">ONLINE</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
