export const clone = (input) => {
  if (typeof input !== 'object') return input;
  const output = Array.isArray(input) ? [] : {};

  let value;
  for (const key in input) {
    value = input[key];
    output[key] = (typeof value === 'object') ? clone(value) : value;
  }

  return output;
};