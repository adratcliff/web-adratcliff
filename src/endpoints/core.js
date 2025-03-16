export const postLogin = (data) => ({
  endpoint: 'tokens',
  method: 'POST',
  data,
});

export const users = {
  getList: () => ({ endpoint: 'users' }),
  getItem: (id) => ({ endpoint: `users/${id}` }),
};