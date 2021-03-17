export default [
  {
    method: 'GET',
    path: '/',
    handler: {
      view: 'index',
    },
    options: {
      auth: false,
    },
  },
];
