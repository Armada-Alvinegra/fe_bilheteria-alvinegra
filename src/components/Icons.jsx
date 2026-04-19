export const Icon = {
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
  send: (p = {}) => (
    <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none">
      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke={p.c || 'currentColor'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  eye: (p = {}) => (
    <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" stroke={p.c || 'currentColor'} strokeWidth="1.6" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke={p.c || 'currentColor'} strokeWidth="1.6"/>
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
  copy: (p = {}) => (
    <svg width={p.s || 16} height={p.s || 16} viewBox="0 0 24 24" fill="none">
      <rect x="9" y="9" width="11" height="11" rx="2" stroke={p.c || 'currentColor'} strokeWidth="1.6"/>
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke={p.c || 'currentColor'} strokeWidth="1.6"/>
    </svg>
  ),
  download: (p = {}) => (
    <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none">
      <path d="M12 3v12M7 11l5 5 5-5" stroke={p.c || 'currentColor'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 19h16" stroke={p.c || 'currentColor'} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  edit: (p = {}) => (
    <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke={p.c || 'currentColor'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke={p.c || 'currentColor'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  upload: (p = {}) => (
    <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke={p.c || 'currentColor'} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M17 8l-5-5-5 5M12 3v12" stroke={p.c || 'currentColor'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};
