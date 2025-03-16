export const postLogin = (data) => ({
  endpoint: 'tokens',
  method: 'POST',
  data,
});