const form = document.getElementById('formCadastro');
const tabelaBody = document.querySelector('#tabelaUsuarios tbody');

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

function carregarTabela() {
    tabelaBody.innerHTML = '';
    usuarios.forEach((usuario, index) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td><button class="btn-excluir" onclick="excluirUsuario(${index})">Excluir</button></td>
        `;
        tabelaBody.appendChild(linha);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    if (!nome || !email || !senha) {
        alert('Preencha todos os campos!');
        return;
    }

    usuarios.push({ nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    form.reset();
    carregarTabela();
});

function excluirUsuario(index) {
    if (confirm('Deseja realmente excluir este usuário?')) {
        usuarios.splice(index, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        carregarTabela();
    }
}

carregarTabela();