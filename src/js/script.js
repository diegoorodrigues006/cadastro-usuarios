const form = document.getElementById('formCadastro');
const listaUsuariosDiv = document.getElementById('listaUsuarios'); // Mudou de tabela para div
const alerta = document.getElementById('alerta');
const textoAlerta = document.getElementById('textoAlerta');
const contadorElemento = document.getElementById('contador');

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let alertaTimeout;

// --- Lógica do Dark Mode ---
const btnTema = document.getElementById('btnTema');
const iconeTema = btnTema.querySelector('i');
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function aplicarTema() {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        iconeTema.classList.remove('fa-moon');
        iconeTema.classList.add('fa-sun');
    } else {
        document.body.classList.remove('dark-mode');
        iconeTema.classList.remove('fa-sun');
        iconeTema.classList.add('fa-moon');
    }
}
// Aplica o tema logo que a página carrega
aplicarTema();

// Alterna o tema ao clicar no botão
btnTema.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    aplicarTema();
});
// -----------------------------

function mostrarAlerta(mensagem, tipo) {
    textoAlerta.innerHTML = tipo === 'sucesso' 
        ? `<i class="fa-solid fa-circle-check"></i> ${mensagem}` 
        : `<i class="fa-solid fa-circle-exclamation"></i> ${mensagem}`;
        
    alerta.className = `alerta ${tipo}`;
    
    clearTimeout(alertaTimeout);
    alertaTimeout = setTimeout(() => {
        alerta.classList.add('oculto');
    }, 3000);
}

function carregarCards() {
    listaUsuariosDiv.innerHTML = '';
    
    usuarios.forEach((usuario, index) => {
        // Pega a primeira letra do nome para o Avatar
        const inicial = usuario.nome.charAt(0);
        
        const card = document.createElement('div');
        card.className = 'usuario-card';
        card.innerHTML = `
            <div class="avatar">${inicial}</div>
            <div class="info">
                <strong>${usuario.nome}</strong>
                <span>${usuario.email}</span>
            </div>
            <button class="btn-excluir" onclick="excluirUsuario(${index})" title="Excluir usuário">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        listaUsuariosDiv.appendChild(card);
    });
    
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
        mostrarAlerta('Insira um e-mail válido!', 'erro');
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
    carregarCards();
    mostrarAlerta('Usuário cadastrado com sucesso!', 'sucesso');
});

function excluirUsuario(index) {
    if (confirm('Deseja realmente excluir este usuário?')) {
        usuarios.splice(index, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        carregarCards();
        mostrarAlerta('Usuário excluído!', 'sucesso');
    }
}

// Carrega os cards ao iniciar
carregarCards();