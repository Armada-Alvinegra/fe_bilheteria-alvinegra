// Dados mock centralizados — substituir por chamadas à API quando o backend estiver pronto.

export const PAYMENT = {
  mbway: '912 345 678',
  titular: 'Armada Alvinegra',
  validationDeadline: '19 ABR 2026',
};

export const MATCH = {
  competition: {
    name: 'Liga Portugal',
    round: 'Jornada 28',
    srcDark:  '/clubs/portugal_primeira-liga--horizontal-white.football-logos.cc.svg',
    srcLight: '/clubs/portugal_primeira-liga--horizontal.football-logos.cc.svg',
  },
  date: '27 ABR 2026',
  dateShort: '27·04',
  time: '20:30',
  venue: 'Estádio da Madeira',
  sector: 'Bancada Sul',
  stock: 142,
  total: 320,
  home: { label: 'NAC', name: 'NACIONAL', src: '/clubs/portugal_nacional-da-madeira.football-logos.cc.svg' },
  away: { label: 'MAR', name: 'MARÍTIMO', src: '/clubs/portugal_maritimo.football-logos.cc.svg' },
};

const BASE_LEAGUE = {
  name: 'Liga Portugal',
  srcDark:  '/clubs/portugal_primeira-liga--horizontal-white.football-logos.cc.svg',
  srcLight: '/clubs/portugal_primeira-liga--horizontal.football-logos.cc.svg',
};
const BASE_CUP = {
  name: 'Taça de  Portugal',
  srcDark:  '/clubs/portugal_taca-de-portugal_light_football-logos.cc.png',
  srcLight: '/clubs/portugal_taca-de-portugal.football-logos.cc.svg',
};
const BASE_LEAGUE_CUP = {
  name: 'Taça da liga',
  srcDark:  '/clubs/AllianzCup_Logotipo-light.png',
  srcLight: '/clubs/AllianzCup_Logotipo.png',
};
const NAC = { label: 'NAC', name: 'NACIONAL', src: '/clubs/portugal_nacional-da-madeira.football-logos.cc.svg' };
const MAR = { label: 'MAR', name: 'MARÍTIMO', src: '/clubs/portugal_maritimo.football-logos.cc.svg' };

export const MATCHES = [
  {
    id: 1,
    status: 'approved',
    competition: { ...BASE_LEAGUE, round: 'Jornada 27' },
    date: '20 ABR 2026', dateShort: '20·04', time: '18:00',
    venue: 'Estádio da Madeira', sector: 'Bancada Sul',
    stock: 0, total: 320,
    home: NAC, away: MAR,
  },
  {
    id: 2,
    status: 'pending',
    competition: { ...BASE_CUP, round: 'Jornada 28' },
    date: '27 ABR 2026', dateShort: '27·04', time: '20:30',
    venue: 'Estádio da Madeira', sector: 'Bancada Sul',
    stock: 142, total: 320,
    home: NAC, away: MAR,
  },
  {
    id: 3,
    status: 'open',
    competition: { ...BASE_LEAGUE_CUP, round: 'Jornada 29' },
    date: '4 MAI 2026', dateShort: '04·05', time: '15:30',
    venue: 'Estádio da Madeira', sector: 'Bancada Sul',
    stock: 0, total: 320,
    home: NAC, away: MAR,
  },
  {
    id: 4,
    status: 'upcoming',
    ticketOpenDate: '28 ABR 2026',
    competition: { ...BASE_LEAGUE_CUP, round: 'Jornada 29' },
    date: '4 MAI 2026', dateShort: '04·05', time: '15:30',
    venue: 'Estádio da Madeira', sector: 'Bancada Sul',
    stock: 0, total: 320,
    home: NAC, away: MAR,
  },
];

export const STATUS_CONFIG = {
  open: {
    color: 'var(--cyan)',
    headline: 'BILHETEIRA ABERTA',
    sub: 'Pede já os teus bilhetes',
    quote: 'Olá, Bruno. Já tenho os bilhetes para o proximo jogo! Reserva os teus até 4ª feira às 20h!',
  },
  upcoming: {
    color: 'var(--muted)',
    headline: 'BILHETEIRA FECHADA',
    sub: 'Bilheteira encerrada',
    quote: 'Olá, Bruno. A bilheteira está fechada. Vem noutra altura.',
  },
  pending: {
    color: 'var(--warn)',
    headline: 'AGUARDA PAGAMENTO',
    sub: 'Confirma o pagamento para garantir o teu lugar',
    mood: 'Transfere o valor via MBWay e envia o comprovativo. A direção valida em até 24h úteis.',
    mascotFilter: 'hue-rotate(-20deg) saturate(0.9) brightness(0.95)',
    quote: 'Quase lá, Bruno — só falta confirmar o pagamento!',
  },
  approved: {
    color: 'var(--success)',
    headline: 'BILHETE GARANTIDO',
    sub: 'Vemo-nos na bancada, alvinegro',
    mood: 'QR Code e detalhes enviados. Entrada pela Porta 7, Bancada Sul.',
    mascotFilter: 'hue-rotate(80deg) saturate(1.2) brightness(1.05)',
    quote: 'Bem-vindo à Armada. Faz barulho por nós.',
  },
  rejected: {
    color: 'var(--danger)',
    headline: 'PEDIDO RECUSADO',
    sub: 'Lotação esgotada no teu setor',
    mood: 'Podes tentar Topo Norte ou inscrever-te na lista de espera.',
    mascotFilter: 'hue-rotate(-60deg) saturate(0.7) brightness(0.85) contrast(1.05)',
    quote: 'Não desanimes. Próxima batalha é certa.',
  },
};
