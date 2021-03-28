export default [
  {
    method: 'GET',
    path: '/login',
    handler: {
      view: 'login.html',
    },
  },
  {
    method: 'GET',
    path: '/cadastro',
    handler: {
      view: 'cadastro.html',
    },
  },
  {
    method: 'GET',
    path: '/',
    handler: {
      view: 'index',
    },
  },
];
