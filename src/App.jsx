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
  const [showSidebar, setShowSidebar] = useState(true);

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
      // Toggle sidebar with Tab
      if (e.key === 'Tab') {
        e.preventDefault();
        setShowSidebar(prev => !prev);
        return;
      }

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
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-auto">
      {/* Minimal Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-[#0a0a0f]/90 backdrop-blur-sm border-b border-cyan-500/20">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        <div className="px-3 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border border-cyan-400 rotate-45 flex items-center justify-center bg-cyan-400/10">
              <svg className="w-3 h-3 -rotate-45 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h1 className="font-orbitron text-sm font-bold tracking-wider">
              <span className="text-cyan-400">THE EARL</span>
              <span className="text-gray-600 mx-1.5">//</span>
              <span className="text-gray-500">S-01</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
              <kbd className="px-1 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">R</kbd>
              <kbd className="px-1 py-0.5 bg-pink-500/10 border border-pink-500/30 text-pink-400">DEL</kbd>
              <kbd className="px-1 py-0.5 bg-orange-500/10 border border-orange-500/30 text-orange-400">ESC</kbd>
            </div>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className={`px-2 py-1 text-[10px] font-orbitron border rounded transition-all ${
                showSidebar
                  ? 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10'
                  : 'border-gray-700 text-gray-500 hover:border-cyan-500/30'
              }`}
            >
              {showSidebar ? 'HIDE' : 'SHOW'} PANEL
            </button>
          </div>
        </div>
      </header>

      {/* Canvas - Full viewport, scrollable */}
      <main className="pt-10 pb-4 px-2">
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
      </main>

      {/* Floating Sidebar */}
      <div className={`fixed top-12 right-2 bottom-2 w-72 z-10 transition-transform duration-300 ${
        showSidebar ? 'translate-x-0' : 'translate-x-[calc(100%+1rem)]'
      }`}>
        <div className="h-full flex flex-col gap-2 overflow-y-auto pr-1 pb-2">
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

      {/* Couch deadline - compact floating badge */}
      <div className="fixed bottom-3 left-3 z-10">
        <div className="flex items-center gap-2 px-3 py-2 bg-orange-900/80 border border-orange-500/40 rounded backdrop-blur-sm">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
          <span className="text-orange-300 text-xs font-mono">COUCH: FEB 11</span>
        </div>
      </div>
    </div>
  );
}

export default App;
