window.addEventListener('load', init);
let endPoint = 'http://localhost:3000/api/pessoas';
let pessoas = [];
let pessoa = {};
let nextId = 0;
/*Informações do DOM*/
let mainForm = null;
let inputName = null;
let tableLista = null;

function init() {
  inputName = document.getElementById('name');
  tableLista = document.querySelector('#lista');
  mainForm = document.querySelector('form');
  mainForm.addEventListener('submit', (event) => {
    event.preventDefault();
    salvar();
  });
  inputName.focus();

  render();
}

function render() {
  retrieveAllPessoas().then((res) => {
    exibirLista();
  });
}

function salvar() {
  pessoa.name = inputName.value;
  if (!pessoa.id) {
    inserir(pessoa);
  } else {
    atualizar(pessoa);
  }
  exibirLista();
  limparFormulario();
  pessoa = {};
}

function excluir(id) {
  // pessoas = pessoas.filter((pessoa) => pessoa.id !== id);
  // exibirLista();
  fetch(endPoint + '/' + id, {
    method: 'delete',
  }).then(function (response) {
    render();
  });
}

function atualizar(pessoa) {
  // let index = pessoas.findIndex((p) => p.id === pessoa.id);
  // pessoas[index] = pessoa;
  // exibirLista();
  fetch(endPoint + '/' + pessoa.id, {
    method: 'put',
    body: JSON.stringify(pessoa),
    headers: { 'Content-Type': 'application/json' },
  }).then(function (response) {
    render();
  });
}

function inserir(pessoa) {
  pessoa = JSON.stringify(pessoa);
  fetch(endPoint, {
    method: 'post',
    body: pessoa,
    headers: { 'Content-Type': 'application/json' },
    // headers: {
    //   'Content-type': 'application/json; charset=UTF-8',
    // },
  }).then(function (response) {
    render();
    return response.json();
  });

  // console.log(pessoa);
  // pessoa.id = ++nextId;
  // pessoas.push(pessoa);
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
  console.log(pessoas);
  // console.log(pessoas);
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

async function retrieveAllPessoas() {
  const res = await fetch(endPoint);
  const json = await res.json();
  pessoas = json;
  // return json;
}
