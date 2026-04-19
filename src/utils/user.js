/** Retorna as iniciais de um nome (máx. 2 letras). Ex.: "Bruno Silva" → "BS" */
export const getInitials = (name = '') =>
  name.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('');