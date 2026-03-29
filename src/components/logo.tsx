"use client";

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Graduation cap */}
      <path
        d="M24 8L4 18L24 28L44 18L24 8Z"
        fill="#2563EB"
      />
      <path
        d="M12 22V32C12 32 16 38 24 38C32 38 36 32 36 32V22L24 28L12 22Z"
        fill="#2563EB"
        opacity="0.8"
      />
      <rect x="38" y="18" width="2" height="18" rx="1" fill="#2563EB" />
      <circle cx="39" cy="36" r="2.5" fill="#F97316" />
      {/* WiFi/signal arcs */}
      <path
        d="M32 6C34.5 7.5 36 10 36 10"
        stroke="#F97316"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M35 3C38.5 5.5 40 9 40 9"
        stroke="#F97316"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

export function LogoFull({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <Logo size={size} />
      <span
        className="font-bold tracking-tight"
        style={{ fontSize: size * 0.65, color: "#0F172A" }}
      >
        Campusly
      </span>
    </div>
  );
}
