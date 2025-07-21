document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = './login.html';
    return;
  }

  const postsList = document.getElementById('postsList');
  const searchInput = document.getElementById('search');
  const logoutBtn = document.getElementById('logout');

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = './login.html';
  });

  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  renderPosts(posts);

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = posts.filter(post => post.title.toLowerCase().includes(query));
    renderPosts(filtered);
  });

  function renderPosts(data) {
    postsList.innerHTML = '';
    data.forEach(post => {
      const col = document.createElement('div');
      col.className = 'col-12';
      col.innerHTML = `
        <div class="card" data-id="${post.id}">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
          </div>
        </div>`;
      postsList.appendChild(col);
    });

    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', async () => {
        const id = card.getAttribute('data-id');
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const post = await res.json();
        document.getElementById('modalTitle').textContent = post.title;
        document.getElementById('modalBody').textContent = post.body;
        new bootstrap.Modal(document.getElementById('postModal')).show();
      });
    });
  }
});
