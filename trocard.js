let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioAtual = null;
let colecao = [];
let troca = [];
let mensagensChat = [];

// LOGIN
document.getElementById('formLogin').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;

  let usuario = usuarios.find(u => u.nome === nome && u.senha === senha);
  if (!usuario) {
    usuario = { nome, senha, colecao: [], conquistas: [] };
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    document.getElementById('mensagemLogin').innerText = "Usuário cadastrado!";
  } else {
    document.getElementById('mensagemLogin').innerText = "Login realizado!";
  }
  usuarioAtual = usuario;
  atualizarPerfil();
  atualizarRanking();
  atualizarConquistas();
});

// PERFIL
function atualizarPerfil() {
  if (!usuarioAtual) return;
  const perfil = document.getElementById('dadosPerfil');
  perfil.innerHTML = `
    <p><strong>Usuário:</strong> ${usuarioAtual.nome}</p>
    <p><strong>Figurinhas na coleção:</strong> ${usuarioAtual.colecao.length}</p>
  `;
}

// RANKING
function atualizarRanking() {
  const lista = document.getElementById('listaRanking');
  lista.innerHTML = '';
  const ranking = [...usuarios].sort((a, b) => b.colecao.length - a.colecao.length);
  ranking.forEach(u => {
    const item = document.createElement('li');
    item.textContent = `${u.nome} - ${u.colecao.length} figurinhas`;
    lista.appendChild(item);
  });
}

// CONQUISTAS
function atualizarConquistas() {
  if (!usuarioAtual) return;
  const conquistas = usuarioAtual.conquistas;
  if (usuarioAtual.colecao.length >= 1 && !conquistas.includes("Primeira Figurinha")) {
    conquistas.push("Primeira Figurinha");
  }
  if (usuarioAtual.colecao.length >= 50 && !conquistas.includes("Coleção 50+")) {
    conquistas.push("Coleção 50+");
  }
  if (usuarioAtual.colecao.length >= 100 && !conquistas.includes("Coleção 100+")) {
    conquistas.push("Coleção 100+");
  }

  const lista = document.getElementById('listaConquistas');
  lista.innerHTML = '';
  conquistas.forEach(c => {
    const item = document.createElement('li');
    item.textContent = c;
    lista.appendChild(item);
  });
}

// BUSCA
document.getElementById('campoBusca').addEventListener('input', function() {
  const termo = this.value.toLowerCase();
  const resultado = document.getElementById('resultadoBusca');
  resultado.innerHTML = '';
  const todas = [...colecao, ...troca];
  todas.filter(f => f.nome.toLowerCase().includes(termo)).forEach(f => {
    const card = document.createElement('div');
    card.className = 'figurinha';
    card.innerHTML = `
      <img src="${f.imagem}" alt="${f.nome}">
      <h3>${f.nome}</h3>
      <p>${f.descricao}</p>
    `;
    resultado.appendChild(card);
  });
});

// CHAT
document.getElementById('btnEnviarChat').addEventListener('click', function() {
  const msg = document.getElementById('mensagemChat').value;
  if (msg.trim() === '') return;
  mensagensChat.push({ usuario: usuarioAtual ? usuarioAtual.nome : "Anônimo", texto: msg });
  document.getElementById('mensagemChat
                          
