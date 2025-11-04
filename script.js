(function() {
  
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('capitalForm');
    const capitalInput = document.getElementById('capitalInput');
    const resultTableBody = document.querySelector('#resultTable tbody');
    const errorMessage = document.getElementById('errorMessage');

    // Obsługuje przesyłanie formularza
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const capital = capitalInput.value.trim();
      if (!capital) {
        errorMessage.textContent = 'Proszę podać nazwę stolicy.';
        return;
      }

      try {
        const response = await fetch(`https://restcountries.com/v3.1/capital/${capital}`);
        if (!response.ok) {
          throw new Error('Nie znaleziono danych dla tej stolicy.');
        }

        const countries = await response.json();
        if (countries.length === 0) {
          errorMessage.textContent = 'Brak wyników dla podanej stolicy.';
          resultTableBody.innerHTML = ''; // Wyczyść tabelę
          return;
        }

        // Wyczyść poprzednie wyniki w tabeli
        resultTableBody.innerHTML = '';
        errorMessage.textContent = ''; // Wyczyść komunikat o błędzie

        // Dodaj dane do tabeli
        countries.forEach(country => {
          const row = document.createElement('tr');

          const name = country.name?.common || 'Brak nazwy';
          const capital = country.capital?.[0] || 'Brak stolicy';
          const population = country.population || 'Brak danych';
          const region = country.region || 'Brak regionu';
          const subregion = country.subregion || 'Brak subregionu';

          row.innerHTML = `
            <td>${name}</td>
            <td>${capital}</td>
            <td>${population}</td>
            <td>${region}</td>
            <td>${subregion}</td>
          `;

          resultTableBody.appendChild(row);
        });
      } catch (error) {
        errorMessage.textContent = `Błąd: ${error.message}`;
        resultTableBody.innerHTML = ''; // Wyczyść tabelę
      }
    });
  });

})();
