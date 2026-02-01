// Cyberpunk Draggable Furniture with Neon Glow Effects

export default function DraggableFurniture({
  item,
  scale,
  isSelected,
  collision,
  onPointerDown,
  showDimensions,
}) {
  const { x, y, width, depth, rotation = 0, name, isCircle, id } = item;
  const hasCollision = collision?.hasCollision;
  const blocksPath = collision?.blocksPath;

  // Cyberpunk neon color palette for furniture
  const getCyberColors = () => {
    if (id === 'couch') return { main: '#ff6600', accent: '#ff8800', glow: 'rgba(255,102,0,0.5)', text: '#fff' };
    if (id === 'desk') return { main: '#00f0ff', accent: '#00d4e0', glow: 'rgba(0,240,255,0.5)', text: '#fff' };
    if (id === 'officeChair') return { main: '#9933ff', accent: '#aa44ff', glow: 'rgba(153,51,255,0.5)', text: '#fff' };
    if (id === 'tv') return { main: '#ff0066', accent: '#ff1a80', glow: 'rgba(255,0,102,0.5)', text: '#00f0ff' };
    if (id === 'airMattress' || id === 'queenBed') return { main: '#00ff88', accent: '#33ff99', glow: 'rgba(0,255,136,0.5)', text: '#000' };
    if (id === 'coffeeTable' || id === 'sideTable' || id === 'nightstand') return { main: '#ffcc00', accent: '#ffdd33', glow: 'rgba(255,204,0,0.5)', text: '#000' };
    if (id === 'tableLamp') return { main: '#ffff00', accent: '#ffff33', glow: 'rgba(255,255,0,0.8)', text: '#000' };
    if (id === 'stool') return { main: '#ff6600', accent: '#ff8833', glow: 'rgba(255,102,0,0.5)', text: '#fff' };
    return { main: '#00f0ff', accent: '#33f5ff', glow: 'rgba(0,240,255,0.5)', text: '#fff' };
  };

  const colors = getCyberColors();
  const filterId = `neon-${item.instanceId}`;

  // Determine glow color based on state
  let glowColor = colors.glow;
  let strokeColor = colors.main;
  let strokeWidth = 2;
  let filterToUse = filterId;

  if (isSelected) {
    glowColor = 'rgba(0,240,255,0.8)';
    strokeColor = '#00f0ff';
    strokeWidth = 3;
  } else if (hasCollision) {
    glowColor = 'rgba(255,0,102,0.8)';
    strokeColor = '#ff0066';
    strokeWidth = 3;
  } else if (blocksPath) {
    glowColor = 'rgba(255,102,0,0.8)';
    strokeColor = '#ff6600';
    strokeWidth = 3;
  }

  const centerX = x + width / 2;
  const centerY = y + depth / 2;

  return (
    <g
      transform={`rotate(${rotation}, ${centerX * scale}, ${centerY * scale})`}
      onPointerDown={onPointerDown}
      style={{ cursor: 'grab' }}
      className="furniture-item"
    >
      <defs>
        {/* Dynamic neon glow filter */}
        <filter id={filterId} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feFlood floodColor={strokeColor} floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Holographic gradient fill */}
        <linearGradient id={`holo-${item.instanceId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.main} stopOpacity="0.3" />
          <stop offset="50%" stopColor={colors.accent} stopOpacity="0.4" />
          <stop offset="100%" stopColor={colors.main} stopOpacity="0.3" />
        </linearGradient>

        {/* Tech pattern fill */}
        <pattern id={`tech-${item.instanceId}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill={`${colors.main}15`} />
          <line x1="0" y1="5" x2="10" y2="5" stroke={colors.main} strokeWidth="0.5" opacity="0.3" />
          <line x1="5" y1="0" x2="5" y2="10" stroke={colors.main} strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>

      {/* Outer glow ring for selected/collision states */}
      {(isSelected || hasCollision || blocksPath) && (
        <>
          {isCircle ? (
            <circle
              cx={(x + width / 2) * scale}
              cy={(y + depth / 2) * scale}
              r={(Math.max(width, depth) / 2 + 12) * scale}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
              strokeDasharray="8,4"
              opacity="0.6"
            >
              <animate attributeName="stroke-dashoffset" values="0;24" dur="1s" repeatCount="indefinite" />
            </circle>
          ) : (
            <rect
              x={(x - 8) * scale}
              y={(y - 8) * scale}
              width={(width + 16) * scale}
              height={(depth + 16) * scale}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
              strokeDasharray="8,4"
              rx="4"
              opacity="0.6"
            >
              <animate attributeName="stroke-dashoffset" values="0;24" dur="1s" repeatCount="indefinite" />
            </rect>
          )}
        </>
      )}

      {/* Ambient glow */}
      {isCircle ? (
        <circle
          cx={(x + width / 2) * scale}
          cy={(y + depth / 2) * scale}
          r={(Math.max(width, depth) / 2) * scale}
          fill={glowColor}
          style={{ filter: 'blur(15px)' }}
          opacity="0.3"
        />
      ) : (
        <rect
          x={x * scale}
          y={y * scale}
          width={width * scale}
          height={depth * scale}
          fill={glowColor}
          rx="4"
          style={{ filter: 'blur(15px)' }}
          opacity="0.3"
        />
      )}

      {/* Main furniture shape */}
      {isCircle ? (
        <>
          <circle
            cx={(x + width / 2) * scale}
            cy={(y + depth / 2) * scale}
            r={(Math.max(width, depth) / 2) * scale}
            fill={`url(#holo-${item.instanceId})`}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            filter={`url(#${filterId})`}
          />
          {/* Inner tech ring */}
          <circle
            cx={(x + width / 2) * scale}
            cy={(y + depth / 2) * scale}
            r={(Math.max(width, depth) / 2 - 4) * scale}
            fill="none"
            stroke={colors.accent}
            strokeWidth="1"
            opacity="0.5"
            strokeDasharray="3,3"
          />
        </>
      ) : (
        <>
          {/* Main rectangle with tech pattern */}
          <rect
            x={x * scale}
            y={y * scale}
            width={width * scale}
            height={depth * scale}
            fill={`url(#tech-${item.instanceId})`}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            rx="3"
            filter={`url(#${filterId})`}
          />
          {/* Corner accent lines */}
          <path
            d={`M ${(x + 2) * scale} ${(y + 8) * scale} L ${(x + 2) * scale} ${(y + 2) * scale} L ${(x + 8) * scale} ${(y + 2) * scale}`}
            fill="none"
            stroke={colors.accent}
            strokeWidth="2"
            opacity="0.8"
          />
          <path
            d={`M ${(x + width - 8) * scale} ${(y + 2) * scale} L ${(x + width - 2) * scale} ${(y + 2) * scale} L ${(x + width - 2) * scale} ${(y + 8) * scale}`}
            fill="none"
            stroke={colors.accent}
            strokeWidth="2"
            opacity="0.8"
          />
          <path
            d={`M ${(x + 2) * scale} ${(y + depth - 8) * scale} L ${(x + 2) * scale} ${(y + depth - 2) * scale} L ${(x + 8) * scale} ${(y + depth - 2) * scale}`}
            fill="none"
            stroke={colors.accent}
            strokeWidth="2"
            opacity="0.5"
          />
          <path
            d={`M ${(x + width - 8) * scale} ${(y + depth - 2) * scale} L ${(x + width - 2) * scale} ${(y + depth - 2) * scale} L ${(x + width - 2) * scale} ${(y + depth - 8) * scale}`}
            fill="none"
            stroke={colors.accent}
            strokeWidth="2"
            opacity="0.5"
          />
          {/* Center line detail */}
          <line
            x1={(x + width / 2) * scale}
            y1={(y + 4) * scale}
            x2={(x + width / 2) * scale}
            y2={(y + depth - 4) * scale}
            stroke={colors.main}
            strokeWidth="1"
            opacity="0.2"
            strokeDasharray="4,4"
          />
        </>
      )}

      {/* Furniture label - cyberpunk style */}
      <text
        x={(x + width / 2) * scale}
        y={(y + depth / 2) * scale}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={colors.text}
        fontSize={Math.max(9, Math.min(12, width * scale * 0.12))}
        fontWeight="600"
        fontFamily="'Orbitron', sans-serif"
        letterSpacing="0.05em"
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          textTransform: 'uppercase',
        }}
      >
        {name.split('(')[0].trim().split(' ').slice(0, 2).join(' ')}
      </text>

      {/* Dimension badges */}
      {(isSelected || showDimensions) && (
        <>
          {/* Width dimension */}
          <g transform={`translate(${(x + width / 2) * scale}, ${(y - 16) * scale})`}>
            <rect x="-24" y="-11" width="48" height="18" rx="2" fill="#0a0a0f" stroke="#00f0ff" strokeWidth="1" />
            <text x="0" y="2" textAnchor="middle" fill="#00f0ff" fontSize="10" fontFamily="'Share Tech Mono', monospace" fontWeight="500">
              {width}"
            </text>
          </g>
          {/* Depth dimension */}
          <g transform={`translate(${(x + width + 16) * scale}, ${(y + depth / 2) * scale})`}>
            <rect x="-24" y="-11" width="48" height="18" rx="2" fill="#0a0a0f" stroke="#ff0066" strokeWidth="1" />
            <text x="0" y="2" textAnchor="middle" fill="#ff0066" fontSize="10" fontFamily="'Share Tech Mono', monospace" fontWeight="500">
              {depth}"
            </text>
          </g>
        </>
      )}

      {/* Warning indicator - cyberpunk style */}
      {(hasCollision || blocksPath) && (
        <g transform={`translate(${(x + width - 8) * scale}, ${(y + 8) * scale})`}>
          <polygon
            points="0,-14 12,10 -12,10"
            fill={hasCollision ? '#ff0066' : '#ff6600'}
            stroke="#fff"
            strokeWidth="2"
          />
          <text
            y="4"
            textAnchor="middle"
            fill="#fff"
            fontSize="14"
            fontWeight="bold"
            fontFamily="'Orbitron', sans-serif"
            style={{ pointerEvents: 'none' }}
          >
            !
          </text>
          {/* Pulse effect */}
          <circle
            r="20"
            fill="none"
            stroke={hasCollision ? '#ff0066' : '#ff6600'}
            strokeWidth="2"
            opacity="0.5"
          >
            <animate attributeName="r" values="14;22;14" dur="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="1s" repeatCount="indefinite" />
          </circle>
        </g>
      )}

      {/* Rotation handle when selected */}
      {isSelected && (
        <g transform={`translate(${(x + width / 2) * scale}, ${(y - 35) * scale})`}>
          <line x1="0" y1="20" x2="0" y2="10" stroke="#00f0ff" strokeWidth="2" />
          <circle r="14" fill="#0a0a0f" stroke="#00f0ff" strokeWidth="2" style={{ cursor: 'grab' }} />
          <circle r="10" fill="none" stroke="#00f0ff" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
          <path
            d="M -5 -2 A 6 6 0 1 1 5 -2"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M 5 -2 L 8 -6 L 9 0 Z" fill="#00f0ff" />
        </g>
      )}
    </g>
  );
}
