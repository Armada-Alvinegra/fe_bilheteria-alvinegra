// Shared design tokens, icons, and atoms for Bilheteira Alvinegra

const TOKENS = {
  bg: '#050309',
  bgPanel: '#0a0614',
  bgPanel2: '#12082a',
  violet: '#a855f7',
  violetDeep: '#7c3aed',
  violetDim: '#5b21b6',
  cyan: '#22d3ee',
  cyanDeep: '#06b6d4',
  pink: '#ec4899',
  white: '#f5f3ff',
  muted: 'rgba(237,233,254,0.55)',
  mutedStrong: 'rgba(237,233,254,0.75)',
  line: 'rgba(168,85,247,0.22)',
  success: '#10f5a8',
  warn: '#fbbf24',
  danger: '#fb7185',
};

// Type stack — condensed display + geometric body
const FONT_DISPLAY = `"Oswald", "Bebas Neue", "Impact", sans-serif`;
const FONT_BODY = `"Space Grotesk", "Inter", system-ui, sans-serif`;
const FONT_MONO = `"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace`;

// ─────────── Icons (simple, stroked) ───────────
const Icon = {
  ticket: (p = {}) => (
    <svg width={p.s || 20} height={p.s || 20} viewBox="0 0 24 24" fill="none">
      <path d="M3 8a2 2 0 012-2h14a2 2 0 012 2v1a2 2 0 100 4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 100-4V8z" stroke={p.c || 'currentColor'} strokeWidth="1.6"/>
      <path d="M10 6v12" stroke={p.c || 'currentColor'} strokeWidth="1.6" strokeDasharray="2 2"/>
    </svg>
  ),
  home: (p = {}) => (
    <svg width={p.s || 22} height={p.s || 22} viewBox="0 0 24 24" fill="none">
      <path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-9z" stroke={p.c || 'currentColor'} strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  history: (p = {}) => (
    <svg width={p.s || 22} height={p.s || 22} viewBox="0 0 24 24" fill="none">
      <path d="M12 8v4l3 2" stroke={p.c || 'currentColor'} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M3 12a9 9 0 109-9 9 9 0 00-8 5" stroke={p.c || 'currentColor'} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M3 4v4h4" stroke={p.c || 'currentColor'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  user: (p = {}) => (
    <svg width={p.s || 22} height={p.s || 22} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={p.c || 'currentColor'} strokeWidth="1.6"/>
      <path d="M4 20c1-4 4-6 8-6s7 2 8 6" stroke={p.c || 'currentColor'} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  plus: (p = {}) => (
    <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke={p.c || 'currentColor'} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  minus: (p = {}) => (
    <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14" stroke={p.c || 'currentColor'} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  chevron: (p = {}) => (
    <svg width={p.s || 16} height={p.s || 16} viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke={p.c || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  back: (p = {}) => (
    <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none">
      <path d="M15 6l-6 6 6 6" stroke={p.c || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  check: (p = {}) => (
    <svg width={p.s || 16} height={p.s || 16} viewBox="0 0 24 24" fill="none">
      <path d="M4 12l5 5 11-11" stroke={p.c || 'currentColor'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  x: (p = {}) => (
    <svg width={p.s || 16} height={p.s || 16} viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke={p.c || 'currentColor'} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  clock: (p = {}) => (
    <svg width={p.s || 16} height={p.s || 16} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={p.c || 'currentColor'} strokeWidth="1.6"/>
      <path d="M12 7v5l3 2" stroke={p.c || 'currentColor'} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  pin: (p = {}) => (
    <svg width={p.s || 14} height={p.s || 14} viewBox="0 0 24 24" fill="none">
      <path d="M12 22s8-7 8-13a8 8 0 10-16 0c0 6 8 13 8 13z" stroke={p.c || 'currentColor'} strokeWidth="1.6"/>
      <circle cx="12" cy="9" r="2.4" stroke={p.c || 'currentColor'} strokeWidth="1.6"/>
    </svg>
  ),
  bolt: (p = {}) => (
    <svg width={p.s || 14} height={p.s || 14} viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill={p.c || 'currentColor'}/>
    </svg>
  ),
  trash: (p = {}) => (
    <svg width={p.s || 16} height={p.s || 16} viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" stroke={p.c || 'currentColor'} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
};

// ─────────── Atoms ───────────

// Stylized "AA" monogram crest for Armada Alvinegra — original, striped alvinegro
function ArmadaCrest({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="aac" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee"/>
          <stop offset="1" stopColor="#a855f7"/>
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" stroke="url(#aac)" strokeWidth="1.5"/>
      <circle cx="32" cy="32" r="26" fill="#050309"/>
      {/* alvinegro stripes behind */}
      <g clipPath="url(#aa-clip)">
        <rect x="8" y="6" width="5" height="52" fill="#f5f3ff"/>
        <rect x="18" y="6" width="5" height="52" fill="#f5f3ff"/>
        <rect x="28" y="6" width="5" height="52" fill="#f5f3ff"/>
        <rect x="38" y="6" width="5" height="52" fill="#f5f3ff"/>
        <rect x="48" y="6" width="5" height="52" fill="#f5f3ff"/>
      </g>
      <clipPath id="aa-clip"><circle cx="32" cy="32" r="25"/></clipPath>
      {/* double A monogram */}
      <path d="M20 44 L26 20 L30 20 L36 44 M22 36 L34 36" stroke="#050309" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <path d="M32 44 L38 20 L42 20 L48 44 M34 36 L46 36" stroke="#050309" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="32" cy="32" r="26" stroke="#22d3ee" strokeWidth="1" opacity="0.6"/>
    </svg>
  );
}

// Generic striped shield — used as placeholder club crests
function TeamCrest({ size = 40, primary = '#f5f3ff', secondary = '#050309', accent = '#a855f7', label = 'CDN' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M10 10h44v24c0 12-10 22-22 24-12-2-22-12-22-24V10z" fill={secondary} stroke={accent} strokeWidth="1.6"/>
      <g clipPath="url(#ts-clip)">
        <rect x="10" y="10" width="6" height="50" fill={primary}/>
        <rect x="22" y="10" width="6" height="50" fill={primary}/>
        <rect x="34" y="10" width="6" height="50" fill={primary}/>
        <rect x="46" y="10" width="6" height="50" fill={primary}/>
      </g>
      <clipPath id="ts-clip">
        <path d="M10 10h44v24c0 12-10 22-22 24-12-2-22-12-22-24V10z"/>
      </clipPath>
      <text x="32" y="39" textAnchor="middle" fontFamily={FONT_DISPLAY} fontWeight="700" fontSize="13" fill={secondary} letterSpacing="0.5">{label}</text>
    </svg>
  );
}

// Neon panel with holographic edge
function NeonPanel({ children, style = {}, glow = TOKENS.violet, inner = false }) {
  return (
    <div style={{
      position: 'relative',
      background: inner
        ? 'linear-gradient(180deg, rgba(124,58,237,0.08), rgba(6,182,212,0.04))'
        : 'linear-gradient(180deg, rgba(20,8,40,0.9), rgba(8,4,20,0.95))',
      border: `1px solid ${TOKENS.line}`,
      borderRadius: 16,
      boxShadow: `0 0 0 1px rgba(34,211,238,0.06) inset, 0 8px 24px rgba(124,58,237,0.12)`,
      backdropFilter: 'blur(8px)',
      ...style,
    }}>
      {/* corner ticks */}
      <span style={{ position: 'absolute', top: -1, left: -1, width: 10, height: 10, borderTop: `1.5px solid ${glow}`, borderLeft: `1.5px solid ${glow}`, borderTopLeftRadius: 8 }}/>
      <span style={{ position: 'absolute', top: -1, right: -1, width: 10, height: 10, borderTop: `1.5px solid ${glow}`, borderRight: `1.5px solid ${glow}`, borderTopRightRadius: 8 }}/>
      <span style={{ position: 'absolute', bottom: -1, left: -1, width: 10, height: 10, borderBottom: `1.5px solid ${glow}`, borderLeft: `1.5px solid ${glow}`, borderBottomLeftRadius: 8 }}/>
      <span style={{ position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderBottom: `1.5px solid ${glow}`, borderRight: `1.5px solid ${glow}`, borderBottomRightRadius: 8 }}/>
      {children}
    </div>
  );
}

function NeonButton({ children, onClick, variant = 'primary', style = {}, icon = null, disabled = false }) {
  const base = {
    primary: {
      bg: `linear-gradient(180deg, ${TOKENS.violet}, ${TOKENS.violetDeep})`,
      color: '#fff',
      border: '1px solid rgba(255,255,255,0.25)',
      shadow: `0 0 0 1px rgba(34,211,238,0.4) inset, 0 8px 24px rgba(168,85,247,0.45), 0 0 30px rgba(168,85,247,0.3)`,
    },
    secondary: {
      bg: 'linear-gradient(180deg, rgba(34,211,238,0.15), rgba(34,211,238,0.05))',
      color: TOKENS.cyan,
      border: `1px solid rgba(34,211,238,0.4)`,
      shadow: `0 0 0 1px rgba(34,211,238,0.1) inset, 0 6px 20px rgba(6,182,212,0.2)`,
    },
    ghost: {
      bg: 'transparent',
      color: TOKENS.mutedStrong,
      border: `1px solid ${TOKENS.line}`,
      shadow: 'none',
    },
  }[variant];
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        width: '100%', height: 56, borderRadius: 14,
        background: base.bg, color: base.color, border: base.border,
        boxShadow: base.shadow,
        fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 18,
        letterSpacing: 2, textTransform: 'uppercase',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        ...style,
      }}>
      {icon}
      <span>{children}</span>
    </button>
  );
}

// Animated status chip
function StatusChip({ status }) {
  const map = {
    pending: { label: 'Pendente', color: TOKENS.warn, dot: '#fbbf24' },
    approved: { label: 'Aprovado', color: TOKENS.success, dot: '#10f5a8' },
    rejected: { label: 'Rejeitado', color: TOKENS.danger, dot: '#fb7185' },
  }[status] || { label: status, color: TOKENS.muted, dot: TOKENS.muted };

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 12px', borderRadius: 999,
      background: `${map.color}18`,
      border: `1px solid ${map.color}55`,
      color: map.color,
      fontFamily: FONT_MONO, fontSize: 11,
      textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: 999, background: map.dot,
        boxShadow: `0 0 8px ${map.dot}`,
        animation: status === 'pending' ? 'pulse 1.6s infinite' : 'none',
      }}/>
      {map.label}
    </div>
  );
}

// Grid backdrop
function GridBackdrop() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
      backgroundImage: `
        linear-gradient(rgba(168,85,247,0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgba(168,85,247,0.07) 1px, transparent 1px)
      `,
      backgroundSize: '24px 24px',
      maskImage: 'radial-gradient(ellipse at top, black 30%, transparent 85%)',
      WebkitMaskImage: 'radial-gradient(ellipse at top, black 30%, transparent 85%)',
    }}/>
  );
}

// Scanning line overlay (holographic effect)
function Scanline() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
      background: `repeating-linear-gradient(
        0deg,
        rgba(34,211,238,0.02) 0px,
        rgba(34,211,238,0.02) 1px,
        transparent 1px,
        transparent 3px
      )`,
    }}/>
  );
}

Object.assign(window, {
  TOKENS, FONT_DISPLAY, FONT_BODY, FONT_MONO,
  Icon, ArmadaCrest, TeamCrest,
  NeonPanel, NeonButton, StatusChip, GridBackdrop, Scanline,
});
