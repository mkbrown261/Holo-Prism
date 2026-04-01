export default function PrismAnimation({ size = 80 }) {
  const s = size

  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={`pg-${s}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7">
            <animate attributeName="stop-color" values="#a855f7;#22d3ee;#f472b6;#a855f7" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#22d3ee">
            <animate attributeName="stop-color" values="#22d3ee;#f472b6;#a855f7;#22d3ee" dur="4s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
        <filter id={`glow-${s}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Shadow/base */}
      <ellipse cx="40" cy="74" rx="22" ry="4" fill="rgba(124,58,237,0.2)">
        <animate attributeName="rx" values="22;18;22" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;0.35;0.2" dur="3s" repeatCount="indefinite" />
      </ellipse>

      {/* Front face */}
      <polygon
        points="40,6 14,68 66,68"
        fill="rgba(168,85,247,0.08)"
        stroke={`url(#pg-${s})`}
        strokeWidth="1.5"
        filter={`url(#glow-${s})`}
      />

      {/* Left face shading */}
      <polygon
        points="40,6 14,68 40,74"
        fill="rgba(124,58,237,0.12)"
        stroke={`url(#pg-${s})`}
        strokeWidth="1"
      />

      {/* Right face shading */}
      <polygon
        points="40,6 66,68 40,74"
        fill="rgba(34,211,238,0.1)"
        stroke={`url(#pg-${s})`}
        strokeWidth="1"
      />

      {/* Inner shimmer */}
      <line x1="40" y1="6" x2="28" y2="68" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <line x1="40" y1="6" x2="52" y2="68" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

      {/* Apex glow */}
      <circle cx="40" cy="6" r="4" fill={`url(#pg-${s})`} filter={`url(#glow-${s})`}>
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Sparkles */}
      {[[15,18],[62,22],[30,42],[55,38]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="white">
          <animate attributeName="opacity" values="0;1;0" dur={`${1.5 + i * 0.5}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" />
          <animate attributeName="r" values="0;2;0" dur={`${1.5 + i * 0.5}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  )
}
