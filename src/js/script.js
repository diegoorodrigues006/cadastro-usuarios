const form = document.getElementById('formCadastro');
const tabelaBody = document.querySelector('#tabelaUsuarios tbody');
const alerta = document.getElementById('alerta'); // Puxando a div do alerta

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let alertaTimeout;

// Função para exibir o alerta na tela
function mostrarAlerta(mensagem, tipo) {
    alerta.textContent = mensagem;
    alerta.className = `alerta ${tipo}`; // Adiciona a classe de sucesso ou erro
    
    clearTimeout(alertaTimeout); // Reseta o tempo se clicar várias vezes rápido
    alertaTimeout = setTimeout(() => {
        alerta.classList.add('oculto');
    }, 3000); // Some após 3 segundos
}

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
        mostrarAlerta('Preencha todos os campos!', 'erro');
        return;
    }

    usuarios.push({ nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    form.reset();
    carregarTabela();
    mostrarAlerta('Usuário cadastrado com sucesso!', 'sucesso');
});

function excluirUsuario(index) {
    if (confirm('Deseja realmente excluir este usuário?')) {
        usuarios.splice(index, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        carregarTabela();
        mostrarAlerta('Usuário excluído!', 'sucesso');
    }
}

carregarTabela();