// Cyberpunk Fixed Architectural Elements

export default function FixedElements({ elements, scale, showDimensions }) {
  return (
    <g className="fixed-elements">
      <defs>
        {/* Appliance metallic gradient - cyberpunk */}
        <linearGradient id="cyberAppliance" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2a35" />
          <stop offset="50%" stopColor="#1a1a25" />
          <stop offset="100%" stopColor="#15151f" />
        </linearGradient>

        {/* Kitchen counter - dark tech */}
        <linearGradient id="cyberCounter" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1f1f28" />
          <stop offset="50%" stopColor="#15151e" />
          <stop offset="100%" stopColor="#0f0f15" />
        </linearGradient>

        {/* Window gradient - neon blue */}
        <linearGradient id="cyberWindow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00bfff" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#0099cc" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#007799" stopOpacity="0.4" />
        </linearGradient>

        {/* Wall gradient */}
        <linearGradient id="cyberWall" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#252530" />
          <stop offset="50%" stopColor="#3a3a48" />
          <stop offset="100%" stopColor="#252530" />
        </linearGradient>

        {/* Neon glow filters */}
        <filter id="glowCyan" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="#00f0ff" floodOpacity="0.5" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowBlue" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feFlood floodColor="#00bfff" floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowPink" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#ff0066" floodOpacity="0.5" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Kitchen Counter/Appliances area */}
      <rect
        x={elements.kitchenCounter.x * scale}
        y={elements.kitchenCounter.y * scale}
        width={elements.kitchenCounter.width * scale}
        height={elements.kitchenCounter.height * scale}
        fill="url(#cyberCounter)"
        stroke="#ff6600"
        strokeWidth="2"
        strokeOpacity="0.5"
        rx="2"
      />
      <text
        x={(elements.kitchenCounter.x + elements.kitchenCounter.width / 2) * scale}
        y={(elements.kitchenCounter.y + 14) * scale}
        textAnchor="middle"
        fill="#ff6600"
        fontSize="9"
        fontWeight="600"
        fontFamily="'Orbitron', sans-serif"
        letterSpacing="0.1em"
        opacity="0.8"
      >
        KITCHEN
      </text>

      {/* Dishwasher */}
      <rect
        x={elements.dishwasher.x * scale}
        y={elements.dishwasher.y * scale}
        width={elements.dishwasher.width * scale}
        height={elements.dishwasher.height * scale}
        fill="url(#cyberAppliance)"
        stroke="#00f0ff"
        strokeWidth="1.5"
        strokeOpacity="0.6"
        rx="2"
      />
      {/* LED strip */}
      <rect
        x={(elements.dishwasher.x + 3) * scale}
        y={(elements.dishwasher.y + 3) * scale}
        width={(elements.dishwasher.width - 6) * scale}
        height="3"
        fill="#00f0ff"
        opacity="0.6"
        rx="1"
      />
      <text
        x={(elements.dishwasher.x + elements.dishwasher.width / 2) * scale}
        y={(elements.dishwasher.y + elements.dishwasher.height / 2 + 3) * scale}
        textAnchor="middle"
        fill="#00f0ff"
        fontSize="10"
        fontWeight="600"
        fontFamily="'Share Tech Mono', monospace"
      >
        DW
      </text>

      {/* Microwave */}
      <rect
        x={elements.microwave.x * scale}
        y={elements.microwave.y * scale}
        width={elements.microwave.width * scale}
        height={elements.microwave.height * scale}
        fill="#0f0f15"
        stroke="#9933ff"
        strokeWidth="1.5"
        strokeOpacity="0.6"
        rx="2"
      />
      {/* Display screen */}
      <rect
        x={(elements.microwave.x + 14) * scale}
        y={(elements.microwave.y + 4) * scale}
        width={(elements.microwave.width - 18) * scale}
        height={(elements.microwave.height - 8) * scale}
        fill="#0a0a10"
        stroke="#9933ff"
        strokeWidth="1"
        strokeOpacity="0.4"
        rx="1"
      />
      <text
        x={(elements.microwave.x + elements.microwave.width / 2) * scale}
        y={(elements.microwave.y + elements.microwave.height / 2 + 2) * scale}
        textAnchor="middle"
        fill="#9933ff"
        fontSize="8"
        fontWeight="500"
        fontFamily="'Share Tech Mono', monospace"
      >
        MICRO
      </text>

      {/* Refrigerator */}
      <rect
        x={elements.refrigerator.x * scale}
        y={elements.refrigerator.y * scale}
        width={elements.refrigerator.width * scale}
        height={elements.refrigerator.height * scale}
        fill="url(#cyberAppliance)"
        stroke="#00ff88"
        strokeWidth="2"
        strokeOpacity="0.6"
        rx="2"
      />
      {/* Door split line */}
      <line
        x1={(elements.refrigerator.x + elements.refrigerator.width / 2) * scale}
        y1={(elements.refrigerator.y + 4) * scale}
        x2={(elements.refrigerator.x + elements.refrigerator.width / 2) * scale}
        y2={(elements.refrigerator.y + elements.refrigerator.height - 4) * scale}
        stroke="#00ff88"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      {/* LED indicator */}
      <circle
        cx={(elements.refrigerator.x + 8) * scale}
        cy={(elements.refrigerator.y + 8) * scale}
        r="3"
        fill="#00ff88"
      >
        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <text
        x={(elements.refrigerator.x + elements.refrigerator.width / 2) * scale}
        y={(elements.refrigerator.y + elements.refrigerator.height / 2 + 3) * scale}
        textAnchor="middle"
        fill="#00ff88"
        fontSize="10"
        fontWeight="600"
        fontFamily="'Share Tech Mono', monospace"
      >
        FRIDGE
      </text>

      {/* Window with intense neon glow */}
      <rect
        x={(elements.window.x - 8) * scale}
        y={(elements.window.y - 4) * scale}
        width={(elements.window.width + 16) * scale}
        height={(elements.window.height + 35) * scale}
        fill="rgba(0,191,255,0.1)"
        rx="4"
        filter="url(#glowBlue)"
      />
      <rect
        x={elements.window.x * scale}
        y={elements.window.y * scale}
        width={elements.window.width * scale}
        height={elements.window.height * scale}
        fill="url(#cyberWindow)"
        stroke="#00bfff"
        strokeWidth="3"
        rx="2"
      />

      {/* Window label and holographic rays */}
      <text
        x={(elements.window.x + elements.window.width / 2) * scale}
        y={(elements.window.y + 24) * scale}
        textAnchor="middle"
        fill="#00bfff"
        fontSize="11"
        fontWeight="600"
        fontFamily="'Orbitron', sans-serif"
        letterSpacing="0.05em"
      >
        FLOOR-TO-CEILING VIEWPORT
      </text>

      {/* Holographic light rays */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i} transform={`translate(${(elements.window.x + 15 + i * 24) * scale}, ${(elements.window.y + 45) * scale})`}>
          <path
            d="M 0 0 L -4 25 L 4 25 Z"
            fill={i % 2 === 0 ? 'rgba(0,191,255,0.15)' : 'rgba(0,240,255,0.1)'}
          />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="22"
            stroke="#00bfff"
            strokeWidth="1"
            opacity="0.5"
          >
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
          </line>
        </g>
      ))}
      <text
        x={(elements.window.x + elements.window.width / 2) * scale}
        y={(elements.window.y + 75) * scale}
        textAnchor="middle"
        fill="#00bfff"
        fontSize="9"
        fontWeight="500"
        fontFamily="'Share Tech Mono', monospace"
        opacity="0.6"
      >
        NATURAL LIGHT SOURCE
      </text>

      {/* Dividing Wall */}
      <rect
        x={elements.dividingWall.x * scale}
        y={elements.dividingWall.y * scale}
        width={elements.dividingWall.width * scale}
        height={elements.dividingWall.height * scale}
        fill="url(#cyberWall)"
        stroke="#ff0066"
        strokeWidth="2"
        strokeOpacity="0.6"
        rx="1"
      />
      {/* Neon strip on wall */}
      <rect
        x={(elements.dividingWall.x + 2) * scale}
        y={elements.dividingWall.y * scale}
        width={(elements.dividingWall.width - 4) * scale}
        height="2"
        fill="#ff0066"
        opacity="0.8"
      />
      <text
        x={(elements.dividingWall.x + elements.dividingWall.width / 2) * scale}
        y={(elements.dividingWall.y - 12) * scale}
        textAnchor="middle"
        fill="#ff0066"
        fontSize="10"
        fontWeight="600"
        fontFamily="'Orbitron', sans-serif"
        letterSpacing="0.1em"
      >
        PARTITION
      </text>

      {/* Doorway */}
      <rect
        x={elements.dividingDoorway.x * scale}
        y={elements.dividingDoorway.y * scale}
        width={elements.dividingDoorway.width * scale}
        height={elements.dividingDoorway.height * scale}
        fill="#0a0a0f"
        stroke="#00f0ff"
        strokeWidth="1"
        strokeDasharray="4,2"
        strokeOpacity="0.5"
      />
      <text
        x={(elements.dividingDoorway.x + elements.dividingDoorway.width / 2) * scale}
        y={(elements.dividingDoorway.y + 22) * scale}
        textAnchor="middle"
        fill="#00f0ff"
        fontSize="8"
        fontWeight="500"
        fontFamily="'Share Tech Mono', monospace"
        opacity="0.7"
      >
        ACCESS
      </text>

      {/* Bathroom */}
      <rect
        x={elements.bathroom.x * scale}
        y={elements.bathroom.y * scale}
        width={elements.bathroom.width * scale}
        height={elements.bathroom.height * scale}
        fill="#0f0f15"
        stroke="#9933ff"
        strokeWidth="2"
        strokeOpacity="0.4"
        rx="4"
      />
      <text
        x={(elements.bathroom.x + elements.bathroom.width / 2) * scale}
        y={(elements.bathroom.y + elements.bathroom.height / 2) * scale}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#9933ff"
        fontSize="10"
        fontWeight="500"
        fontFamily="'Orbitron', sans-serif"
        opacity="0.6"
      >
        SANITATION
      </text>

      {/* W/D */}
      <rect
        x={elements.washerDryer.x * scale}
        y={elements.washerDryer.y * scale}
        width={elements.washerDryer.width * scale}
        height={elements.washerDryer.height * scale}
        fill="url(#cyberAppliance)"
        stroke="#00f0ff"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        rx="2"
      />
      <circle
        cx={(elements.washerDryer.x + elements.washerDryer.width / 2) * scale}
        cy={(elements.washerDryer.y + elements.washerDryer.height / 2) * scale}
        r="10"
        fill="#0a0a10"
        stroke="#00f0ff"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <text
        x={(elements.washerDryer.x + elements.washerDryer.width / 2) * scale}
        y={(elements.washerDryer.y + elements.washerDryer.height + 14) * scale}
        textAnchor="middle"
        fill="#00f0ff"
        fontSize="9"
        fontWeight="500"
        fontFamily="'Share Tech Mono', monospace"
        opacity="0.7"
      >
        W/D
      </text>

      {/* Walk-in Closet */}
      <rect
        x={elements.walkInCloset.x * scale}
        y={elements.walkInCloset.y * scale}
        width={elements.walkInCloset.width * scale}
        height={elements.walkInCloset.height * scale}
        fill="#0f0f15"
        stroke="#ff6600"
        strokeWidth="2"
        strokeOpacity="0.4"
        rx="4"
      />
      <text
        x={(elements.walkInCloset.x + elements.walkInCloset.width / 2) * scale}
        y={(elements.walkInCloset.y + elements.walkInCloset.height / 2 - 4) * scale}
        textAnchor="middle"
        fill="#ff6600"
        fontSize="8"
        fontWeight="500"
        fontFamily="'Orbitron', sans-serif"
        opacity="0.6"
      >
        STORAGE
      </text>
      <text
        x={(elements.walkInCloset.x + elements.walkInCloset.width / 2) * scale}
        y={(elements.walkInCloset.y + elements.walkInCloset.height / 2 + 6) * scale}
        textAnchor="middle"
        fill="#ff6600"
        fontSize="8"
        fontWeight="500"
        fontFamily="'Orbitron', sans-serif"
        opacity="0.6"
      >
        UNIT
      </text>

      {/* Entry Door */}
      <rect
        x={elements.entryDoor.x * scale}
        y={elements.entryDoor.y * scale}
        width={elements.entryDoor.width * scale}
        height={elements.entryDoor.height * scale}
        fill="#2a2a35"
        stroke="#00ff88"
        strokeWidth="3"
        rx="2"
      />
      {/* Door swing arc */}
      <path
        d={`M ${(elements.entryDoor.x + elements.entryDoor.width) * scale} ${elements.entryDoor.y * scale}
            A ${elements.entryDoor.swingRadius * scale} ${elements.entryDoor.swingRadius * scale}
            0 0 1
            ${(elements.entryDoor.x + elements.entryDoor.width + elements.entryDoor.swingRadius * 0.7) * scale} ${(elements.entryDoor.y - elements.entryDoor.swingRadius * 0.7) * scale}`}
        fill="none"
        stroke="#00ff88"
        strokeWidth="2"
        strokeDasharray="6,4"
        opacity="0.4"
      />
      <text
        x={(elements.entryDoor.x + elements.entryDoor.width / 2) * scale}
        y={(elements.entryDoor.y + 20) * scale}
        textAnchor="middle"
        fill="#00ff88"
        fontSize="11"
        fontWeight="700"
        fontFamily="'Orbitron', sans-serif"
        letterSpacing="0.1em"
      >
        ENTRY
      </text>

      {/* Storage shelf */}
      <rect
        x={elements.storageShelf1.x * scale}
        y={elements.storageShelf1.y * scale}
        width={elements.storageShelf1.width * scale}
        height={elements.storageShelf1.height * scale}
        fill="#1a1a25"
        stroke="#ffcc00"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        rx="2"
      />
      <text
        x={(elements.storageShelf1.x + elements.storageShelf1.width / 2) * scale}
        y={(elements.storageShelf1.y + elements.storageShelf1.height / 2 + 3) * scale}
        textAnchor="middle"
        fill="#ffcc00"
        fontSize="10"
        fontWeight="600"
        fontFamily="'Share Tech Mono', monospace"
      >
        S
      </text>

      {/* TV Corner marker - neon targeting reticle */}
      <g transform={`translate(${elements.tvCorner.x * scale}, ${elements.tvCorner.y * scale})`}>
        <circle r="18" fill="rgba(255,0,102,0.1)" stroke="#ff0066" strokeWidth="2" strokeDasharray="4,2">
          <animate attributeName="r" values="18;22;18" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle r="8" fill="none" stroke="#ff0066" strokeWidth="1" />
        <circle r="3" fill="#ff0066" />
        <line x1="-12" y1="0" x2="-6" y2="0" stroke="#ff0066" strokeWidth="2" />
        <line x1="6" y1="0" x2="12" y2="0" stroke="#ff0066" strokeWidth="2" />
        <line x1="0" y1="-12" x2="0" y2="-6" stroke="#ff0066" strokeWidth="2" />
        <line x1="0" y1="6" x2="0" y2="12" stroke="#ff0066" strokeWidth="2" />
      </g>
      <text
        x={(elements.tvCorner.x + 22) * scale}
        y={elements.tvCorner.y * scale + 4}
        fill="#ff0066"
        fontSize="10"
        fontWeight="600"
        fontFamily="'Orbitron', sans-serif"
        letterSpacing="0.05em"
      >
        TV ZONE
      </text>

      {/* Room labels - cyberpunk style */}
      <text
        x={125 * scale}
        y={80 * scale}
        textAnchor="middle"
        fill="#00f0ff"
        fontSize="18"
        fontWeight="700"
        fontFamily="'Orbitron', sans-serif"
        letterSpacing="0.15em"
        opacity="0.15"
      >
        LIVING // KITCHEN
      </text>
      <text
        x={125 * scale}
        y={98 * scale}
        textAnchor="middle"
        fill="#00f0ff"
        fontSize="10"
        fontWeight="400"
        fontFamily="'Share Tech Mono', monospace"
        opacity="0.1"
      >
        17'4" x 13'0"
      </text>

      <text
        x={168 * scale}
        y={200 * scale}
        textAnchor="middle"
        fill="#9933ff"
        fontSize="16"
        fontWeight="700"
        fontFamily="'Orbitron', sans-serif"
        letterSpacing="0.1em"
        opacity="0.15"
      >
        SLEEP SECTOR
      </text>
      <text
        x={168 * scale}
        y={216 * scale}
        textAnchor="middle"
        fill="#9933ff"
        fontSize="10"
        fontWeight="400"
        fontFamily="'Share Tech Mono', monospace"
        opacity="0.1"
      >
        8'0" x 9'10"
      </text>
    </g>
  );
}
