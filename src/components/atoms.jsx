import s from './atoms.module.css';
import { FONT_DISPLAY } from '../tokens.js';

export function ArmadaCrest({ size = 40 , src, label }) {
    if (src) {
        return <img src={src} width={size} height={size} alt={label} style={{ objectFit: 'contain', display: 'block' }}/>;
    }
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="aac" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee"/>
          <stop offset="1" stopColor="#a855f7"/>
        </linearGradient>
        <clipPath id="aa-clip"><circle cx="32" cy="32" r="25"/></clipPath>
      </defs>
      <circle cx="32" cy="32" r="30" stroke="url(#aac)" strokeWidth="1.5"/>
      <circle cx="32" cy="32" r="26" fill="#050309"/>
      <g clipPath="url(#aa-clip)">
        <rect x="8"  y="6" width="5" height="52" fill="#f5f3ff"/>
        <rect x="18" y="6" width="5" height="52" fill="#f5f3ff"/>
        <rect x="28" y="6" width="5" height="52" fill="#f5f3ff"/>
        <rect x="38" y="6" width="5" height="52" fill="#f5f3ff"/>
        <rect x="48" y="6" width="5" height="52" fill="#f5f3ff"/>
      </g>
      <path d="M20 44 L26 20 L30 20 L36 44 M22 36 L34 36" stroke="#050309" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <path d="M32 44 L38 20 L42 20 L48 44 M34 36 L46 36" stroke="#050309" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="32" cy="32" r="26" stroke="#22d3ee" strokeWidth="1" opacity="0.6"/>
    </svg>
  );
}

export function TeamCrest({ size = 40, label = 'CDN', src }) {
  if (src) {
    return <img src={src} width={size} height={size} alt={label} style={{ objectFit: 'contain', display: 'block' }}/>;
  }
  const id = `ts-${label}`;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <clipPath id={id}>
          <path d="M10 10h44v24c0 12-10 22-22 24-12-2-22-12-22-24V10z"/>
        </clipPath>
      </defs>
      <path d="M10 10h44v24c0 12-10 22-22 24-12-2-22-12-22-24V10z" fill="#050309" stroke="#a855f7" strokeWidth="1.6"/>
      <text x="32" y="39" textAnchor="middle" fontFamily={FONT_DISPLAY} fontWeight="700" fontSize="13" fill="#f5f3ff" letterSpacing="0.5">{label}</text>
    </svg>
  );
}
export function CompetitionCrest({ size = 40, src, label = '' }) {
  if (src) {
    return <img src={src} width={size} alt={label} style={{ objectFit: 'contain', display: 'block' }}/>;
  }
  return null;
}

export function NeonPanel({ children, style = {}, glow, inner = false }) {
  const cls = [s.neonPanel, inner ? s.inner : ''].filter(Boolean).join(' ');
  return (
    <div className={cls} style={{ '--glow': glow, ...style }}>
      <span className={`${s.corner} ${s.cornerTL}`}/>
      <span className={`${s.corner} ${s.cornerTR}`}/>
      <span className={`${s.corner} ${s.cornerBL}`}/>
      <span className={`${s.corner} ${s.cornerBR}`}/>
      {children}
    </div>
  );
}

export function NeonButton({ children, onClick, href, download, variant = 'primary', size = 'md', style = {}, icon = null, disabled = false }) {
  const props = { 'data-variant': variant, 'data-size': size, className: s.btn, style };
  if (href) {
    return (
      <a href={href} download={download} {...props}>
        {icon}
        <span>{children}</span>
      </a>
    );
  }
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} {...props}>
      {icon}
      <span>{children}</span>
    </button>
  );
}

export function StatusChip({ status }) {
  return (
    <div className={s.chip} data-status={status}>
      <span className={s.chipDot} data-pulse={status === 'pending' ? 'true' : 'false'}/>
      {{ open:'Aberto',upcoming:'Brevemente',pending: 'Pendente', approved: 'Aprovado', rejected: 'Rejeitado' }[status] || status}
    </div>
  );
}

export function GridBackdrop() {
  return <div className={s.gridBackdrop}/>;
}

export function Scanline() {
  return <div className={s.scanline}/>;
}
