export const postLogin = (data) => ({
  endpoint: 'tokens',
  method: 'POST',
  data,
});

export const errorLogging = (data) => ({
  endpoint: 'errors',
  method: 'POST',
  data,
});

export const users = {
  getList: () => ({ endpoint: 'users' }),
  getItem: (id) => ({ endpoint: `users/${id}` }),
};

export const defaultCrud = {
  getList: (resource) => () => ({ endpoint: `users/self/${resource}`}),
  getItem: (resource) => (id) => ({ endpoint: `users/self/${resource}/${id}`}),
  createItem: (resource) => (data) => ({
    endpoint: `users/self/${resource}`,
    method: 'POST',
    data,
  }),
};