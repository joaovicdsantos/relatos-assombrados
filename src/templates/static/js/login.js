const formLogin = document.querySelector('#form-login');
const alerts = document.querySelectorAll('.alert');
const alertError = document.querySelector('.alert-error');
const alertSuccess = document.querySelector('.alert-success');

formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  let usuario = formLogin.usuario.value;
  let senha = formLogin.senha.value;
  let ponto = `Basic ${btoa(`${usuario}:${senha}`)}`;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', ponto);
  fetch('/api/v1/usuarios/login', {
    method: 'POST',
    headers,
  })
    .then((res) => {
      if (res.status === 200) {
        alertSuccess.innerHTML = 'Logado com sucesso.';
        alertSuccess.style.opacity = '1';
        res.json().then((data) => {
          localStorage.setItem('token', data.token);
        });
        setTimeout(() => {
          document.location.href = '/';
        }, 2500);
      } else if (res.status === 401) {
        alertError.innerHTML = 'Usuário e/ou senha inválidos';
        alertError.style.opacity = '1';
      } else {
        alertError.innerHTML = 'Houve um problema.';
        alertError.style.opacity = '1';
      }
    })
    .catch(() => {
      alertError.innerHTML = 'Houve um problema.';
      alertError.style.opacity = '1';
    })
    .finally(() => {
      setTimeout(sumir, 2000);
    });
});
function sumir() {
  alerts.forEach((alert) => {
    alert.style.opacity = '0';
  });
}
