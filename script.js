(function() {
  const cw4 = document.createElement("button");
  cw4.id = "cw4";
  cw4.textContent = "Pobierz posty z GitHuba";
  document.body.appendChild(cw4);

  const answer = document.getElementById("answer");

  cw4.addEventListener("click", async function() {
    try {
      answer.textContent = "Loading…";

      const response = await fetch('https://my-json-server.typicode.com/Kamivarr/json-server/posts');
      const posts = await response.json();

      // Logowanie danych (opcjonalne)
      console.log(posts);

      // Tworzymy HTML - lista postów
      const html = posts.map(post => `
        <li class="post-item">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </li>
      `).join('');

      // Wstawiamy do answer - lista opakowana w <ul>
      answer.innerHTML = `<ul class="post-list">${html}</ul>`;
    } catch (error) {
      answer.textContent = "Błąd przy pobieraniu danych z GitHub JSON.";
      console.error(error);
    }
  });
})();
