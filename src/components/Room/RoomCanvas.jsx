import { useRef, useState, useCallback, useEffect } from 'react';
import { SCALE, ROOM, FIXED_ELEMENTS, TRAFFIC_PATHS, ZONES } from '../../data/roomDimensions';
import { rectsOverlap, overlapsTrafficPath, snapToGrid } from '../../utils/geometry';
import FixedElements from './FixedElements';
import ZoneOverlays from './ZoneOverlays';
import TrafficPaths from './TrafficPaths';
import DraggableFurniture from '../Furniture/DraggableFurniture';

const TOTAL_HEIGHT = ROOM.livingDepth + ROOM.bedroomDepth + 40;
const CANVAS_WIDTH = ROOM.livingWidth * SCALE + 120;
const CANVAS_HEIGHT = TOTAL_HEIGHT * SCALE + 120;

export default function RoomCanvas({
  furniture,
  setFurniture,
  selectedId,
  setSelectedId,
  showZones,
  showTrafficPaths,
  showDimensions,
  gridSnap,
}) {
  const svgRef = useRef(null);
  const [dragState, setDragState] = useState(null);

  const getCollisions = useCallback((items) => {
    const collisions = {};

    items.forEach((item, index) => {
      let hasCollision = false;
      let blocksPath = false;

      items.forEach((other, otherIndex) => {
        if (index !== otherIndex) {
          if (rectsOverlap(item, other)) {
            hasCollision = true;
          }
        }
      });

      TRAFFIC_PATHS.forEach((path) => {
        if (overlapsTrafficPath(item, path)) {
          blocksPath = true;
        }
      });

      const blockingElements = [
        'kitchenCounter', 'refrigerator', 'dishwasher', 'microwave',
        'dividingWall', 'bathroom', 'walkInCloset', 'washerDryer'
      ];

      blockingElements.forEach((key) => {
        const element = FIXED_ELEMENTS[key];
        if (element && element.width && element.height) {
          if (rectsOverlap(item, { ...element, depth: element.height })) {
            hasCollision = true;
          }
        }
      });

      collisions[item.instanceId] = { hasCollision, blocksPath };
    });

    return collisions;
  }, []);

  const collisions = getCollisions(furniture);

  const handlePointerDown = useCallback(
    (e, item) => {
      if (e.button !== 0) return;

      const svg = svgRef.current;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

      setDragState({
        id: item.instanceId,
        startX: svgP.x,
        startY: svgP.y,
        itemStartX: item.x * SCALE,
        itemStartY: item.y * SCALE,
      });

      setSelectedId(item.instanceId);
      e.preventDefault();
    },
    [setSelectedId]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!dragState) return;

      const svg = svgRef.current;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

      const dx = svgP.x - dragState.startX;
      const dy = svgP.y - dragState.startY;

      let newX = (dragState.itemStartX + dx) / SCALE;
      let newY = (dragState.itemStartY + dy) / SCALE;

      if (gridSnap) {
        newX = snapToGrid(newX);
        newY = snapToGrid(newY);
      }

      const item = furniture.find(f => f.instanceId === dragState.id);
      if (item) {
        newX = Math.max(0, Math.min(newX, ROOM.livingWidth - item.width));
        newY = Math.max(0, Math.min(newY, TOTAL_HEIGHT - item.depth));
      }

      setFurniture((prev) =>
        prev.map((item) =>
          item.instanceId === dragState.id ? { ...item, x: newX, y: newY } : item
        )
      );
    },
    [dragState, gridSnap, setFurniture, furniture]
  );

  const handlePointerUp = useCallback(() => {
    setDragState(null);
  }, []);

  useEffect(() => {
    if (dragState) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [dragState, handlePointerMove, handlePointerUp]);

  const handleCanvasClick = (e) => {
    if (e.target === svgRef.current || e.target.classList.contains('room-floor')) {
      setSelectedId(null);
    }
  };

  return (
    <svg
      ref={svgRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
      className="cursor-crosshair"
      onClick={handleCanvasClick}
      style={{
        touchAction: 'none',
        background: 'linear-gradient(180deg, #0a0a12 0%, #0f0f1a 50%, #0a0a12 100%)',
        filter: 'drop-shadow(0 0 30px rgba(0, 240, 255, 0.15))',
      }}
    >
      <defs>
        {/* Neon cyan grid pattern */}
        <pattern id="neonGridSmall" width={6 * SCALE} height={6 * SCALE} patternUnits="userSpaceOnUse">
          <path d={`M ${6 * SCALE} 0 L 0 0 0 ${6 * SCALE}`} fill="none" stroke="rgba(0,240,255,0.08)" strokeWidth="0.5" />
        </pattern>
        <pattern id="neonGridLarge" width={24 * SCALE} height={24 * SCALE} patternUnits="userSpaceOnUse">
          <rect width={24 * SCALE} height={24 * SCALE} fill="url(#neonGridSmall)" />
          <path d={`M ${24 * SCALE} 0 L 0 0 0 ${24 * SCALE}`} fill="none" stroke="rgba(0,240,255,0.15)" strokeWidth="1" />
        </pattern>

        {/* Cyberpunk floor gradients */}
        <linearGradient id="cyberFloorLiving" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f1420" />
          <stop offset="50%" stopColor="#151a28" />
          <stop offset="100%" stopColor="#0f1420" />
        </linearGradient>

        <linearGradient id="cyberFloorBedroom" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#120f18" />
          <stop offset="50%" stopColor="#1a1525" />
          <stop offset="100%" stopColor="#120f18" />
        </linearGradient>

        {/* Neon glow filters */}
        <filter id="neonGlowCyan" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="#00f0ff" floodOpacity="0.5" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="neonGlowPink" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="#ff0066" floodOpacity="0.5" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="neonGlowOrange" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="#ff6600" floodOpacity="0.5" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Holographic shimmer */}
        <linearGradient id="holoShimmer" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.1">
            <animate attributeName="stopOpacity" values="0.1;0.2;0.1" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor="#ff0066" stopOpacity="0.05">
            <animate attributeName="stopOpacity" values="0.05;0.15;0.05" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.1">
            <animate attributeName="stopOpacity" values="0.1;0.2;0.1" dur="3s" repeatCount="indefinite" />
          </stop>
        </linearGradient>

        {/* Window glow effect */}
        <filter id="windowNeonGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feFlood floodColor="#00bfff" floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Scan line effect */}
        <pattern id="scanLines" width="4" height="4" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="4" y2="0" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Dark void background */}
      <rect x="0" y="0" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill="#0a0a0f" />

      {/* Offset group */}
      <g transform="translate(60, 60)">
        {/* Living/Kitchen floor */}
        <rect
          className="room-floor"
          x="0"
          y="0"
          width={ROOM.livingWidth * SCALE}
          height={ROOM.livingDepth * SCALE}
          fill="url(#cyberFloorLiving)"
          stroke="#00f0ff"
          strokeWidth="2"
          strokeOpacity="0.4"
        />

        {/* Neon corner accents for living area */}
        <path
          d={`M 0 30 L 0 0 L 30 0`}
          fill="none"
          stroke="#00f0ff"
          strokeWidth="3"
          filter="url(#neonGlowCyan)"
        />
        <path
          d={`M ${ROOM.livingWidth * SCALE - 30} 0 L ${ROOM.livingWidth * SCALE} 0 L ${ROOM.livingWidth * SCALE} 30`}
          fill="none"
          stroke="#00f0ff"
          strokeWidth="3"
          filter="url(#neonGlowCyan)"
        />
        <path
          d={`M 0 ${ROOM.livingDepth * SCALE - 30} L 0 ${ROOM.livingDepth * SCALE} L 30 ${ROOM.livingDepth * SCALE}`}
          fill="none"
          stroke="#ff0066"
          strokeWidth="3"
          filter="url(#neonGlowPink)"
        />

        {/* Bedroom floor */}
        <rect
          className="room-floor"
          x={(ROOM.livingWidth - ROOM.bedroomWidth - 20) * SCALE}
          y={(ROOM.livingDepth + 6) * SCALE}
          width={(ROOM.bedroomWidth + 20) * SCALE}
          height={(ROOM.bedroomDepth - 6) * SCALE}
          fill="url(#cyberFloorBedroom)"
          stroke="#9933ff"
          strokeWidth="2"
          strokeOpacity="0.4"
        />

        {/* Neon corner accents for bedroom */}
        <path
          d={`M ${(ROOM.livingWidth - ROOM.bedroomWidth - 20) * SCALE} ${(ROOM.livingDepth + 6 + 30) * SCALE}
              L ${(ROOM.livingWidth - ROOM.bedroomWidth - 20) * SCALE} ${(ROOM.livingDepth + 6) * SCALE}
              L ${(ROOM.livingWidth - ROOM.bedroomWidth - 20 + 30) * SCALE} ${(ROOM.livingDepth + 6) * SCALE}`}
          fill="none"
          stroke="#9933ff"
          strokeWidth="3"
          filter="url(#neonGlowPink)"
        />

        {/* Grid overlay */}
        <rect
          x="0"
          y="0"
          width={ROOM.livingWidth * SCALE}
          height={TOTAL_HEIGHT * SCALE}
          fill="url(#neonGridLarge)"
          pointerEvents="none"
        />

        {/* Holographic shimmer overlay */}
        <rect
          x="0"
          y="0"
          width={ROOM.livingWidth * SCALE}
          height={ROOM.livingDepth * SCALE}
          fill="url(#holoShimmer)"
          pointerEvents="none"
        />

        {/* Zone overlays */}
        {showZones && <ZoneOverlays zones={ZONES} scale={SCALE} />}

        {/* Traffic paths */}
        {showTrafficPaths && <TrafficPaths paths={TRAFFIC_PATHS} scale={SCALE} />}

        {/* Fixed architectural elements */}
        <FixedElements elements={FIXED_ELEMENTS} scale={SCALE} showDimensions={showDimensions} />

        {/* Furniture items */}
        {furniture.map((item) => (
          <DraggableFurniture
            key={item.instanceId}
            item={item}
            scale={SCALE}
            isSelected={selectedId === item.instanceId}
            collision={collisions[item.instanceId]}
            onPointerDown={(e) => handlePointerDown(e, item)}
            showDimensions={showDimensions}
          />
        ))}

        {/* Dimension labels */}
        {showDimensions && (
          <>
            <g transform={`translate(0, ${-25})`}>
              <line x1="0" y1="0" x2={ROOM.livingWidth * SCALE} y2="0" stroke="#00f0ff" strokeWidth="1" strokeDasharray="6,3" opacity="0.6" />
              <circle cx="0" cy="0" r="4" fill="#00f0ff" />
              <circle cx={ROOM.livingWidth * SCALE} cy="0" r="4" fill="#00f0ff" />
              <rect x={(ROOM.livingWidth * SCALE) / 2 - 55} y="-14" width="110" height="22" rx="2" fill="#0a0a0f" stroke="#00f0ff" strokeWidth="1" />
              <text x={(ROOM.livingWidth * SCALE) / 2} y="2" textAnchor="middle" fill="#00f0ff" fontSize="11" fontFamily="'Share Tech Mono', monospace" fontWeight="500">
                {(ROOM.livingWidth / 12).toFixed(1)}' ({ROOM.livingWidth}")
              </text>
            </g>

            <g transform={`translate(${(ROOM.livingWidth + 18) * SCALE}, 0)`}>
              <line x1="0" y1="0" x2="0" y2={ROOM.livingDepth * SCALE} stroke="#ff0066" strokeWidth="1" strokeDasharray="6,3" opacity="0.6" />
              <circle cx="0" cy="0" r="4" fill="#ff0066" />
              <circle cx="0" cy={ROOM.livingDepth * SCALE} r="4" fill="#ff0066" />
              <rect x="10" y={(ROOM.livingDepth * SCALE) / 2 - 11} width="100" height="22" rx="2" fill="#0a0a0f" stroke="#ff0066" strokeWidth="1" />
              <text x="15" y={(ROOM.livingDepth * SCALE) / 2 + 3} textAnchor="start" fill="#ff0066" fontSize="11" fontFamily="'Share Tech Mono', monospace" fontWeight="500">
                {(ROOM.livingDepth / 12).toFixed(1)}' ({ROOM.livingDepth}")
              </text>
            </g>
          </>
        )}
      </g>

      {/* Compass rose - cyberpunk style */}
      <g transform={`translate(${CANVAS_WIDTH - 55}, 55)`}>
        <circle cx="0" cy="0" r="28" fill="rgba(10,10,15,0.95)" stroke="#00f0ff" strokeWidth="2" />
        <circle cx="0" cy="0" r="24" fill="none" stroke="#00f0ff" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
        <text x="0" y="-8" textAnchor="middle" fill="#00f0ff" fontSize="16" fontWeight="bold" fontFamily="'Orbitron', sans-serif">N</text>
        <path d="M 0 -20 L 5 -8 L 0 -12 L -5 -8 Z" fill="#00f0ff" filter="url(#neonGlowCyan)" />
        <text x="0" y="18" textAnchor="middle" fill="#00bfff" fontSize="8" fontFamily="'Share Tech Mono', monospace" opacity="0.7">WINDOW</text>
      </g>

      {/* Scan line overlay */}
      <rect x="0" y="0" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill="url(#scanLines)" pointerEvents="none" opacity="0.3" />
    </svg>
  );
}
