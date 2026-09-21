const form = document.getElementById('formCadastro');
const tabelaBody = document.querySelector('#tabelaUsuarios tbody');
const alerta = document.getElementById('alerta');
const contadorElemento = document.getElementById('contador'); // Puxando o contador

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let alertaTimeout;

function mostrarAlerta(mensagem, tipo) {
    alerta.textContent = mensagem;
    alerta.className = `alerta ${tipo}`;
    
    clearTimeout(alertaTimeout);
    alertaTimeout = setTimeout(() => {
        alerta.classList.add('oculto');
    }, 3000);
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
    
    // --- NOVO: Atualiza o contador na tela ---
    contadorElemento.textContent = usuarios.length;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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

    if (!validarEmail(email)) {
        mostrarAlerta('Por favor, insira um e-mail válido (ex: nome@email.com)!', 'erro');
        return;
    }

    const emailJaExiste = usuarios.some(usuario => usuario.email === email);
    if (emailJaExiste) {
        mostrarAlerta('Este e-mail já está cadastrado!', 'erro');
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