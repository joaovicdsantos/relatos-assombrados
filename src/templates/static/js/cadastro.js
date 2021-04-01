const formCadastro = document.querySelector('#form-cadastro');
const alerts = document.querySelectorAll('.alert');
const alertError = document.querySelector('.alert-error');
const alertSuccess = document.querySelector('.alert-success');

formCadastro.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    usuario: formCadastro.usuario.value,
    email: formCadastro.email.value,
    senha: formCadastro.senha.value,
    sexo: formCadastro.sexo.value,
  };
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  fetch('/api/v1/usuarios', {
    method: 'POST',
    body: JSON.stringify(data),
    headers,
  }).then((res) => {
    console.log(res);
    if (res.status === 201) {
      alertSuccess.innerHTML = 'Usuário cadastrado com sucesso.';
      alertSuccess.style.opacity = '1';
    } else if (res.status === 400) {
      alertError.innerHTML =
        'Sinceramente, você não deveria receber esse erro.';
      alertError.style.opacity = '1';
    } else {
      alertError.innerHTML = 'Houve um problema.';
      alertError.style.opacity = '1';
    }
    setTimeout(sumir, 2000);
  });
});
function sumir() {
  alerts.forEach((alert) => {
    alert.style.opacity = '0';
  });
}
