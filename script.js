
let adresses = [];

fetch('adresses.json')
  .then(res => res.json())
  .then(data => adresses = data);

const input = document.getElementById('adresse');
const suggestionBox = document.getElementById('suggestions');

input.addEventListener('input', function () {
  const value = this.value.toLowerCase();
  suggestionBox.innerHTML = '';
  if (!value) {
    suggestionBox.style.display = 'none';
    return;
  }
  const matches = adresses.filter(addr => addr.toLowerCase().includes(value)).slice(0, 10);
  matches.forEach(match => {
    const div = document.createElement('div');
    div.className = 'suggestion';
    div.textContent = match;
    div.addEventListener('click', () => {
      input.value = match;
      suggestionBox.innerHTML = '';
      suggestionBox.style.display = 'none';
    });
    suggestionBox.appendChild(div);
  });
  suggestionBox.style.display = matches.length ? 'block' : 'none';
});

document.addEventListener('click', function (e) {
  if (!e.target.closest('.autocomplete-wrapper')) {
    suggestionBox.style.display = 'none';
  }
});

document.getElementById('myForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());

  const interets = [];
  document.querySelectorAll('input[name="interets[]"]:checked').forEach(cb => interets.push(cb.value));
  values.interets = interets.join(', ');

  fetch('https://script.google.com/macros/s/AKfycbzKzs7Dra-S40IsUZRJVYeaZGLVNcnkrRkd8p7C9kZQyYaMI33g7NanClJ0X1EAMBc87Q/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values)
  }).then(() => {
    alert('Formulaire envoyé !');
    form.reset();
  });
});
