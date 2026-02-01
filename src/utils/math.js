export const round = (number, places=2) => Math.round(number * 10 ** places) / 10 ** places;

export const decimalToFraction = (decimal, mixed=false) => {
  if (decimal === Math.round(decimal)) return decimal;

  let denominator = 1 / decimal;
  let numerator = 1;
  while (round(denominator, 1) !== Math.round(denominator)) {
    numerator += 1;
    denominator += 1 / decimal;
  }

  if (!mixed || numerator < denominator) return `${numerator}/${round(denominator, 0)}`;

  return `${Math.floor(numerator / denominator)} ${numerator % round(denominator, 0)}/${round(denominator, 0)}`;
};

export const randomHex = (length = 8) => {
  let maxlength = 8,
      min = Math.pow(16, Math.min(length, maxlength) - 1),
      max = Math.pow(16, Math.min(length, maxlength)) - 1,
      n   = Math.floor(Math.random() * (max - min + 1)) + min,
      r   = n.toString(16);
  while (r.length < length) {
    r = r + randomHex(length - maxlength);
  }
  return r;
};
