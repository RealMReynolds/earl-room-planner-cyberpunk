// Cyberpunk Zone Visualization Overlays

export default function ZoneOverlays({ zones, scale }) {
  // Map zone keys to neon colors
  const zoneColors = {
    living: { fill: 'rgba(0,240,255,0.08)', stroke: '#00f0ff', label: '#00f0ff' },
    kitchen: { fill: 'rgba(255,102,0,0.08)', stroke: '#ff6600', label: '#ff6600' },
    tvViewing: { fill: 'rgba(255,0,102,0.08)', stroke: '#ff0066', label: '#ff0066' },
    bedroom: { fill: 'rgba(153,51,255,0.08)', stroke: '#9933ff', label: '#9933ff' },
  };

  return (
    <g className="zone-overlays" opacity="0.9">
      {Object.entries(zones).map(([key, zone]) => {
        const colors = zoneColors[key] || { fill: 'rgba(0,240,255,0.05)', stroke: '#00f0ff', label: '#00f0ff' };

        return (
          <g key={key}>
            {/* Zone fill with animated border */}
            <rect
              x={zone.x * scale}
              y={zone.y * scale}
              width={zone.width * scale}
              height={zone.height * scale}
              fill={colors.fill}
              stroke={colors.stroke}
              strokeWidth="1"
              strokeDasharray="8,4"
              rx="4"
              strokeOpacity="0.5"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;24"
                dur="3s"
                repeatCount="indefinite"
              />
            </rect>

            {/* Corner brackets */}
            <path
              d={`M ${zone.x * scale} ${(zone.y + 15) * scale}
                  L ${zone.x * scale} ${zone.y * scale}
                  L ${(zone.x + 15) * scale} ${zone.y * scale}`}
              fill="none"
              stroke={colors.stroke}
              strokeWidth="2"
              opacity="0.7"
            />
            <path
              d={`M ${(zone.x + zone.width - 15) * scale} ${zone.y * scale}
                  L ${(zone.x + zone.width) * scale} ${zone.y * scale}
                  L ${(zone.x + zone.width) * scale} ${(zone.y + 15) * scale}`}
              fill="none"
              stroke={colors.stroke}
              strokeWidth="2"
              opacity="0.7"
            />
            <path
              d={`M ${zone.x * scale} ${(zone.y + zone.height - 15) * scale}
                  L ${zone.x * scale} ${(zone.y + zone.height) * scale}
                  L ${(zone.x + 15) * scale} ${(zone.y + zone.height) * scale}`}
              fill="none"
              stroke={colors.stroke}
              strokeWidth="2"
              opacity="0.5"
            />
            <path
              d={`M ${(zone.x + zone.width - 15) * scale} ${(zone.y + zone.height) * scale}
                  L ${(zone.x + zone.width) * scale} ${(zone.y + zone.height) * scale}
                  L ${(zone.x + zone.width) * scale} ${(zone.y + zone.height - 15) * scale}`}
              fill="none"
              stroke={colors.stroke}
              strokeWidth="2"
              opacity="0.5"
            />

            {/* Zone label */}
            <text
              x={(zone.x + zone.width / 2) * scale}
              y={(zone.y + 14) * scale}
              textAnchor="middle"
              fill={colors.label}
              fontSize="9"
              fontWeight="600"
              fontFamily="'Orbitron', sans-serif"
              letterSpacing="0.1em"
              opacity="0.8"
            >
              {zone.label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </g>
  );
}
