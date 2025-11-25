import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById('form-contato');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = form.name.value;
  const email = form.email.value;
  const telefone = form.telefone.value;
  const assunto = form.assunto.value;
  const mensagem = form.mensagem.value;

  const { data, error } = await supabase
    .from('contato')
    .insert([{ nome, email, telefone, assunto, mensagem }]);

  if (error) {
    alert('Erro ao enviar para Supabase: ' + error.message);
    return;
  }

  fetch(import.meta.env.FORM_SUBMIT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ nome, email, telefone, assunto, mensagem })
  })
  .then(response => response.json())
  .then(data => {
    alert('Mensagem enviada com sucesso!'); 
    form.reset();
  })
  .catch(err => {
    alert('Erro ao enviar para o e-mail: ' + err);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const tel = document.getElementById("telefone");

  tel.addEventListener("input", () => {
    let valor = tel.value.replace(/\D/g, "");
    if (valor.length <= 2) {
      tel.value = "(" + valor;
    } else if (valor.length <= 6) {
      tel.value = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    } else if (valor.length <= 10) {
      tel.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 6)}-${valor.slice(6)}`;
    } else {
      tel.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7, 11)}`;
    }
  });
});
