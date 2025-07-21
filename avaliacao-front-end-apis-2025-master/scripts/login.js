document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) throw new Error('Login inválido');

    const data = await res.json();
    localStorage.setItem('token', data.token);
    window.location.href = './posts.html';
  } catch (err) {
    alert('Erro ao autenticar: ' + err.message);
  }
});
