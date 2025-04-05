export const capitalise = (str) => str[0].toUpperCase() + str.slice(1);
export const capitaliseString = (str) => str.split(/\s/g).map(capitalise).join(' ');

export const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + (( hash << 5) - hash);
  }
  return hash;
};

export const stringToHslColor = (str, s, l) => {
  return `hsl(${hashString(str) % 360}, ${s}%, ${l}%)`;
};

// Default matching will keep consecutive numbers or uppercase letters grouped together
export const hyphenate = (str, matching = /[A-Z0-9]+/g) => {
  const hyphenPoints = [...str.matchAll(matching)];
  if (!hyphenPoints || !hyphenPoints.length) return str;

  const split = str.split('');
  hyphenPoints.forEach((point, idx) => {
    split.splice(point.index + idx, 0, '-');
  });

  return split.join('').toLowerCase();
};

import colors from 'vuetify/lib/util/colors';
const colorNames = Object.entries(colors)
  .map(([base, variants]) => Object.keys(variants).map((variant) => `${hyphenate(base)}-${hyphenate(variant)}`))
  .flat()
  .filter((tag) => !['lighten-5', 'lighten-4', 'darken-4', 'brown', 'grey', 'black', 'white'].some((key) => tag.includes(key)));

export const tagColor = (tag) => {
  const name = colorNames[Math.abs(hashString(tag)) % colorNames.length];
  return name;
};

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