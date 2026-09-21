const form = document.getElementById('formCadastro');
const listaUsuariosDiv = document.getElementById('listaUsuarios');
const alerta = document.getElementById('alerta');
const textoAlerta = document.getElementById('textoAlerta');
const contadorElemento = document.getElementById('contador');

const btnSalvar = document.getElementById('btnSalvar');
const btnCancelar = document.getElementById('btnCancelar');

// NOVO: Seletores para o Mostrar/Ocultar Senha
const btnToggleSenha = document.getElementById('btnToggleSenha');
const inputSenha = document.getElementById('senha');
const iconeOlho = document.getElementById('iconeOlho');

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let alertaTimeout;
let indiceEdicao = -1;

// Tema Dark Mode
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
aplicarTema();

btnTema.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    aplicarTema();
});

// NOVO: Lógica do clique no ícone de olho
btnToggleSenha.addEventListener('click', () => {
    if (inputSenha.type === 'password') {
        inputSenha.type = 'text';
        iconeOlho.classList.remove('fa-eye');
        iconeOlho.classList.add('fa-eye-slash');
    } else {
        inputSenha.type = 'password';
        iconeOlho.classList.remove('fa-eye-slash');
        iconeOlho.classList.add('fa-eye');
    }
});

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
        const inicial = usuario.nome.charAt(0);
        
        const card = document.createElement('div');
        card.className = 'usuario-card';
        card.innerHTML = `
            <div class="avatar">${inicial}</div>
            <div class="info">
                <strong>${usuario.nome}</strong>
                <span>${usuario.email}</span>
            </div>
            <div class="acoes-card">
                <button class="btn-editar" onclick="editarUsuario(${index})" title="Editar usuário">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-excluir" onclick="excluirUsuario(${index})" title="Excluir usuário">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        listaUsuariosDiv.appendChild(card);
    });
    
    contadorElemento.textContent = usuarios.length;
}

function editarUsuario(index) {
    const usuario = usuarios[index];
    document.getElementById('nome').value = usuario.nome;
    document.getElementById('email').value = usuario.email;
    document.getElementById('senha').value = usuario.senha;
    
    indiceEdicao = index;
    
    btnSalvar.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Atualizar Usuário';
    btnSalvar.style.backgroundColor = 'var(--success-text)';
    btnCancelar.classList.remove('oculto');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelarEdicao() {
    form.reset();
    indiceEdicao = -1;
    btnSalvar.innerHTML = '<i class="fa-solid fa-plus"></i> Cadastrar Usuário';
    btnSalvar.style.backgroundColor = 'var(--primary-color)';
    btnCancelar.classList.add('oculto');
}

btnCancelar.addEventListener('click', cancelarEdicao);

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

    const emailJaExiste = usuarios.some((usuario, index) => usuario.email === email && index !== indiceEdicao);
    if (emailJaExiste) {
        mostrarAlerta('Este e-mail já está cadastrado!', 'erro');
        return;
    }

    if (indiceEdicao >= 0) {
        usuarios[indiceEdicao] = { nome, email, senha };
        mostrarAlerta('Usuário atualizado com sucesso!', 'sucesso');
        cancelarEdicao();
    } else {
        usuarios.push({ nome, email, senha });
        mostrarAlerta('Usuário cadastrado com sucesso!', 'sucesso');
        form.reset();
    }

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    carregarCards();
});

function excluirUsuario(index) {
    if (confirm('Deseja realmente excluir este usuário?')) {
        usuarios.splice(index, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        if (index === indiceEdicao) {
            cancelarEdicao();
        }
        
        carregarCards();
        mostrarAlerta('Usuário excluído!', 'sucesso');
    }
}

carregarCards();