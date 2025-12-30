export const KeyoLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="none"
        className={className}
    >
        <defs>
            <linearGradient id="keyo_gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.65 0.22 260)" /> {/* Electric Violet */}
                <stop offset="100%" stopColor="oklch(0.60 0.20 290)" /> {/* Neon Rose */}
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Key/lock shape forming a stylized 'K' */}
        <circle cx="50" cy="50" r="45" stroke="url(#keyo_gradient)" strokeWidth="8" fill="none" opacity="0.3" />
        <path
            d="M35 25 V75 M35 50 L70 25 M35 50 L70 75"
            stroke="url(#keyo_gradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
        />
        <circle cx="70" cy="50" r="8" fill="white" />
    </svg>
)
