// Cyberpunk Traffic Flow Path Visualization

export default function TrafficPaths({ paths, scale }) {
  return (
    <g className="traffic-paths">
      <defs>
        {/* Animated gradient for path */}
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#00ff88" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00ff88" stopOpacity="0.1" />
        </linearGradient>

        {/* Glow filter for paths */}
        <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#00ff88" floodOpacity="0.4" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {paths.map((path) => {
        const pathD = path.points
          .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x * scale} ${p.y * scale}`)
          .join(' ');

        return (
          <g key={path.id}>
            {/* Path corridor background - wide glow */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(0,255,136,0.1)"
              strokeWidth={path.width * scale}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Secondary glow layer */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(0,255,136,0.15)"
              strokeWidth={path.width * scale * 0.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Animated center line */}
            <path
              d={pathD}
              fill="none"
              stroke="#00ff88"
              strokeWidth="2"
              strokeDasharray="12,6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.7"
              filter="url(#pathGlow)"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-36"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>

            {/* Edge lines */}
            {path.points.slice(0, -1).map((point, i) => {
              const nextPoint = path.points[i + 1];
              const dx = nextPoint.x - point.x;
              const dy = nextPoint.y - point.y;
              const len = Math.sqrt(dx * dx + dy * dy);
              const nx = -dy / len * (path.width / 2);
              const ny = dx / len * (path.width / 2);

              return (
                <g key={i}>
                  <line
                    x1={(point.x + nx) * scale}
                    y1={(point.y + ny) * scale}
                    x2={(nextPoint.x + nx) * scale}
                    y2={(nextPoint.y + ny) * scale}
                    stroke="#00ff88"
                    strokeWidth="1"
                    opacity="0.3"
                    strokeDasharray="4,8"
                  />
                  <line
                    x1={(point.x - nx) * scale}
                    y1={(point.y - ny) * scale}
                    x2={(nextPoint.x - nx) * scale}
                    y2={(nextPoint.y - ny) * scale}
                    stroke="#00ff88"
                    strokeWidth="1"
                    opacity="0.3"
                    strokeDasharray="4,8"
                  />
                </g>
              );
            })}

            {/* Direction arrows with animation */}
            {path.points.slice(0, -1).map((point, i) => {
              const nextPoint = path.points[i + 1];
              const midX = (point.x + nextPoint.x) / 2;
              const midY = (point.y + nextPoint.y) / 2;
              const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

              return (
                <g key={i} transform={`translate(${midX * scale}, ${midY * scale}) rotate(${angle})`}>
                  {/* Arrow shape */}
                  <path
                    d="M -10 -5 L 0 0 L -10 5"
                    fill="none"
                    stroke="#00ff88"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#pathGlow)"
                  />
                  {/* Animated pulse */}
                  <circle r="8" fill="none" stroke="#00ff88" strokeWidth="1" opacity="0.5">
                    <animate attributeName="r" values="4;12;4" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}

            {/* Start point marker */}
            <g transform={`translate(${path.points[0].x * scale}, ${path.points[0].y * scale})`}>
              <circle r="6" fill="#0a0a0f" stroke="#00ff88" strokeWidth="2" />
              <circle r="2" fill="#00ff88" />
            </g>

            {/* End point marker */}
            <g transform={`translate(${path.points[path.points.length - 1].x * scale}, ${path.points[path.points.length - 1].y * scale})`}>
              <rect x="-6" y="-6" width="12" height="12" fill="#0a0a0f" stroke="#00ff88" strokeWidth="2" transform="rotate(45)" />
              <circle r="2" fill="#00ff88" />
            </g>

            {/* Label at start */}
            <g transform={`translate(${path.points[0].x * scale}, ${path.points[0].y * scale + 24})`}>
              <rect x={-path.label.length * 3.5 - 6} y="-10" width={path.label.length * 7 + 12} height="16" rx="2" fill="#0a0a0f" stroke="#00ff88" strokeWidth="1" opacity="0.9" />
              <text
                x="0"
                textAnchor="middle"
                fill="#00ff88"
                fontSize="8"
                fontFamily="'Orbitron', sans-serif"
                fontWeight="500"
                letterSpacing="0.05em"
              >
                {path.label.toUpperCase()}
              </text>
            </g>
          </g>
        );
      })}
    </g>
  );
}
