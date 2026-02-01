import colors from 'vuetify/lib/util/colors';
import { hashString, hyphenate } from './strings';

const colorNames = Object.entries(colors)
  .map(([base, variants]) => Object.keys(variants).map((variant) => `${hyphenate(base)}-${hyphenate(variant)}`))
  .flat()
  .filter((tag) => !['lighten-5', 'lighten-4', 'darken-4', 'brown', 'grey', 'black', 'white'].some((key) => tag.includes(key)));

export const tagColor = (tag) => {
  const name = colorNames[Math.abs(hashString(tag)) % colorNames.length];
  return name;
};