fetch('adresses.json')
  .then(res => res.json())
  .then(data => {
    const dataList = document.getElementById('liste-adresses');
    data.forEach(adresse => {
      const option = document.createElement('option');
      option.value = adresse;
      dataList.appendChild(option);
    });
  });

document.getElementById('myForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());

  const interets = [];
  document.querySelectorAll('input[name="interets[]"]:checked').forEach(cb => interets.push(cb.value));
  values.interets = interets.join(', ');

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
  const phoneValid = /^0[1-9]\d{8}$/.test(values.telephone.replace(/\D/g, ''));
  if (!emailValid || !phoneValid) {
    alert("Veuillez entrer un email et un numéro de téléphone valides.");
    return;
  }

  fetch('https://script.google.com/macros/s/AKfycbzKzs7Dra-S40IsUZRJVYeaZGLVNcnkrRkd8p7C9kZQyYaMI33g7NanClJ0X1EAMBc87Q/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values)
  }).then(() => {
    alert('Formulaire envoyé !');
    form.reset();
  }).catch(err => alert('Erreur : ' + err));
});