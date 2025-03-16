const env = {
  api: 'https://o9jlz36fff.execute-api.ap-southeast-2.amazonaws.com/2024-09-06/',
};

export const callApi = async ({
  endpoint,
  method,
  data,
  headers = { 'content-type': 'application/json' },
  api = 'api',
}) => {
  const requestHeaders = new Headers(headers);

  const token = localStorage.getItem('adratcliff-user-token');
  if (token) {
    requestHeaders.append('x-token', token);
  }

  const url = env[api] + endpoint + `?_ts=${+new Date()}`;

  try {
    const request = await fetch(url, {
      method,
      headers: requestHeaders,
      body: JSON.stringify(data),
    });

    if (!request.ok) return { status: request.status };

    const result = await request.json();

    return {
      status: request.status,
      data: result,
    };
  } catch (err) {
    console.warn('API Error', err);
    throw err;
  }
};