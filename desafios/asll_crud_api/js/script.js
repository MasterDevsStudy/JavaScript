window.addEventListener('load', init);
const endPoint = 'http://localhost:3000/api/';
let pessoas = [];
let pessoa = { id: 0, name: '' };
let nextId = 0;
/*Informações do DOM*/
let mainForm = null;
let inputName = null;
let tableLista = null;

function init() {
  fetch(endPoint + 'pessoas')
    .then((res) => {
      console(res);
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(pessoas);
  // inputName = document.getElementById('name');
  // tableLista = document.querySelector('#lista');
  // mainForm = document.querySelector('form');

  // mainForm.addEventListener('submit', (event) => {
  //   event.preventDefault();
  //   salvar();
  // });

  // inputName.focus();

  // exibirLista();
}

function salvar() {
  pessoa.name = inputName.value;
  if (pessoa.id == 0) {
    inserir(pessoa);
  } else {
    atualizar(pessoa);
  }
  exibirLista();
  limparFormulario();
  pessoa = { id: 0, name: '' };
}

function excluir(id) {
  pessoas = pessoas.filter((pessoa) => pessoa.id !== id);

  exibirLista();
}

function atualizar(pessoa) {
  let index = pessoas.findIndex((p) => p.id === pessoa.id);
  pessoas[index] = pessoa;
  exibirLista();
}

function inserir(pessoa) {
  console.log(pessoa);
  pessoa.id = ++nextId;
  pessoas.push(pessoa);
}

function limparFormulario() {
  inputName.value = '';
}

function editar(id) {
  pessoa = pessoas.find((pessoa) => pessoa.id === id);
  inputName.value = pessoa.name;
  inputName.focus();
}

function exibirLista() {
  tableLista.innerHTML = '';
  pessoas.forEach((reg) => {
    tableLista.innerHTML += inserirExibicao(reg);
  });
}

function inserirExibicao(reg) {
  return `<tr>
  <th scope="row">${reg.id}</th>
  <td>${reg.name}</td>
  <td>
    <a href="#" class="update-action" title="Editar" onclick="editar(${reg.id});">
      <i class="fa fa-edit"></i>
    </a>
    <a href="#" class="delete-action" title="Excluir" onclick="excluir(${reg.id});">
      <i class="fa fa-trash"></i>
    </a>
  </td>
</tr>`;
}
