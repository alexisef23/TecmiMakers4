interface OxxoLogoProps {
  size?: number;
  className?: string;
}

export function OxxoLogo({ size = 48, className = '' }: OxxoLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
    >
      {/* Fondo circular azul oscuro */}
      <circle cx="60" cy="60" r="55" fill="#1e3a8a" />
      
      {/* X roja */}
      <g>
        <line x1="35" y1="35" x2="50" y2="50" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
        <line x1="50" y1="35" x2="35" y2="50" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
      </g>
      
      {/* Camión amarillo */}
      <g>
        {/* Cabina */}
        <rect x="50" y="45" width="35" height="20" rx="3" fill="#fbbf24" />
        {/* Ventana */}
        <rect x="75" y="50" width="8" height="15" fill="#f59e0b" />
        {/* Ruedas */}
        <circle cx="60" cy="68" r="4" fill="#1e3a8a" />
        <circle cx="75" cy="68" r="4" fill="#1e3a8a" />
      </g>
      
      {/* Arcos decorativos */}
      <g>
        {/* Arco rojo izquierdo */}
        <path
          d="M 25 75 Q 30 65 35 75"
          stroke="#dc2626"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        {/* Arco amarillo derecho */}
        <path
          d="M 85 75 Q 90 65 95 75"
          stroke="#fbbf24"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
