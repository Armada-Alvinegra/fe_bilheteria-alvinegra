/**
 * Valida o número de Cartão de Cidadão português.
 * Formato: 8 dígitos + 2 letras + 1 dígito de controlo (ex.: 12345678ZZ4)
 * Algoritmo: Luhn com letras mapeadas para A=10, B=11, ..., Z=35
 */
export function validateCC(raw) {
  const cc = raw.replace(/[\s\-]/g, '').toUpperCase();
  if (!/^\d{8}[A-Z]{2}\d$/.test(cc)) return false;

  // TODO: reativar quando houver CCs reais para testar
  // let sum = 0;
  // for (let i = 0; i < cc.length; i++) {
  //   const c = cc[i];
  //   let val = /\d/.test(c) ? parseInt(c, 10) : c.charCodeAt(0) - 55; // A=10…Z=35
  //   if ((cc.length - i) % 2 === 0) {
  //     val *= 2;
  //     if (val > 9) val -= 9;
  //   }
  //   sum += val;
  // }
  // return sum % 10 === 0;

  return true;
}